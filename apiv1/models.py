from django.conf import settings
from django.db import models
from django.contrib.auth import get_user_model



class SupportedCurrencies(models.Model):
    currency_code = models.CharField(max_length=3)
    full_name = models.CharField(max_length=40)
    def __str__(self):
        return self.full_name


class VerifyGroup(models.Model):
    # TODO:: should we allow multiple group repayments to exist at the same time for 1 group?
    # group_id = models.CharField(unique=True, max_length=40)
    group_id = models.CharField(max_length=40, null=True)
    size = models.IntegerField()
    created = models.DateTimeField(auto_now_add=True)
    buy_order_id = models.CharField(max_length=60, default="")
    buy_confirmed = models.BooleanField(default=False)
    total_payment = models.DecimalField(max_digits=30, decimal_places=10)
    # TODO:: link currencies to SupportedCurrencies
    # currency = models.ForeignKey(SupportedCurrencies, default=3)
    currency = models.CharField(max_length=3, default='USD')
    # creator: Who created the group buy
    created_by = models.ForeignKey(settings.AUTH_USER_MODEL)
    def __str__(self):
        return self.group_id

class VerifyPerson(models.Model):
    group = models.ForeignKey(VerifyGroup)
    mifos_id = models.CharField(max_length=50, default=1)
    phone = models.CharField(max_length=30)
    amount = models.DecimalField(max_digits=30, decimal_places=10)
    confirmed = models.BooleanField(default=False)




