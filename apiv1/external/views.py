from __future__ import absolute_import
from rest_framework.views import APIView
from rest_framework import serializers
from rest_framework.response import Response
from rest_framework import authentication
from rest_framework.decorators import api_view, authentication_classes
from rest_framework import permissions
from django.db import IntegrityError
from celery import shared_task
import requests

from apiv1.models import ExternalUser, MifosxData
from apiv1.external.mifosx import mifosx_auth

class WhitelistPermission(permissions.BasePermission):
    """
    Check to see if this is an approved IP
    """
    def has_permission(self, request, view):
        ip_addr = request.META['REMOTE_ADDR']
        whitelist = ('52.8.166.65', '127.0.0.1',)
        return ip_addr in whitelist

class MifosxDataSerializer(serializers.ModelSerializer):
    class Meta:
        model = MifosxData

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
            app = ExternalUser.MENTORS
        else:
            # TODO: lol. security by obscurity. pls fix
            return Response(status=404)
        user = ExternalUser(application=app, user=None)
        try:
            user.save()
        except IntegrityError as e:
            # duplicate user so return 409 saying there is a conflict in data? maybe use 412 precodition failed?
            return Response("User already exists", status=409)
        request.data['user'] = user.pk
        data = MifosxDataSerializer(data=request.data)
        if data.is_valid():
            data.save()
            # TODO allow different external clients by not hardcoding this
            fetch_mifosx_client_data(data)
        else:
            return Response("Validation Failed: {}".format(data.errors), status=412)
        # start a celery task to fetch the rest of the user's data from the external source
        return Response(status=201)

@shared_task
def fetch_mifosx_client_data(data):
    """Make a request to the Mifosx API to get the rest of the client info that we need"""
    # TODO: add the ability for multiple tenants
    token, err = mifosx_auth()
    if token:
        params = {
            'fields': 'id,displayName,officeName,mobileNo',
        }
        headers = {
            "Authorization": "Basic {}".format(token),
            "X-Mifos-Platform-TenantId": "default",
        }
        response = requests.get(
                "https://mentors.haedrian.io/mifosng-provider/api/v1/clients/{}".format(data['client_id']),
                params=params,
                headers=headers
            )
        if response.status_code == requests.codes.ok:
            return response.json()
        else:
            return "Could not get user. Message: {}".format(response)
    else:
        return "Failed to authenticate with mifosx. Status code: {} | Data: {}".format(
                err.status_code, err.text
            )
