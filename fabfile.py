__author__ = 'audakel'
from fabric.api import local

def prepare_deployment(branch_name):
    local('python manage.py makemigrations')
    local('python manage.py migrate')
    local('python manage.py test sms.tests')
    local('git add -p && git commit')
    local('git checkout master && git pull && git merge ' + branch_name)