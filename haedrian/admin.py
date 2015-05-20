from django.contrib import admin
from haedrian.models import BetaApplicant, UserData
# Account, AccountUser

class PersonAdmin(admin.ModelAdmin):
    list_display = ('name','country','reason')

class UserDataAdmin(admin.ModelAdmin):
    list_display = ('user', 'phone', 'credit_score', 'default_currency')

admin.site.register(BetaApplicant, PersonAdmin)
admin.site.register(UserData, UserDataAdmin)

# from django.contrib import admin
# from mptt.admin import MPTTModelAdmin
# from haedrian.models import Node

# class CustomMPTTModelAdmin(MPTTModelAdmin):
#     verbose_name = 'Activity'

# admin.site.register(Node, CustomMPTTModelAdmin)

# class AccountUserAdmin(admin.ModelAdmin):
#     # list_display = ('name',)
#     pass

# admin.site.unregsiter(Organization)
# admin.site.unregsiter(OrganizationUser)
# admin.site.unregsiter(OrganizationOwner)
# admin.site.register(Account)
# admin.site.register(AccountUser, AccountUserAdmin)