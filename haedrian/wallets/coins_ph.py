__author__ = 'audakel'
from wallet import BaseWallet
from haedrian import my_hmac
import requests


class CoinsPhWallet(BaseWallet):
    def get_user_wallet_handel(self):
        return coinsph_wallet_info()

    def get_pending_balance(self):
        pass

    def __init__(self, user):
        super(CoinsPhWallet, self).__init__(user)

    def send_to_user(self, user, amount_btc, address):
        url = 'https://coins.ph/api/v3/transfers'
        nonce = my_hmac.get_nonce()
        body = {
            'amount': amount_btc,
            'account': user,
            'target_address': address
        }
        signature = my_hmac.sign_request(url, nonce, body)
        headers = {
            'ACCESS_SIGNATURE': signature,
            'ACCESS_KEY': my_hmac.API_KEY,
            'ACCESS_NONCE': nonce,
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
        response = requests.post(url, headers=headers, data=body)
        #TODO handle errors here - raise exceptions
        # if response
        #
        # return

    def send_to_address(self, address, amount_btc):
        self.user

    def get_balance(self):
        pass

    def get_address(self):
        pass





def coinsph_wallet_info(body):
    url = 'https://coins.ph/api/v3/crypto-accounts'
    nonce = my_hmac.get_nonce()
    signature = my_hmac.sign_request(url, nonce)

    headers = {
        'ACCESS_SIGNATURE': signature,
        'ACCESS_KEY': my_hmac.API_KEY,
        'ACCESS_NONCE': nonce,
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    }

    data = requests.get(url, headers=headers)
    import pdb; pdb.set_trace()
    return data


def coinsph_send(url):
    nonce = my_hmac.get_nonce()
    body = {
        'amount': 0.5,
        'account': '2r45ab4',
        'target_address': 'audakel@gmail.com'
    }
    signature = my_hmac.sign_request(url, nonce, body)

    headers = {
        'ACCESS_SIGNATURE': signature,
        'ACCESS_KEY': my_hmac.API_KEY,
        'ACCESS_NONCE': nonce,
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    }
    return headers


def coinsph_exchanges(url):
    nonce = my_hmac.get_nonce()
    signature = my_hmac.sign_request(url, nonce)
    headers = {
        'ACCESS_SIGNATURE': signature,
        'ACCESS_KEY': my_hmac.API_KEY,
        'ACCESS_NONCE': nonce,
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    }
    return headers