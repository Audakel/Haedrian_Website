from django.conf.urls import patterns, url

from haedrian import views

urlpatterns = patterns('',
    url(r'^$', views.index, name='index'),
    url(r'^register', views.create_account, name='index'),
)
