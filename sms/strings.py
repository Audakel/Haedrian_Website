import random

__author__ = 'audakel'

def rando(type):
    if type is 'smiley':
        options = [':)', ':}', ':/', ';)', ':P', ':]']
    elif type is 'monkey':
        options = ['spider', 'squirrel', 'howler', 'woolly', 'hacker', 'capuchins']
    return random.choice(options)


# ==============================
# Error Messages
# ==============================
str_err_unknown = "We are sorry, there has been an error :(  Don't worry, we are " \
                    "dispatching our team of highly trained {} monkeys to fix the problem.".format(rando('monkey'))
str_err_known = "Error... Sorry! We are not that clever :(. We think it might be {}"
str_err_id = 'Yikes! Sorry about that, but your ID (%s) was not found in %s\'s client list :(. Did you type it in correctly?'
str_err_no_mfi_or_id = 'that you forgot the MFI or your ID'
str_err_mfi = 'your MFI\'s name was typed in wrong'

# ==============================
# Response Messages
# ==============================
str_rsp_location_list = "Please reply with 'location' and the number of your desired deposit location: {}- Thanks! " \
                        "(ie: location 3) PS - You are currently at {}"
str_rsp_location_new = "Your new deposit location is '{}'. Nice! Sent with <3 from Curo team."
str_rsp_repay = "Please deposit the exact cash amount (%s PHP) at any %s location to the following account: \nAccount name: %s\nAccount number: %s\nAccount type: %s%s" \
                   "\nIMPORTANT! Once you have deposited the money, reply with 'done' to mark you deposit as complete. Thanks!"
str_rsp_done = "Congrats! Your PHP %s deposit is '%s'. We will notify you when your repayment has been received by %s."
str_rsp_balance = "You have %s %s available in your wallet %s %s %s %s Sent with <3 from the Curo team."
str_rsp_id = "Help us know who you are {}. Please reply with 'id' followed by your MFI and then your borrower number. Thanks! " \
             "Example: 'id mentors 24356'".format(rando('smiley'))
str_rsp_acct_found = "Hi %s %s! We found an %s account in the %s office that matches. Text 'balance' to check your " \
                     "loan status. If this is not you, would you mind texting back the correct id? Example - 'id mentors 6184543"
str_rsp_usage_commands = "Usage Commands Examples {}\nRepay PHP150: 'repay 150'\nCheck balance: 'balance'" \
                     "\nChange deposit locations: 'location'\nHow to input your MFI id: 'id'\nTo get help: 'help'".format(rando('smiley'))
str_rsp_create_username = "Hello! Please create a username.\nType '@' followed by your desired username. Example: @monkey"


# ==============================
# User Commands
# ==============================
str_cmd_balance = 'balance'
str_cmd_send = 'send'
str_cmd_help = 'help'
str_cmd_whoami = 'whoami'
str_cmd_repay = 'repay'
str_cmd_done = 'done'
str_cmd_location = 'location'
str_cmd_id = 'id'


# ==============================
# Test Strings
# ==============================
str_test_union_bank = str_rsp_repay % (40, 'UnionBank of the Philippines', 'BETUR INC.', '000910028667', 'CHECKING', '')
str_test_securitybank_deposit = str_rsp_repay % (40, 'Security Bank', 'BETUR INC.', '0000', 'CURRENT', '')
str_test_bpi_deposit = str_rsp_repay % (40, 'BPI ', 'BETUR INC.', '8371', 'CURRENT', '')
str_test_bdo_deposit = str_rsp_repay % (40, 'BDO', 'BETUR INC.', '8170015060', 'SAVINGS', 'Your reference number is: 887946165552')

