from rest_framework.views import APIView
from rest_framework import serializers
from rest_framework.response import Response
from rest_framework import authentication
from rest_framework.decorators import api_view, authentication_classes
from rest_framework import permissions

from django.db import IntegrityError

from apiv1.models import ExternalUser, MifosxData

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
        import pdb; pdb.set_trace()
        if 'HTTP_X_MIFOS_PLATFORM_TENANTID' in request.META.keys():
            app = ExternalUser.MENTORS
        else:
            # TODO: lol security by obscurity. pls fix
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
                # start celery task to fetch more info about this user
        else:
            return Response("Validation Failed: {}".format(data.errors), status=412)
        # start a celery task to fetch the rest of the user's data from the external source
        return Response(status=201)