__author__ = 'audakel'
from rapidsms.apps.base import AppBase
from decimal import Decimal
from apiv1.views import _send, _history
from haedrian.models import UserData
from rest_framework import status
from models import SmsMessage, SmsSignup
import random
#  DEBUGGING HELP +++++++++ ========= import pdb; pdb.set_trace()
from strings import *

def verify_sender(msg):
    if check_number_exist(msg):
        return True
    elif not currently_signing_up(msg):
        # add them to the signup database
        signup = SmsSignup(phone_number=msg.connections[0].identity)
        signup.save()
        msg.respond(str_please_create_username)
        return False
    else:
        if msg.text[0] == '@':
            create_handle(msg)
        else:
            msg.respond(str_please_create_username)
        return False


def check_number_exist(msg):
    # Check for phone number in real DB
    if UserData.objects.filter(phone=msg.connections[0].identity).exists():
        return True


def currently_signing_up(msg):
    # Check for phone number in DB
    if SmsSignup.objects.filter(phone_number=msg.connections[0].identity).exists():
        return True
    else:
        return False


def check_handle_exist(msg_handle):
    # Check for user handle in DB
    if SmsSignup.objects.filter(user_handle=msg_handle).exists():
        return True
        # Check for unique handle
    elif UserData.objects.filter(handle=msg_handle).exists():
        return True
    return False


def create_handle(msg):
    # import pdb; pdb.set_trace()

    msg_handle = msg.text.strip().lower()
    if check_handle_exist(msg_handle):
        # TODO make beter check for existing handle / better collison avoidance
        new_msg_handle = msg_handle
        while check_handle_exist(new_msg_handle):
            random_number = str(random.randint(0, 9999))
            new_msg_handle = msg_handle + random_number
        new_user = UserData(phone=msg.connections[0].identity, handle=new_msg_handle)
        new_user.save()
        SmsSignup.objects.get(phone_number=msg.connections[0].identity).delete()
        msg.respond("Welcome!\nYou're user name is %s\n(Sadly, %s was already taken)"
                    % (msg_handle+random_number, msg_handle))
    else:
        # Handle does not exist
        new_user = UserData(phone=msg.connections[0].identity, handle=msg_handle)
        new_user.save()
        SmsSignup.objects.get(phone_number=msg.connections[0].identity).delete()
        msg.respond("Welcome %s!\n%s" % (msg_handle, str_usage_commands))