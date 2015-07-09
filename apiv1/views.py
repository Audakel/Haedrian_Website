from rest_framework.response import Response
from rest_framework import authentication
from rest_framework.decorators import permission_classes
from rest_framework.throttling import UserRateThrottle
from rest_framework.permissions import AllowAny
from rest_framework.decorators import api_view, authentication_classes
from django.conf import settings
from money import xrates

import apiv1.internal.views as internal
from apiv1.internal.views_tasks import _get_history
from apiv1.serializers import PlacesSerializer
from haedrian.google.places import GooglePlaces


xrates.install('apiv1.btc_exchange_rate.BTCExchangeBackend')

class OncePerDayUserThrottle(UserRateThrottle):
        rate = '10/day'

default_response_200 = {}
default_response_400 = {"success": False, "error": ""}


@api_view(http_method_names=['POST'])
@permission_classes((AllowAny,))
# @throttle_classes([OncePerDayUserThrottle])
def new_user(request):
    try:
        data = internal._new_user(request.data)
        return Response(data)
    except Exception as e:
        return Response(({'success': False, 'error': e.message}), status=400)


@api_view(http_method_names=['GET'])
@authentication_classes((authentication.BasicAuthentication, authentication.TokenAuthentication,))
def get_exchanges(request):
    try:
        data = internal._get_exchanges(request.user, request.query_params)
        return Response(data=data)
    except Exception as e:
        return Response(({'success': False, 'error': e.message}), status=400)


@api_view(http_method_names=['GET'])
@authentication_classes((authentication.BasicAuthentication, authentication.TokenAuthentication,))
def get_exchange_fees(request):
    try:
        data = internal._get_exchange_fees(request.user, request.data)
        return Response(data)
    except Exception as e:
        return Response(({'success': False, 'error': e.message}), status=400)


@api_view(http_method_names=['GET'])
@authentication_classes((authentication.BasicAuthentication, authentication.TokenAuthentication,))
def get_exchange_types(request):
    try:
        data = internal._get_exchange_types(request.user, request.query_params)
        return Response(data)
    except Exception as e:
        return Response(({'success': False, 'error': e.message}), status=400)

@api_view(http_method_names=['GET'])
@authentication_classes((authentication.BasicAuthentication, authentication.TokenAuthentication,))
def get_address(request):
    try:
        data = internal._get_address(request.user, request.data)
        return Response(data)
    except Exception as e:
        return Response(({'success': False, 'error': e.message}), status=400)


@api_view(http_method_names=['GET'])
@authentication_classes((authentication.BasicAuthentication, authentication.TokenAuthentication,))
def get_wallet_info(request):
    try:
        data = internal._get_wallet_info(request.user, request.data)
        return Response(data=data)
    except Exception as e:
        return Response(({'success': False, 'error': e.message}), status=400)


@api_view(http_method_names=['GET'])
@authentication_classes((authentication.BasicAuthentication, authentication.TokenAuthentication,))
def get_balance(request):
    try:
        data = internal._get_balance(request.user, request.data)
        return Response(data)
    except Exception as e:
        return Response(({'success': False, 'error': e.message}), status=400)

@api_view(http_method_names=['GET'])
@authentication_classes((authentication.BasicAuthentication, authentication.TokenAuthentication,))
def get_pending_balance(request):
    try:
        # data = _get_pending_balance(global_user, request.data)
        data = internal._get_pending_balance(request.user, request.data)
        return Response(default_response_200.update(data=data))
    except Exception as e:
        return Response(({'success': False, 'error': e.message}), status=400)


@api_view(http_method_names=['POST'])
@authentication_classes((authentication.BasicAuthentication, authentication.TokenAuthentication,))
def send(request):
    try:
        # data = _send(global_user, request.data)
        data = internal._send(request.user, request.data)
        return Response(data, status=200)
    except Exception as e:
        return Response(({'success': False, 'error': e.message}), status=400)


@api_view(http_method_names=['POST'])
@authentication_classes((authentication.BasicAuthentication, authentication.TokenAuthentication,))
def send_to_user_handle(request):
    try:
        data = internal._send_to_user_handle(request.user, request.data)
        return Response(default_response_200.update(data=data))
    except Exception as e:
        return Response(({'success': False, 'error': e.message}), status=400)


@api_view(http_method_names=['POST'])
@authentication_classes((authentication.BasicAuthentication, authentication.TokenAuthentication,))
def create_wallet(request):
    try:
        data = internal._create_wallet(request.user, request.data)
        return Response(data)
    except Exception as e:
        return Response(({'success': False, 'error': e.message}), status=400)


@api_view(http_method_names=['GET'])
@authentication_classes((authentication.BasicAuthentication, authentication.TokenAuthentication,))
def get_locations(request):
    input_data = PlacesSerializer(data=request.GET)
    if input_data.is_valid():
        query = input_data.data['query']
        lat_lng = {
            'lat': input_data.data['lat'],
            'lng': input_data.data['lng'],
        }
        radius = 3200 #input_data.data['radius']

        google_places = GooglePlaces(settings.GOOGLE_PLACES_API_KEY)
        # data = google_places.text_search(query, ENGLISH, lat_lng, radius, [], None)
        data = google_places.nearby_search(lat_lng=lat_lng, keyword=query, types=['finance', 'establishment'])


        # nearby_search(self, language=lang.ENGLISH, keyword=None, location=None,
        #        lat_lng=None, name=None, radius=3200, rankby=ranking.PROMINENCE,
        #        sensor=False, types=[]):

        if data._response['status'].lower() == "ok":
            return Response(data._response['results'])
        else:
            return Response("Google Places Error: Status code was %s" % data._response['status'], status=400)
    return Response(input_data.errors, status=400)


@api_view(http_method_names=['GET'])
@authentication_classes((authentication.BasicAuthentication, authentication.TokenAuthentication,))
def get_history(request):
    try:
        data = _get_history(request.user, request.data)
        return Response(data)
    except Exception as e:
        return Response(({'success': False, 'error': e.message}), status=400)


@api_view(http_method_names=['POST', 'PUT'])
@authentication_classes((authentication.BasicAuthentication, authentication.TokenAuthentication,))
def buy(request):
    try:
        if request.method == 'POST':
            data = internal._buy(request.user, request.data)
        else:
            data = internal._verify_buy(request.user, request.query_params)
        return Response(data)
    except Exception as e:
        return Response(({'success': False, 'error': e.message}), status=400)

@api_view(http_method_names=['GET'])
@authentication_classes((authentication.BasicAuthentication, authentication.TokenAuthentication,))
def get_buy_history(request):
    try:
        data = internal._get_buy_history(request.user, request.data)
        return Response(data)
    except Exception as e:
        return Response(({'success': False, 'error': e.message}), status=400)

@api_view(http_method_names=['GET'])
@authentication_classes((authentication.BasicAuthentication, authentication.TokenAuthentication,))
def get_id(request):
    try:
        data = internal._get_id(request.user, request.data)
        return Response(data)
    except Exception as e:
        return Response(({'success': False, 'error': e.message}), status=400)


@api_view(http_method_names=['GET'])
@authentication_classes((authentication.BasicAuthentication, authentication.TokenAuthentication,))
def get_exchange_rate(request):
    try:
        data = internal._get_exchange_rate(request.user, request.query_params)
        return Response(data)
    except Exception as e:
        return Response(({'success': False, 'error': e.message}), status=400)

@api_view(http_method_names=['GET'])
@authentication_classes((authentication.BasicAuthentication, authentication.TokenAuthentication,))
def get_groups(request):
    try:
        data = internal._get_groups(request.user, request.data)
        return Response(data)
    except Exception as e:
        return Response(({'success': False, 'error': e.message}), status=400)


@api_view(http_method_names=['POST'])
@authentication_classes((authentication.BasicAuthentication, authentication.TokenAuthentication,))
def group_verify(request):
    try:
        data = internal._group_verify(request.user, request.data)
        return Response(data)
    except Exception as e:
        return Response(({'success': False, 'error': e.message}), status=400)

@api_view(http_method_names=['GET'])
@authentication_classes((authentication.BasicAuthentication, authentication.TokenAuthentication,))
def get_home_screen(request):
    try:
        data = internal._get_home_screen(request.user, request.data)
        return Response(data)
    except Exception as e:
        return Response(({'success': False, 'error': e.message}), status=400)


@api_view(http_method_names=['GET'])
@authentication_classes((authentication.BasicAuthentication, authentication.TokenAuthentication,))
def group_payment(request):
    try:
        data = internal._group_payment(request.user, request.query_params)
        return Response(data)
    except Exception as e:
        return Response(({'success': False, 'error': e.message}), status=400)


@api_view(http_method_names=['POST', 'GET'])
@authentication_classes((authentication.BasicAuthentication, authentication.TokenAuthentication,))
def currency(request):
    try:
        if request.method == 'POST':
            data = internal._update_currency(request.user, **request.data)
        else:
            data = internal._get_currencies(request.user, request.query_params)
        return Response(data)
    except Exception as e:
        return Response(({'success': False, 'error': e.message}), status=400)


@api_view(http_method_names=['GET'])
@authentication_classes((authentication.BasicAuthentication, authentication.TokenAuthentication,))
def testing(request):
    try:
        data = internal._testing(request.user, request.data)
        return Response(data)
    except Exception as e:
        return Response(({'success': False, 'error': e.message}), status=400)