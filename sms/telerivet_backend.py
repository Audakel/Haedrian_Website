__author__ = 'audakel'
from rapidsms.backends.http.views import GenericHttpBackendView


class TelerivetBackendView(GenericHttpBackendView):
    params = {
        'identity_name': 'phone',
        'text_name': 'message',
    }