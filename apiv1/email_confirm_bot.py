#!/usr/bin/env python

import re
import sys
import imaplib
import getpass
import email
from email.parser import Parser
import urlparse
import datetime
import webbrowser
import requests
from django.conf import settings

url_pattern = re.compile('(https://coins.ph/settings/confirm\?.*haedrian.io)')

aquila_u = settings.GMAIL_USER
aquila_p = settings.GMAIL_PASSWORD



def confirm_emails(username, password, sender_of_interest):

    # Login to INBOX
    m = imaplib.IMAP4_SSL("imap.gmail.com", 993)
    m.login(username, password)

    mailbox = m.select('Email Confirm- Coins')
    # Use search(), not status()
    status, data = m.search('Email Confirm- Coins', '(UNSEEN)')#('INBOX', '(UNSEEN)')
    unread_msg_nums = data[0].split()

    # Print the count of all unread messages
    print 'Unread messages :' + str(len(unread_msg_nums))

    # Print all unread messages from a certain sender of interest
    status, data = m.search(None, '(UNSEEN)', '(FROM "%s")' % (sender_of_interest))
    
    if status != 'OK':
        print "No new messages found!"
        return
        
    for num in reversed(data[0].split()):
        rv, data = m.fetch(num, '(RFC822)')
        if rv != 'OK':
            print "ERROR getting message", num
            return
        email_message = email.message_from_string(data[0][1])
        if email.utils.parseaddr(email_message['From'])[0] == sender_of_interest:
            #print 'cois.ph email detected'
            if email_message.is_multipart():
                print 'email is multi_part'
                for payload in email_message.get_payload():
                    parsed_result = url_pattern.findall(payload.get_payload(decode=True))
                    correct_url = parsed_result.replace("&amp;","&")
                    if not parsed_result:
                        print 'No match found for partern: {}'.format("(https://coins.ph/settings/confirm\?.*haedrian.io)") 
                    else:
                        req = requests.request('GET', correct_url)
                       #print 'request status:' + str(req.status_code)
                       #print 'confirmation done for:'+correct_url
                        break
            else:
                #print 'email is NOT multi_part'
                #print url_pattern.findall(email_message.get_payload(decode=True))
                parsed_result  = url_pattern.findall(email_message.get_payload(decode=True))[0]
                correct_url = parsed_result.replace("&amp;","&")
                req = requests.request('GET',correct_url)
                #print 'request status:' + str(req.status_code)
                #print 'confirmation done for:' + correct_url
    #not sure if necessary, since emails without this code are marked seen as well
    # Mark them as seen
    #careful
    #for e_id in unread_msg_nums:
    #    M.store(e_id, '+FLAGS', '\Seen')
 
# =================================MAIN CODE starts==================================            
def email_confirm_bot():
    confirm_emails(aquila_u, aquila_p, 'coins.ph')
