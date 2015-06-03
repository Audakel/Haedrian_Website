from django.contrib.auth import get_user_model
from django.forms import ModelForm, ValidationError
from django.contrib.auth.forms import UserCreationForm
from django import forms
from django.utils.translation import ugettext as _
import phonenumbers

from haedrian.models import BetaApplicant, UserData


class BetaApplicantForm(ModelForm):
    class Meta:
        model = BetaApplicant
        fields = ['name', 'email', 'country', 'reason']

class EmailUserForm(UserCreationForm):
    email = forms.EmailField()
    class Meta:
        model = get_user_model()
        fields = ("username", "email", "password1", "password2")

    def save(self, commit=True):
        user = super(EmailUserForm, self).save(commit=False)
        user.email = self.cleaned_data["email"]
        if commit:
            user.save()
        return user

class NewUserForm(ModelForm):
    class Meta:
        model = UserData
        exclude = ['user', 'credit_score', 'default_currency', 'sms_balance']

    def clean_phone(self):
        data = self.cleaned_data['phone']
        return data

    def clean(self):
        cleaned_data = super(NewUserForm, self).clean()
        country = cleaned_data.get("country")
        phone = cleaned_data.get("phone")
        # phone = self.data['phone']
        if country and phone:
            pn = phonenumbers.parse(phone, country)
            if not phonenumbers.is_possible_number(pn) or not phonenumbers.is_valid_number(pn):
                raise ValidationError(_("Enter a valid phone number."))
            else:
                cleaned_data['phone'] = phonenumbers.format_number(pn, phonenumbers.PhoneNumberFormat.E164)