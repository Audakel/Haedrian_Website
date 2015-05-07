from rapidsms.apps.base import AppBase

from decimal import Decimal
from apiv1.views import _send
from haedrian.models import UserData

class SMSApplication(AppBase):
    def handle(self, msg):
        parts = msg.text.split(' ')
        command = parts[0].trim().lower()
        if command == 'ping':
            msg.respond('pong')
            return True
        elif command == 'send':
            try:
                amount = Decimal(parts[1].trim().lower())
            except:
                self.respond("Error: Enter a monetary amount to send.")
                return False

            if amount < 0:
                self.respond("Error: The amount to send must be positive")
                return False

            try:
                user = UserData.objects.get(phone_number=msg.number).user
            except: # User not found exception
                self.respond("Error: You must register before sending money")
                return False

            receiver_name = parts[2].trim().lower()
            if receiver[0] != '@':
                self.respond("Error: The receiver must be an @ handle.")
                return False
            try:
                receiver = UserData.objects.get(handle=receiver_name).user
            except:
                self.respond("Error: Receiving party not found. Please check the @handle")
                return False

            data = {
                "receiver": receiver,
                "amount_local": amount,
            }
            response = _send(user, data)
            if response.status != status.OK:
                self.respond("Error while sending money.")
                return False
            self.respond("Send completed successfully")
            return True
        return False

# from rapidsms.contrib.handlers import KeywordHandler

# # TODO: use django translation
# help_text = {
#     'send': 'Help for send',
#     'bbb': 'Help for bbb',
#     'ccc': 'Help for ccc',
# }


# class HelpHandler(KeywordHandler):
#     keyword = "help"

#     def help(self):
#         """Invoked if someone just sends `HELP`.  We also call this
#         from `handle` if we don't recognize the arguments to HELP.
#         """
#         self.respond("Allowed commands are AAA, BBB, and CCC. Send "
#                      "HELP <command> for more help on a specific command.")

#     def handle(self, text):
#         """Invoked if someone sends `HELP <any text>`"""
#         text = text.strip().lower()
#         if text == 'aaa':
#             self.respond(help_text['aaa'])
#         elif text == 'bbb':
#             self.respond(help_text['bbb'])
#         elif text == 'ccc':
#             self.respond(help_text['ccc'])
#         else:
#             self.help()

# from decimal import Decimal
# from apiv1.views import _send
# from haedrian.models import UserData

# class SendHandler(KeywordHandler):
#     keyword = "send"
	
# 	def help(self):
# 		self.respond(help_text['send'])

#     # def send(self):
#     #     self.respond("Send me some money")

#     def handle(self, text):
#         amount = Decimal(text.strip().lower())
#         if amount > 0:
#         	user = UserData.objects.get()
#         	data = 
#         	response = _send()
#             self.respond("Sent: " + text)
#         else:
#             self.help()

# class BalanceHandler(KeywordHandler):
#     keyword = "balance"

#     def balance(self):
#         self.respond("Your balance is $19")