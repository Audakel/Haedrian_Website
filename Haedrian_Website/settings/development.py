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

INSTALLED_BACKENDS = {
    # "twilio-backend": {
    #     "ENGINE": "rtwilio.outgoing.TwilioBackend",
    #     'config': {
    #         'account_sid': 'AC4f7dec744e3bcad378e19888b8213af3',  # (required)
    #         'auth_token': '0c7b01582cbe2ce27123e2dc7ac983d6',  # (required)
    #         'number': '(920) 645-2134',  # your Twilio phone number (required)
    #         # optional callback URL
    #         # 'callback': 'http://<public-django-instance>/backend/twilio/status-callback/',
    #     }
    # },
    "telerivet": {
        "ENGINE": "rapidsms_telerivet.outgoing.TelerivetBackend",
        "project_id": "PJa61703ce18b3a11e",
        "phone_id": "PN50774ea8fb7cf4ca",
        "secret": "NQECMMP6W64LQNN7GKPZMUHQNL7PPP7E",
        "api_key": "SMLXzvuupVOtIP9SIOU5hdXRlSkRwvaM",
    },
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

# MIFOSX_USER = "aquila"
# MIFOSX_PASSWORD = "MifosxSaTeCoCeMuBu1"
MIFOSX_USER = "mifos"
MIFOSX_PASSWORD = "password"
MIFOSX_TENANT = "default"
MIFOSX_SERVER_URL = "https://{}.haedrian.io/mifosng-provider/api/v1/"
