from django.conf.urls import patterns, url
from django.views.generic import TemplateView

from dashboard import views

urlpatterns = patterns('',
    url(r'^$', views.index, name='index'),
    url(r'^(?P<page>.+)', views.index),
)
