from django.contrib.auth import get_user_model
from django.forms import ModelForm, ValidationError
from django.contrib.auth.forms import UserCreationForm
from django import forms
from django.utils.translation import ugettext as _
import phonenumbers

from haedrian.models import BetaApplicant, UserData
from apiv1.external.mifosx import mifosx_api

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
        fields = ("phone", "country", "application", "app_id")
        labels = {
            "application": _("Select the institution you are connected to"),
            "app_id": _("ID number"),
        }

    def __init__(self, *args, **kwargs):
        super(NewUserForm, self).__init__(*args, **kwargs)
        self.first_name = ''
        self.last_name = ''
        self.active = False
        self.office_name = ''

    def clean_phone(self):
        data = self.cleaned_data['phone']
        return data

    def clean_org_id(self):
        _id = self.cleaned_data['org_id']
        if not _id:
            return _id
        # TODO:: Put what db this should be hitting (in app)
        res = mifosx_api('clients', app=self.cleaned_data['application'], params={"externalId": _id})
        if res['success'] and res['response']['totalFilteredRecords'] == 1:
            self.first_name = res['response']['pageItems']['firstname']
            self.last_name = res['response']['pageItems']['lastname']
            return res['response']['pageItems']['id']
        res = mifosx_api('clients/{}'.format(_id), app=self.cleaned_data['application'])
                         # params={"fields": "id,firstname,lastname,officeName"})
        if res['success']:
            self.first_name = res['response']['firstname']
            self.last_name = res['response']['lastname']
            self.active = res['response']['active']
            self.office_name = res['response']['officeName']
            return _id
        raise ValidationError(_("The ID provided is not a member of the application chosen"))

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

        app = cleaned_data.get('application')
        id = cleaned_data.get('app_id')
        if app and not id or id and not app:
            raise ValidationError(_("If a microfinance institution is selected, then you must enter an ID as well"))

        # http://stackoverflow.com/a/21934494/4112231
        if cleaned_data.get('app_id', "") == "":
            cleaned_data['app_id'] = None
