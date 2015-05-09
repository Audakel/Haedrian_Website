from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import authentication
from rest_framework.decorators import api_view, authentication_classes
from django.conf import settings
from money import Money, xrates

from haedrian.models import Project, UserData, Transaction
from apiv1.serializers import ProjectSerializer, SendSerializer

# haedrian_account = UserData.objects.get(handle='@haedrian').user
xrates.install('apiv1.btc_exchange_rate.BTCExchangeBackend')

@api_view(http_method_names=['POST'])
@authentication_classes((authentication.BasicAuthentication, authentication.TokenAuthentication,))
def send(request):
    return _send(request.user, request.data)

def _send(user, data):
    haedrian_account = UserData.objects.get(handle='@haedrian').user
    """ Internal API for the SMS app to call as well """
    send_data = SendSerializer(data=data)
    if send_data.is_valid():
        sender = user
        # TODO figure out whether this is a handle, phone number or email.
        receiver = UserData.objects.get(handle=send_data.data['receiver']).user
        currency = UserData.objects.get(user=sender).default_currency
        amount_btc = Money(amount=send_data.data['amount_local'], currency=currency).to('BTC')
        amount_fee = amount_btc * settings.FEE_AMOUNT
        total_sent = amount_btc - amount_fee
        total_sent_local = Money(amount=total_sent.amount, currency='BTC').to(currency)
        fee_local = Money(amount=amount_fee.amount, currency='BTC').to(currency)
        transaction = Transaction(sender=sender, receiver=receiver,
                                  amount_btc=total_sent.amount, amount_btc_currency='BTC',
                                  amount_local=total_sent_local.amount, amount_local_currency=total_sent_local.currency)
        fee = Transaction(sender=sender, receiver=haedrian_account,
                          amount_btc=amount_fee.amount, amount_btc_currency='BTC',
                          amount_local=fee_local.amount, amount_local_currency=fee_local.currency)
        # TODO send with the wallet here
        fee.save()
        transaction.save()
        return Response(status=200)
    return Response(send_data.errors, status=400)


def history(request):
    return _history(request.user)

def _history(user):
    outgoing = Transaction.objects.filter(sender=user)
    incoming = Transaction.objects.filter(receiver=user)
    data = {'outgoing': 10, 'incoming': 36, 'loan': 528}

    return Response(data, status=200)


class Projects(APIView):
    """Create or list projects by a user
    * Requires token authentication.
    """
    authentication_classes = (authentication.TokenAuthentication,)
    # permission_classes = (permissions.IsAdminUser,)

    def get(self, request, format=None):
        """Return a list of all projects
        """
        snippets = Project.objects.all()
        serializer = ProjectSerializer(snippets, many=True)
        return Response(serializer.data)

    def post(self, request, format=None):
        serializer = ProjectSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=201)
        return Response(serializer.errors, status=400)
