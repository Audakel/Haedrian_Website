# coding=utf-8
from rapidsms.apps.base import AppBase
from decimal import Decimal
from apiv1._views import _get_exchange_types
from haedrian.models import UserData
from models import Message, Signup
from sms_verify import verify_sender
from strings import *
from django.utils import translation
from django.contrib.auth import get_user_model
from django.db.models import F
from phonenumbers import geocoder
import phonenumbers
import pycountry
from babel import Locale

class SMSApplication(AppBase):
    def handle(self, msg):
        # sms sender is in our DB
        phone_number = msg.connections[0].identity
        # phone_number = "+6328168024"
        country_name = geocoder.country_name_for_number(phonenumbers.parse(phone_number), 'en')
        try:
            # TODO Better handling of languages
            country = pycountry.countries.get(name=country_name)
            locale = Locale.parse("und_{}".format(country.alpha2))
            formatted_locale = "{}_{}".format(locale.language, country.alpha2)
            print(formatted_locale)
            translation.activate(formatted_locale)
        except KeyError as e:
            # Translation for this language not found
            print("Could not look up the language info for the country {}".format(country_name))
        except AttributeError as f:
            print("Translation for the country {} not found".format(country))
        if verify_sender(msg):
            parts = msg.text.lower().strip().split(" ")
            command = parts[0]
            save_message(msg, country_name)
            _user_id = UserData.objects.get(phone=msg.connections[0].identity).user_id
            user_id = get_user_model().objects.get(id=_user_id)

            if command == str_deposit:
                sms_deposit(msg, parts)
            elif command == str_next:
                sms_deposit_next(msg)
            elif command == str_send:
                sms_send(msg, parts)
            elif command == str_balance:
                sms_balance(msg)
            else:
                sms_help(msg)

        return True

def save_message(msg, country_name):
    message = Message(from_number=msg.fields['From'],
                      to_number=msg.fields['To'],
                      message_body=msg.text,
                      # TODO find out how to get city
                      from_city="cantFindInCode",
                      from_country=country_name)
    message.save()
    return

def sms_deposit(msg, parts):
    try:
        amount = Decimal(parts[1])
    except:
        msg.respond(str_error_monetary_deposit)
        return

    if amount < 0:
        msg.respond(str_error_negative_amount)
        return

    receiver_name = parts[2]
    if receiver_name[0] != '@':
        msg.respond(str_error_username)
        return
    try:
        UserModel = get_user_model()
        UserModel.objects.filter(username=receiver_name[1:]).exists()
    except:
        msg.respond(str_username_not_found % receiver_name)
        return

    msg.respond(str_deposit_message % (amount, receiver_name))
    user = UserData.objects.get(phone=msg.connections[0].identity)
    user.sms_balance = F('sms_balance') + amount
    user.save()

def sms_deposit_next(msg):
    balance = UserData.objects.get(phone=msg.connections[0].identity).sms_balance
    deposit_amount = 0.00
    msg.respond(str_successful_deposit % (deposit_amount, balance))

def sms_send(msg, parts):
    try:
        amount = Decimal(parts[1])
    except:
        msg.respond(str_error_monetary_send)
        return

    if amount < 0:
        msg.respond(str_error_negative_amount)
        return

    if UserData.objects.get(phone=msg.connections[0].identity).sms_balance - amount < 0:
        msg.respond(str_error_funds)
        return

    receiver_name = parts[2]
    if receiver_name[0] != '@':
        msg.respond(str_error_username)
        return
    try:
        get_user_model().objects.filter(username=receiver_name[1:]).exists()
    except:
        msg.respond(str_username_not_found % receiver_name)
        return

    msg.respond(str_sent_message % (amount, receiver_name))
    user = UserData.objects.get(phone=msg.connections[0].identity)
    # import pdb;pdb.set_trace()

    user.sms_balance = F('sms_balance') - amount
    user.save()

def sms_balance(msg):
    # TODO: figure out how to find the user ID from authusers
    response = UserData.objects.get(phone=msg.connections[0].identity).sms_balance
    msg.respond(str_balance_message % (response, 0.00))

def sms_help(msg):
    msg.respond(str_help_message)
