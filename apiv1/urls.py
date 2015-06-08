from django.conf.urls import url, include
from rest_framework.authtoken.views import obtain_auth_token

from apiv1 import views

urlpatterns = [
    # url(r'^send-to-handle/', send_to_user_handle),
    url(r'^send/', views.send_to_address),
    url(r'^pending/', views.get_pending_balance),
    url(r'^balance/', views.get_balance),
    url(r'^wallet-info/', views.get_wallet_info),
    url(r'^address/', views.get_address),
    url(r'^exchanges/', views.get_exchanges),
    url(r'^create/', views.new_user),
    url(r'^locations/', views.get_locations),
    url(r'^history/', views.get_history),
    url(r'^buy-history/', views.get_buy_history),
    url(r'^buy/', views.buy),
    url(r'^id/', views.get_id),
    url(r'^exchange-rate/', views.get_exchange_rate),

    # testing
    url(r'^create-wallet/', views.create_wallet),
    url(r'^exchange-fees/', views.get_exchange_fees),
    url(r'^exchange-types/', views.get_exchange_types),

    url(r'^external/', include('apiv1.external.urls', namespace='external')),
]

urlpatterns += [
    url(r'^api-auth/', include('rest_framework.urls', namespace='rest_framework')),
    url(r'^token-auth/', obtain_auth_token)
]

