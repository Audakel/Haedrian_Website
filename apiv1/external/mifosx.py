import urlparse

import requests
from django.conf import settings


# TODO: get a new account to the API
# mifosx_username = 'aquila'
# mifosx_password = 'MifosxSaTeCoCeMuBu1'
mifosx_username = 'mifos'
mifosx_password = 'password'

def mifosx_auth():
    headers ={
        "X-Mifos-Platform-TenantId": "default",
    }
    ssl_cert_check = not settings.DEBUG
    response = requests.post(
        urlparse.urljoin(settings.MIFOSX_SERVER_URL, 'authentication?username={}&password={}'
            .format(mifosx_username, mifosx_password)),
        headers=headers,
        verify=ssl_cert_check,
    )
    if response.status_code == requests.codes.ok:
        data = response.json()
        return data['base64EncodedAuthenticationKey'], ''
    else:
        return False, response

def mifosx_api(endpoint, method='GET', params={}, body=None):
    """Make a request to the Mifosx API to get the rest of the client info that we need"""
    # TODO: add the ability for multiple tenants
    token, err = mifosx_auth()
    if token:
        headers = {
            "Authorization": "Basic {}".format(token),
            "X-Mifos-Platform-TenantId": "default",
        }
        # if not 'tenantIdentifier' in params.keys():
        #     params['tenantIdentifier'] = 'default'
        ssl_cert_check = not settings.DEBUG
        if method.lower() == 'get':
            response = requests.get(
                urlparse.urljoin(settings.MIFOSX_SERVER_URL, endpoint),
                # "https://mentors.haedrian.io/mifosng-provider/api/v1/clients/{}".format(data['client_id']),
                params=params,
                headers=headers,
                verify=ssl_cert_check,
            )
        elif method.lower() == 'post':
            response = requests.post(
                urlparse.urljoin(settings.MIFOSX_SERVER_URL, endpoint),
                # "https://mentors.haedrian.io/mifosng-provider/api/v1/clients/{}".format(data['client_id']),
                params=params,
                headers=headers,
                verify=ssl_cert_check,
            )
        else:
            return {'message': "Cannot send api call with method {}".format(method), 'success': False}
        if response.status_code == requests.codes.ok:
            return {'success': True, 'response': response.json()}
        else:
            return {'success': False, 'message': "Could not get user. Status code: {} | Data: {}".format(
                response.status_code, response.text
            )}
    else:
        return {'message': "Failed to authenticate with mifosx. Status code: {} | Data: {}".format(
                err.status_code, err.text
            ), 'success': False}