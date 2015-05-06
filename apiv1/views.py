from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import authentication, permissions
from rest_framework.decorators import api_view, authentication_classes
from rest_framework import status

from haedrian.models import Project, UserData, BitcoinRates, Transaction
from apiv1.serializers import ProjectSerializer, SendSerializer

@api_view(http_method_names=['POST'])
@authentication_classes(authentication.TokenAuthentication)
def send(request):
    send_data = SendSerializer(request.data)
    if send_data.is_valid():
        # convert amount to bitcoin using best exchange rates?
        sender = request.user
        # TODO figure out whether this is a handle, phone number or email.
        receiver = UserData.objects.get(handle=send_data.receiver).user
        currency = UserData.objects.get(user=sender).default_currency
        amount_btc = BitcoinRates.objects.get(code=currency).rate * send_data.amount_local
        transaction = Transaction(sender=sender, receiver=receiver, amount_btc=amount_btc, amount_local=send_data.amount_local)

        transaction.save()
        return Response(status=201)
    return Response(status=400)

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
