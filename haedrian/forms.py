from django.forms import ModelForm
from django.contrib.auth.forms import UserCreationForm

from haedrian.models import BetaApplicant, UserData

class BetaApplicantForm(ModelForm):
    class Meta:
        model = BetaApplicant
        fields = ['name', 'email', 'country', 'reason']

class NewUserForm(ModelForm):
    class Meta:
        model = UserData
        exclude = ['user', 'credit_score', 'default_currency', 'device_token']