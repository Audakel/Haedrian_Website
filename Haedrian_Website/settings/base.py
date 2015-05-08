# -*- coding: utf-8 -*-
import os
import sys

gettext_noop = lambda s: s

PROJECT_APP_ROOT = os.path.abspath(os.path.dirname(os.path.dirname(__file__)))
PROJECT_ROOT = os.path.abspath(os.path.dirname(PROJECT_APP_ROOT))
PUBLIC_ROOT = os.path.abspath(os.path.join(PROJECT_ROOT, 'public'))

TWILIO_ACCOUNT_SID = 'AC4f7dec744e3bcad378e19888b8213af3'
TWILIO_AUTH_TOKEN = '0c7b01582cbe2ce27123e2dc7ac983d6'

try:
    SECRET_KEY = os.environ["DJANGO_SECRET_KEY"]
except KeyError:
    print("Error! You need to set the DJANGO_SECRET_KEY environment variable")
    # sys.exit(1)

DEBUG = False
TEMPLATE_DEBUG = False

SITE_ID = 1

ALLOWED_HOSTS = (
    '104.236.160.220',
    'localhost',
    'haedrian.io'
)

ADMINS = (
    ('Haedrian Admins', 'haedrian.beta@gmail.com'),
    # remove later after proper email is set up
    ('James Rowe', 'jroweboy@gmail.com'),
)
MANAGERS = ADMINS

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
    # money handling is hard :p still need to mke the currency conversion
    'djmoney',
    # failed login request handling
    # TODO maybe production only?
    'axes',
    'rtwilio',
    # our apps
    'apiv1',
    'haedrian',
    # SMS and RapidSMS
    'rapidsms',
    'sms',
    # "rapidsms.contrib.handlers",
    # "rapidsms.contrib.default",

)

INSTALLED_BACKENDS = {
    "twilio-backend": {
        "ENGINE": "rtwilio.outgoing.TwilioBackend",
        'config': {
            'account_sid': 'AC4f7dec744e3bcad378e19888b8213af3',  # (required)
            'auth_token': '0c7b01582cbe2ce27123e2dc7ac983d6',  # (required)
            'number': '(920) 645-2134',  # your Twilio phone number (required)
            # optional callback URL
            # 'callback': 'http://<public-django-instance>/backend/twilio/status-callback/',
        }
    },
}

# RAPIDSMS_HANDLERS = [
#     'sms.myhandlers.HelpHandler',
#     'sms.myhandlers.SendHandler',
#     'sms.myhandlers.BalanceHandler',
#  ]

MIDDLEWARE_CLASSES = (
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
    'axes.middleware.FailedLoginMiddleware',
)

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
LANGUAGES = (
    'en', gettext_noop('English'),
)

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
    prefix=u'Ƀ '
)

_FORMATTER.add_formatting_definition(
    'en_us',
    group_size=0, group_separator="", decimal_point=".",
    positive_sign="",  trailing_positive_sign="",
    negative_sign="-", trailing_negative_sign="",
    rounding_method=ROUND_HALF_EVEN)

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
        'mail_admins': {
            'level': 'ERROR',
            'class': 'django.utils.log.AdminEmailHandler',
            'filters': ['require_debug_false'],
            'include_html': True,
        },
        'rapidsms_file': {
            'level': 'DEBUG',
            'class': 'logging.FileHandler',
            'filename': 'rapidsms.log',
        },
    },
    'loggers': {
        'django': {
            'handlers': ['mail_admins'],
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
    }
}
