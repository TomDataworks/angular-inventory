import json
from django.contrib.auth import login, logout
from django.contrib.auth.models import User
from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework.views import APIView
from django.http import HttpResponse
from django.core import serializers

# Create your views here.

from . import serializers, authenticators, models

# View for Auth, which uses Django's default auth model and
# allows users to log in to the service
class AuthView(APIView):
    authentication_classes = (authenticators.QuietBasicAuthentication,)

    # Post an auth, or login
    def post(self, request, *args, **kwargs):
        login(request, request.user)
        return Response(serializers.UserSerializer(request.user).data)

    # Delete an auth, or logout
    def delete(self, request, *args, **kwargs):
        logout(request)
        return Response()

# This call allows the client end to check what the logged in
# user name is, in case if the state is dumped due to a page
# refresh
def checklogin(request):
    response_data = {}
    response_data['username'] = request.user.username
    return HttpResponse(json.dumps(response_data), 'application/json')
