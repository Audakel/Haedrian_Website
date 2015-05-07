from django.conf.urls import url, include
from django.contrib.auth.models import User

from apiv1.views import send

urlpatterns = [
    url(r'^send/', send),
    url(r'^api-auth/', include('rest_framework.urls', namespace='rest_framework'))
]