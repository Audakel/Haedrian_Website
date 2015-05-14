__author__ = 'audakel'
from wallet import BaseWallet
import requests
from django.conf import settings
import hashlib
import hmac
import time
import json
"""
{
"receiving_user":"",
"amount_btc":"",
"target_address":""
}
"""
class CoinsPhWallet(BaseWallet):
    def __init__(self, user):
        super(CoinsPhWallet, self).__init__(user)

    def get_user_wallet_handel(self):
        return coinsph_wallet_info()

    def get_pending_balance(self):
        url = 'https://coins.ph/api/v3/crypto-accounts/'
        data = make_request(url)['crypto-accounts']
        return data

    def send_to_user(self, user, amount_btc, address):
        url = 'https://coins.ph/api/v3/transfers/'
        body = {
            'amount': .0005,
            'account': 'eaffcc17b0ab42a79130e299445958fe',
            'target_address': "12UkkQ58ksRXHzHdNzhcy4e6f8JwWGTG3H"
        }
        data = make_request(url, body)
        return data


    def send_to_address(self, receiving_user, amount_btc,target_address):
        url = 'https://coins.ph/api/v3/crypto-payments/'
        body = {
            'amount': .0005,
            'account': 'eaffcc17b0ab42a79130e299445958fe',
            'target_address': "12UkkQ58ksRXHzHdNzhcy4e6f8JwWGTG3H"
        }
        data = make_request(url, body)
        return data

    def get_balance(self):
        url = 'https://coins.ph/api/v3/crypto-accounts/'
        data = make_request(url)['crypto-accounts']
        return data

    def get_address(self):
        url = 'https://coins.ph/api/v3/crypto-accounts/'
        data = make_request(url)['crypto-accounts']
        return data

    def get_exchanges(self):
        url = 'https://coins.ph/d/api/payout-outlets/'
        data = make_request(url)
        return data


def coinsph_wallet_info():
    url = 'https://coins.ph/api/v3/crypto-accounts/'
    data = make_request(url)['crypto-accounts']
    return data


def coinsph_send(url):
    nonce = get_nonce()
    body = {
        'amount': 0.5,
        'account': '2r45ab4',
        'target_address': 'audakel@gmail.com'
    }
    signature = sign_request(url, nonce, body)

    headers = {
        'ACCESS_SIGNATURE': signature,
        'ACCESS_KEY': API_KEY,
        'ACCESS_NONCE': nonce,
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    }
    return headers


def coinsph_exchanges(url):
    nonce = get_nonce()
    signature = sign_request(url, nonce)
    headers = {
        'ACCESS_SIGNATURE': signature,
        'ACCESS_KEY': API_KEY,
        'ACCESS_NONCE': nonce,
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    }
    return headers



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