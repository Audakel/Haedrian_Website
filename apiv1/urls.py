from django.conf.urls import url, include
from django.contrib.auth.models import User

from apiv1.views import coins_send, wallet_info

urlpatterns = [
    url(r'^coins_send/', coins_send),
    url(r'^wallet_info/', wallet_info),
    url(r'^api-auth/', include('rest_framework.urls', namespace='rest_framework'))
]