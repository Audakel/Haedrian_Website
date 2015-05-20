from .base import *

try:
    POSTGRES_PWD = os.environ["DJANGO_POSTGRES_PASSWORD"]
except KeyError:
    print("Error! You need to set the DJANGO_SECRET_KEY environment variable")
    sys.exit(1)

# Database
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql_psycopg2',
        'NAME': 'django',
        'USER': 'django',
        'PASSWORD': POSTGRES_PWD,
        'HOST': '', # connect through unix socket
    }
}

MIDDLEWARE_CLASSES += ['subdomains.middleware.SubdomainURLRoutingMiddleware',]
