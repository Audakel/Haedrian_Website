from django.conf.urls import patterns, url, include

from haedrian import views

urlpatterns = patterns('',
    url(r'^register/$', views.create_account, name='register'),
    url(r'^$', views.index, name='index'),
)
