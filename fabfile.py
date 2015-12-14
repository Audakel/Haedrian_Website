__author__ = 'audakel'
import fabric
import os
import django
from fabric.api import *
# from django.conf import settings
# os.environ.setdefault("DJANGO_SETTINGS_MODULE", "Haedrian_Website.settings")
# django.setup()

# TODO take out and put in envariables or settings - has issues pulling in variables from settings for some reason rn
# POSTGRES stuff
DJANGO_SECRET_KEY = "rn27xL6xFqH7U6ypy2x9Vb3D3tCFWs5ECv8VCe46WhCZFAmFXC"
DJANGO_POSTGRES_PASSWORD="PostgresSaTeCoCeMuBu1"
DJANGO_EMAIL_PASSWORD = "GmailSaTeCoCeMuBu1"
# 7073de6a6fc691a46f0558cd826a58d188a8b80a github key
def prep_deploy():
    branch_name = fabric.operations.prompt("Please confirm the branch your are preparing to deploy: ")
    local('python manage.py makemigrations')
    local('python manage.py migrate')
    local('python manage.py preptest')
    local('python manage.py test sms.tests')
    local('git add -p && git commit')
    local('git checkout master && git pull && git merge ' + branch_name)
    local('sudo pip install -r requirements.txt')
    local('python manage.py test sms.tests')
    local("git push")

def deploy():
    env.host_string = 'haedrian.io'
    env.user = fabric.operations.prompt("Please enter your username for the live Haedrian server: ")
    postgres_connection = 'DJANGO_SECRET_KEY={} DJANGO_POSTGRES_PASSWORD={} DJANGO_EMAIL_PASSWORD={}'.format(
        DJANGO_SECRET_KEY, DJANGO_POSTGRES_PASSWORD, DJANGO_EMAIL_PASSWORD)
        # settings.DJANGO_SECRET_KEY, settings.DJANGO_POSTGRES_PASSWORD, settings.DJANGO_EMAIL_PASSWORD)

    puts('Pulling from git!')
    sudo('cd /home/django/Haedrian_Website && git pull')

    with prefix('cd /home/django && source virtenv/bin/activate'):
        sudo('cd Haedrian_Website && pip install -r requirements.txt')
        sudo('cd Haedrian_Website && ' + postgres_connection + ' python manage.py makemigrations')
        sudo('cd Haedrian_Website && ' + postgres_connection + ' python manage.py migrate')

    # sudo('service nginx restart')
    sudo('supervisorctl status gunicorn | sed "s/.*[pid ]\([0-9]\+\)\,.*/\1/" | xargs kill -HUP')

    sudo('cowsay It appears like everything has gone according to plan.')



