from rapidsms.apps.base import AppBase
from decimal import Decimal
from apiv1.views import _send, _history, _get_balance
from haedrian.models import UserData
from rest_framework import status
from models import SmsMessage, SmsSignup
from sms_verify import verify_sender, str_usage_commands
import random
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
            # else:
            #     msg.respond("There has been an error, we are sorry\n:(")
            #     return True

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

    elif len(parts) == 2:
        msg.respond("Sent $%d to Mentors International" % amount)
        return

    try:
        user = UserData.objects.get(phone=msg.connections[0].identity).user
    except:  # User not found exception
        msg.respond("Error: You must register before sending money %s" % msg.connections[0].identity)
        return


    receiver_name = parts[2]
    if receiver_name[0] != '@':
        msg.respond("Error: The receiver must be an @ handle.")
        return
    try:
        UserData.objects.get(handle=receiver_name).user
    except:
        msg.respond("Sorry, %s was not found.\nPlease check the @handle\n: (" % receiver_name)
        return

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


def sms_help(msg):
    msg.respond("Usage Commands  : )\nExample send $15: 'Send 15 @mi'\nExample get balance: 'Balance'")


def sms_tulong(msg):  # Help
    msg.respond("""Halimbawa send: 'Send 15 @mi'\n Halimbawa balance: 'Balance'""")


def sms_balance(msg):
    # data = _get_balance(msg.connections[0].identity)
    # msg.respond("Incoming funds: %d | Outgoing funds: %d" % (1,2))#(data[0], data[1]))
    #TODO: figure out how to find the user ID from authusers
    response = _get_balance(2)
    # pdb.set_trace()
    msg.respond("Your balance is: %s" % response)


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
