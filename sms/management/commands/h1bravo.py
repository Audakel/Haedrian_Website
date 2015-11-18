import os
from django.core.management import call_command
from apiv1.tasks import update_coins_token

__author__ = 'audakel'
from django.core.management.base import BaseCommand, CommandError

class Command(BaseCommand):

    def add_arguments(self, parser):
        pass
        # parser.add_argument('poll_id', nargs='+', type=int)

    def handle(self, *args, **options):
        branch_name = os.system('$(git name-rev --name-only HEAD)')
        print 'github branch: {}'.format(branch_name)


