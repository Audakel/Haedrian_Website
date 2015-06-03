from django.conf.urls import url

from apiv1.external import views

urlpatterns = [
    url(r'^create/', views.CreateUser.as_view()),
]