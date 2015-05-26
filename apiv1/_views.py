import requests
import importlib
from django.conf import settings
from django.contrib.auth import get_user_model
from money import Money
from rest_framework import authentication, exceptions
from rest_framework.decorators import api_view, authentication_classes
from rest_framework.response import Response
from apiv1.coins_ph.wallet_commands import coinsph_send, coinsph_wallet_info
from apiv1.serializers import SendSerializer
from haedrian.models import UserData, Transaction, Wallet
from haedrian.views import _create_account
from haedrian.wallets.coins_ph import CoinsPhWallet
from rest_framework.authtoken.models import Token


__author__ = 'audakel'


def _create_wallet(user, data):
    # TODO: fix hard coded only creation of coins.ph wallets
    # wallet = get_temp_wallet(user)
    # import pdb; pdb.set_trace()

    wallet = CoinsPhWallet(user)
    data = wallet.create_wallet(user, data)
    if data['success']:
        return data


def _new_user(data):
    new_data = {
        "username": data['username'],
        "email": data['email'],
        "password1": data['password'],
        "password2": data['password'],
        "phone": data['phone'],
        "country": data['country']
    }
    try:
        if _create_account(new_data):
            user = get_user_model().objects.get(username=data['username'])
            token = Token.objects.create(user=user)
            _data = {
                "success": True,
                "token": token.key
            }
            _create_wallet(user, data)
    except Exception as e:
        _data = {
            "success": False,
            "error": e.message
        }
    return _data


def _get_exchanges(user, data):
    wallet = get_temp_wallet(user)
    try:
        data = wallet.get_exchanges()
        return data
    except:
        return False


def _get_exchange_fees(user, data):
    wallet = get_temp_wallet(user)
    try:
        data = wallet.get_exchange_fees()
        return data
    except:
        return False


def _get_exchange_types(user, data=""):
    wallet = get_temp_wallet(user)
    try:
        data = wallet.get_exchange_types()
        return data
    except:
        return False


def _send_to_user_handle(user, data):
    pass
    # wallet = get_temp_wallet(user)
    # try:
    #     data = wallet.send_to_user(data["receiving_user"], data["amount_btc"], data["target_address"])
    #     return data
    # except:
    #     return False


def _send_to_address(user, data):
    wallet = get_temp_wallet(user)

    UserModel = get_user_model()
    haedrian_account = UserModel.objects.get(username='haedrian')
    mentors_international_account = UserModel.objects.get(username='mentors_international')

    """ Internal API for the SMS app to call as well """
    send_data = SendSerializer(data=data)
    try:
        if send_data.is_valid():
            sender = user
            # import pdb; pdb.set_trace()
            # TODO figure out whether this is a handle, phone number or email.
            receiver = UserModel.objects.get(username=send_data.data['receiver'])
            currency = UserData.objects.get(user_id=sender.id).default_currency
            amount_btc = Money(amount=send_data.data['amount_local'], currency=currency).to('BTC')
            amount_fee = amount_btc * settings.FEE_AMOUNT
            total_sent = amount_btc - amount_fee
            total_sent_local = Money(amount=total_sent.amount, currency='BTC').to(currency)
            fee_local = Money(amount=amount_fee.amount, currency='BTC').to(currency)

            try:
                # TODO:: put logic in to find bitcoin address
                data = wallet.send_to_address(mentors_international_account,
                                              total_sent.amount, data['target_address'])
                wallet.send_to_address(haedrian_account, total_sent.amount, send_data['target_address'])
            except Exception as e:
                return e.message

            transaction = Transaction(sender=sender, receiver=receiver,
                                      amount_btc=total_sent.amount, amount_btc_currency='BTC',
                                      amount_local=total_sent_local.amount, amount_local_currency=total_sent_local.currency)
            fee = Transaction(sender=sender, receiver=haedrian_account,
                              amount_btc=amount_fee.amount, amount_btc_currency='BTC',
                              amount_local=fee_local.amount, amount_local_currency=fee_local.currency)

            fee.save()
            transaction.save()
            return data
        return Response(send_data.errors)
    except Exception as e:
        return e.message


def _get_pending_balance(user, data):
    wallet = get_temp_wallet(user)
    try:
        data = wallet.get_pending_balance()
        return data
    except:
        return False


def _get_balance(user, data=None):
    wallet = get_temp_wallet(user)
    try:
        data = wallet.get_balance(user)
        return data
    except:
        return False


def _get_user_wallet_handel(user, data):
    wallet = get_temp_wallet(user)
    try:
        data = wallet.get_user_wallet_handel()
        return data
    except:
        return False


def _get_address(user, data):
    wallet = get_temp_wallet(user)
    try:
        data = wallet.get_address()
        return data
    except:
        return False


def get_temp_wallet(user):
    wallets = Wallet.objects.filter(user=user)
    wallet = wallets[0]
    wallet_class = Wallet.WALLET_CLASS[wallet.type]
    p, m = wallet_class.rsplit('.', 1)

    mod = importlib.import_module(p)
    met = getattr(mod, m)

    return met(user)


def _send(user, data):
    UserModel = get_user_model()
    haedrian_account = UserModel.objects.get(handle='@haedrian')
    """ Internal API for the SMS app to call as well """
    send_data = SendSerializer(data=data)
    if send_data.is_valid():
        sender = user
        # TODO figure out whether this is a handle, phone number or email.
        receiver = UserModel.objects.get(handle=send_data.data['receiver'])
        currency = sender.default_currency
        amount_btc = Money(amount=send_data.data['amount_local'], currency=currency).to('BTC')
        amount_fee = amount_btc * settings.FEE_AMOUNT
        total_sent = amount_btc - amount_fee
        total_sent_local = Money(amount=total_sent.amount, currency='BTC').to(currency)
        fee_local = Money(amount=amount_fee.amount, currency='BTC').to(currency)
        transaction = Transaction(sender=sender, receiver=receiver,
                                  amount_btc=total_sent.amount, amount_btc_currency='BTC',
                                  amount_local=total_sent_local.amount, amount_local_currency=total_sent_local.currency)
        fee = Transaction(sender=sender, receiver=haedrian_account,
                          amount_btc=amount_fee.amount, amount_btc_currency='BTC',
                          amount_local=fee_local.amount, amount_local_currency=fee_local.currency)

        fee.save()
        transaction.save()
        return Response(status=200)
    return Response(send_data.errors, status=400)


def create_user(msg):
    pass


def history(request):
    return _history(request.user)


def _history(user):
    outgoing = Transaction.objects.filter(sender=user)
    incoming = Transaction.objects.filter(receiver=user)
    data = {'outgoing': 10, 'incoming': 36, 'loan': 528}

    return Response(data, status=200)


@api_view(http_method_names=['POST'])
@authentication_classes((authentication.BasicAuthentication, authentication.TokenAuthentication,))
def wallet_info(request):
    return _wallet_info()


def _wallet_info():

    return Response()



