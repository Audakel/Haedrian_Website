__author__ = 'audakel'
from haedrian.models import Wallet
from wallet import BaseWallet
import requests
from django.conf import settings
import hashlib
import hmac
import time
import json
from haedrian.serializers import CoinsphBuySerializer
from django.contrib.auth import get_user_model

"""
# send
{
    "receiver": "mentors_international",
    "amount_local": 10,
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

# create user
{
        "username": "jmonkey1",
        "email": "jmonkey1@mailinator.com",
        "password": "password123",
        "phone": "+14105521258",
        "country": "US"
}

# buy order -- have to manualy verify email right now
{
    "currency": "PHP",
    "currency_amount": 100,
    "payment_method": "bdo_deposit",
    "target_account_id": "7049efadaf7e47d59f9b36729e2c217a"
}


{
   "currency": "PHP",
   "currency_amount": 123,
   "payment_method": "bdo_deposit",
}
"""





class CoinsPhWallet(BaseWallet):
    def buy(self, data):
        url = 'https://coins.ph/api/v2/buyorder'
        # input_data = CoinsphBuySerializer(data=data)
        # if input_data.is_valid():
        #     data = make_oauth_request(url, self.user, input_data.validated_data)
    #     return data

        _data = {
            "currency": data["currency"],
            "currency_amount": data["currency_amount"],
            "payment_method": data["payment_method"],
            "target_account_id": Wallet.objects.filter(user_id=self.user)[0].provider_wallet_id
        }
        data = make_oauth_request(url, self.user, _data)
        return data


    def __init__(self, user):
        super(CoinsPhWallet, self).__init__(user)

    def get_history(self):
        url = 'https://coins.ph/api/v3/transfers/'
        data = make_oauth_request(url, self.user)['transfers']
        return data

    def get_wallet_info(self, kwargs):
        url = 'https://coins.ph/api/v3/crypto-accounts/'
        data = make_oauth_request(url, self.user)['crypto-accounts']
        return data

    def get_pending_balance(self):
        url = 'https://coins.ph/api/v3/crypto-accounts/'
        _data = make_oauth_request(url, self.user)['crypto-accounts'][0]
        data = {
            "pending": _data['pending_balance'],
            "currency": currency[0]
        }
        return data

    def send_to_user(self, amount_btc, address):

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

    def send(self, receiver, amount_local, target_address):
        url = 'https://coins.ph/api/v3/crypto-payments/'
        user_wallet = Wallet.objects.filter(user_id=self.user)[0]
        sender_account = user_wallet.provider_wallet_id
        address = target_address

        body = {
            # 'amount': amount_local,
            'amount': float(amount_local),
            'account': sender_account,
            'target_address': address
        }

        _data = make_oauth_request(url, self.user, json.dumps(body))
        if _data['success']:
            _data = _data["crypto-payment"]
            data = {
                "status": _data['status'],
                "fee": _data['fee_amount'],
                "target": _data['target_address'],
                "amount": _data['amount'],
                "currency": currency[0],
                "success": True
            }
            return data
        else:
            return _data

    def get_balance(self, **kwargs):
        # TODO:: fix hard code
        url = 'https://coins.ph/api/v3/crypto-accounts/'
        balance = make_oauth_request(url, self.user)
        if balance['success']:
            _data = balance['crypto-accounts'][0]
            data = {
                "balance": _data['balance'],
                "pending_balance": _data['pending_balance'],
                "currency": currency[0],
                "success": True
            }
            return data
        else:
            return balance

    def get_address(self):
        url = 'https://coins.ph/api/v3/crypto-accounts/'
        _data = make_oauth_request(url, self.user)['crypto-accounts'][0]
        data = {
            "default_address": _data['default_address'],
            "currency": currency[0]
        }
        return data

    def get_exchanges(self):
        url = 'https://coins.ph/d/api/payin-outlets/'
        _data = make_oauth_request(url, self.user)["payin-outlets"]
        data = []
        for i in _data:
            if i['amount_limits'][0]['currency'] == 'PHP':
                data.append(i)
        return data

    def get_exchange_fees(self):
        url = 'https://coins.ph/d/api/payin-outlet-fees/'
        data = make_oauth_request(url, self.user)
        return data

    def get_exchange_types(self, user, data=''):
        url = 'https://coins.ph/d/api/payin-outlet-categories/'
        try:
            _data = make_oauth_request(url, user)['payin-outlet-categories']
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
            'api_key': settings.COINS_API_KEY
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
    _data = make_oauth_request(url, user)['crypto-accounts'][0]
    data = {
        'blockchain_address': _data['default_address'],
        'provider_wallet_id': _data['id']
    }
    return data


def make_oauth_request(url, user, body={}):
    user_token = get_user_token(user)
    if user_token['success']:
        TOKEN = user_token['token']
    else:
        return user_token

    nonce = int(time.time() * 1e6)

    # 'ACCESS_NONCE': nonce,
    headers = {
       'Authorization': 'Bearer {}'.format(TOKEN),
       'Content-Type': 'application/json;charset=UTF-8',
       'Accept': 'application/json'
    }

    if body:
        try:
            response = requests.post(url, headers=headers, data=body)
        except Exception as e:
            return {"success": False, "error": e.message}
    else:
        try:
            response = requests.get(url, headers=headers)
        except Exception as e:
            return {"success": False, "error": e.message}
    result = response.json()

    if response.ok and response.status_code == 200:
        result['success'] = True
        return result
    else:
        result['success'] = False
        result['error'] = response.reason
        return result

    # Use requests.get instead of POST for GET requests, without the data kwarg

def make_hmac_request(url, body=''):
    """Make a HMAC request to coins"""
    nonce = str(int(time.time() * 1e6))

    if body:
        body = json.dumps(body, separators=(',', ':'))
    message = nonce + url + body

    # Generate an hmac using the message
    signature = hmac.new(
        settings.COINS_SECRET,
        message,
        hashlib.sha256
    ).hexdigest()

    headers = {
        'ACCESS_SIGNATURE': signature,
        'ACCESS_KEY': settings.COINS_API_KEY,
        'ACCESS_NONCE': nonce,
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    }

    if body:
        try:
            response = requests.post(url, headers=headers, data=body)
        except Exception as e:
            return {"success": False, "error": e.message}
    else:
        try:
            response = requests.get(url, headers=headers)
        except Exception as e:
            return {"success": False, "error": e.message}
    result = response.json()

    if result['success'] and response.status_code == 201:
        return result
    else:
        result['success'] = False
        return result


def get_user_token(user):
    user_wallet = Wallet.objects.filter(user_id=user)[0]

    if float(user_wallet.expires_at) > time.time():
        token = user_wallet.access_token
        return {'success': True, 'token': token}

    else:
        url = 'https://coins.ph/user/oauthtoken'
        data = {
            'client_id': settings.COINS_API_KEY,
            'client_secret': settings.COINS_SECRET,
            'refresh_token': user_wallet.refresh_token,
            'grant_type': 'refresh_token',
            'redirect_uri': 'https://haedrian.io'
        }
        headers = {
            'Content-Type': 'application/x-www-form-urlencoded',
        }
        token = requests.post(url, headers=headers, params=data)

        if token.status_code == 200:
            token = token.json()
            user_wallet.expires_at = token['expires_at']
            user_wallet.access_token = token['access_token']
            user_wallet.refresh_token = token['refresh_token']
            user_wallet.save()
            return {'success': True, 'token': token['access_token']}
        return {'success': False, 'error': token.reason}



# u'{
# "token_type": "Bearer",
# "expires_at": 1432831184,
# "access_token": "ngno84UMAzi4JZWjyhEeD752nTQ0ml",
# "scope": "buyorder sellorder history wallet_history wallet_transfer user_identity",
# "refresh_token": "cUOhNtb3sndfismt2FwAbfQ2XIK6rh"}'
