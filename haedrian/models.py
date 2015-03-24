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
    # use blank=True to make this optional
    phone = PhoneNumberField()
    # I still don't like having a pin ie: a less entropy password
    # pin_number = models.CharField(max_length=6)
    wallet_guid = models.CharField(max_length=50)
    custom_link = models.CharField(max_length=50)
    # symmetrical=False means that if i am your friend you are not forced to be my friend
    friends = models.ManyToManyField("self", symmetrical=False, through="Friend", through_fields=('me', 'them'))
    # credit_score can be added as necessary later

class Friend(models.Model):
    me = models.ForeignKey(UserData, related_name='my_friends')
    them = models.ForeignKey(UserData, related_name='their_friends')
    friend_type = models.ForeignKey('FriendType')

class FriendType(models.Model):
    title = models.CharField(max_length=50)

class Wallet(models.Model):
    user = models.OneToOneField(User, primary_key=True)
    # guid on blockchain.info
    guid = models.CharField(max_length=50)
    # I'm cowardly refusing to store their password in the database
    # there has GOT to be a better way....
    # wallet_addr should be generated and not stored
    # login_attempts.... Not sure about this either. TODO figure that out

class Project(models.Model):
    user = models.ForeignKey(User)
    title = models.CharField(max_length=255)
    description = models.TextField()
    category = models.ForeignKey('Category')
    # TODO latitude and longitude should be handled with GIS such as DjangoGEO
    city = models.CharField(max_length=100)
    country = CountryField(blank_label='(Country)')
    goal = MoneyField(max_digits=10, decimal_places=2, default_currency='USD')
    image = models.ImageField(upload_to='images/%Y-%m', blank=True, null=True)
    is_team = models.BooleanField(default=False)

class Category(models.Model):
    title = models.CharField(max_length=50)

class Transaction(models.Model):
    sender = models.ForeignKey(User, related_name="sent")
    receiver = models.ForeignKey(User, related_name="received")
    # TODO verify the currency fields when its not 4AM
    amount_bitcoin = MoneyField(max_digits=16, decimal_places=16, default_currency='XBT')
    amount_currency = MoneyField(max_digits=10, decimal_places=2, default_currency='USD')
    date_modified = models.DateTimeField(auto_now_add=True)

class Investment(models.Model):
    transaction = models.ForeignKey(Transaction)
    project = models.ForeignKey(Project)
    user = models.ForeignKey(User)

class ProjectMember(models.Model):
    project = models.ForeignKey(Project)
    user = models.ForeignKey(User)