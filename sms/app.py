# https://74b0199a.ngrok.com/sms/telerivet/
# https://haedrian.io/sms/telerivet/

from decimal import Decimal
from django.utils import translation
from django.utils.translation import ugettext as _
from django.contrib.auth import get_user_model
from django.db.models import F
from phonenumbers import geocoder
import pycountry
import phonenumbers
import re
from apiv1.internal.utils import format_currency_display

from apiv1.internal.views import _get_exchange_types, _get_balance, _buy, _verify_buy, _get_home_screen
from haedrian.models import UserData
from models import Message, PendingDeposit

from sms_verify import verify_sender


from rapidsms.apps.base import AppBase

from strings import *

class SMSApplication(AppBase):
    def handle(self, msg):
        # sms sender is in our DB
        # msg.respond("Error: Not enough funds")
        # return True


        try:
            # TODO:: why are the numbers not in i17n form?
            # TODO:: right now just default to all US numbers
            country_name = geocoder.country_name_for_number(phonenumbers.parse(
                msg.connections[0].identity), 'en')
        except Exception as e:
            e.message

        try:
            country = pycountry.countries.get(name=country_name)
            translation.activate(country.alpha2)
        except KeyError as e:
            # Translation for this language not found
            print("Could not look up the short name for the country {}".format(country_name))
        except AttributeError as f:
            print("Translation for the country {} not found".format(country))
        if verify_sender(msg):
            parts = msg.text.lower().strip().split(" ")
            command = parts[0]
            # TODO:: redo message logging in db
            # save_message(msg)
            _user_id = UserData.objects.get(phone=msg.connections[0].identity).user_id
            user_id = get_user_model().objects.get(id=_user_id)

            if command == _('balance'):
                sms_balance(msg, user_id)
            elif command == _('send'):
                sms_send(msg, parts)
            elif command == _('help'):
                sms_help(msg)
            # elif command == _('tulong'):  # Tagolog help
            #     sms_tulong(msg)
            elif command == _('whoami'):
                sms_whoami(msg)
            elif command == _('repay'):
                sms_repay(msg, parts, user_id)
            elif command == _('done'):
                sms_done(msg, parts, user_id)
            elif command == _('where'):
                sms_where(msg, parts, user_id)
            else:
                # sms_help(msg)
                return True

                # we handled sms, no need to keep looking
        return True


def sms_send(msg, parts):
    try:
        amount = Decimal(parts[1])
    except:
        msg.respond(_("Error: Enter a monetary amount to send."))
        return

    if amount < 0:
        msg.respond(_("Error: The amount to send must be positive"))
        return

    if UserData.objects.get(phone=msg.connections[0].identity).sms_balance - amount < 0:
        msg.respond(_("Error: Not enough funds"))
        return

    receiver_name = parts[2]
    if receiver_name[0] != '@':
        msg.respond(_("Error: The receiver must be an @ handle."))
        return
    try:
        UserModel = get_user_model()
        UserModel.objects.filter(username=receiver_name[1:]).exists()
    except:
        msg.respond(_("Sorry, %s was not found.\nPlease check the @handle\n: (") % receiver_name)
        return

    msg.respond(_("Sent %d to %s successfully!") % (amount, receiver_name))
    user = UserData.objects.get(phone=msg.connections[0].identity)

    user.sms_balance = F('sms_balance') - amount
    user.save()

    """
    data = {
        "receiver": receiver_name,
        "amount_local": amount,
    }
    try:
        response = _send(user, data)
    except Exception as e:
        msg.respond("Error something went wrong %s" % e)
        return
    # print(dir(response))
    if response.status_code != status.HTTP_200_OK:
        msg.respond("Error while sending money.")
        return
    msg.respond("Sent %d to %s successfully!" % (amount, receiver_name))
    return
    """


def sms_help(msg):
    msg.respond(str_usage_commands)


# def sms_deposite(msg, parts):
    pass
#     try:
#         amount = Decimal(parts[1])
#     except:
#         msg.respond("Error: Enter a monetary amount to deposit.")
#         return
#
#     if amount < 0:
#         msg.respond("Error: The amount to deposit must be positive")
#         return
#
#     receiver_name = parts[2]
#     if receiver_name[0] != '@':
#         msg.respond("Error: The deposit receiver must be an @ handle.")
#         return
#     try:
#         UserModel = get_user_model()
#         UserModel.objects.filter(username=receiver_name[1:]).exists()
#     except:
#         msg.respond("Sorry, %s was not found.\nPlease check the @handle\n: (" % receiver_name)
#         return
#
#     msg.respond("Deposited %d to %s successfully!" % (amount, receiver_name))
#     user = UserData.objects.get(phone=msg.connections[0].identity)
#     user.sms_balance = F('sms_balance') + amount
#     user.save()

    """
    data = {
        "receiver": receiver_name,
        "amount_local": amount,
    }
    try:
        response = _send(user, data)
    except Exception as e:
        msg.respond("Error something went wrong %s" % e)
        return
    # print(dir(response))
    if response.status_code != status.HTTP_200_OK:
        msg.respond("Error while sending money.")
        return
    msg.respond("Sent %d to %s successfully!" % (amount, receiver_name))
    return
    """

# def sms_tulong(msg):  # Help
#     msg.respond("""Halimbawa send: 'Send 15 @mi'\n Halimbawa balance: 'Balance'""")

def format_sms_amounts(number):
    number = int(number)
    return "{:,}".format(number)


def sms_balance(msg, user_id):
    # Get all the values from android home screen call, and then format for SMS
    response = _get_home_screen(user_id)

    loan_total = response['consolidated'].get('loan_total', 0)
    wallet_balance = response['wallet'].get('_balance', 0)
    currency = response['wallet'].get('currency', 'Error: Missing currency')
    pending = response['wallet'].get('_pending', 0)
    next_payment_amount = response['next_repayment_info'].get('amount', 0)
    next_payment_date = response['next_repayment_info'].get('date', 0)

    funny_response = ':)' if wallet_balance > 1 else ':('
    pending = '' if pending == 0 else 'and a pending balance of {}.'.format(format_sms_amounts(pending))
    loan_total = 'No loan out.' if loan_total == 0 else 'Loan balance: {}.'.format(format_sms_amounts(loan_total))
    if next_payment_amount > 0:
        next_pay = 'Next payment of {} is due on {}.'.format(format_sms_amounts(next_payment_amount), next_payment_date)
    else:
        next_pay = ''

    msg.respond("You have %s %s available in your wallet %s  %s %s %s Sent with <3 from the Curo team." %
                (currency, format_sms_amounts(wallet_balance), funny_response, pending, loan_total, next_pay))


def save_message(msg):
    message = Message(from_number=msg.fields['From'],
                      to_number=msg.fields['To'],
                      message_body=msg.text,
                      # TODO find out how to get city and country
                      from_city="cantFindInCode",
                      from_country="cantFindInCode")
    message.save()
    return


def verify(msg):
    verify_sender(msg)


def sms_whoami(msg):

    user_id = UserData.objects.get(phone=msg.connections[0].identity).user_id
    msg.respond('User: @{}'.format(get_user_model().objects.get(id=user_id).username))


def sms_where(msg, parts, user_id):
    pass


def sms_repay(msg, parts, user_id):
    # TODO:: fix hardcoded currency amount
    data = {
        "amount_local": parts[1],
        "currency": "PHP",
        "payment_method": "bdo_deposit",
    }

    res = _buy(user_id, data)
    if res['success']:
        pending = PendingDeposit(amount=res['order']['instructions_details']['amount'], user=user_id, order_id=res['order']['id'])
        try:
            pending.save()
        except Exception as e:
            response = "We are sorry, there has been an error with your deposit. %s" % (str(e))
            msg.respond(response)
            return

        res = res['order']['instructions_details']
        response = "Please deposit the exact cash amount (%s PHP) at any BDO branch to the following account: " \
                   "\nAccount name: %s\nAccount number: %s\nAccount type: %s\nYour reference number is: %s" \
                   "\nOnce you have deposited the money, reply with 'done' to mark you deposit as complete." \
                   % (res['amount'],res['account_name'],res['account_number'],res['account_type'],res['ref_number'])
    else:
        response = "We are sorry, there has been an error with your deposit. %s" % (res['error'])
    msg.respond(response)

    # _deposit_list = get_deposit_types(user_id)
    # deposit_list = []
    # for i, val in enumerate(_deposit_list):
    #     deposit_list.append("%d-%s" % (i, val))
    # # msg.respond(', '.join(deposit_list))
    #

def sms_done(msg, parts, user_id):
    if not PendingDeposit.objects.filter(user=user_id, confirmed=False).exists():
        msg.respond("Sorry, we can't find any repayments for you : (")
        return

    default_currency = user_id.userdata.default_currency


    latest = PendingDeposit.objects.filter(user=user_id, confirmed=False).latest('time')
    res = _verify_buy(user_id, {'order_id': latest.order_id})
    if res['success']:
        latest.user_confirmed = True
        try:
            latest.save()
        except Exception as e:
            msg.respond('There has been some type of error with marking your order "done": Error %s') % (str(e))
            return
        # TODO:: currency exchange for SMS amt

        message = "Congrats! Your PHP %s deposit is '%s'. We will notify you when your repayment " \
                  "has been received by %s." % (format_sms_amounts(latest.amount), res['order']['status'].replace('_', ' ').title(), 'Mentors International')
        msg.respond(message)
    else:
        msg.respond('There has been some type of error with marking your order "done"')


def get_deposit_types(user_id):
    _data = _get_exchange_types(user_id)

    data = []
    for i in _data['payin-outlet-categories']:
        data.append(i['name'])
    return data

# def exchange_confirmed_checker():
    # create a
    # mfi_transaction = Transaction(sender=user,
    #                               receiver=receiver,
    #                               amount_btc=calc_fees['amount_btc'].amount,
    #                               amount_local=calc_fees['total_sent_local'].amount,
    #                               amount_local_currency=currency,
    #                               sent_payment_id=mfi_data['id'],
    #                               group=group)
    # try:
    #     mfi_transaction.save()
    # except Exception as e:
    #     return {'success': False, 'error': e}