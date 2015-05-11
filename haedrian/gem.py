import round as gemlib
from django.conf import settings
from django.contrib.auth import get_user_model
import logging

logger = logging.getLogger(__name__)

client = gemlib.client()
client.authenticate_identify(api_token=settings.GEM_API_TOKEN)
app = client.authenticate_application(settings.GEM_API_TOKEN, settings.GEM_ADMIN_TOKEN)

def create_app_user(email, password):
    """
    :param email The new user's email address
    """
    return client.users.create(email=email, device_name="Haedrian App", passphrase=password)

def create_sms_user(phone):
    """Add a new Account to the Haedrian SMS wallet"""
    pass

class GemBackend(object):
    def authenticate(self, username, password, **kwargs):
        UserModel = get_user_model()
        # import pdb; pdb.set_trace()
        if username is None:
            username = kwargs.get(UserModel.USERNAME_FIELD)
        try:
            db_user = UserModel._default_manager.get_by_natural_key(username)
            user = client.authenticate_device(email=db_user.email,
                                      device_token=db_user.userdata.device_token,
                                      api_token=settings.GEM_API_TOKEN)
            user.wallet.unlock(passphrase=password)
        except Exception as e:
            logger.error("Could not unlock the user's wallet: {}".format(e))
            pass
        return None