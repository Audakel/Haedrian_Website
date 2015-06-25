import copy
import random

from django.core.exceptions import ObjectDoesNotExist
from django.conf import settings
from django.contrib.auth import get_user_model
from django.http import HttpResponseRedirect
from django.shortcuts import render
from money import Money
from rest_framework.authtoken.models import Token
import requests
from rapidsms.router import send, lookup_connections

from apiv1.internal.views_tasks import _get_history, get_temp_wallet, repay_outstanding_loan

from apiv1.serializers import SendSerializer
from haedrian.forms import NewUserForm, EmailUserForm
from haedrian.models import UserData
from apiv1.models import VerifyGroup, VerifyPerson, TransactionQueItem
from haedrian.views import _create_account
from haedrian.wallets.coins_ph import CoinsPhWallet
from apiv1.tasks import get_group_members


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
        "app_external_id": kwargs.get("app_external_id", None)
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
                'error': e.message
            }
        if my_wallet['success']:
            # All is good, no errors
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
        return data
    except Exception as e:
        return e.message


def _get_exchange_fees(user, kwargs):
    wallet = get_temp_wallet(user)
    try:
        data = wallet.get_exchange_fees(kwargs)
        return data
    except Exception as e:
        return "#fail " + e.message


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
    #     return False


def _send(user, kwargs):
    """ Internal API for the SMS app to call as well """

    wallet = get_temp_wallet(user)
    UserModel = get_user_model()
    haedrian_account = UserModel.objects.get(username='haedrian')

    send_data = SendSerializer(data=kwargs)

    if send_data.is_valid():
        sender = user
        # TODO figure out whether this is a handle, phone number or email.
        # receiver = UserModel.objects.get(username=send_data.data['receiver'])
        if send_data.data['send_method'] == 'username':
            try:
                receiver = UserModel.objects.get(username=send_data.data['send_to'])
            except ObjectDoesNotExist as e:
                return {"success": False, "error": e.message}
        else:
            return {"success": False, "error": 'Please choose a user to send to'}

        # TODO:: fix to look at user preference
        # currency = UserData.objects.get(user_id=sender.id).default_currency
        currency = send_data.data['currency']
        amount_btc = Money(amount=send_data.data['amount_local'], currency=currency).to('BTC')
        amount_fee = amount_btc * settings.FEE_AMOUNT
        total_sent = amount_btc - amount_fee
        total_sent_local = Money(amount=total_sent.amount, currency='BTC').to(currency)
        fee_local = Money(amount=amount_fee.amount, currency='BTC').to(currency)

        # TODO:: put logic in to find bitcoin address and redo local currency !!!
        # target_address = Wallet.objects.get(id=receiver)
        target_address = '1NaE38hefkbq3WdKZSZzEuVtAP8HPJyQnu'

        data = wallet.send(receiver=receiver,
                           currency=currency,
                           amount_btc=total_sent.amount,
                           amount_local=total_sent_local.amount,
                           target_address=target_address)

        if data['success']:
            q = add_to_que(user, data['id'], kwargs.get('payment_id', None))
            if q['success']:
                return data
            else:
                return q
        else:
            return data
    return {'success': False, 'error': send_data.errors}


def add_to_que(user, send_id, group_id=None):
    data = _get_history(user, {'id': send_id})
    if data['success']:
        if group_id:
            que = TransactionQueItem(user=user, sent_payment_id=send_id,
                                     group=VerifyGroup.objects.get(id=group_id))
        else:
            que = TransactionQueItem(user=user, sent_payment_id=send_id)

        try:
            que.save()
            return {'success': True}
        except Exception as e:
            return {'success': False, 'error': e.message}

    # add_transaction(user, send_id)
    return data





def _get_pending_balance(user, kwargs):
    wallet = get_temp_wallet(user)
    try:
        data = wallet.get_pending_balance(kwargs)
        return data
    except:
        return False


def _get_balance(user, kwargs):
    wallet = get_temp_wallet(user)
    try:
        data = wallet.get_balance(kwargs)
        return data
    except:
        return False


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
    try:
        data = wallet.get_wallet_info(kwargs)
        _data = {
            'bitcoin': {
                "name": data[0]["name"],
                "total_received": data[0]["total_received"],
                "currency": data[0]["currency"],
                "blockchain_address": data[0]["default_address"],
                "balance": data[0]["balance"],
                "id": data[0]["id"],
                "pending_balance": data[0]["pending_balance"]
            },
            'local': {
                "name": data[2]["name"],
                "total_received": data[2]["total_received"],
                "currency": data[2]["currency"],
                "blockchain_address": data[2]["default_address"],
                "balance": data[2]["balance"],
                "wallet_id": data[2]["id"],
                "pending_balance": data[2]["pending_balance"]
            }
        }
        return _data
    except:
        return False


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
        return {'success': False, 'error': e.message}


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
                return {'success': False, 'error': e.message}

        return data
    except Exception as e:
        return {'success': False, 'error': e.message}


def _get_buy_history(user, kwargs):
    wallet = get_temp_wallet(user)
    try:
        data = wallet.buy_history(kwargs)
        return data
    except Exception as e:
        return e.message


def _get_id(user, kwargs):
    data = {
        'user': user.username,
        'email': user.email,
        'first_name': user.first_name,
        'last_name': user.last_name,
    }
    return data


def _get_exchange_rate(user, kwargs):
    currency = "BTC-" + kwargs['currency']
    url = 'https://quote.coins.ph/v1/markets/' + currency
    try:
        response = requests.get(url)
    except Exception as e:
        return {"success": False, "error": e.message}
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
    #  TODO :: fix hard coded user when we have more real users
    try:
        return get_group_members({'clientId': UserData.objects.get(user=user).app_external_id})
    except Exception as e:
        return {'success': False, 'error': e.message}


def _group_verify(user, kwargs):
    from apiv1.dummy_data import a_nice_message

    backend = 'telerivet'
    def nice_message():
        return a_nice_message[random.randint(0, 6)]

    def message(member, group_leader, amount, mfi):
        return 'Hi {}, looks like {} is preparing to send ${} to {} for you. ' \
               'If there has been an error please talk to your representitive at {}. Remember - {}'.format(
            member, group_leader, amount, mfi, mfi, nice_message())

    if VerifyGroup.objects.filter(group_id=kwargs['group_id']).exists():
        VerifyGroup.objects.get(group_id=kwargs['group_id']).delete()

    group_total = 0
    for member in kwargs['group_members']:
        group_total += member['amount']

    try:
        group = VerifyGroup(group_id=kwargs['group_id'], total_payment=group_total, created_by=user, size=len(kwargs['group_members']))
        group.save()
    except Exception as e:
        return {'success': False, 'error': "Try again - Couldn't save to group database: {}".format(e.message)}

    for member in kwargs['group_members']:
        person = VerifyPerson(group_id=group.id,
                              personal_id=member['id'],
                              phone=member['phone'],
                              amount=member['amount'])
        try:
            person.save()
        except Exception as e:
            VerifyGroup.objects.get(group_id=kwargs['group_id']).delete()
            return {'success': False, 'error': "Couldn't save to member database: {}".format(e.message)}

    try:
        for member in kwargs['group_members']:
            connection = lookup_connections(backend=backend, identities=[member['phone']])
            send(message(member['first_name'], user.first_name, member['amount'], 'Mentors International'), connection)
    except Exception as e:
        VerifyGroup.objects.get(group_id=kwargs['group_id']).delete()
        return {'error': 'Messages not sent, retry. Details: {}'.format(e.message), 'success': False}

    return {
        'success': True,
        'group_repayment_id': group.id
    }


def _group_payment(user, kwargs):
    payments = VerifyGroup.objects.filter(created_by=user).order_by('created')
    payment_list = []
    for payment in payments:
        payment_list.append({
            'total_payment': payment.total_payment,
            'deposit_confirmed': payment.buy_confirmed,
            'group_id': payment.group_id,
            'payment_id': payment.id
        })
    return {
        'success': True,
        'payments': payment_list
    }




def _testing(user, data):
    from apiv1.internal.views_tasks import _get_history, add_transaction
    que = TransactionQueItem.objects.filter()
    for q in que:
        history = _get_history(q.user, {'id': q.sent_payment_id})
        if history['success']:
            if history['transactions'][0]['status'] == 'success':
                group = ''
                if q.group:
                    group = q.group

                add_transaction(q.user,
                                get_user_model().objects.filter(username='mentors_international')[0],
                                history['transactions'][0]['amount'],
                                history['transactions'][0]['currency'],
                                group)
                q.delete()


