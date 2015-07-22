from django.contrib.auth import get_user_model
from django import forms
from django.contrib.auth.forms import UserCreationForm
from django.utils.translation import ugettext as _
from django_countries import countries
from django_countries.fields import CountryField
from django_countries.widgets import CountrySelectWidget
from phonenumber_field.formfields import PhoneNumberField
import phonenumbers
from haedrian import models

from haedrian.models import BetaApplicant, UserData
from apiv1.external.mifosx import mifosx_api

# class BetaApplicantForm(ModelForm):
#     class Meta:
#         model = BetaApplicant
#         fields = ['name', 'email', 'country', 'reason']

# class EmailUserForm(UserCreationForm):
#     email = forms.EmailField()
#     class Meta:
#         model = get_user_model()
#         fields = ("username", "email", "password1", "password2")
#
#     def save(self, commit=True):
#         user = super(EmailUserForm, self).save(commit=False)
#         user.email = self.cleaned_data["email"]
#         if commit:
#             user.save()
#         return user

class NewUserForm(UserCreationForm):
    email = forms.EmailField()
    phone = PhoneNumberField()
    country = forms.ChoiceField(widget=CountrySelectWidget(), choices=countries)
    application = forms.ChoiceField(choices=models.UserData.APPLICATIONS, required=False)
    app_id = forms.CharField(max_length=50, required=False)
    #     labels = {
    #         "application": _("Select the institution you are connected to"),
    #         "app_id": _("ID number"),
    #     }

    def __init__(self, *args, **kwargs):
        super(NewUserForm, self).__init__(*args, **kwargs)
        self.first_name = ''
        self.last_name = ''

    def clean_phone(self):
        data = self.cleaned_data['phone']
        return data

    def clean_app_id(self):
        _id = self.cleaned_data['app_id']
        if not _id:
            return _id
        # TODO: move this to main clean so we can get the application and search by that
        res = mifosx_api('clients', params={"externalId": _id})
        if res['success'] and res['response']['totalFilteredRecords'] == 1:
            self.first_name = res['response']['pageItems']['firstname']
            self.last_name = res['response']['pageItems']['lastname']
            return res['response']['pageItems']['id']
        res = mifosx_api('clients/{}'.format(_id), params={"fields": "id,firstname,lastname"})
        if res['success']:
            self.first_name = res['response']['firstname']
            self.last_name = res['response']['lastname']
            return _id
        raise forms.ValidationError(_("The ID provided is not a member of the application chosen"))

    def clean(self):
        cleaned_data = super(NewUserForm, self).clean()
        country = cleaned_data.get("country")
        phone = cleaned_data.get("phone")
        # phone = self.data['phone']
        if country and phone:
            if isinstance(phone, str):
                phone = phonenumbers.parse(phone, country)
            if not phonenumbers.is_possible_number(phone) or not phonenumbers.is_valid_number(phone):
                raise forms.ValidationError(_("Enter a valid phone number."))
            else:
                cleaned_data['phone'] = phonenumbers.format_number(phone, phonenumbers.PhoneNumberFormat.E164)
        # replace it with the alpha3 version if found
        cleaned_data['country'] = countries.alpha3(country) or country
        app = cleaned_data.get('application')
        id = cleaned_data.get('app_id')
        if app and not id or id and not app:
            raise forms.ValidationError(_("If a microfinance institution is selected, then you must enter an ID as well"))

        # http://stackoverflow.com/a/21934494/4112231
        if cleaned_data.get('app_id', "") == "":
            cleaned_data['app_id'] = None
        return cleaned_data