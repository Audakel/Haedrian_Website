import decimal
import datetime
from calendar import month_name
import copy
import simplejson as json
import random

from django.core.exceptions import ObjectDoesNotExist
from django.conf import settings
from django.contrib.auth import get_user_model
from django.http import HttpResponseRedirect
from django.shortcuts import render
from rest_framework.authtoken.models import Token
import requests
from rapidsms.router import send, lookup_connections

from apiv1.internal.utils import format_currency_display, calculate_fees
from apiv1.internal.views_tasks import _get_history, get_temp_wallet, repay_outstanding_loan
from apiv1.serializers import SendSerializer
from haedrian.forms import NewUserForm, EmailUserForm
from haedrian.models import UserData, Transaction, Wallet
from apiv1.models import VerifyGroup, VerifyPerson
from haedrian.views import _create_account
from haedrian.wallets.coins_ph import CoinsPhWallet
from apiv1.tasks import get_group_members, verify_send_que
from apiv1.external.mifosx import mifosx_loan, mifosx_api
from money import Money as Convert, Money

__author__ = 'audakel'


def _create_wallet(user, kwargs):
    # TODO: fix hard coded only creation of coins.ph wallets
    # wallet = get_temp_wallet(user)
    wallet = CoinsPhWallet(user)
    data = wallet.create_wallet(user, kwargs)
    return data


def _new_user(kwargs):
    new_data = {
        "username": kwargs['username'],
        "email": kwargs['email'],
        "password1": kwargs['password1'],
        "password2": kwargs['password1'],
        "phone": kwargs['phone'],
        "country": kwargs['country'],
        "application": kwargs.get("application", None),
        "app_id": kwargs.get("app_id", None)
    }
    account = _create_account(new_data)
    if account['success']:
        user = get_user_model().objects.get(username=kwargs['username'])
        token = Token.objects.create(user=user)
        _data = {
            "success": True,
            "token": token.key
        }
        try:
            my_wallet = _create_wallet(user, kwargs)
        except Exception as e:
            get_user_model().objects.get(username=kwargs['username']).delete()
            return {
                'success': False,
                'error': e
            }
        if my_wallet['success']:
            # All is good, no errors
            # Set default currency
            currency_update = _update_currency(user, locale=new_data['country'])
            if not currency_update['success']:
                return currency_update
            return _data
        else:
            get_user_model().objects.filter(username=kwargs['username']).delete()
            Token.objects.filter(user_id=user).delete()
            return my_wallet
    else:
        return account


def _get_exchanges(user, kwargs):
    wallet = get_temp_wallet(user)
    try:
        data = wallet.get_exchanges(kwargs)
        default_currency = user.userdata.default_currency
        for location in data['locations']:
            for outlet in location['outlets']:
                info = outlet.get('fee_info', '')
                if info:
                    info['fee_amount'] = format_currency_display(info['currency'], default_currency, info['fee_amount'])
                    info['from_amount'] = format_currency_display(info['currency'], default_currency,
                                                                  info['from_amount'])
                    info['until_amount'] = format_currency_display(info['currency'], default_currency,
                                                                   info['until_amount'])
                    info['currency'] = default_currency

        return data
    except Exception as e:
        return e


def _get_exchange_fees(user, kwargs):
    wallet = get_temp_wallet(user)
    try:
        data = wallet.get_exchange_fees(kwargs)
        return data
    except Exception as e:
        return "#fail " + e


def _get_exchange_types(user, kwargs):
    wallet = get_temp_wallet(user)
    data = wallet.get_exchange_types(kwargs)
    if data['success']:
        return {
            'success': True,
            'locations': data['locations']
        }
    return data


def _send_to_user_handle(user, **kwargs):
    pass
    # wallet = get_temp_wallet(user)
    # try:
    # data = wallet.send_to_user(data["receiving_user"], data["amount_btc"], data["target_address"])
    # return data
    # except:
    # return False


def _send(user, kwargs):
    """ Internal API for the SMS app to call as well """

    wallet = get_temp_wallet(user)
    UserModel = get_user_model()
    # TODO:: 1% fee

    send_data = SendSerializer(data=kwargs)

    if not send_data.is_valid():
        return {'success': False, 'error': send_data.errors}

    # TODO figure out whether this is a handle, phone number or email.
    # receiver = UserModel.objects.get(username=send_data.data['receiver'])
    if send_data.data['send_method'] == 'username':
        try:
            receiver = UserModel.objects.get(username=send_data.data['send_to'])
        except ObjectDoesNotExist as e:
            return {"success": False, "error": e}
    else:
        return {"success": False, "error": 'Please choose a user to send to'}

    # amount_btc = Convert(amount=send_data.data['amount_local'], currency=currency).to('BTC')
    # amount_fee = amount_btc * settings.FEE_AMOUNT
    # total_sent = amount_btc - amount_fee
    # total_sent_local = Convert(amount=total_sent.amount, currency='BTC').to(currency)
    # fee_local = Convert(amount=amount_fee.amount, currency='BTC').to(currency)

    # ================
    currency = user.userdata.default_currency
    calc_fees = calculate_fees(currency, send_data.data['amount_local'])

    # TODO:: put logic in to find bitcoin address from coins.ph
    target_address = Wallet.objects.get(user_id=receiver.id, currency=settings.COINS_WALLET_TYPE).blockchain_address

    # Send to MFI
    mfi_data = wallet.send(receiver=receiver,
                           currency=currency,
                           amount_btc=calc_fees['amount_btc'].amount,
                           amount_local=calc_fees['total_sent_local'].amount,
                           target_address=target_address)

    if not mfi_data['success']:
        return mfi_data

    group_id = kwargs.get('payment_id', None)
    group = VerifyGroup.objects.get(id=group_id) if group_id else None

    mfi_transaction = Transaction(sender=user,
                                  receiver=receiver,
                                  amount_btc=calc_fees['amount_btc'].amount,
                                  amount_local=calc_fees['total_sent_local'].amount,
                                  amount_local_currency=currency,
                                  sent_payment_id=mfi_data['id'],
                                  group=group)
    try:
        mfi_transaction.save()
    except Exception as e:
        return {'success': False, 'error': e}


    # Do we even need a transactionQueue anymore? Just use Transactions with a flag
    # q = queue_repayment(user, mfi_data['id'], kwargs.get('payment_id', None))
    # # Coins.ph: Ensure this value is greater than or equal to 0.0001
    #
    # if not q['success']:
    # return q

    if not calc_fees['amount_too_small']:
        # Send Haedrian payment
        haedrian_account = UserModel.objects.get(username='haedrian')
        haedrian_target_address = Wallet.objects.get(user_id=haedrian_account,
                                                     currency=settings.COINS_WALLET_TYPE).blockchain_address
        haedrian_data = wallet.send(receiver=haedrian_account,
                                    currency=currency,
                                    amount_btc=calc_fees['amount_fee_btc'].amount,
                                    amount_local=calc_fees['amount_fee'].amount,
                                    target_address=haedrian_target_address)

        if not haedrian_data['success']:
            return haedrian_data

        haedrian_transaction = Transaction(sender=user,
                                           receiver=haedrian_account,
                                           amount_btc=calc_fees['amount_fee_btc'].amount,
                                           amount_local=calc_fees['amount_fee'].amount,
                                           amount_local_currency=currency,
                                           sent_payment_id=haedrian_data['id'],
                                           type=Transaction.FEE)

        try:
            haedrian_transaction.save()
        except Exception as e:
            return {'success': False, 'error': e}

    currency = mfi_data['currency']

    return {
        "status": mfi_data['status'],
        "fee": format_currency_display(currency, currency, mfi_data['fee']),
        "target": mfi_data['target'],
        "success": mfi_data['success'],
        "currency": currency,
        "amount": format_currency_display(currency, currency, mfi_data['amount']),
        "id": mfi_data['id'],
        'haedrian_fee': not calc_fees['amount_too_small']
    }


# def queue_repayment(user, send_id, group_id=None):
#     data = _get_history(user, {'id': send_id})
#     if data['success']:
#         if group_id:
#             que = TransactionQueue(user=user, sent_payment_id=send_id,
#                                    group=VerifyGroup.objects.get(id=group_id))
#         else:
#             que = TransactionQueue(user=user, sent_payment_id=send_id)
#
#         try:
#             que.save()
#             return {'success': True}
#         except Exception as e:
#             return {'success': False, 'error': e}
#
#     # add_transaction(user, send_id)
#     return data


def _get_pending_balance(user, kwargs):
    wallet = get_temp_wallet(user)
    try:
        data = wallet.get_pending_balance(kwargs)
        return data
    except:
        return False


def _get_balance(user, kwargs=''):
    wallet = get_temp_wallet(user)
    try:
        data = wallet.get_balance(kwargs)
        default_currency = user.userdata.default_currency
        data['balance'] = format_currency_display(data['currency'], default_currency, data['balance'])
        data['pending_balance'] = format_currency_display(data['currency'], default_currency, data['pending_balance'])
        data['currency'] = default_currency

        return data
    except Exception as e:
        return {'error': e, 'success': False}


def _get_wallet_info(user, kwargs):
    """
    id - Unique identifier for the account.
    name - Descriptive name for the account.
    currency - The type of currency that the account can hold, such as BTC and PBTC.
    balance - The current balance that the account has.
    pending_balance - Incoming pending balance.
    default_address - The default address used when the account is specified as a recipient.
    """
    wallet = get_temp_wallet(user)
    data = wallet.get_wallet_info(kwargs)
    if data['success']:
        default_currency = user.userdata.default_currency
        _data = data['wallets']
        data = {
            'bitcoin': {
                "name": _data[0]["name"],
                "total_received": format_currency_display(_data[0]['currency'], default_currency,
                                                          _data[0]["total_received"]),
                "blockchain_address": _data[0]["default_address"],
                "balance": format_currency_display(_data[0]['currency'], default_currency, _data[0]["balance"]),
                "id": _data[0]["id"],
                "pending_balance": format_currency_display(_data[0]['currency'], default_currency,
                                                           _data[0]["pending_balance"]),
                "btc_balance": format_currency_display(_data[0]['currency'], 'BTC', _data[0]["balance"]),
                "currency": default_currency
            },
            'local': {
                "name": _data[2]["name"],
                "total_received": format_currency_display(_data[2]['currency'], default_currency,
                                                          _data[2]["total_received"]),
                "blockchain_address": _data[2]["default_address"],
                "balance": format_currency_display(_data[2]['currency'], default_currency, _data[2]["balance"]),
                "id": _data[2]["id"],
                "pending_balance": format_currency_display(_data[2]['currency'], default_currency,
                                                           _data[2]["pending_balance"]),
                "btc_balance": format_currency_display(_data[2]['currency'], 'BTC', _data[2]["balance"]),
                "currency": default_currency
            }
        }
    return data


def _get_address(user, kwargs):
    wallet = get_temp_wallet(user)
    try:
        data = wallet.get_address(kwargs)
        return data
    except:
        return False


def _buy(user, kwargs):
    wallet = get_temp_wallet(user)
    try:
        data = wallet.buy(kwargs)
        return data
    except Exception as e:
        return {'success': False, 'error': e}


def _verify_buy(user, kwargs):
    wallet = get_temp_wallet(user)
    try:
        data = wallet.verify_buy(kwargs)
        vg = VerifyGroup.objects.filter(created_by=user).filter(buy_order_id=kwargs['order_id'])
        if data['success'] and vg:
            vg[0].buy_confirmed = True
            try:
                vg[0].save()
            except Exception as e:
                return {'success': False, 'error': e}

        return data
    except Exception as e:
        return {'success': False, 'error': e}


def _get_buy_history(user, kwargs):
    wallet = get_temp_wallet(user)
    try:
        data = wallet.buy_history(kwargs)
        if data['success']:
            pass
        return data
    except Exception as e:
        return e


def _get_id(user, kwargs):
    data = {
        'user': user.username,
        'email': user.email,
        'first_name': user.first_name,
        'last_name': user.last_name,
        'currencies': ['USD', 'PHP']
    }
    return data


def _get_exchange_rate(user, kwargs):
    currency = "BTC-" + kwargs['currency']
    url = 'https://quote.coins.ph/v1/markets/' + currency
    try:
        response = requests.get(url)
    except Exception as e:
        return {"success": False, "error": e}
    return response.json()


def create_account(request):
    if request.method == 'POST':
        # the forms seem to destructively remove the elements? deep copy until I find out why
        if _new_user(copy.deepcopy(request.POST))['success']:
            return HttpResponseRedirect("/")
        else:
            data_form = NewUserForm(request.POST)
            user_form = EmailUserForm(request.POST)
    else:
        data_form = NewUserForm()
        user_form = EmailUserForm()
    return render(request, "registration/register.html", {
        'user_form': user_form,
        'data_form': data_form,
    })


def _get_groups(user, kwargs):
    # TODO :: fix hard coded user when we have more real users
    try:
        return get_group_members({'clientId': UserData.objects.get(user_id=user).app_id})
    except Exception as e:
        return {'success': False, 'error': e}


def _group_verify(user, kwargs):
    from apiv1.dummy_data import a_nice_message

    backend = 'telerivet'

    def nice_message():
        return a_nice_message[random.randint(0, 6)]

    def message(member, group_leader, amount, mfi):
        return 'Hi {}, looks like {} is preparing to send ${} to {} for you. ' \
               'If there has been an error please talk to your representitive at {}. Remember - {}'.format(
            member, group_leader, amount, mfi, mfi, nice_message())

    # TODO:: check for old group buy orders - should we delete them?
    # if VerifyGroup.objects.filter(group_id=kwargs['group_id']).exists():
    # VerifyGroup.objects.get(group_id=kwargs['group_id']).delete()

    group_total = 0
    for member in kwargs['group_members']:
        group_total += decimal.Decimal(member['amount'])

    try:
        group = VerifyGroup(group_id=kwargs['group_id'],
                            total_payment=group_total,
                            created_by=user,
                            currency=UserData.objects.get(user=user).default_currency,
                            size=len(kwargs['group_members']))
        group.save()
    except Exception as e:
        return {'success': False, 'error': "Try again - Couldn't save to group database: {}".format(e)}

    for member in kwargs['group_members']:
        person = VerifyPerson(group=group,
                              mifos_id=member['id'],
                              phone=member['phone'],
                              amount=decimal.Decimal(member['amount']))

        # group = models.ForeignKey(VerifyGroup)
        # userdata = models.ForeignKey(UserData)
        # phone = models.CharField(max_length=30)
        # amount = models.DecimalField(max_digits=30, decimal_places=10)
        # confirmed = models.BooleanField(default=False)

        try:
            person.save()
        except Exception as e:
            VerifyGroup.objects.get(group_id=kwargs['group_id']).delete()
            return {'success': False, 'error': "Couldn't save to member database: {}".format(e)}

    try:
        for member in kwargs['group_members']:
            connection = lookup_connections(backend=backend, identities=[member['phone']])
            send(message(member['first_name'], user.first_name, member['amount'], 'Mentors International'), connection)
    except Exception as e:
        VerifyGroup.objects.get(group_id=kwargs['group_id']).delete()
        return {'error': 'Messages not sent, retry. Details: {}'.format(e), 'success': False}

    return {
        'success': True,
        'group_repayment_id': group.id
    }


def _group_payment(user, kwargs):
    time_delta = datetime.datetime.now() - datetime.timedelta(days=14)
    payments = VerifyGroup.objects.filter(created_by=user, buy_confirmed=True,
                                          created__gte=time_delta).order_by('created')
    payment_list = []
    default_currency = user.userdata.default_currency

    for payment in payments[:3]:
        payment_list.append({
            'total_payment': Convert(payment.total_payment, payment.currency).to(user.userdata.default_currency).amount,
            'total_payment_display': format_currency_display(payment.currency, user.userdata.default_currency,
                                                             payment.total_payment),
            'deposit_confirmed': payment.buy_confirmed,
            'group_id': payment.group_id,
            'payment_id': payment.id
        })
    return {
        'success': True,
        'payments': payment_list
    }


def _get_home_screen(user, kwargs=''):
    default_currency = user.userdata.default_currency
    balance = _get_balance(user)

    if not balance['success']:
        # Issue with coins.ph wallet
        balance['balance'] = format_currency_display('USD', default_currency, 0)

    next_repayment = _get_next_repayment(user)
    if not next_repayment['success']:
        # Issue with Mifosx
        next_repayment = {}

    loan = mifosx_loan(user)
    if loan['success']:
        response = {
            'wallet_balance': balance['balance'],
            'loan_info': loan['loans'],
            'next_repayment_info': next_repayment,
            'loan_message': '',
            'username': user.username.title(),
            'pending_buy_order': True,
            'success': True
        }
    else:
        response = {
            'wallet_balance': balance['balance'],
            'loan_info': [],
            'next_repayment_info': next_repayment,
            'loan_message': loan['error'],
            'username': user.username.title(),
            'pending_buy_order': True,
            'success': True
        }
    return response


def _update_currency(user, currency='', locale=''):
    # TODO:: Locale fix - if locale find currency
    if locale == 'US':
        currency = 'USD'
    if locale == 'PH':
        currency == 'PHP'

    try:
        u = user.userdata
        u.default_currency = currency
        u.save()
    except Exception as e:
        return {'success': False, 'error': e}

    return {'success': True, 'new_currency': user.userdata.default_currency}


def _get_currencies(user, data):
    return {'success': True, 'currencies': ['USD', 'PHP', 'BTC']}


def _get_next_repayment(user, data=''):
    clientId = UserData.objects.get(user=user).app_id
    res = mifosx_api('loans',
                     method='GET',
                     params={
                         'associations': 'all',
                         'tenantIdentifier': 'default',
                         'associations': 'all',
                         'exclude': 'guarantors',
                         'sqlSearch': 'l.client_id={}'.format(clientId)
                     },
                     baseurl=settings.MIFOSX_SERVER_URL,
                     tenant="default")

    if not res['success']:
        return res

    res = res['response']['pageItems'][0]
    loan_id = res['id']

    response = mifosx_api(
        endpoint='loans/{}'.format(loan_id),
        method='GET',
        params={'associations': 'all', 'exclude': 'guarantors'},
        baseurl=settings.MIFOSX_SERVER_URL,
        tenant="default"
    )
    res = response['response']
    periods = res['repaymentSchedule']['periods']

    for i, period in enumerate(periods):
        if i == 0:
            continue
        if not period['complete']:
            due = period['dueDate']
            currency = res['currency']['code']
            default_currency = user.userdata.default_currency
            total_due = period['totalDueForPeriod']
            break



    # period = res['periods'][what_repayment_number]
    # due = period['dueDate']
    # currency = res['currency']['code']
    # default_currency = user.userdata.default_currency

    return {
        'success': True,
        # 'total_term_days': res['loanTermInDays'],
        'date': datetime.date(due[0], due[1], due[2]),
        'amount': Convert(period['totalOriginalDueForPeriod'], currency).to(default_currency).amount,
        'amount_display': format_currency_display(currency, default_currency,
                                                  total_due)
    }


def _testing(user, data=''):
    from apiv1.tasks import verify_send_que
    return verify_send_que()
    return _get_next_repayment(29)

    # transaction = Transaction(sender=user,
    # receiver=get_user_model().objects.get(username='mentors_international'),
    # amount_btc=2.568,
    # amount_btc_currency='BTC',
    #                           amount_local=568,
    #                           amount_local_currency='USD')
    # try:
    #     transaction.save()
    # except Exception as e:
    #     return {"success": False, "error": str(e)}
    #
    # repay_outstanding_loan({
    #     'clientId': user.userdata.app_id,
    #     'transactionId': transaction.id
    # })


def _aub_test(user, data):
    transaction = Transaction(
        sender=user,
        receiver=get_user_model().objects.get(username='mentors_international'),
        amount_btc=Convert(data['amount'], currency='USD').to('BTC').amount,
        amount_btc_currency='BTC',
        amount_local=data['amount'],
        amount_local_currency='USD'
    )
    try:
        transaction.save()
    except Exception as e:
        return {"success": False, "error": str(e)}

    repay_outstanding_loan({
        'clientId': user.userdata.app_id,
        'transactionId': transaction.id
    })
    pass
