from django.conf.urls import url, include
from django.contrib.auth.models import User

from apiv1.views import coins_send, wallet_info, coinsph_exchanges

urlpatterns = [
    url(r'^coins_send/', coins_send),
    url(r'^exchange/', coinsph_exchanges),
    url(r'^wallet_info/', wallet_info),
    url(r'^api-auth/', include('rest_framework.urls', namespace='rest_framework'))
]