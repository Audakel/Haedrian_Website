__author__ = 'audakel'
from haedrian.models import Wallet
from wallet import BaseWallet
import requests
from django.conf import settings
import hashlib
import hmac
import time
import json
import pdb
"""
{
    "receiver": "mentors_international",
    "amount_local": 45781,
    "target_address": "4dfu3iunf98rmkff91d34edsff3f"
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

    def get_user_wallet_handel(self):
        url = 'https://coins.ph/api/v3/crypto-accounts/'
        data = make_hmac_request(url)
        return data['crypto-accounts'][0]['id']

    def get_pending_balance(self):
        url = 'https://coins.ph/api/v3/crypto-accounts/'
        _data = make_hmac_request(url)['crypto-accounts'][0]
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

    def send_to_address(self, receiver, amount_local, target_address):
        url = 'https://coins.ph/api/v3/crypto-payments/'
        body = {
            'amount': amount_local,
            'account': receiver,
            'target_address': target_address
        }
        try:
            # import pdb; pdb.set_trace()
            _data = make_hmac_request(url, body)
            data = {
                "status": _data["crypto-payment"]['status'],
                "fee": _data["crypto-payment"]['fee_amount'],
                "target": _data["crypto-payment"]['target_address'],
                "amount": _data["crypto-payment"]['amount'],
                "currency": currency[0]
            }
        except:
            data = _data['errors']

        return data

    def get_balance(self, user):
        # TODO:: fix hard code

        url = 'https://coins.ph/api/v3/crypto-accounts/'
        import pdb;pdb.set_trace()
        try:
            _data = make_oath_request(url, user)['status']['crypto-accounts'][0]
            data = {
                "balance": _data['balance'],
                "pending_balance": _data['pending_balance'],
                "currency": currency[0]
            }
            return data
        except Exception as e:
            return e.message

    def get_address(self):
        url = 'https://coins.ph/api/v3/crypto-accounts/'
        _data = make_hmac_request(url)['crypto-accounts'][0]
        data = {
            "default_address": _data['default_address'],
            "currency": currency[0]
        }
        return data

    def get_exchanges(self):
        url = 'https://coins.ph/d/api/payout-outlets/'
        data = make_hmac_request(url)
        return data

    def get_exchange_fees(self):
        url = 'https://coins.ph/d/api/payout-outlet-fees/'
        data = make_hmac_request(url)
        return data

    def get_exchange_types(self):
        url = 'https://coins.ph/d/api/payin-outlet-categories/'
        _data = make_hmac_request(url)
        for i in _data['payin-outlet-categories']:
            print i['name']

    def create_wallet(self, user, data):
        url = 'https://coins.ph/api/v2/user'
        # url = 'https://sandbox.coins.ph/api/v2/user'
        body = {
            'email': data['email'],
            'password': data['password'],
            'api_key': 'unZUljzAcdFEeWJzX9WfhwdBgjtBVzKEklsd5AkT'
        }

        data = make_hmac_request(url, body)
        if data['success']:
            access_token = data['user']['access_token']
            wallet_id = data['user']['client_id']
            refresh_token = data['user']['refresh_token']
            expires_at = data['user']['expires_at']
            wallet = Wallet.objects.get(user_id=user)
            wallet.access_token = access_token
            wallet.wallet_id = wallet_id
            wallet.refresh_token = refresh_token
            wallet.expires_at = expires_at
            wallet.save()
        return data



currency = ["BTC", "CLP", "PBTC"]

API_KEY = settings.COINS_API_KEY  # Replace this with your API Key
API_SECRET = settings.COINS_SECRET  # Replace this with your API secret


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
    user = Wallet.objects.filter(user_id=user)
    if user.expires_at > time.time():
        return user.access_token

    url = 'https://coins.ph/user/api/authorize'
    # 'client_id': user.wallet_id,
    params = {
        'client_id': 'unZUljzAcdFEeWJzX9WfhwdBgjtBVzKEklsd5AkT',
        'response_type': 'code',
        'redirect_uri': 'https://haedrian.io'
    }
    requests.get(url, params=params)
