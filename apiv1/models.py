from django.db import models
from django.contrib.auth.models import User
from haedrian.models import UserData
class VerifyGroup(models.Model):
    group_id = models.CharField(unique=True, max_length=40)
    size = models.IntegerField()
    created = models.DateTimeField(auto_now_add=True)
    buy_order_id = models.CharField(max_length=60, default="")
    buy_confirmed = models.BooleanField(default=False)
    total_payment = models.DecimalField(max_digits=30, decimal_places=10)
    # creator: Who created the group buy
    created_by = models.ForeignKey(User)
    def __str__(self):
        return self.group_id

class VerifyPerson(models.Model):
    group = models.ForeignKey(VerifyGroup)
    userdata = models.ForeignKey(UserData)
    phone = models.CharField(max_length=30)
    amount = models.DecimalField(max_digits=30, decimal_places=10)
    confirmed = models.BooleanField(default=False)

class TransactionQueue(models.Model):
    user = models.ForeignKey(User)
    sent_payment_id = models.CharField(max_length=40)
    group = models.ForeignKey(VerifyGroup, null=True)