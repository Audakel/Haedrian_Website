from __future__ import absolute_import

import os

from celery import Celery

# set the default Django settings module for the 'celery' program.
if os.getenv('DJANGO_POSTGRES_PASSWORD'):
    os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'Haedrian_Website.settings.production')
else:
    os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'Haedrian_Website.settings.development')


from django.conf import settings

app = Celery('Haedrian_Website')

# Using a string here means the worker will not have to
# pickle the object when using Windows.
app.config_from_object('django.conf:settings')
app.autodiscover_tasks(lambda: settings.INSTALLED_APPS)
