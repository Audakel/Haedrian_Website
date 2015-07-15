import importlib
from celery import shared_task
from django.conf import settings
from django.contrib.auth import get_user_model
from django.db import DatabaseError
from money import Money
from apiv1.external.mifosx import mifosx_api
from apiv1.models import VerifyPerson
from haedrian.models import Wallet, Transaction, UserData
import simplejson as json
from money import Money as Convert

from utils import format_currency_display, calculate_fees

__author__ = 'audakel'


def _get_history(user, kwargs, filter_transactions=True):

    wallet = get_temp_wallet(user)
    data = wallet.get_history(kwargs)
    if data['success']:
        # TODO: fix double wallet issue.... find out what currecny wallet they want
        # TODO: this is f**** important to fix
        # currency = Wallet.objects.filter(user=user).currency
        currency = "BTC"

        default_currency = user.userdata.default_currency

        transactions = []
        mfi = get_user_model().objects.get(username='mentors_international')
        mfi_address = Wallet.objects.get(user_id=mfi, currency=settings.COINS_WALLET_TYPE).blockchain_address

        haedrian = get_user_model().objects.get(username='haedrian')
        haedrian_address = Wallet.objects.get(user_id=haedrian, currency=settings.COINS_WALLET_TYPE).blockchain_address


        for transaction in data['transactions']:
            original_target = transaction['original_target']
            original_sender = transaction['original_sender']

            # Change blockchain address to name of MFI
            if original_target == mfi_address:
                original_target = mfi.username

            # Don't show haedrian payment in history
            # show rules If filter
            show_transaction = not filter_transactions or (transaction['original_target'] != haedrian_address or user == haedrian)

            if show_transaction:
                transactions.append(dict({
                    'status': transaction['status'],
                    'fee_amount': format_currency_display(currency, default_currency, transaction['fee_amount']),
                    'entry_type': transaction['entry_type'],
                    'date': transaction['date'],
                    'id': transaction['id'],
                    'amount_display': format_currency_display(currency, default_currency, transaction['amount']),
                    'amount': Convert(transaction['amount'], currency).to(default_currency).amount,
                    'original_target': original_target,
                    'original_sender': original_sender,
                    'currency': default_currency
                }))
        return {
            'transaction_count': data['transaction_count'],
            'success': True,
            'transactions': transactions
        }
    else:
        return data


def get_temp_wallet(user):
    wallets = Wallet.objects.filter(user=user, currency="BTC")
    # TODO:: turn on PHP wallets instead of BTC
    wallet = wallets[0]
    wallet_class = Wallet.WALLET_CLASS[wallet.type]
    p, m = wallet_class.rsplit('.', 1)

    mod = importlib.import_module(p)
    met = getattr(mod, m)

    return met(user)


@shared_task
def repay_outstanding_loan(_json):
    """Queries the external application to see if there is an outstanding loan for this
    user and applies the money from this transaction to that loan

    :param clientId: JSON containing the internal (MIFOSX) ID to query the user by
    :param transactionId: Primary Key to look up the Transaction by
    :return: {'success': True|False, 'message': message}
    """
    id = _json['clientId']
    tr = _json['transactionId']
    # user = UserData.objects.get(app_interal_id=id)
    trans = Transaction.objects.get(id=tr)
    res = mifosx_api('loans/', params={"sqlSearch": "l.client_id={}".format(id)})

    if res['success']:
        # TODO: assumed their loan is the first one
        loan_id = res['response']['pageItems'][0]['id']
        # loan_name = res['response']['productOptions'][0]['name']
        body = {
            "dateFormat": "dd MMMM yyyy",
            "locale": "en",
            "transactionDate": trans.date_modified.strftime("%d %B %Y"),
            "transactionAmount": trans.amount_local.amount,
            "paymentTypeId": "1",
            "note": "Payment through Haedrian Labs",
        }
        res = mifosx_api('loans/{}/transactions'.format(loan_id), params={'command': 'repayment'}, body=json.dumps(body), method='POST')

        if res['success']:
            return {'success': True, 'message': 'Paid back loan'}
    # something went wrong
    return res['message']