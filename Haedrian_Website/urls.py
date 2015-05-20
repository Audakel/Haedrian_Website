from django.conf.urls import patterns, include, url
from django.contrib import admin
# from organizations.backends import invitation_backend
admin.autodiscover()

authurls = patterns('django.contrib.auth.views',
    url(r'^login/$', 'login', name='login'),
    url(r'^logout/$', 'logout', name='logout'),
    url(r'^password_change/done/$', 'password_change_done', name='password_change_done'),
    url(r'^password_change/$', 'password_change', name='password_change'),
    url(r'^password_reset/done/$', 'password_reset_done', name='password_reset_done'),
    url(r'^password_reset/$', 'password_reset', name='password_reset'),
    url('^reset/(?P<uidb64>[0-9A-Za-z_\-]+)/(?P<token>[0-9A-Za-z]{1,13}-[0-9A-Za-z]{1,20})/$', 'password_reset_confirm', name='password_reset_confirm'),
    url('^reset/done/$', 'password_reset_complete', name='password_reset_complete'),

)

urlpatterns = patterns('',
    url(r'^v1/', include('apiv1.urls')),
    url(r'^sms/', include('sms.urls')),
    url(r'^admin/', include(admin.site.urls)),
    url(r'^account/', include(authurls)),
    # url(r'^accounts/', include('organizations.urls'),),
    # url(r'^invitations/', include(invitation_backend().get_urls())),
    url(r'^dashboard/', include('dashboard.urls', namespace='dashboard')),
    url(r"^messagelog/", include("rapidsms.contrib.messagelog.urls")),
    url(r'', include('haedrian.urls', namespace='haedrian')),
)
