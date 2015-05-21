from django.db import models
from django.contrib.auth.models import User
from django_countries.fields import CountryField
from djmoney.models.fields import MoneyField

# from mptt.models import MPTTModel, TreeForeignKey

class BetaApplicant(models.Model):
    name = models.CharField(max_length=255)
    email = models.EmailField()
    country = CountryField(blank_label='(Country)')
    reason = models.TextField()

# stores app specific data about a user
class UserData(models.Model):
    user = models.OneToOneField(User, primary_key=True)
    phone = models.CharField(max_length=15)
    credit_score = models.IntegerField(max_length=4, default=0)

    sms_balance = models.DecimalField(max_digits=12, decimal_places=4, default=0)
    # handle is the same thing as username
    # handle = models.CharField(max_length=50)
    country = CountryField(blank_label='(Country)')
    default_currency = models.CharField(max_length=4, default='USD')
#
# class Node(MPTTModel):
#     name = models.CharField(max_length=50, unique=True)
#     parent = TreeForeignKey('self', null=True, blank=True, related_name='children', db_index=True)
#     def __str__(self):
#         return self.name
#     def __repr__(self):
#         return self.name
#     def __unicode__(self):
#         return self.name
#     class Meta:
#         verbose_name = "Organization"
#     class MPTTMeta:
#         order_insertion_by = ['name']


# TODO hook into the new backend
class Organization(models.Model):
    pass


from haedrian.wallets.coins_ph import CoinsPhWallet
from haedrian.wallets.gem import GemWallet
from haedrian.wallets.test_wallet import TestWallet


class Wallet(models.Model):
    COINS_PH = 'CH'
    GEM = 'GM'
    SELF = 'SE'
    TEST = 'TS'
    WALLET_CLASS = {
        COINS_PH: CoinsPhWallet,
        GEM: GemWallet,
        SELF: TestWallet,
        TEST: TestWallet,
    }
    WALLET_TYPE= (
        (COINS_PH, 'Coins.ph'),
        (GEM, 'Gem'),
        (SELF, 'I have my own wallet'),
        (TEST, 'Fake wallet for testing purposes'),
    )
    user = models.ForeignKey(User, primary_key=True)
    type = models.CharField(max_length=2,
                                      choices=WALLET_TYPE,
                                      default=COINS_PH)

class Transaction(models.Model):
    sender = models.ForeignKey(User, related_name="sent")
    receiver = models.ForeignKey(User, related_name="received")
    # MoneyFields represent two fields in the database. One with amount and one with the currency name
    amount_btc = MoneyField(max_digits=32, decimal_places=16, default_currency='BTC')
    amount_local = MoneyField(max_digits=32, decimal_places=16)
    date_modified = models.DateTimeField(auto_now_add=True)
    REPAYMENT = 'Re'
    SEND = 'Sd'
    TRANSACTION_TYPE= (
        (REPAYMENT, 'Loan Repayment'),
        (SEND, 'Send'),
    )
    type = models.CharField(max_length=2,
                                      choices=TRANSACTION_TYPE,
                                      default=SEND)

class BitcoinRates(models.Model):
    code = models.CharField(max_length=4)
    name = models.CharField(max_length=50)
    buy_rate = models.DecimalField(max_digits=20, decimal_places=10)
    sell_rate = models.DecimalField(max_digits=20, decimal_places=10)
