from django.core.management import call_command
from apiv1.tasks import update_coins_token

__author__ = 'audakel'
from django.core.management.base import BaseCommand, CommandError

class Command(BaseCommand):

    def add_arguments(self, parser):
        pass
        # parser.add_argument('poll_id', nargs='+', type=int)

    def handle(self, *args, **options):
        update_coins_token()

        output_filename = 'sms/fixtures/users.json'
        try:
            output = open(output_filename, 'w')
            self.stdout.write('output open')
            call_command('dumpdata', 'auth.User', 'haedrian', 'apiv1', format='json', indent=3, stdout=output)
            output.close()
            self.stdout.write('output close')
        except Exception as e:
            return str(e)

