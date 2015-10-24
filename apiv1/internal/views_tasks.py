import importlib
from celery import shared_task
from django.conf import settings
from django.contrib.auth import get_user_model
from django.db import DatabaseError
from money import Money
from apiv1.external.mifosx import mifosx_api, _get_next_repayment_raw
from apiv1.internal.repayment import _get_next_repayment
from apiv1.models import VerifyPerson
from haedrian.models import Wallet, Transaction, UserData
import simplejson as json
from money import Money as Convert

from utils import format_currency_display, calculate_fees
import logging
logger = logging.getLogger('hotfix')


def _get_history(user, kwargs, filter_transactions=True):
    wallet = get_temp_wallet(user)
    data = wallet.get_history(kwargs)
    if data['success']:
        # TODO: fix double wallet issue.... find out what currecny wallet they want
        currency = settings.COINS_WALLET_TYPE

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
    wallets = Wallet.objects.filter(user=user, currency=settings.COINS_WALLET_TYPE)
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


    logger.debug('inside repay_outstanding_loan. id: {} , tr: {}'.format(id, tr))


    # user = UserData.objects.get(app_interal_id=id)
    trans = Transaction.objects.get(id=tr)
    loan_schedule = _get_next_repayment(get_user_model().objects.get(id=UserData.objects.get(app_id=id).user_id))
    # TODO:: Fix all the currency changing

    if loan_schedule['success']:
        loan_dates = loan_schedule['individual_loan_data']
        loan_dates.sort(key=lambda item: item['maturity_date'])

        amount_remaining = Money(amount=trans.amount_local.amount, currency=trans.amount_local.currency.code)

        for loan in loan_dates:
            loan_currency = loan['payment_amount'].currency
            localized_amount_remaining = Convert(amount_remaining.amount,
                                                 amount_remaining.currency).to(loan_currency).amount

            if localized_amount_remaining - loan['payment_amount'].amount > 0:
                amount_remaining = localized_amount_remaining - Convert(loan['payment_amount'].amount,
                                                                loan['payment_amount'].currency).to(amount_remaining.currency)
                res = _pay_back(trans, loan, loan['payment_amount'].amount)
                if not res['success']:
                    return res

            else:
                if localized_amount_remaining > 0:
                    res = _pay_back(trans, loan, localized_amount_remaining)
                    if not res['success']:
                        return res
                break

        try:
            trans.mifos_confirmed = True
            trans.save()
            return {'success': True, 'message': 'Paid back loan'}

        except Exception as e:
            return {'success': False, 'message': str(e)}


    # something went wrong
    return loan_schedule['message']


def _pay_back(trans, loan, amount):
    body = {
        "dateFormat": "dd MMMM yyyy",
        "locale": "en",
        "transactionDate": trans.date_modified.strftime("%d %B %Y"),
        "transactionAmount": amount,
        "paymentTypeId": "1",
        "note": "Payment through Haedrian Labs",
    }
    return mifosx_api(endpoint='loans/{}/transactions'.format(loan['loan_id']), user=trans.sender, method='POST', params={'command': 'repayment'}, body=json.dumps(body))


def _get_transfer_history(user, id=''):
    wallet = get_temp_wallet(user)
    data = wallet.get_transfer_history(id)
    if data['success']:
        pass
    return data
