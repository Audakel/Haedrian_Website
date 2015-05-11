from rapidsms.apps.base import AppBase
from decimal import Decimal
from apiv1.views import _send, _history
from haedrian.models import UserData
from rest_framework import status
from models import SmsMessage, SmsSignup
import random
#  BEST DEBUGGING HELP +++++++++ ========= import pdb; pdb.set_trace()

class SMSApplication(AppBase):
    def handle(self, msg):
        verify_sender(msg)
        parts = msg.text.lower().split(' ')
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
        # else:
        #     msg.respond("There has been an error, we are sorry\n:(")
        #     return True

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
    response = _history(msg.connections[0].identity)
    msg.respond("Your balance is\n-Outgoing: $%d\n-Incoming: $%d\n-Loan Outstanding: $%d" %
                (response.data['outgoing'], response.data['incoming'], response.data['loan']))


def save_message(msg):
    message=SmsMessage(from_number=msg.fields['From'],
                       to_number=msg.fields['To'],
                       message_body=msg.text,
                       # TODO find out how to get city and country
                       from_city="cantFindInCode",
                       from_country="cantFindInCode")
    message.save()
    return


def verify_sender(msg):
    if not check_number_exist(msg):
        if msg.text[0] == '@':
            create_handle(msg)
        else:
            msg.respond("Please create a username.\nType '@' followed by your desired username. Example: @monkey")


def check_signing_up(msg):
    # Check for phone number in DB
    return True if SmsSignup.objects.get(phone_number=msg.connections[0].identity).phone.exists() else False


def check_number_exist(msg):
    # Check for phone number in DB
    if not UserData.objects.get(phone=msg.connections[0].identity).phone.exists():
        if not check_signing_up(msg):
            signup = SmsSignup(phone_number=msg.connections[0].identity)
            signup.save()
        return False
    return True


def check_handle_exist(msg):
    # Check for user handle in DB
    if SmsSignup.objects.get(phone_number=msg.connections[0].identity).handle == "":
        return False
        # Check for unique handle
    return True


def create_handle(msg):
    msg_handle = msg.text.strip().lower()
    if not UserData.objects.get(handle=msg_handle).handle.exists:
        # Handle does not exist
        new_user = UserData(phone=msg.connections[0].identity, handle=msg_handle)
        new_user.save()
        SmsSignup.objects.get(phone_number=msg.connections[0].identity).delete()
        msg.respond("Welcome @%s!" % msg_handle)
    else:
        # Handle does exist
        # TODO make beter check for existing handle / better collison avoidance
        random_number = str(random.randint(0, 9999))
        new_user = UserData(phone=msg.connections[0].identity, handle=msg_handle+random_number)
        new_user.save()
        SmsSignup.objects.get(phone_number=msg.connections[0].identity).delete()
        msg.respond("Welcome!\nFrom henceforth you shall be known as %s\n(Sadly, %s was already taken)"
                    % (msg_handle+random_number, msg_handle))
    return