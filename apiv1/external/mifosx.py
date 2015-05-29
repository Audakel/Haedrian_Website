import requests

# TODO: get a new account to the API
mifosx_username = 'aquila'
mifosx_password = 'MifosxSaTeCoCeMuBu1'

def mifosx_auth():
    headers ={
        "X-Mifos-Platform-TenantId": "default",
    }
    response = requests.post(
        "https://mentors.haedrian.io/mifosng-provider/api/v1/authentication?username={}&password={}"
            .format(mifosx_username, mifosx_password),
        headers=headers,
    )
    if response.status_code == requests.codes.ok:
        data = response.json()
        return data['base64EncodedAuthenticationKey'], ''
    else:
        return False, response

