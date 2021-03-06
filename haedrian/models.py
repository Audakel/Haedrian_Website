from django.db import models
from django.contrib.auth.models import User
from django.utils import timezone
from django_countries.fields import CountryField
from djmoney.models.fields import MoneyField
from apiv1.models import VerifyGroup
from django.utils.translation import ugettext_lazy as _
from datetime import datetime

class BetaApplicant(models.Model):
    name = models.CharField(max_length=255)
    email = models.EmailField()
    country = CountryField(blank_label='(Country)')
    reason = models.TextField()

# stores app specific data about a user
class UserData(models.Model):

    user = models.OneToOneField(User, primary_key=True)
    phone = models.CharField(max_length=15)
    credit_score = models.IntegerField(default=0)
    country = CountryField(blank_label='(Country)')
    default_currency = models.CharField(max_length=4, default='USD')
    sms_deposit_location = models.CharField(max_length=30, null=True)
    org_id = models.CharField(max_length=50, blank=True, default=None, null=True)

    MI_ASIA = 'mi-asia'
    MI_AFRICA = 'mi-africa'
    MI_LATAM = 'mi-latam'
    ASHI = 'ashi'
    TEST = 'test'

    ORGANIZATIONS = (
        (MI_ASIA, _('Mentors Asia'),),
        (MI_AFRICA, _('Mentors Africa'),),
        (MI_LATAM, _('Mentors Latin America'),),
        (ASHI, _('Ahon sa Hirap, Inc'),),
        (TEST, _('Haedrian Test'),),
    )

    organization = models.CharField(choices=ORGANIZATIONS, blank=True, max_length=30)

    class Meta:
        unique_together = (
            ("organization", "org_id"),
        )

    def __str__(self):
        return "UserData for {}".format(self.user.username)

class Wallet(models.Model):
    COINS_PH = 'CH'
    GEM = 'GM'
    SELF = 'SE'
    TEST = 'TS'
    WALLET_CLASS = {
        COINS_PH: "haedrian.wallets.coins_ph.CoinsPhWallet",
        GEM: "haedrian.wallets.gem.GemWallet",
        SELF: "haedrian.wallets.test_wallet.TestWallet",
        TEST: "haedrian.wallets.test_wallet.TestWallet",
    }
    WALLET_TYPE = (
        (COINS_PH, 'Coins.ph'),
        (GEM, 'Gem'),
        (SELF, 'I have my own wallet'),
        (TEST, 'Fake wallet for testing purposes'),
    )

    BITCOIN = 'BTC'
    PHILIPPINE_PESO = 'PHP'
    US_DOLLAR = 'USD'
    CURRENCY = (
        (BITCOIN, 'Bitcoin'),
        (PHILIPPINE_PESO, 'Philippine Peso'),
        (US_DOLLAR, 'United States Dollar'),
    )

    user = models.ForeignKey(User)
    type = models.CharField(max_length=2, choices=WALLET_TYPE, default=COINS_PH)
    # provider_wallet_id: token that each wallet provding company uses to id their wallets
    provider_wallet_id = models.CharField(max_length=60, default="")
    access_token = models.CharField(max_length=60, default="")
    refresh_token = models.CharField(max_length=60, default="")
    currency = models.CharField(max_length=6, choices=CURRENCY, default=BITCOIN)
    blockchain_address = models.CharField(max_length=80, default="")
    expires_at = models.DateTimeField(default=datetime.fromtimestamp(0))
    def __str__(self):
        return "{}'s {} wallet".format(self.user.username, self.currency)


class Transaction(models.Model):
    sender = models.ForeignKey(User, related_name="sent")
    receiver = models.ForeignKey(User, related_name="received")
    # MoneyFields represent two fields in the database. One with amount and one with the currency name
    amount_btc = MoneyField(max_digits=32, decimal_places=16, default_currency='BTC')
    amount_local = MoneyField(max_digits=32, decimal_places=16)
    date_modified = models.DateTimeField(auto_now_add=True)
    payment_confirmed = models.BooleanField(default=False)
    mifos_confirmed = models.BooleanField(default=False)
    sent_payment_id = models.CharField(max_length=40)
    group = models.ForeignKey(VerifyGroup, null=True)
    BITCOIN = 'BTC'
    PHILIPPINE_PESO = 'PHP'
    US_DOLLAR = 'USD'
    CURRENCY = (
        (BITCOIN, 'Bitcoin'),
        (PHILIPPINE_PESO, 'Philippine Peso'),
        (US_DOLLAR, 'United States Dollar'),
    )
    amount_local_currency = models.CharField(max_length=6, choices=CURRENCY, default=US_DOLLAR)



    REPAYMENT = 'Re'
    SEND = 'Se'
    FEE = 'Fe'
    TRANSACTION_TYPE= (
        (REPAYMENT, 'Loan Repayment'),
        (SEND, 'Send'),
        (FEE, 'Fee'),
    )
    type = models.CharField(max_length=2,
                            choices=TRANSACTION_TYPE,
                            default=REPAYMENT)

class ExchangeRates(models.Model):
    provider = models.CharField(max_length=50)
    code_from = models.CharField(max_length=3)
    code_to = models.CharField(max_length=3)
    buy = models.DecimalField(max_digits=20, decimal_places=10)
    sell = models.DecimalField(max_digits=20, decimal_places=10)
    date = models.DateTimeField(default=timezone.now)

