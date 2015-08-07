import datetime
from django.conf import settings
from money import Money as Convert, Money
from apiv1.external.mifosx import _get_next_repayment_raw, mifosx_api
from apiv1.internal.utils import format_currency_display

__author__ = 'audakel'


def _get_next_repayment(user, data=''):
    res = _get_next_repayment_raw(user)
    if not res['success']:
        return res

    total_due = 0
    loan_repay_data = []


    for res in res['response']['pageItems']:
        loan_id = res['id']

        response = mifosx_api(
            endpoint='loans/{}'.format(loan_id),
            method='GET',
            params={'associations': 'all', 'exclude': 'guarantors'},
            baseurl=settings.MIFOSX_SERVER_URL,
            tenant="default"
        )
        res = response['response']
        periods = res['repaymentSchedule']['periods']

        due = None
        default_currency = user.userdata.default_currency
        currency = default_currency



        for i, period in enumerate(periods):
            if i == 0:
                continue
            if not period['complete']:
                due = period['dueDate']
                currency = res['currency']['code']
                default_currency = user.userdata.default_currency
                total_due += Convert(period['totalDueForPeriod'], currency).to(default_currency).amount
                break

        maturity_date = res['timeline']['expectedMaturityDate']
        loan_repay_data.append({
            'loan_id': loan_id,
            'maturity_date': datetime.date(maturity_date[0], maturity_date[1], maturity_date[2]),
            'payment_amount': Money(amount=period['totalDueForPeriod'], currency=res['currency']['code']),
        })



    # period = res['periods'][what_repayment_number]
    # due = period['dueDate']
    # currency = res['currency']['code']
    # default_currency = user.userdata.default_currency

    return {
        'success': True,
        # 'total_term_days': res['loanTermInDays'],
        'date': 0 if not due else datetime.date(due[0], due[1], due[2]),
        'amount': Convert(total_due, currency).to(default_currency).amount,
        'amount_display': format_currency_display(currency, default_currency, total_due),
        'individual_loan_data': loan_repay_data
    }