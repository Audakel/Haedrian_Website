from django.conf.urls import url, include
from django.contrib.auth.models import User
from views import send_to_address, send_to_user_handle,get_address,get_user_wallet_handel, \
    get_pending_balance,get_balance,get_exchanges, new_user, create_wallet
from apiv1.views import coins_send, wallet_info, coinsph_exchanges
from rest_framework.authtoken import views


urlpatterns = [
    # url(r'^send-to-handle/', send_to_user_handle),
    url(r'^send/', send_to_address),
    url(r'^pending/', get_pending_balance),
    url(r'^balance/', get_balance),
    url(r'^wallet-handle/', get_user_wallet_handel),
    url(r'^address/', get_address),
    url(r'^exchanges/', get_exchanges),
    url(r'^create/', new_user),
    url(r'get-locations/', get_locations),

    # testing
    url(r'^create-wallet/', create_wallet),

    url(r'^api-auth/', include('rest_framework.urls', namespace='rest_framework')),
    url(r'^token-auth/', views.obtain_auth_token)

]
