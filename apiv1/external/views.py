from __future__ import absolute_import

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import permissions
from django.db import IntegrityError

from apiv1.models import ExternalUser
from apiv1.tasks import match_users


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
            app = ExternalUser.MENTORS
        else:
            # TODO: lol. security by obscurity. pls fix
            return Response(status=404)
        # This would enable us to fetch the ExternalID field from Mifos...
        # but it doesn't look thats what we want since the API calls want ClientId
        # res = mifosx_api('client/' + request.data['clientId'], None)
        # if res['success']:
        #     external = res['response']['externalId']
        # else:
        external = request.data['clientId']
        user = ExternalUser(application=app, user=None, external=external)
        try:
            user.save()
        except IntegrityError as e:
            # duplicate user so return 409 saying there is a conflict in data? maybe use 412 precodition failed?
            return Response("User already exists", status=409)
        # someday in the future... this should be a task
        match_users.delay({'external': user.external})
        # start a celery task to fetch the rest of the user's data from the external source
        return Response(status=201)
