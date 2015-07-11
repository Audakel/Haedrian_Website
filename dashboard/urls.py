from django.conf.urls import patterns, url

from dashboard import views

urlpatterns = patterns('',
    url(r'^$', views.index, name='index'),
    url(r'^admin', views.admin_dashboard, name='admin'),
    url(r'^(?P<page>.+)', views.index),
)
