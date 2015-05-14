from django.conf.urls import url, include
from django.contrib.auth.models import User
from views import send_to_address, send_to_user_handle,get_address,get_user_wallet_handel, get_pending_balance,get_balance,get_exchanges
from apiv1.views import coins_send, wallet_info, coinsph_exchanges

urlpatterns = [
    url(r'^send-to-handle/', send_to_user_handle),
    url(r'^send/', send_to_address),
    url(r'^pending/', get_pending_balance),
    url(r'^balance/', get_balance),
    url(r'^wallet-handle/', get_user_wallet_handel),
    url(r'^address/', get_address),
    url(r'^exchanges/', get_exchanges),

    url(r'^api-auth/', include('rest_framework.urls', namespace='rest_framework'))
]