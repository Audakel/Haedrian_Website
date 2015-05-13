__author__ = 'audakel'

import requests
import my_hmac


def coinsph_wallet_info(url):
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


def coinsph_send(url):
    nonce = my_hmac.get_nonce()
    body = {
        'amount': 0.5,
        'account': '2r45ab4',
        'target_address': 'audakel@gmail.com'
    }
    signature = my_hmac.sign_request(url, nonce)

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