from django.db import models
from django.contrib.auth.models import User
from django_countries.fields import CountryField
from phonenumber_field.modelfields import PhoneNumberField

import moneyed
from djmoney.models.fields import MoneyField

class BetaApplicant(models.Model):
    name = models.CharField(max_length=255)
    email = models.EmailField()
    country = CountryField(blank_label='(Country)')
    reason = models.TextField()

# stores app specific data about a user
class UserData(models.Model):
    user = models.OneToOneField(User, primary_key=True)
    # email = models.EmailField()
    phone = PhoneNumberField()
    handle = models.CharField(max_length=50)
    credit_score = models.IntegerField(max_length=4, default=0)
    # handle is the same thing as username
    # handle = models.CharField(max_length=50)
    country = CountryField(blank_label='(Country)')
    default_currency = models.CharField(max_length=4, default='USD')
    device_token = models.CharField(max_length=50)
    # symmetrical=False means that if i am your friend you are not forced to be my friend
    # friends = models.ManyToManyField("self", symmetrical=False, through="Friend", through_fields=('me', 'them'))

# class Friend(models.Model):
#     me = models.ForeignKey(UserData, related_name='my_friends')
#     them = models.ForeignKey(UserData, related_name='their_friends')
#     friend_type = models.ForeignKey('FriendType')

# class FriendType(models.Model):
#     title = models.CharField(max_length=50)


# class WalletType(models.Model):
#     name = models.CharField(max_length=50)

class Wallet(models.Model):
    user = models.OneToOneField(User, primary_key=True)
    COINS_PH = 'CH'
    GEM = 'GM'
    SELF = 'SE'
    WALLET_TYPE= (
        (COINS_PH, 'coins.ph'),
        (GEM, 'Gem'),
        (SELF, 'Self hosted'),
    )
    year_in_school = models.CharField(max_length=2,
                                      choices=WALLET_TYPE,
                                      default=COINS_PH)

# class Project(models.Model):
#     user = models.ForeignKey(User)
#     title = models.CharField(max_length=255)
#     description = models.TextField()
#     category = models.ForeignKey('Category')
#     # TODO latitude and longitude should be handled with GIS such as DjangoGEO
#     city = models.CharField(max_length=100)
#     country = CountryField(blank_label='(Country)')
#     goal = MoneyField(max_digits=10, decimal_places=2, default_currency='USD')
#     image = models.ImageField(upload_to='images/%Y-%m', blank=True, null=True)

class Category(models.Model):
    title = models.CharField(max_length=50)

class Transaction(models.Model):
    sender = models.ForeignKey(User, related_name="sent")
    receiver = models.ForeignKey(User, related_name="received")
    amount_btc = MoneyField(max_digits=32, decimal_places=16, default_currency='BTC')
    amount_local = MoneyField(max_digits=32, decimal_places=16)
    date_modified = models.DateTimeField(auto_now_add=True)
    # type = models.ForeignKey("TransactionType")

# class TransactionType(models.Model):
#     type = models.CharField(max_length=20)

class BitcoinRates(models.Model):
    code = models.CharField(max_length=4)
    name = models.CharField(max_length=50)
    rate = models.DecimalField(max_digits=20, decimal_places=10)