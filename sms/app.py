from rapidsms.apps.base import AppBase
from decimal import Decimal
from apiv1.views import _send, _history, _get_balance
from haedrian.models import UserData
from rest_framework import status
from models import SmsMessage, SmsSignup
from sms_verify import verify_sender, str_usage_commands
import random
from django.contrib.auth import get_user_model
from django.db.models import F
import pdb
#  BEST DEBUGGING HELP +++++++++ ========= import pdb; pdb.set_trace()


class SMSApplication(AppBase):
    def handle(self, msg):
        # sms sender is in our DB
        if verify_sender(msg):
            parts = msg.text.lower().strip().split(" ")
            command = parts[0]
            save_message(msg)

            if command == 'balance':
                sms_balance(msg)
            elif command == 'send':
                sms_send(msg, parts)
            elif command == 'use':
                sms_help(msg)
            elif command == 'tulong':  # Tagolog help
                sms_tulong(msg)
            elif command == 'whoami':
                sms_whoami(msg)
            else:
                sms_help(msg)

            # we handled sms, no need to keep looking
        return True


def sms_send(msg, parts):

    try:
        amount = Decimal(parts[1])
    except:
        msg.respond("Error: Enter a monetary amount to send.")
        return

    if amount < 0:
        msg.respond("Error: The amount to send must be positive")
        return

    if UserData.objects.get(phone=msg.connections[0].identity).sms_balance - amount < 0:
        msg.respond("Error: Not enough funds : (\nMaybe get a job?")
        return

    receiver_name = parts[2]
    if receiver_name[0] != '@':
        msg.respond("Error: The receiver must be an @ handle.")
        return
    try:
        UserModel = get_user_model()
        UserModel.objects.filter(username=receiver_name[1:]).exists()
    except:
        msg.respond("Sorry, %s was not found.\nPlease check the @handle\n: (" % receiver_name)
        return

    msg.respond("Sent %d to %s successfully!" % (amount, receiver_name))
    user = UserData.objects.get(phone=msg.connections[0].identity)
    import pdb;pdb.set_trace()

    user.sms_balance = F('sms_balance')-amount
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


def sms_tulong(msg):  # Help
    msg.respond("""Halimbawa send: 'Send 15 @mi'\n Halimbawa balance: 'Balance'""")


def sms_balance(msg):
    #TODO: figure out how to find the user ID from authusers
    UserModel = get_user_model()
    user_id = UserData.objects.get(phone=msg.connections[0].identity).user_id
    # response = _get_balance(UserModel.objects.get(id=user_id))
    # msg.respond("You have $%s available, with $%s pending. Nice!" % (response['balance'],
    #                                                           response['pending_balance']))

    response = UserData.objects.get(phone=msg.connections[0].identity).sms_balance
    msg.respond("You have $%d available, with $%d pending. Nice!" % (response, 0.00))

def save_message(msg):
    message=SmsMessage(from_number=msg.fields['From'],
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
        msg.respond(UserData.objects.get(phone=msg.connections[0].identity).handle)
