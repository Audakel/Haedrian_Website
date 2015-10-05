import sys
from .base import *


EMAIL_HOST = 'smtp.gmail.com'
EMAIL_HOST_USER = 'aquila@haedrian.io'
EMAIL_PORT = 587
EMAIL_USE_TLS = True

COINS_BASE_URL = 'https://coins.ph'
COINS_API_KEY = "09Wvsxce4IVBYfW1yIn4OnvlstObgTXNEeV0i7jY"
COINS_SECRET = "8PLwxbZpB3nW2N7kqRaIfkgja5kLTMO6VYUaJMLQ3Aea2yfv4K"

DEBUG = False
TEMPLATE_DEBUG = DEBUG

try:
    EMAIL_HOST_PASSWORD = os.environ["DJANGO_EMAIL_PASSWORD"]
except KeyError:
    print("Error! You need to set the DJANGO_EMAIL_PASSWORD environment variable")
    sys.exit(1)

try:
    POSTGRES_PWD = os.environ["DJANGO_POSTGRES_PASSWORD"]
except KeyError:
    print("Error! You need to set the DJANGO_POSTGRES_PASSWORD environment variable")
    sys.exit(1)

# Database
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql_psycopg2',
        'NAME': 'django',
        'USER': 'aquila',
        'PASSWORD': POSTGRES_PWD,
        'HOST': 'haedrian.ctmlohvj0pex.us-west-1.rds.amazonaws.com', # connect through unix socket
    }
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
        "phone_id": "PN1370f45e6aa449c2",
        "secret": "AUH4PZMMLHN3XPHHHDW6MM3HURZ923XD",
        "api_key": "SMLXzvuupVOtIP9SIOU5hdXRlSkRwvaM",
    },
}

#MIDDLEWARE_CLASSES += ['subdomains.middleware.SubdomainURLRoutingMiddleware',]

## Broker settings.
# it looks like the guest account is enough since this is a local install
BROKER_URL = 'amqp://guest:guest@localhost:5672//'

MIFOSX_USER = "aquila"
MIFOSX_PASSWORD = "MifosxSaTeCoCeMuBu1"
MIFOSX_TENANT = "default"
MIFOSX_SERVER_URL = "https://mi-asia.haedrian.io/mifosng-provider/api/v1/"
