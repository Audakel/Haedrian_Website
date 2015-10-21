from django.conf import settings
from django.db import models


# Create your models here.
class Message(models.Model):
    from_number = models.CharField(max_length=30)
    to_number = models.CharField(max_length=30)
    message_body = models.CharField(max_length=400)
    created = models.DateTimeField(auto_now_add=True)
    from_city = models.CharField(max_length=60, blank=True)
    from_country = models.CharField(max_length=10, blank=True)

    def __str__(self):
        return self.message_body


class Signup(models.Model):
    phone_number = models.CharField(max_length=30)
    user_handle = models.CharField(max_length=100, default="")

class Depositor(models.Model):
    short_name = models.CharField(max_length=6, unique=True)
    long_name = models.CharField(max_length=40)

class PendingDeposit(models.Model):
    # time = models.DateTimeField(default=datetime.now)
    time = models.DateTimeField(auto_now_add=True)
    order_id = models.CharField(max_length=60)
    user_confirmed = models.BooleanField(default=False)
    exchange_confirmed = models.BooleanField(default=False)
    expired = models.BooleanField(default=False)
    amount = models.DecimalField(max_digits=30, decimal_places=8)
    currency = models.CharField(max_length=3, default='PHP')
    user = models.ForeignKey(settings.AUTH_USER_MODEL, null=True)

