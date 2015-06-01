__author__ = 'audakel'

from haedrian.models import UserData
from models import Message, Signup
import random
from django.contrib.auth import get_user_model
from haedrian.views import _create_account
from django.utils import translation
from django.utils.translation import ugettext as _

#  DEBUGGING HELP +++++++++ ========= import pdb; pdb.set_trace()
from strings import *

def verify_sender(msg):
    if check_number_exist(msg):
        return True
    elif not currently_signing_up(msg):
        # add them to the signup database
        signup = Signup(phone_number=msg.connections[0].identity)
        signup.save()
        msg.respond(str_create_account)
        return False
    else:
        create_handle(msg)
        return False


def check_number_exist(msg):
    # Check for phone number in real DB
    if UserData.objects.filter(phone=msg.connections[0].identity).exists():
        return True


def currently_signing_up(msg):
    # Check for phone number in DB
    if Signup.objects.filter(phone_number=msg.connections[0].identity).exists():
        return True
    else:
        return False


def check_handle_exist(msg_handle):
    # Check for user handle in DB
    UserModel = get_user_model()
    if Signup.objects.filter(user_handle=msg_handle).exists():
        return True
        # Check for unique handle
    elif UserModel.objects.filter(username=msg_handle).exists():
        return True
    return False


def create_handle(msg):
    msg_handle = msg.text.strip().lower()
    # This is just in case the user tries to do a username/handle with spaces
    if " " in msg_handle:
        parts = msg_handle.split(" ");
        msg_handle = ""
        for part in parts:
            msg_handle += part;
        print msg_handle

    if check_handle_exist(msg_handle):
        # TODO make better check for existing handle / better collision avoidance
        new_msg_handle = msg_handle
        while check_handle_exist(new_msg_handle):
            random_number = str(random.randint(0, 9999))
            new_msg_handle = msg_handle + random_number
        sms_create_user(new_msg_handle, msg)
        Signup.objects.get(phone_number=msg.connections[0].identity).delete()
        msg.respond(str_welcome_username_taken % (msg_handle+random_number, msg_handle))
    else:
        # Handle does not exist
        sms_create_user(msg_handle, msg)
        Signup.objects.get(phone_number=msg.connections[0].identity).delete()
        msg.respond(str_welcome % (msg_handle, str_help_message_first_half))


def sms_create_user(username, msg):
    user_data = {
        "username": username,
        # TODO:: fix email
        "email": username+"@gmail.com",
        "password1": "thisisabadpassword",
        "password2": "thisisabadpassword",
        "phone": msg.connections[0].identity,
        "country": "US",
        "sms_balance": 0,
        "sms_pending_balance": 0,
    }

    # import pdb;pdb.set_trace()
    _create_account(user_data)

    # TODO :: change this testing purposes
    # user = UserData.objects.get(phone=msg.connections[0].identity)
    # user.sms_balance = 20
    # user.save()
