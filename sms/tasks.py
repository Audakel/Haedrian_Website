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

        if balance['_balance'] > 0:
            p.exchange_confirmed = True
            res = _send({
                "send_to": p.user.userdata.application,
                "amount_local": balance['_balance'],
                "send_method": "username"
            })

        # Older than a day
        if (p.time < timezone.now()-datetime.timedelta(days=1)) and p.exchange_confirmed is False:
            p.expired = True

        try:
            p.save()
        except Exception as e:
            return {'success': False, 'error': e}

