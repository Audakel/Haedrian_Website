import os
from django.test import TestCase
import pickle
from django.contrib.auth import get_user_model
from apiv1.tasks import update_coins_token
from haedrian.models import UserData

from sms.app import SMSapplication, get_deposit_types, sms_location

# Create your tests here.
from sms.models import Signup, PendingDeposit
from sms.sms_verify import verify_sender
from sms.strings import *
from django.core.management import call_command
from django.core import management


from haedrian.models import UserData, Transaction, Wallet
from datetime import timedelta, datetime
from django.contrib.auth import get_user_model



def setUpModule():

    management.call_command('loaddata', 'sms/fixtures/users.json', verbosity=0)


class SMSTestCase(TestCase):
    # fixtures = ['users.json']

    # Change user if AssertionError: Amount has reached your daily cash-in limit and can only be up to 15.35 PHP.'
    # test_user = 'raichu'
    # phone = '+639420023894'
    test_user = 'mankey'
    phone = '+639420023895'

    def incoming_msg(self, command, phone=''):
        with open('sms/sms_msg.txt', 'r') as f:
            msg = pickle.load(f)
        if phone:
            msg.connections[0].identity = phone
        msg.text = command
        return msg


    def process_msg(self, command, phone=phone):
        msg = self.incoming_msg(command, phone)
        sms = SMSapplication(msg)
        sms.handle(msg)
        print('response: {}'.format(msg.responses))
        return msg.responses[0]['text'] if msg.responses else ''



    def setUp(self):
        # Set up PH phone number
        pass
        # verify_sender(self.incoming_msg('hello', self.phone))
        # verify_sender(self.incoming_msg('@test_ph_{}'.format(self.r), self.phone))


# +==========================+
#   Start test cases
# +==========================+

    def test_simple_sms(self):
        # Check help and user command
        self.assertEqual(self.process_msg(str_cmd_help), str_rsp_usage_commands)
        self.assertEqual(self.process_msg(str_cmd_whoami), 'User: @{}'.format(self.test_user))


    def test_location(self):
        options = '(0-Bdo Deposit) (1-Bpi Deposit) (2-Securitybank Deposit) (3-Union Deposit) '

        # Update deposit location
        self.assertTrue('Bpi Deposit' in self.process_msg('location 1'))

        # Check location command
        self.assertTrue(options in self.process_msg(str_cmd_location))


    def test_deposit(self):
        potentials = [(0, 'Bdo Deposit'), (1, 'Bpi Deposit'), (2, 'Securitybank Deposit'), (3, 'Union Deposit')]
        str_test = [str_test_bdo_deposit, str_test_bpi_deposit, str_test_securitybank_deposit, str_test_union_bank]
        username = get_user_model().objects.get(id=UserData.objects.get(phone=self.phone).user_id)

        for i in range(0, len(potentials)):
            # Check correct deposit location message
            x = self.process_msg('location {}'.format(i))
            self.assertEqual(x, str_rsp_location_new.format(potentials[i][1]))

            # Check correct deposit location in database
            db_location = UserData.objects.get(user=get_user_model().objects.get(username=username)).sms_deposit_location
            self.assertEqual(db_location.replace("_", " ").replace('-', ' ').title(), potentials[i][1])

            # Get deposit instructions
            instructions = self.process_msg('repay {}'.format(40))
            if i == 0:
                # Can't match BDO reference number so just check info going up to it

                print('test: {}'.format(str_test[i])[:118])
                print('actual: {}'.format(instructions[:118]))
                self.assertTrue((str_test[i])[:115] in instructions)
            else:
                # Check for correct deposit instructions
                self.assertEqual(instructions, str_test[i])


    def test_wallet(self):
        # Check for correct balance
        balance = self.process_msg('balance')
        self.assertEqual(balance, str_rsp_balance % ('PHP', 0, ':(', '', 'No loan out.', ''))

        # Add bad MFI / id number
        self.assertEqual(self.process_msg('id 123'), str_err_known.format(str_err_no_mfi_or_id))
        self.assertEqual(self.process_msg('id badMfi 123'), str_err_known.format(str_err_mfi))
        self.assertEqual(self.process_msg('id test 9999999'), str_err_id % (9999999, 'Test'))

        # Add correct MFI id number
        self.assertEqual(self.process_msg('id'), str_rsp_id)
        if self.test_user == 'raichu':
            self.assertTrue('User data with this Organization and Org id already exists' in self.process_msg('id test 18'))
        self.assertTrue(self.process_msg('id test 188'), str_rsp_acct_found % ('Elsa', 'Aguilar Calix', 'active', 'Potrerillos'))

        # Check db
        sms_info = self.process_msg('info')
        self.assertTrue('test' in sms_info)
        self.assertTrue('188' in sms_info)

        # Set location at Bdo Deposit, do a deposit and mark as done
        self.process_msg('location {}'.format(0))
        self.process_msg('repay {}'.format(45))
        done = self.process_msg('done')

        # Check for correct 'done' response
        ud = UserData.objects.get(phone=self.phone)
        self.assertEqual(done, str_rsp_done % (45, 'Paid Pending Confirmation', ud.organization.title()))


    def test_model(self):
        signup = Signup.objects.create(
            phone_number='+14105521082',
            user_handle='@snorlax'
        )
        pending_deposit = PendingDeposit.objects.create(
            user=get_user_model().objects.get(username='{}'.format(self.test_user)),
            order_id='123abc',
            user_confirmed=True,
            exchange_confirmed=True,
            expired=False,
            amount=500,
            currency='PHP'
        )

        self.assertEqual('@snorlax', Signup.objects.get(phone_number='+14105521082').user_handle)


    def test_signup(self):
        r = random.randint(0, 99999)
        phone1 = '+14105521089'
        phone2 = '+14105521011'

        self.assertEqual(self.process_msg('hello', phone1), str_rsp_create_username)
        self.assertTrue(Signup.objects.filter(phone_number=phone1).exists())

        self.assertTrue('Sadly, @{} was already taken'.format(self.test_user) in self.process_msg('@{}'.format(self.test_user), phone1))

        un = '@test_ph_{}'.format(r)
        self.assertEqual(self.process_msg('hello', phone2), str_rsp_create_username)
        self.assertEqual(self.process_msg(un, phone2), ("Welcome %s!\n%s" % (un, str_rsp_usage_commands)))
        self.assertEqual(self.process_msg(str_cmd_whoami, phone2), 'User: {}'.format(un))

        # Should default to BDO for SMS users
        self.assertTrue('PS - You are currently at Bdo Deposit' in self.process_msg(str_cmd_location, phone2))

        # Check for correct balance
        balance = self.process_msg('balance', phone2)
        self.assertEqual(balance, str_rsp_balance % ('PHP', 0, ':(', '', 'No loan out.', ''))




# TODO:: str_cmd_repay = 'repay'
