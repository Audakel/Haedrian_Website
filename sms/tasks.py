import datetime
from django.utils import timezone
from apiv1.internal.views import _get_balance, _send
from sms.models import PendingDeposit
from Haedrian_Website.celery import app


@app.task
def exchange_confirmed_checker():
    pending = PendingDeposit.objects.filter(user_confirmed=True, exchange_confirmed=False, expired=False)
    for p in pending:
        balance = _get_balance(p.user)
        if not balance['success']:
            continue

        if balance['_balance'] >= p.amount:
            res = _send(p.user, {
                "send_to": p.user.userdata.application,
                "amount_local": p.amount,
                'currency': p.currency,
                "send_method": "username"
            })

            if res['success']:
                p.exchange_confirmed = True
        else:
            return {'success': False, 'error': 'Not enough funds. Trying to send {}, but you only have {} : ('.format(
                p['amount'], balance['_balance'])}
        # Older than a day
        if (p.time < timezone.now()-datetime.timedelta(days=3)) and p.exchange_confirmed is False:
            p.expired = True

        try:
            p.save()
        except Exception as e:
            return {'success': False, 'error': e}

