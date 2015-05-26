from django.test import TestCase
from .models import Message
from haedrian.models import UserData

# Create your tests here.


class SMSTests(TestCase):
    def test_new_user_unique_handle(self):
        user = UserData
