from django.test import TestCase

# Create your tests here.

from django.test import TestCase
from rest_framework.test import APIRequestFactory
from rest_framework.test import APIClient
from django.contrib.auth.models import User
import json

# The Accounts Test Cases are designed to make sure the three auth functions work:
# log in, log out, and check login
class AccountsTestCase(TestCase):
    # Set up the test harness, a default username
    def setUp(self):
        self.user = User.objects.create_user(username='arven', email='arven@localhost.localdomain.com', password='testing')
        self.client = APIClient()

    # We should first check login and determine it's not valid
    def test_account_notloggedin(self):
        """Login should be invalid/blank"""
        response = self.client.get('/django/accounts/checklogin/')
        self.assertEqual(json.loads(response.content.decode()), {'username': ''})

    # We should login then check the response of checklogin
    def test_account_loggedin(self):
        """Login should be set if we logged in"""
        self.client.login(username='arven', password='testing')
        response = self.client.get('/django/accounts/checklogin/')
        self.assertEqual(json.loads(response.content.decode()), {'username': 'arven'})

    # We should logout the check the response again
    def test_account_loggedout(self):
        """Login should be invalid again"""
        response = self.client.get('/django/accounts/checklogin/')
        self.assertEqual(json.loads(response.content.decode()), {'username': ''})
