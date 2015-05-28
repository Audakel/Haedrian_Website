__author__ = 'audakel'
from haedrian.models import Wallet
from wallet import BaseWallet
import requests
from django.conf import settings
import hashlib
import hmac
import time
import json
from django.contrib.auth import get_user_model

"""
{
    "receiver": "mentors_international",
    "amount_local": 0.0130,
    "target_address": "12UkkQ58ksRXHzHdNzhcy4e6f8JwWGTG3H"
}

{
    "email": "austin.harrison@byu.net",
    "password": "thisisaverybadpassword1",
    "api_key": "unZUljzAcdFEeWJzX9WfhwdBgjtBVzKEklsd5AkT"
}

{
    "email":"austin.harrison@byu.net",
    "password":"testingthisthingout"
}

{
    "username": "raka",
    "email": "rr@gmail.com",
    "password": "thisisaverybadpassword14",
    "phone": "4105521220",
    "country": "US"
}
"""
class CoinsPhWallet(BaseWallet):
    def __init__(self, user):
        super(CoinsPhWallet, self).__init__(user)

    def get_wallet_info(self, user):
        url = 'https://coins.ph/api/v3/crypto-accounts/'
        data = make_oath_request(url, user)['crypto-accounts']
        return data

    def get_pending_balance(self, user):
        url = 'https://coins.ph/api/v3/crypto-accounts/'
        _data = make_oath_request(url, user)['crypto-accounts'][0]
        data = {
            "pending": _data['pending_balance'],
            "currency": currency[0]
        }
        return data

    def send_to_user(self, user, amount_btc, address):

        pass
    #     url = 'https://coins.ph/api/v3/transfers/'
    #     body = {
    #         'amount': amount_btc,
    #         'account': user,
    #         'target_address': address
    #     }
    #     try:
    #         _data = make_request(url, body)
    #         data = {
    #             "status": _data["transfer"]['status'],
    #             "fee": 0.00000,
    #             "target": _data["transfer"]['target_address'],
    #             "amount": _data["transfer"]['amount'],
    #             "currency": currency[0]
    #         }
    #     except:
    #         data = _data['errors']
    #
    #     return data

    def send_to_address(self, user, receiver, amount_local, target_address):

        url = 'https://coins.ph/api/v3/crypto-payments/'
        user_wallet = Wallet.objects.filter(user_id=user)[0]
        sender_account = user_wallet.provider_wallet_id
        address = target_address

        body = {
            # 'amount': amount_local,
            'amount': amount_local,
            'account': sender_account,
            'target_address': address
        }
        try:
            import pdb;pdb.set_trace()
            _data = make_oath_request(url, user, body)["crypto-payment"]
            data = {
                "status": _data['status'],
                "fee": _data['fee_amount'],
                "target": _data['target_address'],
                "amount": _data['amount'],
                "currency": currency[0]
            }
        except Exception as e:
            data = e.message

        return data

    def get_balance(self, user):
        # TODO:: fix hard code
        url = 'https://coins.ph/api/v3/crypto-accounts/'
        try:
            # _data = make_oath_request(url, user)['status']['crypto-accounts'][0]
            _data = make_oath_request(url, user)['crypto-accounts'][0]
            data = {
                "balance": _data['balance'],
                "pending_balance": _data['pending_balance'],
                "currency": currency[0]
            }
            return data
        except Exception as e:
            return e.message

    def get_address(self, user):
        url = 'https://coins.ph/api/v3/crypto-accounts/'
        _data = make_oath_request(url, user)['crypto-accounts'][0]
        data = {
            "default_address": _data['default_address'],
            "currency": currency[0]
        }
        return data

    def get_exchanges(self, user):
        url = 'https://coins.ph/d/api/payin-outlets/'
        _data = make_oath_request(url, user)["payin-outlets"]
        data = []
        for i in _data:
            if i['amount_limits'][0]['currency'] == 'PHP':
                data.append(i)
        return data

    def get_exchange_fees(self, user):
        url = 'https://coins.ph/d/api/payin-outlet-fees/'
        data = make_oath_request(url, user)
        return data

    def get_exchange_types(self, user, data=''):
        url = 'https://coins.ph/d/api/payin-outlet-categories/'
        try:
            _data = make_oath_request(url, user)['payin-outlet-categories']
        except Exception as e:
            return e.message
        exchange_list = []
        # data ={'type':'Bank Deposit'}
        if data:
            for i in _data:
                if i['name'] == data['type']:
                    return i
        else:
            for i in _data:
                exchange_list.append(i['name'])
            return exchange_list

    def create_wallet(self, user, data):
        url = 'https://coins.ph/api/v2/user'
        # url = 'https://sandbox.coins.ph/api/v2/user'
        body = {
            'email': data['email'],
            'password': data['password'],
            'api_key': 'unZUljzAcdFEeWJzX9WfhwdBgjtBVzKEklsd5AkT'
        }

        # TODO check for duplicte emails - roll back
        data = make_hmac_request(url, body)
        if data['success']:
            access_token = data['user']['access_token']
            refresh_token = data['user']['refresh_token']
            expires_at = data['user']['expires_at']
            wallet = Wallet.objects.get(user_id=user)
            wallet.access_token = access_token
            wallet.refresh_token = refresh_token
            wallet.expires_at = expires_at
            wallet.save()
            # TODO:: Check for false on get address
            additional_params = get_extra_wallet_info(user)
            wallet.blockchain_address = additional_params['blockchain_address']
            wallet.provider_wallet_id = additional_params['provider_wallet_id']
            wallet.save()
        return data



currency = ["BTC", "CLP", "PBTC"]

API_KEY = settings.COINS_API_KEY  # Replace this with your API Key
API_SECRET = settings.COINS_SECRET  # Replace this with your API secret

# TODO:: fix this internal rewrite
def get_extra_wallet_info(user):
    url = 'https://coins.ph/api/v3/crypto-accounts/'
    _data = make_oath_request(url, user)['crypto-accounts'][0]
    data = {
        'blockchain_address': _data['default_address'],
        'provider_wallet_id': _data['id']
    }
    return data


def make_oath_request(url, user, body=''):
    TOKEN = get_user_token(user)

    nonce = int(time.time() * 1e6)

    headers = {
        'Authorization': 'Bearer {}'.format(TOKEN),
        'ACCESS_NONCE': nonce,
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
        'Accept': 'application/json'
    }
    if body:
        try:
            response = requests.post(url, headers=headers, data=body)
        except Exception as e:
            return e.message
    else:
        try:
            response = requests.get(url, headers=headers)
        except Exception as e:
            return e.message
    return response.json()

    # Use requests.get instead of POST for GET requests, without the data kwarg

def make_hmac_request(url, body=''):
    """Make a HMAC request to coins"""
    nonce = str(int(time.time() * 1e6))

    if body:
        body = json.dumps(body, separators=(',', ':'))
    message = nonce + url + body

    # Generate an hmac using the message
    signature = hmac.new(
        API_SECRET,
        message,
        hashlib.sha256
    ).hexdigest()

    headers = {
        'ACCESS_SIGNATURE': signature,
        'ACCESS_KEY': API_KEY,
        'ACCESS_NONCE': nonce,
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    }
    if body:
        try:
            response = requests.post(url, headers=headers, data=body)
        except Exception as e:
            return e.message
    else:
        try:
            response = requests.get(url, headers=headers)
        except Exception as e:
            return e.message
    return response.json()


def get_user_token(user):
    user_wallet = Wallet.objects.filter(user_id=user)[0]
    if float(user_wallet.expires_at) > time.time():
        token = user_wallet.access_token

    else:
        url = 'https://coins.ph/user/oauthtoken'
        data = {
            'client_id': user_wallet.provider_wallet_id,
            'client_secret': settings.SECRET_KEY,
            'refresh_token': user_wallet.refresh_token,
            'grant_type': 1,
            'redirect_uri': 'https://haedrian.io'
        }
        token = requests.post(url, data=data)

    return token