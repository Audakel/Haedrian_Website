# https://74b0199a.ngrok.com/sms/telerivet/
# https://haedrian.io/sms/telerivet/

from decimal import Decimal
import bleach
from django.utils import translation
from django.utils.translation import ugettext as _
from django.contrib.auth import get_user_model
from django.db.models import F
from phonenumbers import geocoder
import pycountry
import phonenumbers
import re
import pickle
import os
from apiv1.internal.utils import format_currency_display

from apiv1.internal.views import _get_exchange_types, _get_balance, _buy, _verify_buy, _get_home_screen
from haedrian.forms import NewUserForm
from haedrian.models import UserData
from models import Message, PendingDeposit
from sms.serializers import SmsIdSerializer

from sms_verify import verify_sender

from rapidsms.apps.base import AppBase

from strings import *


class SMSapplication(AppBase):
    def handle(self, msg):
        '''
        For testing - to get a new msg obj into our test file
        try:
            fileObject = open("sms/sms_msg.txt",'wb')
            pickle.dump(msg, fileObject)
            fileObject.close()
        except Exception as e:
            print (str(e))
        '''

        try:
            # TODO :: why are the numbers not in i17n form?
            # TODO :: right now just default to all US numbers
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

        parts = msg.text.lower().strip().split(" ") if msg.text else ['']

        if verify_sender(msg, parts):
            command = parts[0]
            _user_id = UserData.objects.get(phone=msg.connections[0].identity).user_id
            user = get_user_model().objects.get(id=_user_id)


            if command == _(str_cmd_balance):
                sms_balance(msg, user)
            elif command == _(str_cmd_send):
                sms_send(msg, parts)
            elif command == _(str_cmd_help):
                sms_help(msg)
            elif command == _(str_cmd_whoami):
                sms_whoami(msg)
            elif command == _(str_cmd_repay):
                sms_repay(msg, parts, user)
            elif command == _(str_cmd_done):
                sms_done(msg, parts, user)
            elif command == _(str_cmd_location):
                sms_location(msg, parts, user)
            elif command == _(str_cmd_id):
                sms_id(msg, parts, user)
            elif command == _(str_cmd_info):
                sms_info(msg, parts, user)
            else:
                # msg.respond(_(str_error_unknown))
                return True

        # we handled sms, no need to keep looking
        return True


def sms_send(msg, parts):
    """Send money to someone

    :param msg: A full telerivet message object
    :param parts: A list of words in the SMS

    :returns: A SMS response that the message has been sent
    """
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


def sms_help(msg):
    """Send a help message

    :param msg: A full telerivet message object
    :returns: A SMS response with full command usage list
    """
    msg.respond(str_rsp_usage_commands)


def format_sms_amounts(number):
    number = int(number)
    return "{:,}".format(number)


def sms_balance(msg, user):
    # Get all the values from android home screen call, and then format for SMS
    response = _get_home_screen(user)

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
    print('     about to call msg.repond in sms_balance')
    msg.respond(str_rsp_balance % (currency, format_sms_amounts(wallet_balance), funny_response, pending, loan_total, next_pay))
    return

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
    """Verify that the cell number is associated with a user in our db
    :param msg: A full telerivet message object
    :returns: True or false
    """
    verify_sender(msg)


def sms_whoami(msg):
    """ Check what the username is
    :param msg: A full telerivet message object
    :returns: Username associated with the phone number
    """
    user_id = UserData.objects.get(phone=msg.connections[0].identity).user_id
    msg.respond('User: @{}'.format(get_user_model().objects.get(id=user_id).username))


def sms_where(msg, parts, user):
    pass


def sms_repay(msg, parts, user):
    """ Start the deposit process with a buy order
    :param msg: A full telerivet message object
    :param parts: ex. 'Repay 12' - text message to repay 12 PHP
    :returns: Instructions on how to deposit at your chosen deposit location
    """
    # TODO:: fix hardcoded currency amount
    data = {
        "amount_local": parts[1],
        "currency": "PHP",
        "payment_method": user.userdata.sms_deposit_location,
    }

    res = _buy(user, data)
    if res['success']:
        pending = PendingDeposit(amount=res['order']['instructions_details']['amount'], user=user,
                                 order_id=res['order']['id'])
        try:
            pending.save()
        except Exception as e:
            response = "We are sorry, there has been an error with your deposit. %s" % (str(e))
            msg.respond(response)
            return

        place = res['order']['payment_outlet_title']
        res = res['order']['instructions_details']
        ref_number = '' if res['ref_number'] == 'error' else '\nYour reference number is: {}'.format(res['ref_number'])

        response = str_rsp_repay % (res['amount'], place, res['account_name'], res['account_number'], res['account_type'], ref_number)
    else:
        response = "We are sorry, there has been an error with your deposit. %s" % (res['error'])
    msg.respond(response)


def sms_done(msg, parts, user):
    """ Mark your deposit as paid after you have deposited the money
    :param msg: A full telerivet message object
    :param parts: 'done'
    :returns: A message letting you know the status of the deposit
    """
    if not PendingDeposit.objects.filter(user=user, user_confirmed=False).exists():
        msg.respond("Sorry, we can't find any repayments for you : (")
        return

    default_currency = user.userdata.default_currency

    latest = PendingDeposit.objects.filter(user=user, user_confirmed=False).latest('time')
    res = _verify_buy(user, {'order_id': latest.order_id})
    if res['success']:
        latest.user_confirmed = True
        try:
            latest.save()
        except Exception as e:
            msg.respond('There has been some type of error with marking your order "done": Error %s') % (str(e))
            return
        # TODO:: currency exchange for SMS amt

        message = str_rsp_done % (format_sms_amounts(latest.amount), res['order']['status'].replace('_', ' ').title(),
                                  user.userdata.organization.title())
        msg.respond(message)
    else:
        msg.respond('There has been some type of error with marking your order "done"')


def get_deposit_types(user, location=''):
    """ Returns a list of deposit locations
    :param location: format option
    :returns: A list of deposit locations
    """
    data = _get_exchange_types(user)

    if not data['success']:
        return data

    data = data['locations'][0]['outlets']
    # Clean out dragonPay stuff for now
    dragonPay = ['Dragonpay Rcbx Deposit',
                 'Bdo Deposit Cashcard',
                 'Dragonpay Mbtx Deposit',
                 'Dragonpay Cbcx Deposit']

    _data = []
    for d in data:
        if d['name'] not in dragonPay:
            _data.append(d)
    data = _data

    if location is not '':
        return data[location]['id']
    else:
        return [(i, j['name']) for i, j in enumerate(data)]


def frmt_db_lctn(location):
    """ Formats the database location into nicer, more readable style
    :param location: sms deposit location
    :returns: Formated sms deposit location
    """
    if location:
        return location.replace("_", " ").replace('-', ' ').title()

def sms_location(msg, parts, user):
    """ Allows you to see either your current deposit location, or a list of avaiable deposit locations
    :param parts: either 'location' or 'location 2' where the number is what deposit location you want
    :returns: Either a list of locations or a confirmation of change
    """
    if len(parts) is 1:
        locations = get_deposit_types(user)
        # if not locations.get('success', True):
        #     msg.respond(_(str_error_unknown))
        #     return

        formated_locations = ''
        for location in locations:
            formated_locations += '({}-{}) '.format(location[0], location[1])
        my_location = frmt_db_lctn(user.userdata.sms_deposit_location)
        print("-----about to call msg.resp in location")
        msg.respond(str_rsp_location_list.format(formated_locations, my_location))
        return

    elif len(parts) is 2:
        try:
            number = int(parts[1])
        except:
            msg.respond(_("Sorry, we are not that clever : (  your command is unknown. Try again?"))
            return

        new_location = get_deposit_types(user, number)
        ud = UserData.objects.get(user=user)
        ud.sms_deposit_location = new_location
        ud.save()
        _ud = UserData.objects.get(user=user)
        msg.respond(_(str_rsp_location_new).format(frmt_db_lctn(_ud.sms_deposit_location)))


def sms_id(msg, parts, user):
    """ Allows users to update / input their MFI and MFI ID
    :param parts: 'id test 23' sets your MFI to 'test' and your id to '23'
    :returns: If it found a corresponding user in Mifos it will return a
    message with details about the name, office, loan and wallet balance status
    """
    if len(parts) is 1:
        msg.respond(str_rsp_id)
        return

    elif len(parts) is not 3:
        msg.respond(_(str_err_known.format(str_err_no_mfi_or_id)))
        return

    send_data = SmsIdSerializer(data={'organization': parts[1], 'org_id': parts[2]})
    if not send_data.is_valid():
        msg.respond(_(str_err_known.format(str_err_mfi)))
        return

    data_form = NewUserForm({
        "phone": msg.connections[0].identity,
        # Fix hard code PH
        "country": 'PH',
        "organization": send_data.data['organization'],
        "org_id": send_data.data['org_id']
    })
    if data_form.is_valid():
        user.first_name = data_form.first_name
        user.last_name = data_form.last_name
        try:
            user.save()
        except Exception as e:
            return
        ud = UserData.objects.get(user=user)
        ud.organization = send_data.data['organization']
        ud.org_id = send_data.data['org_id']
        try:
            ud.save()
        except Exception as e:
            return

        active = 'active' if data_form.active else 'inactive'
        msg.respond((str_rsp_acct_found) % (user.first_name, user.last_name, active, data_form.office_name))
        return

    elif data_form.errors.get('org_id', False):
        msg.respond(_(str_err_id % (send_data.data['org_id'], send_data.data['organization'].title())))
        return

    else:
        msg.respond(_('{}. It might be {}'.format(str_err_unknown, data_form.errors['__all__'].as_text())))
        return


def sms_info(msg, parts, user):
        """ Allows users to see all the basic info we have for them
        :param parts: 'info'
        :returns: Message with name, mfi, id, and username
        """
        name = '{} {}'.format(user.first_name, user.last_name) if user.first_name else 'missing'
        mfi = user.userdata.organization if user.userdata.organization else 'missing'
        id = user.userdata.org_id if user.userdata.org_id else 'missing'
        username = user.username
        msg.respond(_('Name: %s, MFI: %s, ID: %s, Username: %s') % (name, mfi, id, username))
        return






