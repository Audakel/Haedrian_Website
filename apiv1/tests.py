import random
import string
import sys
import simplejson as json
import datetime

from django.core.urlresolvers import reverse
from rest_framework import status
from rest_framework.test import APITestCase
from haedrian.models import User, UserData

from external.mifosx import mifosx_api

class AccountTests(APITestCase):
    @classmethod
    def setUpClass(cls):
        """
        Create the haedrian user and setup the mifos account for our test user
        """
        test1 = {
            "firstname": "Test",
            "lastname": "Client 1",
            "officeId": 1,
            "active": True,
            "locale": "en",
            "dateFormat": "dd MMMM yyyy",
            "activationDate": datetime.datetime.now().strftime("%d %B %Y"),
        }
        test2 = {
            "firstname": "Test",
            "lastname": "Client 2",
            "officeId": 1,
            "active": True,
            "locale": "en",
            "dateFormat": "dd MMMM yyyy",
            "activationDate": datetime.datetime.now().strftime("%d %B %Y"),
        }
        res = mifosx_api("clients", method='POST', body=json.dumps(test1), tenant="test")
        if not res['success']:
            raise
        cls.account1_id = res['response']['clientId']
        res = mifosx_api("clients", method='POST', body=json.dumps(test2), tenant="test")
        if not res['success']:
            raise
        cls.account2_id = res['response']['clientId']

    @classmethod
    def tearDownClass(cls):
        # close all loans and clients?
        pass

    def test_create_account(self):
        url = reverse('apiv1:create')

        # create a brand new user with a new email
        brand_new = {
            "username": "brand_new",
            "email": "haedrian_test_{}@mailinator.com".format(''.join(random.SystemRandom().choice(string.ascii_letters + string.digits) for _ in range(10))),
            "password1": "password123",
            "phone": "+14105521258",
            "country": "US",
        }
        response = self.client.post(url, brand_new, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

        # send an existing coinsph user. Should fail with a 400
        existing_coinsph = {
            "username": "first_user",
            "email": "first_test_user101010@mailinator.com",
            "password1": "password123",
            "phone": "+17068019809",
            "country": "US",
        }
        response = self.client.post(url, existing_coinsph, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertListEqual(response.data, ["This email is already associated with an account."])

        # Send the same email a second time to trigger duplicate email on our db end
        brand_new['username'] = "duplicate_email"
        brand_new['phone'] = "+17066284548"
        response = self.client.post(url, brand_new, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        # self.assertDictEqual(json.loads(response.body), {})

    def test_get_history(self):
        pass

class WalletTests(APITestCase):
    def test_send(self):
        pass
