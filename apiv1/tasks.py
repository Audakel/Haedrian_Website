from celery import shared_task
from django.core.exceptions import ObjectDoesNotExist
from django.core.exceptions import MultipleObjectsReturned
from apiv1.external.mifosx import mifosx_api
from apiv1.models import ExternalUser
from haedrian.models import UserData

@shared_task
def match_users(new_user):
    """Create a link between the External Application users and our Wallet Users
    :param new_user: JSON containing the field 'external' where the external is the key to match on
    :return: {'success': True|False, 'message': message}
    """
    try:
        userdata = UserData.objects.get(external=new_user['external'])
        external = ExternalUser.objects.get(external=new_user['external'])
    except ObjectDoesNotExist as e:
        return {
            'success': False,
            'message': "Could not find an existing user data for the external id {}".format(new_user['external'])
        }
    except MultipleObjectsReturned as e:
        ret_val = "Multiple users have the same external id? Uh oh. Here are their ids "
        for user in UserData.objects.filter(external=new_user['external']):
            ret_val += user.id + " "
        return {'success': False, 'message': ret_val}
    external.user = userdata.user
    external.save()
    res = mifosx_api("clients/" + new_user['external'])
    if res['success']:
        userdata.user.first_name = res['response']['firstname']
        userdata.user.last_name = res['response']['lastname']
        userdata.user.save()
        # TODO text the user to let them know they are successfully connected to Mifosx
        return {'success': True, 'message': "Users {} and {} matched successfully".format(userdata, external)}
    else:
        return {
            'success': False,
            'message': "Info: " + res['message'],
            # Unable to retrieve the client's information from the External Application.
        }

@shared_task
def repay_outstanding_loan(clientId):
    pass