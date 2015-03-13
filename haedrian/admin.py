from django.contrib import admin
from haedrian.models import BetaApplicant

class PersonAdmin(admin.ModelAdmin):
    list_display = ('name','country','reason')

admin.site.register(BetaApplicant, PersonAdmin)

