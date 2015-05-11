from django.contrib import admin
from haedrian.models import BetaApplicant, UserData

class PersonAdmin(admin.ModelAdmin):
    list_display = ('name','country','reason')

class UserDataAdmin(admin.ModelAdmin):
    list_display = ('user', 'phone', 'credit_score', 'default_currency')

admin.site.register(BetaApplicant, PersonAdmin)
admin.site.register(UserData, UserDataAdmin)