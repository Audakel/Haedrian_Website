from .base import *

DEBUG = True
TEMPLATE_DEBUG = True

ADMINS = ()
MANAGERS = ADMINS

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': os.path.join(PROJECT_ROOT, 'db.sqlite3'),
    }
}

INSTALLED_APPS = INSTALLED_APPS + ('debug_toolbar',)

STATICFILES_DIRS = STATICFILES_DIRS + (
    os.path.join(PROJECT_ROOT, 'haedrian', 'static'),
    os.path.join(PROJECT_ROOT, 'dashboard', 'static'),
)