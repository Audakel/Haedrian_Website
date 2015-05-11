from django.shortcuts import render
from django.http import HttpResponseRedirect
from django.contrib.auth.forms import UserCreationForm

from haedrian.forms import BetaApplicantForm, NewUserForm
from haedrian.models import BetaApplicant
from haedrian.gem import create_app_user


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

def create_account(request):
    if request.method == 'POST':
        data_form = NewUserForm(request.POST)
        user_form = UserCreationForm(request.POST)
        if user_form.is_valid() and data_form.is_valid():
            new_user = user_form.save(commit=False)
            data = data_form.save(commit=False)
            data.user = new_user
            data.credit_score = 0
            import pdb; pdb.set_trace()
            data.device_token = create_app_user(new_user.email, request.POST['password1'])
            new_user.save()
            data_form.save()
            return HttpResponseRedirect("/")
    else:
        data_form = NewUserForm()
        user_form = UserCreationForm()
    return render(request, "registration/register.html", {
        'user_form': user_form,
        'data_form': data_form,
    })

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

# def

def graph(request):
    return render(request, 'graphs/stockGraph.html')

def graph1(request):
    return render(request, 'graphs/bundleGraph.html')

def graph2(request):    
    return render(request, 'graphs/pieGraph.html')