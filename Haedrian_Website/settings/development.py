from .base import *

DEBUG = True
TEMPLATE_DEBUG = True

ADMINS = ()
MANAGERS = ADMINS

SECRET_KEY = 'TEST'

COINS_BASE_URL = 'https://coins.ph'
COINS_API_KEY = "09Wvsxce4IVBYfW1yIn4OnvlstObgTXNEeV0i7jY"
COINS_SECRET = "8PLwxbZpB3nW2N7kqRaIfkgja5kLTMO6VYUaJMLQ3Aea2yfv4K"


# For testing in sandbox
# COINS_BASE_URL = 'https://coins.ph'
# COINS_API_KEY = "09Wvsxce4IVBYfW1yIn4OnvlstObgTXNEeV0i7jY"
# COINS_SECRET = "8PLwxbZpB3nW2N7kqRaIfkgja5kLTMO6VYUaJMLQ3Aea2yfv4K"

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': os.path.join(PROJECT_ROOT, 'db.sqlite3'),
    },
    # 'mambu': {
    #     'ENGINE': 'django.db.backends.mysql',
    #     'NAME': 'phillipines',
    #     'USER': 'root',
    #     'PASSWORD': 'password',
    #     'HOST': 'localhost',
    #     'PORT': '3306',
    # },
    # 'mifosx': {
    #     'ENGINE': 'django.db.backends.mysql',
    #     'NAME': 'mifostenant-testing',
    #     'USER': 'root',
    #     'PASSWORD': 'password',
    #     'HOST': 'localhost',
    #     'PORT': '3306',
    # },
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

MIFOSX_USER = "aquila"
MIFOSX_PASSWORD = "MifosxSaTeCoCeMuBu1"
MIFOSX_TENANT = "test"
MIFOSX_SERVER_URL = "https://mentors.haedrian.io/mifosng-provider/api/v1/"
