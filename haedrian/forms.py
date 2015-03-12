from django.forms import ModelForm

from haedrian.models import BetaApplicant

class BetaApplicantForm(ModelForm)
    class Meta:
        model = BetaApplicant
        fields = ['name', 'email', 'country', 'reason']