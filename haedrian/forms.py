from django.forms import ModelForm, ValidationError
from django.utils.translation import ugettext as _
from haedrian.models import BetaApplicant, UserData
import phonenumbers

class BetaApplicantForm(ModelForm):
    class Meta:
        model = BetaApplicant
        fields = ['name', 'email', 'country', 'reason']

class NewUserForm(ModelForm):
    class Meta:
        model = UserData
        exclude = ['user', 'credit_score', 'default_currency', 'sms_balance', 'sms_pending_balance']

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