from django.contrib import admin

from haedrian.models import BetaApplicant, UserData, ExchangeRates, Transaction, Wallet
from sms.models import PendingDeposit

# Account, AccountUser

class PersonAdmin(admin.ModelAdmin):
    list_display = ('name','country','reason')

class UserDataAdmin(admin.ModelAdmin):
    list_display = ('user', 'phone', 'credit_score', 'default_currency')

class PendingDepositAdmin(admin.ModelAdmin):
    list_display = ('user', 'amount', 'currency', 'time', 'user_confirmed', 'exchange_confirmed', 'expired')

class ExchangeRatesAdmin(admin.ModelAdmin):
    list_display = ('provider', 'code_from', 'code_to', 'buy', 'sell', 'date')

class TransactionAdmin(admin.ModelAdmin):
    list_display = ('sender', 'receiver', 'amount_local', 'amount_local_currency', 'payment_confirmed',
                    'date_modified', 'mifos_confirmed', 'sent_payment_id')

class WalletAdmin(admin.ModelAdmin):
    list_display = ('user', 'type', 'provider_wallet_id', 'access_token', 'refresh_token',
                    'currency', 'blockchain_address', 'expires_at')


admin.site.register(BetaApplicant, PersonAdmin)
admin.site.register(UserData, UserDataAdmin)
admin.site.register(PendingDeposit, PendingDepositAdmin)
admin.site.register(ExchangeRates, ExchangeRatesAdmin)
admin.site.register(Transaction, TransactionAdmin)
admin.site.register(Wallet, WalletAdmin)

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