from django.test import TestCase
import pickle
from django.contrib.auth import get_user_model
from apiv1.tasks import update_coins_token
from haedrian.models import UserData

from sms.app import SMSapplication, get_deposit_types, sms_location

# Create your tests here.
from sms.sms_verify import verify_sender
from sms.strings import *
from django.core.management import call_command
from django.core import management


from haedrian.models import UserData, Transaction, Wallet
from datetime import timedelta, datetime
from django.contrib.auth import get_user_model


def setUpModule():
    print '+=+ +=+ +=+ Module setup... +=+ +=+ +=+ '
    management.call_command('loaddata', 'sms/fixtures/users.json', verbosity=0)
    update_coins_token()


class SMSTestCase(TestCase):
    # fixtures = ['users.json']

    r = random.randint(0, 99999)
    phone = '+639420023894'

    def incoming_msg(self, command, phone=''):
        with open('sms/sms_msg.txt', 'r') as f:
            msg = pickle.load(f)
        if phone:
            msg.connections[0].identity = phone
        msg.text = command
        return msg


    def process_msg(self, command):
        msg = self.incoming_msg(command, self.phone)
        sms = SMSapplication(msg)
        sms.handle(msg)
        return msg.responses[0]['text']



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
        self.assertEqual(self.process_msg(str_cmd_whoami), 'User: @{}'.format('audakel'))
        print('str_cmd_whoami: {}'.format(self.process_msg(str_cmd_whoami)))


    def test_location(self):
        options = '(0-Bdo Deposit) (1-Bpi Deposit) (2-Securitybank Deposit) (3-Union Deposit) '

        # Should default to BDO for SMS users
        self.assertTrue('PS - You are currently at Bdo Deposit' in self.process_msg(str_cmd_location))

        # Update deposit location
        print 'loc: {}'.format(self.process_msg('location 1'))
        self.assertTrue('PS - You are currently at Bpi Deposit' in self.process_msg('location 1'))

        # Check location command
        self.assertEqual(self.process_msg('location'), str_rsp_location_list.format(options))
    #
    #
    # def test_deposit(self):
    #     potentials = [(0, 'Bdo Deposit'), (1, 'Bpi Deposit'), (2, 'Securitybank Deposit'), (3, 'Union Deposit')]
    #     str_test = [str_test_bdo_deposit, str_test_bpi_deposit, str_test_securitybank_deposit, str_test_union_bank]
    #     username = get_user_model().objects.get(id=UserData.objects.get(phone=self.phone).user_id)
    #
    #     for i in range(0, len(potentials)):
    #         # Check correct deposit location message
    #         x = self.process_msg('location {}'.format(i))
    #         self.assertEqual(x, str_rsp_location_new.format(potentials[i][1]))
    #
    #         # Check correct deposit location in database
    #         db_location = UserData.objects.get(user=get_user_model().objects.get(username=username)).sms_deposit_location
    #         self.assertEqual(db_location.replace("_", " ").replace('-', ' ').title(), potentials[i][1])
    #
    #         # Get deposit instructions
    #         instructions = self.process_msg('repay {}'.format(40))
    #         if i == 0:
    #             # Can't match BDO reference number so just check info going up to it
    #             self.assertEqual(instructions[:118], (str_test[i])[:118])
    #         else:
    #             # Check for correct deposit instructions
    #             self.assertEqual(instructions, str_test[i])
    #
    #
    # def test_wallet(self):
    #     # Check for correct balance
    #     balance = self.process_msg('balance')
    #     self.assertEqual(balance, str_rsp_balance % ('PHP', 0, ':(', '', 'No loan out.', ''))
    #
    #     # Add bad MFI / id number
    #     self.assertEqual(self.process_msg('id 123'), str_err_known.format(str_err_no_mfi_or_id))
    #     self.assertEqual(self.process_msg('id badMfi 123'), str_err_known.format(str_err_mfi))
    #     self.assertEqual(self.process_msg('id test 9999999'), str_err_id % (9999999, 'Test'))
    #
    #     # Add correct MFI id number
    #     self.assertEqual(self.process_msg('id'), str_rsp_id)
    #     self.assertEqual(self.process_msg('id test 18'), str_rsp_acct_found % ('Andres', 'Garcia Lopez', 'active', 'Potrerillos'))
    #
    #     # Check db
    #     ud = UserData.objects.get(phone=self.phone)
    #     self.assertEqual(ud.application, 'test')
    #     self.assertEqual(ud.app_id, '18')
    #
    #     # Set location at Bdo Deposit, do a deposit and mark as done
    #     self.process_msg('location {}'.format(0))
    #     self.process_msg('repay {}'.format(45))
    #     done = self.process_msg('done')
    #
    #     # Check for correct 'done' response
    #     ud = UserData.objects.get(phone=self.phone)
    #     self.assertEqual(done, str_rsp_done % (45, 'Paid Pending Confirmation', ud.application.title()))







# str_cmd_send = 'send'
# str_cmd_repay = 'repay'
