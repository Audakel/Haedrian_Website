import re
from decimal import Decimal, ROUND_DOWN
import urlparse
from apiv1.internal.utils import format_currency_display

__author__ = 'audakel'
import hashlib
import hmac
import time
import simplejson as json

import requests
from django.conf import settings

from haedrian.models import Wallet
from wallet import BaseWallet
from apiv1.models import VerifyGroup, VerifyPerson
from money import xrates
from money import Money as Convert
xrates.install('apiv1.btc_exchange_rate.BTCExchangeBackend')


"""
GET
    get_pending_balance
    get_balance
    get_wallet_info
    get_address
    get_exchanges
    get_locations
    get_history
    get_buy_history
    get_id
    get_exchange_rate
    get_groups
    group_payment
    currency
    create_wallet
    get_exchange_fees
    get_exchange_types
    get_home_screen

POST
    send
    new_user
    buy
    group_verify




# SEND (individual or as group)
# Optional param - payment_id (include for group repayments)
{
    "send_to": "mentors_international",
    "amount_local": 10,
    "currency": "PHP",
    "send_method": "username",
    "payment_id": 23
}

# NEW USER - CREATE
# Optional params - application and app_id
{
        "username": "jmonkey1",
        "email": "jmonkey1@mailinator.com",
        "password1": "password123",
        "phone": "+14105521258",
        "country": "US",
        "application": "MENTORS",
        "app_id": 4
}

# BUY
# Common error : "This order exceeds your remaining daily limit."
# optional param - group_repayment_id include if group repayment
{
    "amount_local": 100,
    "payment_method": "bdo_deposit"
}

# GROUP VERIFY
{
    "group_id": 2,
    "group_members": [
        {
            "amount": 12,
            "id": 34,
            "phone": "+14105521082",
            "first_name": "bob"

        },
        {
            "amount": 12,
            "id": 20,
            "phone": "+14105521082",
            "first_name": "randy"

        }
    ]
}

=====================================================





{
    "email": "austin.harrison@byu.net",
    "password": "thisisaverybadpassword1",
    "api_key": "unZUljzAcdFEeWJzX9WfhwdBgjtBVzKEklsd5AkT"
}

{
    "email":"austin.harrison@byu.net",
    "password":"testingthisthingout"
}








{'username': u'bob5', 'password1': u'testestest', 'password2': u'testestest', 'country': u'US', 'phone': u'+18016905609', 'email': u'loganbentley22@gmail.com'}

{
   "currency": "PHP",
   "amount_local": 123,
   "payment_method": "bdo_deposit"
}
"""




class CoinsPhWallet(BaseWallet):
    def __str__(self):
        return "{}'s CoinsPhWallet".format(self.user)
    def __repr__(self):
        return "{}'s CoinsPhWallet".format(self.user)
    def __unicode__(self):
        return "{}'s CoinsPhWallet".format(self.user)

    def verify_buy(self, data):
        endpoint = '/api/v2/buyorder/' + data['order_id']
        url = urlparse.urljoin(settings.COINS_BASE_URL, endpoint)

        data = make_oauth_request(url, self.user, put=True, content_type=False)
        if data['success']:
            if data.get('order_id', ''):
                group = VerifyGroup.objects.filter(buy_order_id=data['order_id'])[0]
                if group:
                    group.buy_confirmed = True
        return data


    def buy(self, kwargs):
        default_currency = self.user.userdata.default_currency
        endpoint = '/api/v2/buyorder'
        url = urlparse.urljoin(settings.COINS_BASE_URL, endpoint)

        # input_data = CoinsphBuySerializer(data=data)
        # if input_data.is_valid():
        #     data = make_oauth_request(url, self.user, input_data.validated_data)
        #     return data

        group_repayment_flag = False
        if kwargs.get('group_repayment_id', "") != "":
            group_repayment_flag = True

        amount_btc = Convert(amount=kwargs["amount_local"], currency=default_currency).to('BTC')
        amount_php = Convert(amount=amount_btc.amount, currency='BTC').to('PHP')

        _data = {
            "currency": "PHP",
            "currency_amount": round(amount_php.amount, 8),
            "payment_method": kwargs["payment_method"],
            "target_account_id": Wallet.objects.filter(user_id=self.user)[0].provider_wallet_id
        }

        data = make_oauth_request(url, self.user, json.dumps(_data, separators=(',', ':'), skipkeys=True))
        if data['success']:
            data = data['order']

            instructions = data['instructions']
            pattern = re.compile("(PHP) (\d*[,.][0-9]{1,2})(?=</strong>)")
            match = pattern.search(instructions)
            php_amount = match.group(2)
            new_amount = format_currency_display('PHP', default_currency, php_amount)
            instructions = pattern.sub(new_amount, instructions)

            order = {
                "status": data['status'],
                "marked_paid_time": data['marked_paid_time'],
                "rate": data['rate'],
                "payment_outlet_name": data['payment_outlet_name'],
                "payment_method": data['payment_method'],
                "payment_outlet_title": data['payment_outlet_title'],
                "created_at": data['created_at'],
                "canceled_time": data['canceled_time'],
                "btc_released": data['btc_released'],
                "region": data['region'],
                "expiration_time": data['expiration_time'],
                "instructions": instructions,
                "wallet_address": data['wallet_address'],
                "id": data['id'],
                "btc_amount": data['btc_amount'],
                # TODO:: will it always be coming back as PHP for currency amount?
                "currency_amount": format_currency_display('PHP', default_currency, data['currency_amount'])
            }
            if group_repayment_flag:
                g = VerifyGroup.objects.filter(id=kwargs['group_repayment_id'])[0]
                g.buy_order_id = data['id']
                g.save()

            return {'success': True, 'order': order}

        return {'success': False, 'error': data.get('errors', data['error'])}


    def __init__(self, user):
        super(CoinsPhWallet, self).__init__(user)


    def buy_history(self, kwargs):

        endpoint = '/api/v2/buyorder'
        url = urlparse.urljoin(settings.COINS_BASE_URL, endpoint)

        data = make_oauth_request(url, self.user, content_type=False)
        if data['success']:
            transactions = []
            data = data['orders']
            count = 0
            default_currency = self.user.userdata.default_currency

            for transaction in data:
                instructions = transaction['instructions']
                pattern = re.compile("(PHP) (\d*[,.][0-9]{1,2})(?=</strong>)")
                match = pattern.search(instructions)
                if not match == None:
                    php_amount = match.group(2)
                    currency = match.group(1)
                    new_amount = format_currency_display(currency, default_currency, php_amount)
                    instructions = pattern.sub(new_amount, instructions)
                else:
                    php_amount = 0
                    currency = 'PHP'


                transactions.append(dict({
                    'id': transaction['id'],
                    'status': transaction['status'],
                    'outlet_title': transaction['payment_outlet_title'],
                    'created_at': transaction['created_at'],
                    'marked_paid_time': transaction['marked_paid_time'],
                    'expiration_time': transaction['expiration_time'],
                    'instructions': instructions,
                    'wallet_address': transaction['wallet_address'],
                    'btc_amount': transaction['btc_amount'],
                    'currency_amount': format_currency_display(currency, default_currency, transaction['currency_amount']),
                    'exchange_rate': transaction['rate'],
                    'currency': default_currency,

                }))
                count += 1

            return {
                'transaction_count': count,
                'success': True,
                'transactions': transactions
            }
        else:
            return data


    def get_history(self, kwargs):
        endpoint = '/api/v3/crypto-payments/'
        url = urlparse.urljoin(settings.COINS_BASE_URL, endpoint)

        if kwargs.get('id', ''):
            url += kwargs['id']
            data = make_oauth_request(url, self.user)
        else:
            data = make_oauth_request(url, self.user)
        transactions = []
        if data['success']:
            _data = data.get('crypto-payments', "")
            count = 0
            if _data:

                for transaction in _data:
                    transactions.append(dict({
                        'status': transaction['status'],
                        'fee_amount': transaction['fee_amount'],
                        'entry_type': transaction['entry_type'],
                        'date': transaction['created_at'],
                        'id': transaction['id'],
                        'amount': transaction['amount'],
                        'original_target': transaction['metadata']['original_target_address'],
                        'original_sender': transaction['metadata']['original_sender_address'],
                    }))
                    count += 1
            elif data.get('crypto-payment', ""):
                transaction = data['crypto-payment']
                transactions.append(dict({
                    'status': transaction['status'],
                    'fee_amount': transaction['fee_amount'],
                    'entry_type': transaction['entry_type'],
                    'date': transaction['created_at'],
                    'id': transaction['id'],
                    'amount': transaction['amount'],
                    'original_target': transaction['metadata']['original_target_address'],
                    'original_sender': transaction['metadata']['original_sender_address'],
                }))
                count = 1
            return {
                'transaction_count': count,
                'success': True,
                'transactions': transactions
            }
        else:
            return data

    def get_wallet_info(self, kwargs):
        endpoint = '/api/v3/crypto-accounts/'
        url = urlparse.urljoin(settings.COINS_BASE_URL, endpoint)

        data = make_oauth_request(url, self.user)
        if data['success']:
            _data = data
            data = {
                'wallets': _data['crypto-accounts'],
                'success': True
            }
        return data


    def get_pending_balance(self):
        endpoint = '/api/v3/crypto-accounts/'
        url = urlparse.urljoin(settings.COINS_BASE_URL, endpoint)

        _data = make_oauth_request(url, self.user)['crypto-accounts'][0]
        data = {
            "pending": _data['pending_balance'],
            "currency": currency[0]
        }
        return data

    def send_to_user(self, amount_btc, address):

        pass


    def send(self, receiver, currency, amount_btc, amount_local, target_address):
        endpoint = '/api/v3/crypto-payments/'
        url = urlparse.urljoin(settings.COINS_BASE_URL, endpoint)

        user_wallet = Wallet.objects.get(user_id=self.user, currency='BTC')
        body = {
            # 'amount': amount_local,
            # https://en.wikipedia.org/wiki/Rounding#Round_half_down
            # TODO:: Need to look at what the best rounding option is
            'amount': amount_btc.quantize(Decimal('.00000001'), rounding=ROUND_DOWN),
            'account': user_wallet.provider_wallet_id,
            'target_address': target_address
        }

        _data = make_oauth_request(url, self.user, json.dumps(body))

        if _data['success']:
            if _data["crypto-payment"]['status'] == 'pending':
                _data = _data["crypto-payment"]
                data = {
                    "status": _data['status'],
                    "fee": _data['fee_amount'],
                    "target": _data['target_address'],
                    "amount": _data['amount'],
                    "currency": user_wallet.currency,
                    "id": _data['id'],
                    "success": True
                }
                return data
        else:
            return _data

    def get_balance(self, kwargs):
        # TODO:: fix hard code
        endpoint = '/api/v3/crypto-accounts/'
        url = urlparse.urljoin(settings.COINS_BASE_URL, endpoint)

        balance = make_oauth_request(url, self.user)
        if balance['success']:
            # TODO:: fix crypto default to PHP instead of bitcoin
            _data = balance['crypto-accounts'][0]
            data = {
                "balance": _data['balance'],
                "pending_balance": _data['pending_balance'],
                "currency": _data['currency'],
                "success": True
            }
            return data
        else:
            return balance

    def get_address(self):
        endpoint = '/api/v3/crypto-accounts/'
        url = urlparse.urljoin(settings.COINS_BASE_URL, endpoint)

        _data = make_oauth_request(url, self.user)['crypto-accounts'][0]
        data = {
            "default_address": _data['default_address'],
            "currency": currency[0]
        }
        return data

    def get_exchanges(self, kwargs):
        # Get locations
        locations = self.get_exchange_types()
        if not locations:
            return locations

        fees = self.get_exchange_fees(kwargs)
        if not fees:
            return fees

        fee_ids = {}
        i = 0
        for id in fees:
            fee_ids[id['outlet']] = i
            i+=1

        for outlet in locations['locations']:
            for name in outlet['outlets']:
                if fee_ids.has_key(name['id']):
                    name.update({
                        'fee_info': fees[fee_ids[name['id']]]
                    })
        return locations

        # url = 'https://sandbox.coins.ph/d/api/payin-outlets/'
        #
        # _data = make_oauth_request(url, self.user)["payin-outlets"]
        # data = []
        # for i in _data:
        #     if i['amount_limits'][0]['currency'] == 'PHP':
        #         data.append(i)
        # return data


    def get_exchange_fees(self, kwargs):
        endpoint = '/d/api/payin-outlet-fees/'
        url = urlparse.urljoin(settings.COINS_BASE_URL, endpoint)
        data = make_oauth_request(url, self.user)
        if data['success']:
            outlet_fees = []
            for outlet in data["payin-outlet-fees"]:
                if outlet['currency'] == "PHP":
                    outlet_fees.append(outlet)
            
            return outlet_fees
        return data

    def get_exchange_types(self, data=''):
        endpoint = '/d/api/payin-outlet-categories/'
        url = urlparse.urljoin(settings.COINS_BASE_URL, endpoint)
        _data = make_oauth_request(url, self.user)
        # Bank, gCash, online banking, pre paid load - just for PH
        exclude_foreign = ['atm_transfer_deposit', 'online_bank_transfer_deposit', 'over_the_counter_deposit',
                           'cash_deposit_machine_deposit', 'online_bank_transfer_deposit', 'prepaid_card_deposit']
        if _data['success']:
            _data = _data['payin-outlet-categories']

            exchange_list = []
            for i in _data:
                if i['id'] not in exclude_foreign:
                    outlet_name = (i['name'].replace("_", " ").replace('-', ' ').title())
                    outlet_locations = []
                    outlet_locations_id = []

                    for outlet in i['outlets']:
                        outlet_locations.append({
                            'name': outlet.replace("_", " ").replace('-', ' ').title(),
                            'id': outlet
                        })


                    exchange_list.append(dict({'name': outlet_name, 'outlets': outlet_locations}))
            return {
                'success': True,
                'locations': exchange_list
            }
        else:
            return _data

    def create_wallet(self, user, data):
        endpoint = '/api/v2/user'
        url = urlparse.urljoin(settings.COINS_BASE_URL, endpoint)
        # url = 'https://sandbox.coins.ph/api/v2/user'
        body = {
            'email': data['email'],
            'password': data['password1'],
            'api_key': settings.COINS_API_KEY
        }
        # TODO check for duplicte emails - roll back
        _data = make_hmac_request(url, body)

        if _data['success']:
            access_token = _data['user']['access_token']
            refresh_token = _data['user']['refresh_token']
            expires_at = _data['user']['expires_at']
            wallet = Wallet.objects.get(user_id=user)
            wallet.access_token = access_token
            wallet.refresh_token = refresh_token
            wallet.expires_at = expires_at
            wallet.currency = "BTC"
            try:
                wallet.save()
            except Exception as e:
                return {
                    'error': e.message,
                    'success': False
                }

            # Make PHP wallet
            wallet2 = Wallet(user_id=user.id)
            wallet2.currency = "PHP"
            wallet2.access_token = access_token
            wallet2.refresh_token = refresh_token
            wallet2.expires_at = expires_at
            try:
                wallet2.save()
            except Exception as e:
                return {
                    'error': e.message,
                    'success': False
                }
            # TODO:: Check for false on get address
            additional_params = get_extra_wallet_info(user)
            wallet.blockchain_address = additional_params['blockchain_address']
            wallet.provider_wallet_id = additional_params['provider_wallet_id']
            wallet2.blockchain_address = additional_params['blockchain_address2']
            wallet2.provider_wallet_id = additional_params['provider_wallet_id2']
            try:
                wallet.save()
                wallet2.save()
            except Exception as e:
                return {
                    'error': e.message,
                    'success': False
                }
            return _data
        else:
            error_message = {'success': False}
            if 'error' in _data:
                error_message['error'] = _data['error']
            else:
                error_message['error'] = _data['errors']
            return error_message


currency = ["BTC", "CLP", "PBTC"]

API_KEY = settings.COINS_API_KEY  # Replace this with your API Key
API_SECRET = settings.COINS_SECRET  # Replace this with your API secret
# ==============================================================================================================================



# TODO:: fix this internal rewrite
def get_extra_wallet_info(user):

    endpoint = '/api/v3/crypto-accounts/'
    url = urlparse.urljoin(settings.COINS_BASE_URL, endpoint)
    _data = make_oauth_request(url, user)['crypto-accounts']
    data = {
        'blockchain_address': _data[0]['default_address'],
        'provider_wallet_id': _data[0]['id'],
        'blockchain_address2': _data[2]['default_address'],
        'provider_wallet_id2': _data[2]['id']
    }
    return data


def make_oauth_request(url, user, body={}, put=False, headers="", content_type=True, get_params={}):

    user_token = get_user_token(user)
    if user_token['success']:
        TOKEN = user_token['token']
    else:
        return user_token

    headers = {
        'Authorization': 'Bearer {}'.format(TOKEN),
        'Content-Type': 'application/json;charset=UTF-8',
        'Accept': 'application/json'
    }

    # Have to fix header issue with coins_ph - dif headers for dif calls
    if not content_type:
        del headers['Content-Type']

    if put:
        try:
            response = requests.put(url, headers=headers)
        except Exception as e:
            return {"success": False, "error": e.message}
    elif body:
        try:
            response = requests.post(url, headers=headers, data=body)
        except Exception as e:
            return {"success": False, "error": e.message}
    else:
        try:
            if get_params:
                params = dict({'per_page': 100}.items() + get_params.items())
            else:
                params = {'per_page': 100}
            response = requests.get(url, headers=headers, params=params)
        except Exception as e:
            return {"success": False, "error": e.message}

    result = response.json()
    if response.ok and (response.status_code == 200 or response.status_code == 201):
        result['success'] = True
        return result
    else:
        error_result = {}
        error_result['success'] = False
        try:
            error_result['error'] = result['errors']['non_field_errors']
        except:
           error_result['error'] = result.get('errors', response.reason)

        if isinstance(error_result['error'], str):
            error_result['error'] = error_result['error']
        elif isinstance(error_result['error'], dict):
            try:
                error_result['error'] = error_result['error']['target_address'][0]
            except:
                error_result['error'] = error_result['error']
        else:
            error_result['error'] = error_result['error'][0]
        return error_result

    # Use requests.get instead of POST for GET requests, without the data kwarg

def make_hmac_request(url, body=''):
    """Make a HMAC request to coins"""
    nonce = int(time.time() * 1e6)

    if body is None:
        # For GET requests
        message = str(nonce) + url
    else:
        # For POST requests
        body = json.dumps(body, separators=(',', ':'))
        message = str(nonce) + url + body
    signature = hmac.new(str(settings.COINS_SECRET), message, hashlib.sha256).hexdigest()

    headers = {
        'ACCESS_SIGNATURE': str(signature),
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
        error_result = {}
        error_result['success'] = False
        if isinstance(result['errors'], str):
            error_result['error'] = error_result['error']
        else:
            error_result['error'] = result['errors'][0]
        return error_result




def get_user_token(user):
    user_wallet = Wallet.objects.filter(user_id=user)[0]

    if float(user_wallet.expires_at) > time.time():
        token = user_wallet.access_token
        return {'success': True, 'token': token}

    else:
        endpoint = '/user/oauthtoken'
        url = urlparse.urljoin(settings.COINS_BASE_URL, endpoint)
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
