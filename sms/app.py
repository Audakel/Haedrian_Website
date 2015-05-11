from rapidsms.apps.base import AppBase
from decimal import Decimal
from apiv1.views import _send, _history
from haedrian.models import UserData
from rest_framework import status
from models import SmsMessage
#  BEST DEBUGGING HELP +++++++++ ========= import pdb; pdb.set_trace()

class SMSApplication(AppBase):
    def handle(self, msg):
        parts = msg.text.lower().split(' ')
        command = parts[0]

        save_message(msg)

        if command == 'ping':
            msg.respond('pong!')
            return True

        if command == 'balance':
            return sms_balance(msg)
        elif command == 'send':
            return sms_send(msg, parts)
        elif command == 'use':
            return sms_help(msg)
        #  ==================== Tagolog
        elif command == 'tulong':  # help
            return sms_tulong(msg)
        else:
            msg.respond("There has been an error, we are sorry\n:(")
            return True

        return False

def sms_send(msg, parts):
    try:
        amount = Decimal(parts[1])
    except:
        msg.respond("Error: Enter a monetary amount to send.")
        return True

    if amount < 0:
        msg.respond("Error: The amount to send must be positive")
        return True

    elif len(parts) == 2:
        msg.respond("Sent %d to Mentors International" % amount)
        return True

    try:
        user = UserData.objects.get(phone=msg.connections[0].identity).user
    except:  # User not found exception
        msg.respond("Error: You must register before sending money %s" % msg.connections[0].identity)
        return True

    print "Place 1"

    receiver_name = parts[2]
    if receiver_name[0] != '@':
        msg.respond("Error: The receiver must be an @ handle.")
        return True
    try:
        UserData.objects.get(handle=receiver_name).user
    except:
        msg.respond("Sorry, %s was not found.\nPlease check the @handle\n: (" % receiver_name)
        return True

    print "Place 2"

    data = {
        "receiver": receiver_name,
        "amount_local": amount,
    }
    try:
        response = _send(user, data)
    except Exception as e:
        msg.respond("Error something went wrong %s" % e)
        return True
    # print(dir(response))
    if response.status_code != status.HTTP_200_OK:
        msg.respond("Error while sending money.")
        return True
    msg.respond("Sent %d to %s successfully!" % (amount, receiver_name))
    return True


def sms_help(msg):
    msg.respond("Usage Commands  : )\nExample send $15: 'Send 15 @mi'\nExample get balance: 'Balance'")
    return True

def sms_tulong(msg):  # Help
    msg.respond("""Halimbawa send: 'Send 15 @mi'\n Halimbawa balance: 'Balance'""")
    return True

def sms_balance(msg):
    # data = _get_balance(msg.connections[0].identity)
    # msg.respond("Incoming funds: %d | Outgoing funds: %d" % (1,2))#(data[0], data[1]))
    response = _history(msg.connections[0].identity)
    msg.respond("Your balance is\n-Outgoing: $%d\n-Incoming: $%d\n-Loan Outstanding: $%d" %
                (response.data['outgoing'], response.data['incoming'], response.data['loan']))

    return True


def save_message(msg):
    message=SmsMessage(from_number=msg.fields['From'],
                       to_number=msg.fields['To'],
                       message_body=msg.text,
                       from_city="cantFindInCode",
                       from_country="cantFindInCode")
    message.save()
    return
