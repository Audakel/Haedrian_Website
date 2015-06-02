from django.conf.urls import url, include
from apiv1 import views
from rest_framework.authtoken.views import obtain_auth_token



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
    url(r'^buy/', views.buy),

    # testing
    url(r'^create-wallet/', views.create_wallet),
    url(r'^exchange-fees/', views.get_exchange_fees),
    url(r'^exchange-types/', views.get_exchange_types),



]

urlpatterns += [
    url(r'^api-auth/', include('rest_framework.urls', namespace='rest_framework')),
    url(r'^token-auth/', obtain_auth_token)
]

