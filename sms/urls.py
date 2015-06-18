from django.conf.urls import url, include
from rapidsms_telerivet.views import TelerivetBackendView
# from . import views

urlpatterns = [
    # url(r'^$', views.receive_text_message, name='receive_sms'),
    url(r'^backend/twilio/', include('rtwilio.urls')),
    url(r'^telerivet/', TelerivetBackendView.as_view(backend_name='telerivet')),

]