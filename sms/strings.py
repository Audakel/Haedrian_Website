import random

__author__ = 'audakel'

def rando(type):
    if type is 'smiley':
        options = [':)', ':}', ':/', ';)', ':P', ':(']
    elif type is 'monkey':
        options = ['spider', 'squirrel', 'howler', 'woolly', 'hacker', 'capuchins']

    return random.choice(options)



str_usage_commands = "Usage Commands Examples {}\nRepay PHP150: 'repay 150'\nCheck balance: 'balance'" \
                     "\nChange deposit locations: 'location'\nTo get help: 'help'".format(rando('smiley'))

str_please_create_username="Hello! Please create a username.\nType '@' followed by your desired username. Example: @monkey"
str_deposit_locations = "1-Online banking, 2-Over-the-counter, 3-Bank, 4-Cash Deposit Machine, 5-Online bank, " \
                        "6-Mobile Money, 7-ATM, 8-Remittance center, 9-Prepaid card"
str_deposit_commands = "Dep 25"

str_error_unknown = "We are sorry, there has been an error :(  Don't worry, we are " \
                    "dispatching our team of highly trained {} monkeys to fix the problem.".format(rando('monkey'))