import random

from django.contrib.auth import get_user_model
from apiv1.internal.views import _new_user

from haedrian.models import UserData
from models import Signup
from haedrian.views import _create_account
from strings import *

def verify_sender(msg):
    if msg.text == str_please_create_username:
        return False
    
    if check_number_exist(msg):
        return True
    elif not currently_signing_up(msg):
        # add them to the signup database
        if msg.text is str_please_create_username:
            return False
        signup = Signup(phone_number=msg.connections[0].identity)
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

    msg_handle = msg.text.strip().lower()[1:]
    if check_handle_exist(msg_handle):
        # TODO make beter check for existing handle / better collison avoidance
        new_msg_handle = msg_handle
        while check_handle_exist(new_msg_handle):
            random_number = str(random.randint(0, 9999))
            new_msg_handle = msg_handle + random_number
        sms_create_user(new_msg_handle, msg)
        Signup.objects.get(phone_number=msg.connections[0].identity).delete()
        msg.respond("Welcome!\nYou're user name is @%s\n(Sadly, @%s was already taken)"
                    % (msg_handle+random_number, msg_handle))
    else:
        # Handle does not exist
        sms_create_user(msg_handle, msg)
        Signup.objects.get(phone_number=msg.connections[0].identity).delete()
        msg.respond("Welcome @%s!\n%s" % (msg_handle, str_usage_commands))


def sms_create_user(username, msg):
    user_data = {
        "username": username,
        "password1": "thisisabadpassword1",
        "phone": msg.connections[0].identity,
        "country": "PH"
        # TODO:: Check for number in MFI Mifos account
        # TODO:: Allow signup with MFI id if not already in DB
        # "application": kwargs.get("application", None),
        # "app_id": kwargs.get("app_id", None)
    }

    _new_user(user_data)

