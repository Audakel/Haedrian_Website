__author__ = 'audakel'
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
    "password": "thisisaverybadpassword",
    "phone": "4105521220",
    "country": "US"
}
"""
class CoinsPhWallet(BaseWallet):
    def __init__(self, user):
        super(CoinsPhWallet, self).__init__(user)

    def get_user_wallet_handel(self):
        url = 'https://coins.ph/api/v3/crypto-accounts/'
        data = make_request(url)
        return data['crypto-accounts'][0]['id']

    def get_pending_balance(self):
        url = 'https://coins.ph/api/v3/crypto-accounts/'
        _data = make_request(url)['crypto-accounts'][0]
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

    def send_to_address(self, receiver, amount_local,target_address):
        url = 'https://coins.ph/api/v3/crypto-payments/'
        body = {
            'amount': amount_local,
            'account': receiver,
            'target_address': target_address
        }
        try:
            # import pdb; pdb.set_trace()
            _data = make_request(url, body)
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

    def get_balance(self):
        url = 'https://coins.ph/api/v3/crypto-accounts/'
        _data = make_request(url)['crypto-accounts'][0]
        data = {
            "balance": _data['balance'],
            "pending_balance": _data['pending_balance'],
            "currency": currency[0]
        }
        return data

    def get_address(self):
        url = 'https://coins.ph/api/v3/crypto-accounts/'
        _data = make_request(url)['crypto-accounts'][0]
        data = {
            "default_address": _data['default_address'],
            "currency": currency[0]
        }
        return data

    def get_exchanges(self):
        url = 'https://coins.ph/d/api/payout-outlets/'
        data = make_request(url)
        return data

    def create_wallet(self, email, password):

        # url = 'https://coins.ph/api/v2/user'
        url = 'https://sandbox.coins.ph/api/v2/user'
        body = {
            'email': email,
            'password': password,
            'api_key': 'unZUljzAcdFEeWJzX9WfhwdBgjtBVzKEklsd5AkT'
        }
        try:
            data = make_request(url, body)
        except Exception as e:
            return e.message
        return data



currency = ["BTC", "CLP", "PBTC"]

API_KEY = settings.COINS_API_KEY  # Replace this with your API Key
API_SECRET = settings.COINS_SECRET  # Replace this with your API secret


def make_request(url, body=''):
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
