from rest_framework.authentication import BasicAuthentication

# This just wraps the REST framework BasicAuthentication
class QuietBasicAuthentication(BasicAuthentication):
    def authenticate_header(self, request):
        return 'xBasic realm="%s"' % self.www_authenticate_realm
