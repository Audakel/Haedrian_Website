from .base import *

DEBUG = True
TEMPLATE_DEBUG = True

ADMINS = ()
MANAGERS = ADMINS

SECRET_KEY = 'TEST'

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

GEM_API_TOKEN = "0QZLYNhs-2v3MsGwcFf-dJQsEoS9VSMV_8a59B_GnwU"
GEM_ADMIN_TOKEN = "WdSRt2giHhuK13aicW173cgtcGV36TPm6uk1dOj9SJA"

COINS_API_KEY = "unZUljzAcdFEeWJzX9WfhwdBgjtBVzKEklsd5AkT"
COINS_SECRET = "NlfqOzqDwKEsRw7Uw9WNvRT2ktrIX5WN5X2hPFE09YnfITZjGh"