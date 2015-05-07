from django.shortcuts import render
from django.http import HttpResponse
from django_twilio.decorators import twilio_view
from twilio.twiml import Response

""" GET /sms/?ToCountry=US&
        ToState=WI&
        SmsMessageSid=SM2bb67b4a96abd75843b98f26fa7e9678&
        NumMedia=0&
        ToCity=MANITOWOC&
        FromZip=85040&
        SmsSid=SM2bb67b4a96abd75843b98f26fa7e9678&
        FromState=AZ&
        SmsStatus=received&
        FromCity=PHOENIX&
        Body=TestingText&
        FromCountry=US&
        To=%2B19206452134&
        ToZip=54220&
        MessageSid=SM2bb67b4a96abd75843b98f26fa7e9678&
        AccountSid=AC4f7dec744e3bcad378e19888b8213af3&
        From=%2B14803591947&
        ApiVersion=2010-04-01 HTTP/1.1
    """
#
# @twilio_view
def receive_text_message(request):
    return HttpResponse("Message ID: ")
    # TWILIO_ACCOUNT_SID = "AC4f7dec744e3bcad378e19888b8213af3"
    # TWILIO_AUTH_TOKEN  = "0c7b01582cbe2ce27123e2dc7ac983d6"
    #
    # name = request.POST.get('Body', '')
    # msg = 'Hey %s, how are you today?' % (name)
    # r = Response()
    # r.message(msg)
    # return r


    # if request.method == 'POST':
    #     account_sid = "AC4f7dec744e3bcad378e19888b8213af3"
    #     auth_token  = "0c7b01582cbe2ce27123e2dc7ac983d6"
    #     client = TwilioRestClient(account_sid, auth_token)
    #
    #     bodyTest = request.GET('Body', 'Error: Empty')
    #     toTest = "+14803591947"
    #     fromTest="+19206452134"
    #
    #     message = client.messages.create(body=bodyTest, to=toTest, from_=fromTest)
    #
    #     print message.sid
    #     return HttpResponse("Message ID: " + message.sid)

