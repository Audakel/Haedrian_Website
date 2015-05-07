from django.conf.urls import url, include
# from . import views

urlpatterns = [
    # url(r'^$', views.receive_text_message, name='receive_sms'),
    url(r'^backend/twilio/', include('rtwilio.urls')),
]