from django.conf.urls import patterns, url
from django.views.generic import TemplateView

from haedrian import views

urlpatterns = patterns('',
    url(r'^register/$', views.create_account, name='register'),
    url(r'^tos/$', TemplateView.as_view(template_name="tos.html"), name="tos"),
    url(r'^privacy-policy/$', TemplateView.as_view(template_name="privacy-policy.html"), name="privacy-policy"),
    url(r'^$', views.index, name='index'),

)
