from rapidsms.apps.base import AppBase

from decimal import Decimal
from apiv1.views import _send
from haedrian.models import UserData
from rest_framework import status

class SMSApplication(AppBase):
    def handle(self, msg):
        parts = msg.text.lower().split(' ')
        command = parts[0]
        if command == 'ping':
            msg.respond('pong')
            return True
        elif command == 'send':
            try:
                amount = Decimal(parts[1])
            except:
                msg.respond("Error: Enter a monetary amount to send.")
                return True

            if amount < 0:
                msg.respond("Error: The amount to send must be positive")
                return True

            try:
                user = UserData.objects.get(phone=msg.connections[0].identity).user
            except: # User not found exception
                msg.respond("Error: You must register before sending money %s" %msg.connections[0].identity)
                return True

            receiver_name = parts[2]
            if receiver_name[0] != '@':
                msg.respond("Error: The receiver must be an @ handle.")
                return True
            try:
                UserData.objects.get(handle=receiver_name).user
            except:
                msg.respond("Error: Receiving party not found. Please check the @handle")
                return True

            data = {
                "receiver": receiver_name,
                "amount_local": amount,
            }
            try:
                response = _send(user, data)
            except Exception as e:
                msg.respond("Error something went wrong %s" %e)
                return True
            # print(dir(response))
            if response.status_code != status.HTTP_200_OK:
                msg.respond("Error while sending money.")
                return True
            msg.respond("Send completed successfully")
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