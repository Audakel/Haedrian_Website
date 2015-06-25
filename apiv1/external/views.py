from __future__ import absolute_import
import random
import string
from phonenumbers import geocoder
import pycountry

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import permissions
from apiv1.external.mifosx import mifosx_api

from haedrian.models import UserData
from haedrian.views import _create_account


class WhitelistPermission(permissions.BasePermission):
    """
    Check to see if this is an approved IP
    """
    def has_permission(self, request, view):
        ip_addr = request.META['REMOTE_ADDR']
        whitelist = ('52.8.166.65', '127.0.0.1',)
        return ip_addr in whitelist

# class MifosxDataSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = MifosxData

class CreateUser(APIView):
    """Manages Users that were created for external organizations
    """
    # authentication_classes = (authentication.TokenAuthentication,)
    # permission_classes = (permissions.IsAdminUser, WhitelistPermission,)
    authentication_classes = []
    permission_classes = [] #(WhitelistPermission,)

    def get(self, request):
        return Response(status=404)
        # print("request: {}".format(request.GET))
        # return Response(data=request.GET, status=200)

    def post(self, request):
        if 'HTTP_X_MIFOS_PLATFORM_TENANTID' in request.META.keys():
            app = UserData.MENTORS
        else:
            # TODO: lol. security by obscurity. pls fix
            return Response(status=404)
        exists = UserData.objects.filter(application=app, app_id=request.data['clientId'])
        if len(exists) == 1:
            # user has an account already so nothing to do?
            pass
        elif len(exists) == 0:
            # user doesn't have an account so lets make them a temp account
            name = "placeholder" + ''.join(random.SystemRandom().choice(string.ascii_letters + string.digits) for _ in range(10))
            password = ''.join(random.SystemRandom().choice(string.ascii_letters + string.digits) for _ in range(30))
            phone = '+17068019809'
            country = 'US'
            # fetch the rest of the client's info from Mifosx
            res = mifosx_api("clients/{}".format(request.data['clientId']))
            if res['success']:
                external = res['response'].get('externalId', external)
                # can't get their phone number properly from Mifosx it seems
                # if 'mobileNo' in res['response']:
                #     phone = res['response']['mobileNo']
                #     country_name = geocoder.country_name_for_number(phone, 'en')
                #     country = pycountry.countries.get(common_name=country_name).alpha2
                first_name = res['response']['firstname']
                last_name = res['response']['lastname']
            else:
                first_name = ''
                last_name = ''
            account = {
                'username': name,
                'email': name + '@example.com',
                'first_name': first_name,
                'last_name': last_name,
                'password1': password,
                'password2': password,
                'phone': phone,
                'country': country,
                'application': UserData.MENTORS,
                'app_id': request.data['clientId'],
            }
            ret_val = _create_account(account)
            if not ret_val['success']:
                return Response(status=400, data=ret_val['error'])
        else:
            # something is really wonky here
            pass
        return Response(status=201)
