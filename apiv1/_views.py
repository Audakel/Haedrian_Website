import importlib

from django.core.exceptions import ObjectDoesNotExist
from django.conf import settings
from django.contrib.auth import get_user_model
from django.db import DatabaseError
from money import Money
from rest_framework.authtoken.models import Token

from apiv1.serializers import SendSerializer
from haedrian.models import UserData, Transaction, Wallet
from haedrian.views import _create_account
from haedrian.wallets.coins_ph import CoinsPhWallet

__author__ = 'audakel'


def _create_wallet(user, kwargs):
    # TODO: fix hard coded only creation of coins.ph wallets
    # wallet = get_temp_wallet(user)
    wallet = CoinsPhWallet(user)
    data = wallet.create_wallet(user, kwargs)
    return data


def _new_user(kwargs):
    new_data = {
        "username": kwargs['username'],
        "email": kwargs['email'],
        "password1": kwargs['password'],
        "password2": kwargs['password'],
        "phone": kwargs['phone'],
        "country": kwargs['country']
    }
    account = _create_account(new_data)
    if account['success']:
        user = get_user_model().objects.get(username=kwargs['username'])
        token = Token.objects.create(user=user)
        _data = {
            "success": True,
            "token": token.key
        }
        try:
            my_wallet = _create_wallet(user, kwargs)
        except Exception as e:
            return {
                'success': False,
                'error': e.message
            }
        if my_wallet['success']:
            # All is good, no errors
            return _data
        else:
            get_user_model().objects.filter(username=kwargs['username']).delete()
            Token.objects.filter(user_id=user).delete()
            return my_wallet
    else:
        return account


def _get_exchanges(user, **kwargs):
    wallet = get_temp_wallet(user)
    try:
        data = wallet.get_exchanges(**kwargs)
        return data
    except:
        return False


def _get_exchange_fees(user, kwargs):
    wallet = get_temp_wallet(user)
    try:
        data = wallet.get_exchange_fees(kwargs)
        return data
    except:
        return False


def _get_exchange_types(user, kwargs):
    wallet = get_temp_wallet(user)
    data = wallet.get_exchange_types(kwargs)
    if data['success']:
        return data
    return False


def _send_to_user_handle(user, **kwargs):
    pass
    # wallet = get_temp_wallet(user)
    # try:
    #     data = wallet.send_to_user(data["receiving_user"], data["amount_btc"], data["target_address"])
    #     return data
    # except:
    #     return False


def _send(user, kwargs):
    """ Internal API for the SMS app to call as well """
    wallet = get_temp_wallet(user)
    UserModel = get_user_model()
    haedrian_account = UserModel.objects.get(username='haedrian')

    send_data = SendSerializer(data=kwargs)
    if send_data.is_valid():
        sender = user
        # TODO figure out whether this is a handle, phone number or email.
        # receiver = UserModel.objects.get(username=send_data.data['receiver'])
        try:
            receiver = UserModel.objects.get(username='mentors_international')
        except ObjectDoesNotExist as e:
            return {"success": False, "error": e.message}

        currency = UserData.objects.get(user_id=sender.id).default_currency
        amount_btc = Money(amount=send_data.data['amount_local'], currency=currency).to('BTC')
        amount_fee = amount_btc * settings.FEE_AMOUNT
        total_sent = amount_btc - amount_fee
        total_sent_local = Money(amount=total_sent.amount, currency='BTC').to(currency)
        fee_local = Money(amount=amount_fee.amount, currency='BTC').to(currency)

        # TODO:: put logic in to find bitcoin address and redo local currency !!!
        data = wallet.send(receiver, send_data.data['amount_local'], send_data.data['target_address'])
        if data['success']:
            transaction = Transaction(sender=sender, receiver=receiver,
                                      amount_btc=total_sent.amount, amount_btc_currency='BTC',
                                      amount_local=total_sent_local.amount, amount_local_currency=total_sent_local.currency)
            try:
                transaction.save()
            except DatabaseError as e:
                return {"success": False, "error": e.message}

            # ret_val = wallet.send(haedrian_account, round(amount_fee.amount, 8), send_data.data['target_address'])
            # if ret_val['success']:
            #     fee = Transaction(sender=sender, receiver=haedrian_account,
            #                       amount_btc=amount_fee.amount, amount_btc_currency='BTC',
            #                       amount_local=fee_local.amount, amount_local_currency=fee_local.currency)
            #     try:
            #         fee.save()
            #     except DatabaseError as e:
            #         return {"success": False, "error": e.message}
        return data
    return send_data.errors


def _get_pending_balance(user, kwargs):
    wallet = get_temp_wallet(user)
    try:
        data = wallet.get_pending_balance(kwargs)
        return data
    except:
        return False


def _get_balance(user, kwargs):
    wallet = get_temp_wallet(user)
    try:
        data = wallet.get_balance(kwargs)
        return data
    except:
        return False


def _get_wallet_info(user, kwargs):
    """
    id - Unique identifier for the account.
    name - Descriptive name for the account.
    currency - The type of currency that the account can hold, such as BTC and PBTC.
    balance - The current balance that the account has.
    pending_balance - Incoming pending balance.
    default_address - The default address used when the account is specified as a recipient.
    """
    wallet = get_temp_wallet(user)
    try:
        data = wallet.get_wallet_info(kwargs)
        _data = {
            'bitcoin': {
                "name": data[0]["name"],
                "total_received": data[0]["total_received"],
                "currency": data[0]["currency"],
                "blockchain_address": data[0]["default_address"],
                "balance": data[0]["balance"],
                "id": data[0]["id"],
                "pending_balance": data[0]["pending_balance"]
            },
            'local': {
                "name": data[2]["name"],
                "total_received": data[2]["total_received"],
                "currency": data[2]["currency"],
                "blockchain_address": data[2]["default_address"],
                "balance": data[2]["balance"],
                "wallet_id": data[2]["id"],
                "pending_balance": data[2]["pending_balance"]
            }
        }
        return _data
    except:
        return False


def _get_address(user, kwargs):
    wallet = get_temp_wallet(user)
    try:
        data = wallet.get_address(kwargs)
        return data
    except:
        return False


def _get_history(user, kwargs):
    wallet = get_temp_wallet(user)
    data = wallet.get_history(kwargs)
    if data['success']:
        return {
            'transaction_count': data['transaction_count'],
            'success': True,
            'transactions': data['transactions']
        }
    else:
        return data


def _buy(user, kwargs):
    wallet = get_temp_wallet(user)
    try:
        data = wallet.buy(kwargs)
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







