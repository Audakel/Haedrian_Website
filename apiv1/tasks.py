from celery import shared_task
from django.core.exceptions import ObjectDoesNotExist
from django.core.exceptions import MultipleObjectsReturned
from apiv1.external.mifosx import mifosx_api
from haedrian.models import UserData, Transaction


@shared_task
def fetch_mfi_client(new_user):
    """Create a link between the External Application users and our Wallet Users
    :param new_user: JSON containing the fields 'pk', 'app', 'id'
    :return: {'success': True|False, 'message': message}
    """
    if new_user['app'] == UserData.MENTORS:
        res = mifosx_api("clients/?externalId={}".format(new_user['external']))
        if res['success']:
            userdata = UserData.objects.get(pk=new_user['pk'])
            userdata.user.first_name = res['response']['firstname']
            userdata.user.last_name = res['response']['lastname']
            userdata.user.save()
            # TODO text the user to let them know they are successfully connected to Mifosx
            return {'success': True, 'message': 'User updated'}
        else:
            return {
                'success': False,
                'message': "Error: " + res['message'],
                # Unable to retrieve the client's information from the External Application.
            }

@shared_task
def repay_outstanding_loan(json):
    """Queries the external application to see if there is an outstanding loan for this
    user and applies the money from this transaction to that loan

    :param clientId: JSON containing the internal ID to query the user by
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