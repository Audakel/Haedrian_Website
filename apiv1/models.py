from django.db import models
from django.contrib.auth.models import User
from django_countries.fields import CountryField
from djmoney.models.fields import MoneyField
from django.utils.translation import ugettext as _
from datetime import datetime

# class MifosxData(models.Model):
#     user = models.ForeignKey(ExternalUser, unique=True, related_name='mifosx_data')
#     resourceId = models.IntegerField(blank=False)
#     officeId = models.IntegerField(blank=True, null=True)
#     groupId = models.IntegerField(blank=True, null=True)
#     clientId = models.IntegerField(blank=True, null=True)
#     loanId = models.IntegerField(blank=True, null=True)
#     savingsId = models.IntegerField(blank=True, null=True)
#     productId = models.IntegerField(blank=True, null=True)
#     subResourceId = models.IntegerField(blank=True, null=True)
#     # changes = new HashMap<>()
#     transactionId = models.CharField(max_length=50, blank=True, default='')
#     resourceIdentifier = models.CharField(max_length=50, blank=True, default='')

class VerifyGroup(models.Model):
    group_id = models.CharField(unique=True, max_length=40)
    size = models.IntegerField()
    created = models.DateTimeField(auto_now_add=True)
    buy_order_id = models.CharField(max_length=60, default="")
    buy_confirmed = models.BooleanField(default=False)

    def __str__(self):
        return self.group_id

class VerifyPerson(models.Model):
    group = models.ForeignKey(VerifyGroup)
    personal_id = models.CharField(max_length=40)
    phone = models.CharField(max_length=30)
    amount = models.DecimalField(max_digits=30, decimal_places=10)
    confirmed = models.BooleanField(default=False)
