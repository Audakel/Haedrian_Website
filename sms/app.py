from decimal import Decimal

from rapidsms.apps.base import AppBase
from django.utils import translation
from django.utils.translation import ugettext as _
from django.contrib.auth import get_user_model
from django.db.models import F
from phonenumbers import geocoder
import pycountry

from apiv1.views_internal import _get_exchange_types
from haedrian.models import UserData
from models import Message
from sms_verify import verify_sender, str_usage_commands
from strings import str_deposit_locations


class SMSApplication(AppBase):
    def handle(self, msg):
        # sms sender is in our DB
        country_name = geocoder.country_name_for_number(msg.connections[0].identity, 'en')
        try:
            country = pycountry.countries.get(common_name=country_name)
            translation.activate(country.alpha2)
        except KeyError as e:
            # Translation for this language not found
            print("Could not look up the short name for the country {}".format(country_name))
        except AttributeError as f:
            print("Translation for the country {} not found".format(country))
        if verify_sender(msg):
            parts = msg.text.lower().strip().split(" ")
            command = parts[0]
            save_message(msg)
            _user_id = UserData.objects.get(phone=msg.connections[0].identity).user_id
            user_id = get_user_model().objects.get(id=_user_id)

            if command == _('balance'):
                sms_balance(msg)
            elif command == _('send'):
                sms_send(msg, parts)
            elif command == _('use'):
                sms_help(msg)
            # elif command == _('tulong'):  # Tagolog help
            #     sms_tulong(msg)
            elif command == _('whoami'):
                sms_whoami(msg)
            elif command == _('deposit'):
                sms_deposit(msg, parts, user_id)
            elif command == _('where'):
                sms_where(msg, parts, user_id)
            else:
                sms_help(msg)

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
    # import pdb;pdb.set_trace()

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


def sms_balance(msg):
    # TODO: figure out how to find the user ID from authusers

    # response = _get_balance(UserModel.objects.get(id=user_id))
    # msg.respond("You have $%s available, with $%s pending. Nice!" % (response['balance'],
    #                                                           response['pending_balance']))

    response = UserData.objects.get(phone=msg.connections[0].identity).sms_balance
    msg.respond(_("You have $%d available, with $%d pending. Nice!") % (response, 0.00))


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
    msg.respond(UserData.objects.get(phone=msg.connections[0].identity).handle)


def sms_where(msg, parts, user_id):
    pass


def sms_deposit(msg, parts, user_id):
    _deposit_list = get_deposit_types(user_id)
    deposit_list = []
    for i, val in enumerate(_deposit_list):
        deposit_list.append("%d-%s" % (i, val))
    # msg.respond(', '.join(deposit_list))
    msg.respond(str_deposit_locations)


def get_deposit_types(user_id):
    _data = _get_exchange_types(user_id)

    data = []
    for i in _data['payin-outlet-categories']:
        data.append(i['name'])
    return data
