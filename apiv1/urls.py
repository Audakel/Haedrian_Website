from django.conf.urls import url, include
from rest_framework.authtoken.views import obtain_auth_token

from apiv1 import views

urlpatterns = [
    # url(r'^send-to-handle/', send_to_user_handle),
    url(r'^send/', views.send, name="wallet_send"),
    url(r'^pending/', views.get_pending_balance, name="wallet_pending"),
    url(r'^balance/', views.get_balance, name="wallet_balance"),
    url(r'^wallet-info/', views.get_wallet_info, name="wallet_info"),
    url(r'^address/', views.get_address, name="wallet_addr"),
    url(r'^exchanges/', views.get_exchanges, name="exchanges"),
    url(r'^create/', views.new_user, name="create"),
    url(r'^locations/', views.get_locations, name="locations"),
    url(r'^history/', views.get_history, name="history"),
    url(r'^buy-history/', views.get_buy_history, name="buy_history"),
    url(r'^buy/', views.buy, name="buy"),
    url(r'^id/', views.get_id, name="id"),
    url(r'^exchange-rate/', views.get_exchange_rate, name="exchange_rate"),
    url(r'^group/', views.get_groups, name="group"),
    url(r'^group-verify/', views.group_verify, name="group_verify"),
    url(r'^group-payment/', views.group_payment, name="group_payment"),
    url(r'^currency/', views.currency, name="currency"),
    url(r'^home/', views.get_home_screen, name="home"),

    url(r'^create-wallet/', views.create_wallet, name="wallet_create"),
    url(r'^exchange-fees/', views.get_exchange_fees, name="exchange_fees"),
    url(r'^exchange-types/', views.get_exchange_types, name="exchange_types"),

    url(r'^external/', include('apiv1.external.urls', namespace='external')),

    # testing
    url(r'^testing/', views.testing),
]

urlpatterns += [
    url(r'^api-auth/', include('rest_framework.urls', namespace='rest_framework')),
    url(r'^token-auth/', obtain_auth_token)
]

