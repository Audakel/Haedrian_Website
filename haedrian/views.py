from django.shortcuts import render
from django.http import HttpResponseRedirect
import pycountry
from django.db import transaction

from apiv1.external.views import match_users
from haedrian.forms import BetaApplicantForm, NewUserForm, EmailUserForm
from haedrian.models import BetaApplicant, Wallet


def index(request):
    context = {}
    if request.method == 'POST':
        form = BetaApplicantForm(request.POST)
        if form.is_valid():
            form.save()
            form = BetaApplicantForm()
            context['thanks'] = "Thank you for your interest! We will contact you with further information when we are ready"
    else:
        form = BetaApplicantForm()
    context["form"] = form
    context["count"] = BetaApplicant.objects.count()
    return render(request, 'index.html', context)

import copy
def create_account(request):
    if request.method == 'POST':
        # the forms seem to destructively remove the elements? deep copy until I find out why
        if _create_account(copy.deepcopy(request.POST))['success']:
            return HttpResponseRedirect("/")
        else:
            data_form = NewUserForm(request.POST)
            user_form = EmailUserForm(request.POST)
    else:
        data_form = NewUserForm()
        user_form = EmailUserForm()
    return render(request, "registration/register.html", {
        'user_form': user_form,
        'data_form': data_form,
    })

@transaction.atomic
def _create_account(user_data):
    """API friendly INTERNAL USE ONLY account registration end point
    :param user_data - Dict that contains all the fields that are expected for the user to fill out.
    Required keys in the dict are
    ["username", "email", "password1", "password2", "phone", "country"]

    :returns True if the account creation was successful"""
    data_form = NewUserForm(user_data)
    user_form = EmailUserForm(user_data)
    if user_form.is_valid() and data_form.is_valid():
        django_user = user_form.save()
        haedrian_user = data_form.save(commit=False)
        haedrian_user.user = django_user
        haedrian_user.credit_score = 0
        _country = pycountry.countries.get(alpha3=haedrian_user.country.alpha3)
        haedrian_user.default_currency = pycountry.currencies.get(numeric=_country.numeric).letter
        # TODO:: fix what type of wallets get created rather than just all coins_ph
        wallet = Wallet(user=django_user, type=Wallet.COINS_PH)
        wallet.save()
        django_user.save()
        haedrian_user.save()
        match_users.delay({'external': haedrian_user.external})
        # TODO: send verification email or something
        return {'success': True}
    else:
        return {
            'error':{
                'user': user_form.error_messages,
                'data': data_form.errors
            },
            'success': False
        }

from django.contrib.auth import views
def login(request, *args, **kwargs):
    if request.method == 'POST':
        if not request.POST.get('remember_me', None):
            request.session.set_expiry(0)
    return views.login(request, *args, **kwargs)

# register a signal to listen to when we make a new User object
# @receiver(pre_save, sender=User)
# def create_wallet(sender, instance, **kwargs):
#     # instances have an id if they are updating their account details, but we only do this on creation
#     import pdb; pdb.set_trace()
#     if hasattr(instance, 'id'):
#         logger.debug("Making a new account")
#         if instance.username.startswith("smsuser"):
#             create_sms_user(instance.userdata.phone)
#         else:
#             device_token = create_phone_app_user(instance.email, instance.password)
#             instance.userdata.device_token = device_token
