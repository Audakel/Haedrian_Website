from django.shortcuts import render
from django.db import transaction, IntegrityError
import pycountry

from apiv1.tasks import fetch_mfi_client
from haedrian.forms import NewUserForm, EmailUserForm
from haedrian.models import Wallet, UserData


def index(request):
    return render(request, 'index.html')


@transaction.atomic
def _create_account(user_data):
    """
    API friendly INTERNAL USE ONLY account registration end point
    :param user_data - Dict that contains all the fields that are expected for the user to fill out.
    Required keys in the dict are
    ["username", "email", "password1", "password2", "phone", "country"]

    :returns True if the account creation was successful
    """

    data_form = NewUserForm(user_data)
    user_form = EmailUserForm(user_data)
    if user_form.is_valid() and data_form.is_valid():
        django_user = user_form.save(commit=False)
        django_user.first_name = user_data.get('first_name', '')
        django_user.last_name = user_data.get('last_name', '')
        django_user.save()
        haedrian_user = data_form.save(commit=False)
        haedrian_user.user = django_user
        haedrian_user.credit_score = 0
        _country = pycountry.countries.get(alpha3=haedrian_user.country.alpha3)
        haedrian_user.default_currency = pycountry.currencies.get(numeric=_country.numeric).letter
        # TODO: fix what type of wallets get created rather than just all coins_ph
        wallet = Wallet(user=django_user, type=Wallet.COINS_PH)
        wallet.save()
        try:
            haedrian_user.save()
        except IntegrityError as e:
            return {'success': False, 'error': e.message}
        # TODO: Form validation fetches the user info, no need to do that up to three times, but at least this is backgrounded
        fetch_mfi_client.delay({
            'pk': haedrian_user.pk,
            'app': haedrian_user.application,
            'id': haedrian_user.app_external_id,
        })
        # TODO: send verification email or something
        return {'success': True}
    else:
        # user has an account created by an external app so update instead of create
        user = UserData.objects.filter(app_id=user_data['app_external_id'])
        if len(user) == 1:
            u = user[0]
            # only update the user account if the person has a placeholder name
            if u.user.username.startswith('placeholder') and len(u.user.username) == (len("placeholder") + 10):
                u.user.username = user_form.cleaned_data['username']
                u.user.set_password(user_form.cleaned_data['password1'])
                u.user.email = user_form.cleaned_data['email']
                u.user.save()
                u.phone = data_form.cleaned_data['phone']
                u.country = data_form.cleaned_data['country']
                u.save()
                return {'success': True }
        error = '{} - {}'.format(user_form.errors, data_form.errors['__all__'].as_text())

        return {
            'error': error,
            'success': False
        }

from django.contrib.auth import views
def login(request, *args, **kwargs):
    if request.method == 'POST':
        if not request.POST.get('remember_me', None):
            request.session.set_expiry(0)
    return views.login(request, *args, **kwargs)
