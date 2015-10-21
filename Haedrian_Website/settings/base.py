# -*- coding: utf-8 -*-
import os
from datetime import timedelta
from celery.schedules import crontab
gettext_noop = lambda s: s

PROJECT_APP_ROOT = os.path.abspath(os.path.dirname(os.path.dirname(__file__)))
PROJECT_ROOT = os.path.abspath(os.path.dirname(PROJECT_APP_ROOT))
PUBLIC_ROOT = os.path.abspath(os.path.join(PROJECT_ROOT, 'public'))

#TODO fix this shiz
TWILIO_ACCOUNT_SID = 'AC4f7dec744e3bcad378e19888b8213af3'
TWILIO_AUTH_TOKEN = '0c7b01582cbe2ce27123e2dc7ac983d6'

GOOGLE_PLACES_API_KEY = 'AIzaSyA9koyYrNBHQKg3nATQKX_YvmjyqMs6eF4'

GMAIL_USER = 'aquila@haedrian.io'
GMAIL_PASSWORD = 'GmailSaTeCoCeMuBu1'

# Testing - need new ones.
# COINS_API_KEY = "unZUljzAcdFEeWJzX9WfhwdBgjtBVzKEklsd5AkT"
# COINS_SECRET = "NlfqOzqDwKEsRw7Uw9WNvRT2ktrIX5WN5X2hPFE09YnfITZjGh"

# COINS_API_KEY = "e8I58PvSGTznhAWRXfzVvP61jRcFaw7AGXdgIYNu"
# COINS_SECRET = "4X8RBUpKVA4ugaagvz7bcAATXS6REaL1wJFAsWa9AyrxR90RRZ"

# BTC or PHP
COINS_WALLET_TYPE = 'PHP'



try:
    SECRET_KEY = os.environ["DJANGO_SECRET_KEY"]
except KeyError:
    pass
    #print("Error! You need to set the DJANGO_SECRET_KEY environment variable")
    # sys.exit(1)

#DEBUG = False
#TEMPLATE_DEBUG = False

SITE_ID = 1

ALLOWED_HOSTS = (
    '104.236.160.220',
    'localhost',
    'haedrian.io',
    '127.0.0.1',
)

ADMINS = (
    ('Haedrian Admins', 'aquila@haedrian.io'),
    # remove later after proper email is set up
    ('James Rowe', 'jroweboy@gmail.com'),
    ('Alex Lin', '646114995@qq.com'),
)
MANAGERS = ADMINS

AUTHENTICATION_BACKENDS = (
    # 'haedrian.wallets.gem.GemBackend',
    'django.contrib.auth.backends.ModelBackend',
)

LOGIN_REDIRECT_URL = "/"

# Application definition

ROOT_URLCONF = 'Haedrian_Website.urls'
WSGI_APPLICATION = 'Haedrian_Website.wsgi.application'

INSTALLED_APPS = (
    # django builtin
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    # external applications 
    'django_countries',
    'rest_framework',
    'rest_framework.authtoken',
    'phonenumber_field',
    #'organizations',
    # money handling is hard :p still need to mke the currency conversion
    'djmoney',
    #'subdomains',
    # 'mptt',
    # failed login request handling
    # TODO maybe production only?
    'axes',
    # 'rtwilio',
    # our apps
    'apiv1',
    'haedrian',
    # SMS and RapidSMS
    'rapidsms_telerivet',
    'rapidsms',
    'sms',
    'rapidsms.contrib.messagelog',
    # 'django_google_places',
    'kombu.transport.django',
)

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
        "phone_id": "PN1370f45e6aa449c2",
        "secret": "AUH4PZMMLHN3XPHHHDW6MM3HURZ923XD",
        "api_key": "SMLXzvuupVOtIP9SIOU5hdXRlSkRwvaM",
    },
}


# RAPIDSMS_HANDLERS = [
#     'sms.myhandlers.HelpHandler',
#     'sms.myhandlers.SendHandler',
#     'sms.myhandlers.BalanceHandler',
#  ]

SESSION_COOKIE_AGE = 60 * 60 * 24 * 30 # One month

MIDDLEWARE_CLASSES = [
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
    'axes.middleware.FailedLoginMiddleware',
    # TODO Check with james on translations
    'django.middleware.locale.LocaleMiddleware',
]

# Templates
TEMPLATE_LOADERS = (
    'django.template.loaders.filesystem.Loader',
    'django.template.loaders.app_directories.Loader',
)

TEMPLATE_CONTEXT_PROCESSORS = (
    'django.contrib.auth.context_processors.auth',
    'django.core.context_processors.debug',
    'django.core.context_processors.i18n',
    'django.core.context_processors.media',
    'django.core.context_processors.request',
    'django.core.context_processors.static',
    'django.core.context_processors.tz',
    'django.contrib.messages.context_processors.messages',
)

TEMPLATE_DIRS = (
    os.path.join(PROJECT_ROOT, 'templates'),
    os.path.join(PROJECT_ROOT, 'haedrian', 'templates'),
    os.path.join(PROJECT_ROOT, 'dashboard', 'templates'),
)

TEST_RUNNER = 'django.test.runner.DiscoverRunner'

# Internationalization
LANGUAGE_CODE = 'en-us'
# Django has strong defaults for this setting so we probably don't need it?
# LANGUAGES = (
#     ('en', gettext_noop('English')),
# )

TIME_ZONE = 'America/Denver'
USE_I18N = True
USE_L10N = True
USE_TZ = True

LOCALE_PATHS = (os.path.join(PROJECT_ROOT, 'locale'),)

# Static files (CSS, JavaScript, Images)

STATIC_URL = '/static/'
MEDIA_URL = '/media/'

STATIC_ROOT = os.path.join(PUBLIC_ROOT, 'static')
MEDIA_ROOT = os.path.join(PUBLIC_ROOT, 'media')

STATICFILES_DIRS = (
    os.path.join(PROJECT_ROOT, 'static'),
)

STATICFILES_FINDERS = (
    'django.contrib.staticfiles.finders.FileSystemFinder',
    'django.contrib.staticfiles.finders.AppDirectoriesFinder',
)

# Common celery settings

# CELERY_ANNOTATIONS = {'tasks.add': {'rate_limit': '10/s'}}
CELERY_DISABLE_RATE_LIMITS = True
CELERYD_TASK_SOFT_TIME_LIMIT = 60
#: Only add pickle to this list if your broker is secured
#: from unwanted access (see userguide/security.html)
CELERY_ACCEPT_CONTENT = ['json']
CELERY_TASK_SERIALIZER = 'json'
CELERY_RESULT_SERIALIZER = 'json'

CELERYBEAT_SCHEDULE = {
    'check-verify-send-que': {
        'task': 'apiv1.tasks.verify_send_que',
        'schedule': timedelta(minutes=1),
    },
    'update-exchange-rates': {
        'task': 'haedrian.tasks.fetch_exchange_rates',
        'schedule': timedelta(minutes=30),
    },
    'refresh-coins-token': {
        'task': 'apiv1.tasks.update_coins_token',
        'schedule': timedelta(hours=4),
    },
    'confirm-coinsph-emails': {
        'task': 'apiv1.tasks.email_confirm_bot',
        'schedule': timedelta(minutes=10),
    },
    'exchange-confirmed-checker': {
        'task': 'sms.tasks.exchange_confirmed_checker',
        'schedule': timedelta(minutes=2),
        # 'schedule': timedelta(hours=2),
    },

}

# countries conf
COUNTRIES_FIRST = (
    'US',
)
COUNTRIES_FIRST_REPEAT = True

# rest conf
REST_FRAMEWORK = {
    # Use Django's standard `django.contrib.auth` permissions,
    # or allow read-only access for unauthenticated users.
    'DEFAULT_PERMISSION_CLASSES': [
        'rest_framework.permissions.IsAuthenticated',
        # 'rest_framework.permissions.DjangoModelPermissionsOrAnonReadOnly'
    ],
    'DEFAULT_AUTHENTICATION_CLASSES': [
        'rest_framework.authentication.BasicAuthentication',
        'rest_framework.authentication.SessionAuthentication',
        'rest_framework.authentication.TokenAuthentication',
    ],
    # 'EXCEPTION_HANDLER': 'apiv1.views.common_exception_handler',
    'TEST_REQUEST_DEFAULT_FORMAT': 'json',
}

# define the bitcoin currency for python money

import moneyed
from moneyed.localization import _FORMATTER
from decimal import Decimal, ROUND_HALF_EVEN

FEE_AMOUNT = Decimal(".01") # as a decimal number 1 = 100% .01 = 1%

# see http://en.wikipedia.org/wiki/ISO_4217#Unofficial_currency_codes

BITCOIN = moneyed.add_currency(
    code='BTC',
    numeric='',
    name='Bitcoin',
    countries=('', )
)

_FORMATTER.add_sign_definition(
    'default',
    BITCOIN,
    prefix=u'Ƀ'
)



# _FORMATTER.add_formatting_definition(
#     'btc_BTC',
#     group_size=3, group_separator="", decimal_point=".",
#     positive_sign="",  trailing_positive_sign="",
#     negative_sign="-", trailing_negative_sign="",
#     rounding_method=ROUND_HALF_EVEN
# )

# Logging

LOGGING = {
    'version': 1,
    'disable_existing_loggers': False,
    'formatters': {
        'simple': {
            'format': '%(levelname)s %(message)s'
        },
    },
    'filters': {
        'require_debug_false': {
            '()': 'django.utils.log.RequireDebugFalse',
        }
    },
    'handlers': {
        'null': {
            'level': 'DEBUG',
            'class': 'django.utils.log.NullHandler',
        },
        'console': {
            'level': 'DEBUG',
            'class': 'logging.StreamHandler',
            'formatter': 'simple'
        },
        'celery': {
            'level': 'ERROR',
            'class': 'logging.FileHandler',
            'filename': os.path.join(PROJECT_ROOT, 'celery.log'),
        },
        'error_log': {
            'level': 'ERROR',
            'class': 'logging.FileHandler',
            'filename': os.path.join(PROJECT_ROOT, 'django_error.log'),
        },
        'mail_admins': {
            'level': 'ERROR',
            'class': 'django.utils.log.AdminEmailHandler',
            'filters': ['require_debug_false'],
            'include_html': True,
        },
        'rapidsms_file': {
            'level': 'DEBUG',
            'class': 'logging.FileHandler',
            'filename': os.path.join(PROJECT_ROOT, 'rapidsms.log'),
        },
        'file': {
            'level': 'DEBUG',
            'class': 'logging.FileHandler',
            'filename': 'hotfix_debug.log',

        },

    },
    'loggers': {
        'django': {
            'handlers': ['mail_admins',],
            'level': 'ERROR',
            'propagate': False,
        },
        'django.db.backends': {
            'handlers': ['null'],
            'level': 'DEBUG',
        },
        'py.warnings': {
            'handlers': ['null'],
            'level': 'WARNING',
            'propagate': False,
        },
        'rapidsms': {
            'handlers': ['rapidsms_file'],
            'propagate': True,
            'level': 'DEBUG',
        },
        'celery': {
            'handlers': ['celery', 'console'],
            'level': 'ERROR',
        },
        'hotfix': {
            'handlers': ['file'],
            'level': 'DEBUG',
        },
    }
}
