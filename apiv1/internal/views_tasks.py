import importlib
from celery import shared_task
from django.conf import settings
from django.contrib.auth import get_user_model
from django.db import DatabaseError
from money import Money
from apiv1.external.mifosx import mifosx_api
from apiv1.models import VerifyPerson
from haedrian.models import Wallet, Transaction, UserData

__author__ = 'audakel'


def _get_history(user, kwargs):
    wallet = get_temp_wallet(user)
    data = wallet.get_history(kwargs)
    if data['success']:
        # TODO: fix double wallet issue.... find out what currecny wallet they want
        # currency = Wallet.objects.filter(user=user).currency
        currency = "PHP"
        transactions = []
        for transaction in data['transactions']:
            transactions.append(dict({
                'status': transaction['status'],
                'fee_amount': transaction['fee_amount'],
                'entry_type': transaction['entry_type'],
                'date': transaction['date'],
                'id': transaction['id'],
                'amount': transaction['amount'],
                'original_target': transaction['original_target'],
                'original_sender': transaction['original_sender'],
                'currency': currency
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


def add_transaction(user, receiver, amount, currency, group_id=''):
    if group_id:
        # Group payment
        members = VerifyPerson.objects.filter(group=group_id)
        # TODO:: DB rollback
        for member in members:
            amount_btc = Money(amount=member.amount, currency=currency).to('BTC')
            amount_fee = amount_btc * settings.FEE_AMOUNT
            total_sent = amount_btc - amount_fee
            total_sent_local = Money(amount=total_sent.amount, currency='BTC').to(currency)
            fee_local = Money(amount=amount_fee.amount, currency='BTC').to(currency)

            transaction = Transaction(sender=UserData.objects.get(app_internal_id=member.personal_id).id,
                                      receiver=get_user_model().object.get(username='mentors_international'),
                                      amount_btc=total_sent.amount,
                                      amount_btc_currency='BTC',
                                      amount_local=total_sent_local.amount,
                                      amount_local_currency=total_sent_local.currency)
            try:
                transaction.save()
            except DatabaseError as e:
                return {"success": False, "error": e.message}

            repay_outstanding_loan({
                'clientId': UserData.objects.get(user_id=member.personal_id).app_internal_id,
                'transactionId': transaction.id
            })

    else:
        amount_btc = Money(amount=amount, currency=currency).to('BTC')
        amount_fee = amount_btc * settings.FEE_AMOUNT
        total_sent = amount_btc - amount_fee
        total_sent_local = Money(amount=total_sent.amount, currency='BTC').to(currency)
        fee_local = Money(amount=amount_fee.amount, currency='BTC').to(currency)
        transaction = Transaction(sender=user,
                                  receiver=receiver,
                                  amount_btc=total_sent.amount,
                                  amount_btc_currency='BTC',
                                  amount_local=total_sent_local.amount,
                                  amount_local_currency=total_sent_local.currency,
                                  type='REPAYMENT')
        try:
            transaction.save()
        except DatabaseError as e:
            return {"success": False, "error": e.message}

        repay_outstanding_loan({
                # TODO :: whats up with external vs internal? need to choose which to use
                'clientId': UserData.objects.get(user_id=user).app_external_id,
                'transactionId': transaction.id
            })

    # ret_val = wallet.lsend(haedrian_account, round(amount_fee.amount, 8), send_data.data['target_address'])
    # if ret_val['success']:
    # fee = Transaction(sender=sender, receiver=haedrian_account,
    # amount_btc=amount_fee.amount, amount_btc_currency='BTC',
    #                       amount_local=fee_local.amount, amount_local_currency=fee_local.currency)
    #     try:
    #         fee.save()
    #     except DatabaseError as e:
    #         return {"success": False, "error": e.message}


@shared_task
def repay_outstanding_loan(json):
    """Queries the external application to see if there is an outstanding loan for this
    user and applies the money from this transaction to that loan

    :param clientId: JSON containing the internal (MIFOSX) ID to query the user by
    :param transactionId: Primary Key to look up the Transaction by
    :return: {'success': True|False, 'message': message}
    """
    id = json['clientId']
    tr = json['transactionId']
    # user = UserData.objects.get(app_interal_id=id)
    trans = Transaction.objects.get(id=tr)
    res = mifosx_api('loans/template', params='templateType=individual&clientId={}'.format(id))
    if res['success']:
        # TODO: assumed their loan is the first one
        loan_id = res['response']['productOptions'][0]['id']
        # loan_name = res['response']['productOptions'][0]['name']
        body = {
            "dateFormat": "dd MMMM yyyy",
            "locale": "en",
            "transactionDate": trans.date_modified.strftime("%d %B %Y"),
            "transactionAmount": trans.amount_local,
            "paymentTypeId": "12",
            "note": "Payment through Haedrian Labs",
        }
        res = mifosx_api('loans/{}/transactions'.format(loan_id), params={'command': 'repayment'}, body=body)
        if res['success']:
            return {'success': True, 'message': 'Paid back loan'}
    # something went wrong
    return res