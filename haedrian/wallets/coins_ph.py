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
"receiving_user":"eaffcc17b0ab42a79130e299445958fe",
"amount_btc": 0.0005,
"target_address":"12UkkQ58ksRXHzHdNzhcy4e6f8JwWGTG3H"
}

{
"email":"testingthisthingout",
"password":"testingthisthingout"
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
        url = 'https://coins.ph/api/v3/transfers/'
        body = {
            'amount': amount_btc,
            'account': user,
            'target_address': address
        }
        try:
            _data = make_request(url, body)
            data = {
                "status": _data["transfer"]['status'],
                "fee": "0.00000",
                "target": _data["transfer"]['target_address'],
                "amount": _data["transfer"]['amount'],
                "currency": currency[0]
            }
        except:
            data = _data['errors']

        return data

    def send_to_address(self, receiving_user, amount_btc,target_address):
        url = 'https://coins.ph/api/v3/crypto-payments/'
        body = {
            'amount': amount_btc,
            'account': receiving_user,
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
        print "here 2"

        url = 'https://coins.ph/api/v2/user'
        body = {
            'email': email+'@mailinator.com',
            'password': password
        }
        try:
            data = make_request(url, body)
        except:
            data = "error on make_request"
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
        response = requests.post(url, headers=headers, data=body)
    else:
        response = requests.get(url, headers=headers)
    result = response.json()
    return result