from django.shortcuts import render
from django.http import HttpResponseRedirect
from django.contrib.auth.forms import UserCreationForm

from haedrian.forms import BetaApplicantForm, NewUserForm
from haedrian.models import BetaApplicant, Wallet
import pycountry
# from haedrian.gem import create_app_user


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
        if _create_account(copy.deepcopy(request.POST)):
            return HttpResponseRedirect("/")
        else:
            data_form = NewUserForm(request.POST)
            user_form = UserCreationForm(request.POST)
    else:
        data_form = NewUserForm()
        user_form = UserCreationForm()
    return render(request, "registration/register.html", {
        'user_form': user_form,
        'data_form': data_form,
    })

def _create_account(user_data):
    """API friendly INTERNAL USE ONLY account registration end point
    :param user_data - Dict that contains all the fields that are expected for the user to fill out.
    Required keys in the dict are
    ["username", "email", "password1", "password2", "phone", "country"]

    :returns True if the account creation was successful"""

    data_form = NewUserForm(user_data)
    user_form = UserCreationForm(user_data)
    try:
        user_form.is_valid() and data_form.is_valid()
        new_user = user_form.save(commit=False)
        data = data_form.save(commit=False)
        data.user = new_user
        data.credit_score = 0
        _country = pycountry.countries.get(alpha3=data.country.alpha3)
        data.default_currency = pycountry.currencies.get(numeric=_country.numeric).letter
        wallet = Wallet(user=new_user, type=Wallet.TEST)
        wallet.save()
        wallet.save()
        data_form.save()
        new_user.save()
        # TODO: send verification email or something
        return True
    except Exception as e:
        return e.message

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
