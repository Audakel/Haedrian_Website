from django.shortcuts import render
from django.db import transaction, IntegrityError
import pycountry
from rest_framework.exceptions import ValidationError

from haedrian.forms import NewUserForm
from haedrian.models import Wallet, UserData
from django.contrib.auth.models import User


def index(request):
    return render(request, 'index.html')


@transaction.atomic
def _create_account(user_data):
    """
    API friendly INTERNAL USE ONLY account registration end point
    :param user_data - Dict that contains all the fields that are expected for the user to fill out.
    Required keys in the dict are
    ["username", "email", "password1", "password2", "phone", "country"]
    Optional fields are
    ['application', 'app_id']
    :returns True if the account creation was successful
    """
    form = NewUserForm(user_data)
    # user_form = EmailUserForm(user_data)
    if form.is_valid():
        # django_user = user_form.save(commit=False)
        user = User.objects.create_user(form.cleaned_data['username'],
                                 email=form.cleaned_data['email'],
                                 password=form.cleaned_data['password1'])
        _country = pycountry.countries.get(alpha3=form.cleaned_data['country'])
        default_currency = pycountry.currencies.get(numeric=_country.numeric).letter
        UserData.objects.create(
            user=user,
            phone=form.cleaned_data['phone'],
            country=_country,
            default_currency=default_currency,
            credit_score=0,
            app_id=form.cleaned_data['app_id'],
            application=form.cleaned_data['application'],
        )
        # TODO: fix what type of wallets get created rather than just all coins_ph
        wallet = Wallet(user=user, type=Wallet.COINS_PH)
        wallet.save()
        # TODO: send verification email or something
    else:
        raise ValidationError(detail=form.errors)

from django.contrib.auth import views, get_user_model


def login(request, *args, **kwargs):
    if request.method == 'POST':
        if not request.POST.get('remember_me', None):
            request.session.set_expiry(0)
    return views.login(request, *args, **kwargs)
