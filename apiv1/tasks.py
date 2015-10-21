from collections import namedtuple
import urlparse
from datetime import timedelta, datetime
from django.conf import settings
import requests
from celery import shared_task
from django.contrib.auth import get_user_model
from money import Money as Convert
import logging

from celery.utils.log import get_task_logger
from apiv1.internal.utils import calculate_fees

logger = get_task_logger(__name__)

from apiv1.external.mifosx import mifosx_api
from haedrian.models import UserData, Transaction, Wallet
from apiv1.models import VerifyPerson, VerifyGroup
from Haedrian_Website.celery import app
from apiv1.internal.views_tasks import _get_history, repay_outstanding_loan


@app.task
def update_coins_token():
    wallets = Wallet.objects.filter(type=Wallet.COINS_PH,
                                    expires_at__lte=datetime.now() + timedelta(hours=4, minutes=10))
    btc_wallets = wallets.filter(currency='BTC')
    php_wallets = wallets.filter(currency='PHP')

    for btc_wallet in btc_wallets:
        endpoint = '/user/oauthtoken'
        url = urlparse.urljoin(settings.COINS_BASE_URL, endpoint)
        data = {
            'client_id': settings.COINS_API_KEY,
            'client_secret': settings.COINS_SECRET,
            'refresh_token': btc_wallet.refresh_token,
            'grant_type': 'refresh_token',
            'redirect_uri': 'https://haedrian.io'
        }

        token = requests.post(url, data=data)

        # token.raise_for_status()
        if token.status_code == 200:
            logger.info('Updating wallet for: {}'.format(btc_wallet.user_id))
            token = token.json()
            btc_wallet.expires_at = datetime.fromtimestamp(token['expires_at'])
            btc_wallet.access_token = token['access_token']
            btc_wallet.refresh_token = token['refresh_token']
            btc_wallet.save()

            php_wallet = php_wallets.get(user_id=btc_wallet.user_id)
            php_wallet.expires_at = datetime.fromtimestamp(token['expires_at'])
            php_wallet.access_token = token['access_token']
            php_wallet.refresh_token = token['refresh_token']
            php_wallet.save()
        else:
            try:
                logger.info('Cant update coins token. user: {}-{}'.format(
                    get_user_model().objects.get(id=btc_wallet.user_id),
                    btc_wallet.user_id))
            except Exception as e:
                logger.info('Coins error: {}'.format(str(e)))


@app.task
def verify_send_que():
    # TODO:: Redo code duplication below and maybe create transaction somewhere else?
    transactions = Transaction.objects.filter(mifos_confirmed=False)
    for transaction in transactions:
        history = _get_history(transaction.sender, {'id': transaction.sent_payment_id}, filter_transactions=False)

        if history['success'] and history['transactions'][0]['status'] == 'success':
            transaction.payment_confirmed = True
            transaction.save()

            if not transaction.type == Transaction.FEE:
                if transaction.group:
                    group = transaction.group

                    members = VerifyPerson.objects.filter(group_id=group)
                    for member in members:
                        calc_fees = calculate_fees(transaction.amount_local_currency, member.amount)

                        # TODO:: FIX receiver from being hardcoded
                        mfi_transaction = Transaction(sender=UserData.objects.get(app_id=member.mifos_id).user,
                                                      receiver=get_user_model().objects.get(username='mentors_international'),
                                                      amount_btc=calc_fees['amount_btc'].amount,
                                                      amount_local=member.amount,
                                                      amount_local_currency=transaction.amount_local_currency,
                                                      sent_payment_id=transaction.sent_payment_id,
                                                      group=group)
                        try:
                            mfi_transaction.save()
                        except Exception as e:
                            return {'success': False, 'error': str(e)}

                        repay_outstanding_loan({
                            'clientId': member.mifos_id,
                            'transactionId': mfi_transaction.id
                        })

                    VerifyGroup.objects.filter(id=group.id).update(send_confirmed=True)

                else:
                    userdata = UserData.objects.filter(user=transaction.sender)[0]
                    try:
                        verify_group = VerifyGroup(size=1,
                                                   buy_order_id=transaction.sent_payment_id,
                                                   buy_confirmed=True,
                                                   total_payment=history['transactions'][0]['amount'],
                                                   currency=userdata.default_currency,
                                                   created_by=userdata.user)

                        verify_group.save()
                        verify_person = VerifyPerson(group=verify_group,
                                                     mifos_id=userdata.app_id,
                                                     phone=userdata.phone,
                                                     amount=history['transactions'][0]['amount'])
                        verify_person.save()
                    except Exception as e:
                        return {'success': False, 'error': str(e)}

                    group = verify_group
                    members = VerifyPerson.objects.filter(group_id=group)
                    for member in members:
                        repay_outstanding_loan({
                            'clientId': member.mifos_id,
                            'transactionId': transaction.id
                        })
                    VerifyGroup.objects.filter(id=group.id).update(send_confirmed=True)


@shared_task
def fetch_mfi_client(new_user):
    """Create a link between the External Application users and our Wallet Users
    :param new_user: JSON containing the fields 'pk', 'app', 'id'
    :return: {'success': True|False, 'message': message}
    """

    if new_user['app'] == UserData.MENTORS:
        res = mifosx_api("clients/?externalId={}".format(new_user['id']))
        if res['success']:
            userdata = UserData.objects.get(pk=new_user['pk'])
            if not res['response']['pageItems']:
                return {"success": False, "message": "Could not find user with id {}".format(new_user['id'])}
            r = res['response']['pageItems'][0]
            userdata.user.first_name = r['firstname']
            userdata.user.last_name = r['lastname']
            userdata.app_id = res['response']['id']
            userdata.user.save()
            # TODO text the user to let them know they are successfully connected to Mifosx
            return {'success': True, 'message': 'User updated'}
        else:
            return {
                'success': False,
                'message': "Error: " + res['message'],
                # Unable to retrieve the client's information from the External Application.
            }
    '''
    Moved repay_outstanding_loan due to circular dependency
    '''


# def repay_outstanding_loan(json):
# """Queries the external application to see if there is an outstanding loan for this
# user and applies the money from this transaction to that loan
#
#     :param clientId: JSON containing the internal (MIFOSX) ID to query the user by
#     :param transactionId: Primary Key to look up the Transaction by
#     :return: {'success': True|False, 'message': message}
#     """
#     id = json['clientId']
#     tr = json['transactionId']
#     # user = UserData.objects.get(app_interal_id=id)
#     trans = Transaction.objects.get(id=tr)
#     res = mifosx_api('loans/template', params='templateType=individual&clientId={}'.format(id))
#     if res['success']:
#         # TODO: assumed their loan is the first one
#         loan_id = res['response']['productOptions'][0]['id']
#         # loan_name = res['response']['productOptions'][0]['name']
#         body = {
#             "dateFormat": "dd MMMM yyyy",
#             "locale": "en",
#             "transactionDate": trans.date_modified.strftime("%d %B %Y"),
#             "transactionAmount": trans.amount_local,
#             "paymentTypeId": "12",
#             "note": "Payment through Haedrian Labs",
#         }
#         res = mifosx_api('loans/{}/transactions'.format(loan_id), params={'command': 'repayment'}, body=body)
#         if res['success']:
#             return {'success': True, 'message': 'Paid back loan'}
#     # something went wrong
#     return res


@shared_task
def get_group_members(user):
    """Queries the external application to see if there is a group associated with
        the user and if so returns the group and info on the members

    :param clientId: JSON containing the internal (MIFOSX) ID to query the user by
    :return: {'success': True|False, 'message': message}
    """
    id = UserData.objects.get(user_id=user).app_id
    if id == None:
        return {
            'success': True,
            'group_id': 'Not in a group',
            'office': 'Unknown office',
            'group_members': []
        }
    # user = UserData.objects.get(app_interal_id=id)

    client = mifosx_api('clients/{}'.format(id), user=user)
    if not client['success'] and not client['response']['groups']:
        return "Failed. Could not find a group for client with id {}".format(id)
    groups = client['response']['groups']

    # TODO:: fix dis shiz (assuming that clients can only be in one group....)
    if len(groups) == 0:
        return {
            'success': True,
            'group_id': 'Not in a group',
            'office': 'Not a group member',
            'group_members': []
        }

    group = groups[0]
    res = mifosx_api('groups/{}'.format(group['id']), params='associations=activeClientMembers&clientId={}'.format(id), user=user)
    if res['success']:
        group = []
        acm = res['response']['activeClientMembers']
        for person in acm:
            group.append({
                "first_name": person['firstname'],
                "middle_name": person.get('middlename', ''),
                "last_name": person['lastname'],
                "phone": person.get('mobileNo', ""),
                "mifos_id": person['id']
            })

    return {
        'success': True,
        'group_id': res['response']['id'],
        'office': res['response']['officeName'],
        'group_members': group
    }
