from django.conf.urls import patterns, include, url
from django.contrib import admin

admin.autodiscover()

urlpatterns = patterns('',
    url(r'^v1/', include('apiv1.urls')),
    url(r'^sms/', include('sms.urls')),
    url(r'^admin/', include(admin.site.urls)),
    url(r'^accounts/', include('django.contrib.auth.urls')),
    url(r'^dashboard/', include('dashboard.urls', namespace='dashboard')),
    url(r'', include('haedrian.urls', namespace='haedrian')),
)
