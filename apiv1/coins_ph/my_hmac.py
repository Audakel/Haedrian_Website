__author__ = 'audakel'
# TODO put into environment variables
from django.conf import settings
import hashlib
import hmac
import time
import json

API_KEY = settings.COINS_API_KEY  # Replace this with your API Key
API_SECRET = settings.COINS_SECRET  # Replace this with your API secret


def get_nonce():
    """Return a nonce based on the current time.

    A nonce should only use once and should always be increasing.
    Using the current time is perfect for this.
    """
    # Get the current unix epoch time, and convert it to milliseconds
    return int(time.time() * 1e6)


def sign_request(url, nonce, body=None):
    """Return an HMAC signature based on the request."""
    if body is None:
        # GET requests don't have a body, so we'll skip that for signing
        message = str(nonce) + url
    else:
        body = json.dumps(body, separators=(',', ':'))
        message = str(nonce) + url + body

    return str(
        hmac.new(
            str(API_SECRET),
            message,
            hashlib.sha256
        ).hexdigest()
    )