from django.http import HttpResponseRedirect
from rest_framework.response import Response
from rest_framework import authentication
from rest_framework.decorators import api_view, authentication_classes, permission_classes
from money import xrates
from rest_framework.throttling import UserRateThrottle
from rest_framework.permissions import AllowAny
from rest_framework.authtoken.models import Token
from apiv1._views import _create_wallet, _new_user, _get_exchanges, _send_to_user_handle, _send_to_address, \
    _get_pending_balance, _get_balance, _get_wallet_info, _get_address, _get_exchange_fees, _get_exchange_types
from rest_framework.decorators import api_view, authentication_classes
from django.conf import settings
from django.contrib.auth import get_user_model
from money import Money, xrates
from haedrian.models import Transaction, Wallet
from apiv1.serializers import SendSerializer
from coins_ph.wallet_commands import *
from haedrian.wallets.coins_ph import CoinsPhWallet
from haedrian.google.places import GooglePlaces
from haedrian.google.lang import *
from haedrian.views import _create_account
import requests
from haedrian.models import UserData

xrates.install('apiv1.btc_exchange_rate.BTCExchangeBackend')

class OncePerDayUserThrottle(UserRateThrottle):
        rate = '10/day'

default_response_200 = {}
default_response_400 = {"success": False, "error": ""}

# finaltest4
# testendpoint
global_user = get_user_model().objects.get(username='newtoken8')


@api_view(http_method_names=['POST'])
@permission_classes((AllowAny,))
# @throttle_classes([OncePerDayUserThrottle])
def new_user(request):
    try:
        data = _new_user(request.data)
        return Response(data)
    except Exception as e:
        return Response(default_response_400.update(error=e.message), status=400)


@api_view(http_method_names=['GET'])
@authentication_classes((authentication.BasicAuthentication, authentication.TokenAuthentication,))
def get_exchanges(request):
    try:
        data = _get_exchanges(global_user, request.data)
        # data = _get_exchanges(request.user, request.data)
        return Response(data=data)
    except:
        return Response(status=400)


@api_view(http_method_names=['GET'])
@authentication_classes((authentication.BasicAuthentication, authentication.TokenAuthentication,))
def get_exchange_fees(request):
    try:
        data = _get_exchange_fees(global_user, request.data)
        # data = _get_exchange_fees(request.user, request.data)
        return Response(data)
    except:
        return Response(status=400)


@api_view(http_method_names=['GET'])
@authentication_classes((authentication.BasicAuthentication, authentication.TokenAuthentication,))
def get_exchange_types(request):
    try:
        data = _get_exchange_types(global_user, request.data)
        # data = _get_exchange_types(request.user, request.data)
        return Response(data)
    except:
        return Response(status=400)

@api_view(http_method_names=['GET'])
@authentication_classes((authentication.BasicAuthentication, authentication.TokenAuthentication,))
def get_address(request):
    try:
        data = _get_address(global_user, request.data)
        # data = _get_address(request.user, request.data)
        return Response(data)
    except:
        return Response(status=400)


@api_view(http_method_names=['GET'])
@authentication_classes((authentication.BasicAuthentication, authentication.TokenAuthentication,))
def get_wallet_info(request):
    try:
        data = _get_wallet_info(global_user, request.data)
        # data = _get_user_wallet_handel(request.user, request.data)
        return Response(data=data)
    except:
        return Response(status=400)


@api_view(http_method_names=['GET'])
@authentication_classes((authentication.BasicAuthentication, authentication.TokenAuthentication,))
def get_balance(request):
    try:
        data = _get_balance(global_user, request.data)
        # data = _get_balance(request.user, request.data)
        return Response(data)
    except Exception as e:
        return Response(e.message, status=400)

@api_view(http_method_names=['GET'])
@authentication_classes((authentication.BasicAuthentication, authentication.TokenAuthentication,))
def get_pending_balance(request):
    try:
        data = _get_pending_balance(global_user, request.data)
        # data = _get_pending_balance(request.user, request.data)
        return Response(default_response_200.update(data=data))
    except:
        return Response(status=400)


@api_view(http_method_names=['POST'])
@authentication_classes((authentication.BasicAuthentication, authentication.TokenAuthentication,))
def send_to_address(request):
    try:

        data = _send_to_address(global_user, request.data)
        # data = _send_to_address(request.user, request.data)
        return Response(data, status=200)
    except Exception as e:
        return Response(e.message, status=400)


@api_view(http_method_names=['POST'])
@authentication_classes((authentication.BasicAuthentication, authentication.TokenAuthentication,))
def send_to_user_handle(request):
    try:
        data = _send_to_user_handle(global_user, request.data)
        # data = _send_to_user_handle(request.user, request.data)
        return Response(default_response_200.update(data=data))
    except:
        return Response(status=400)


@api_view(http_method_names=['POST'])
@authentication_classes((authentication.BasicAuthentication, authentication.TokenAuthentication,))
def create_wallet(request):
    try:
        data = _create_wallet(global_user, request.data)
        # data = _create_wallet(request.user, request.data)
        return Response(data)
    except:
        return Response(status=400)


@api_view(http_method_names=['GET'])
@authentication_classes((authentication.BasicAuthentication, authentication.TokenAuthentication,))
def get_locations(request):
    try:
        data = _get_locations(global_user, request.data)
        # data = _get_locations(request.user, request.data)
        return Response(data)
    except Exception as e:
        return Response(e.message, status=400)


def _get_locations(user, data):
    try:
        google_places = GooglePlaces('AIzaSyA9koyYrNBHQKg3nATQKX_YvmjyqMs6eF4')
        data = google_places.text_search("bank")
        return Response(data.raw_response.values)
    except Exception as e:
        return e.message









# Testing for coins.ph


# class Projects(APIView):
#     """Create or list projects by a user
#     * Requires token authentication.
#     """
#     authentication_classes = (authentication.TokenAuthentication,)
#     # permission_classes = (permissions.IsAdminUser,)
#
#     def get(self, request, format=None):
#         """Return a list of all projects
#         """
#         snippets = Project.objects.all()
#         serializer = ProjectSerializer(snippets, many=True)
#         return Response(serializer.data)
#
#     def post(self, request, format=None):
#         serializer = ProjectSerializer(data=request.data)
#         if serializer.is_valid():
#             serializer.save()
#             return Response(serializer.data, status=201)
#         return Response(serializer.errors, status=400)

