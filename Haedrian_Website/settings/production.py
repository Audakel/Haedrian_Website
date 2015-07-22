import sys
from .base import *


EMAIL_HOST = 'smtp.gmail.com'
EMAIL_HOST_USER = 'aquila@haedrian.io'
EMAIL_PORT = 587
EMAIL_USE_TLS = True

COINS_BASE_URL = 'https://coins.ph'
COINS_API_KEY = "09Wvsxce4IVBYfW1yIn4OnvlstObgTXNEeV0i7jY"
COINS_SECRET = "8PLwxbZpB3nW2N7kqRaIfkgja5kLTMO6VYUaJMLQ3Aea2yfv4K"

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

#MIDDLEWARE_CLASSES += ['subdomains.middleware.SubdomainURLRoutingMiddleware',]

## Broker settings.
# it looks like the guest account is enough since this is a local install
BROKER_URL = 'amqp://guest:guest@localhost:5672//'

MIFOSX_USER = "aquila"
MIFOSX_PASSWORD = "MifosxSaTeCoCeMuBu1"
MIFOSX_TENANT = "default"
MIFOSX_SERVER_URL = "https://mentors.haedrian.io/mifosng-provider/api/v1/"
