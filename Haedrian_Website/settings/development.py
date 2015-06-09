from .base import *

DEBUG = True
TEMPLATE_DEBUG = True

ADMINS = ()
MANAGERS = ADMINS

SECRET_KEY = 'TEST'

DATABASES = {
    'test': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': os.path.join(PROJECT_ROOT, 'db.sqlite3'),
    },
    'default': {
        'ENGINE': 'django.db.backends.mysql',
        'NAME': 'phillipines',
        'USER': 'root',
        'PASSWORD': 'password',
        'HOST': 'localhost',   # Or an IP Address that your DB is hosted on
        'PORT': '3306',
    },
    'mifosx': {
        'ENGINE': 'django.db.backends.mysql',
        'NAME': 'mifostenant-default',
        'USER': 'root',
        'PASSWORD': 'password',
        'HOST': 'localhost',   # Or an IP Address that your DB is hosted on
        'PORT': '3306',
    }
}

INSTALLED_APPS = INSTALLED_APPS + ('debug_toolbar', 'djcelery')

STATICFILES_DIRS = STATICFILES_DIRS + (
    os.path.join(PROJECT_ROOT, 'haedrian', 'static'),
    os.path.join(PROJECT_ROOT, 'dashboard', 'static'),
)

GEM_API_TOKEN = "0QZLYNhs-2v3MsGwcFf-dJQsEoS9VSMV_8a59B_GnwU"
GEM_ADMIN_TOKEN = "WdSRt2giHhuK13aicW173cgtcGV36TPm6uk1dOj9SJA"

BROKER_URL = 'django://'
CELERY_RESULT_BACKEND = 'djcelery.backends.database:DatabaseBackend'

# hit the vagrant box for development
MIFOSX_SERVER_URL = "https://192.168.33.10:8443/mifosng-provider/api/v1/"