"""
WSGI config for Haedrian_Website project.

It exposes the WSGI callable as a module-level variable named ``application``.

For more information on this file, see
https://docs.djangoproject.com/en/1.6/howto/deployment/wsgi/
"""

# NOTE: we aren't going to be using the WSGI interface. We are using Gunicorn

import os
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "haedrian.settings.development")

from django.core.wsgi import get_wsgi_application
application = get_wsgi_application()
