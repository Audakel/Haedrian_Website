import urlparse
from money import Money as Convert
import requests
from django.conf import settings
from apiv1.internal.utils import format_currency_display
from haedrian.models import UserData


# TODO: get a new account to the API
mifosx_username = 'aquila'
mifosx_password = 'MifosxSaTeCoCeMuBu1'

# mifosx_username = 'mifos'
# mifosx_password = 'password'

def mifosx_loan(user):
    params = {"sqlSearch": "l.client_id={}".format(UserData.objects.get(user=user).app_id)}
    loan = mifosx_api('loans/', params=params)
    loans = []
    if loan['success']:
        loan = loan['response']['pageItems']
        missing = 'missing'
        default_currency = user.userdata.default_currency

        for l in loan:
            if not l['status']['active']:
                return {'success': False, 'error': 'Loan not active - {}'.format(l['status']['value'])}

            # Get main display numbers for home screen
            currency = l['currency'].get('code', missing)
            starting_balance_display = format_currency_display(currency, default_currency, l['summary'].get(
                'principalDisbursed', -1))
            current_balance_display = format_currency_display(currency, default_currency, l['summary'].get(
                'totalOutstanding', -1))
            loan_cost_display = format_currency_display(currency, default_currency, l['summary'].get(
                'totalExpectedCostOfLoan', -1))

            # For home screen display - due to size constraints remove decimal places from display
            if current_balance_display[len(current_balance_display)-3] == '.':
                current_balance_display = current_balance_display[:-3]
            if starting_balance_display[len(starting_balance_display)-3] == '.':
                starting_balance_display = starting_balance_display[:-3]
            if loan_cost_display[len(loan_cost_display)-3] == '.':
                loan_cost_display = loan_cost_display[:-3]

            # For graphs - use actual converted currency w/o formatting
            starting_balance = Convert(amount=l['summary'].get('principalDisbursed', -1),currency=currency).to(default_currency).amount
            current_balance = Convert(amount=l['summary'].get('totalOutstanding', -1),currency=currency).to(default_currency).amount
            total_estimated_loan_cost = Convert(amount=l['summary'].get('totalExpectedCostOfLoan', -1),currency=currency).to(default_currency).amount

            # Other general formating
            total_overdue = format_currency_display(currency, default_currency, l['summary'].get('totalOverdue', -1))

            # Prepare JSON to send
            loans.append({
                'starting_balance_display': starting_balance_display,
                'starting_balance': starting_balance,
                'current_balance_display': current_balance_display,
                'current_balance': current_balance,
                'total_estimated_loan_cost_display': loan_cost_display,
                'total_estimated_loan_cost': total_estimated_loan_cost,
                'loan_id': l.get('id', -1),
                'currency': default_currency,
                'repay_every': l.get('repaymentEvery', -1),
                'loan_descriptor': l.get('loanProductDescription', missing),
                'interest_rate': l.get('interestRatePerPeriod', missing),
                'number_of_repayments': l.get('numberOfRepayments', missing),
                'interest_frequency': l['interestRateFrequencyType'].get('value', missing),
                'repay_time_unit': l['repaymentFrequencyType'].get('value', missing),
                'total_overdue': total_overdue,
            })

    return {'success': True, 'loans': loans}

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
            try:
                response = requests.post(
                    urlparse.urljoin(baseurl, endpoint),
                    # "https://mentors.haedrian.io/mifosng-provider/api/v1/clients/{}".format(data['client_id']),
                    params=params,
                    headers=headers,
                    verify=ssl_cert_check,
                    data=body,
                )
            except Exception as e:
                return e.message
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
