import urlparse

import requests
from django.conf import settings


# TODO: get a new account to the API
mifosx_username = 'aquila'
mifosx_password = 'MifosxSaTeCoCeMuBu1'
# mifosx_username = 'mifos'
# mifosx_password = 'password'

def mifosx_auth(username=mifosx_username, password=mifosx_password, baseurl=settings.MIFOSX_SERVER_URL, tenant="default"):
    headers ={
        "X-Mifos-Platform-TenantId": tenant,
    }
    ssl_cert_check = not settings.DEBUG
    response = requests.post(
        urlparse.urljoin(baseurl, 'authentication?username={}&password={}'
            .format(username, password)),
        headers=headers,
        verify=ssl_cert_check,
    )
    if response.status_code == requests.codes.ok:
        data = response.json()
        return data['base64EncodedAuthenticationKey'], ''
    else:
        return False, response

def mifosx_api(endpoint, method='GET', params={}, body=None, baseurl=settings.MIFOSX_SERVER_URL, token=None, tenant="default"):
    """Make a request to the Mifosx API to get the rest of the client info that we need"""
    # TODO: add the ability for multiple tenants
    if not token:
        token, err = mifosx_auth()
    if token:
        headers = {
            "Authorization": "Basic {}".format(token),
            "X-Mifos-Platform-TenantId": tenant,
        }
        # if not 'tenantIdentifier' in params.keys():
        #     params['tenantIdentifier'] = 'default'
        ssl_cert_check = not settings.DEBUG
        if method.lower() == 'get':
            response = requests.get(
                urlparse.urljoin(baseurl, endpoint),
                # "https://mentors.haedrian.io/mifosng-provider/api/v1/clients/{}".format(data['client_id']),
                params=params,
                headers=headers,
                verify=ssl_cert_check,
            )
        elif method.lower() == 'post':
            response = requests.post(
                urlparse.urljoin(baseurl, endpoint),
                # "https://mentors.haedrian.io/mifosng-provider/api/v1/clients/{}".format(data['client_id']),
                params=params,
                headers=headers,
                verify=ssl_cert_check,
                data=body,
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