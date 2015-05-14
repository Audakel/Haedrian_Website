# import round as gemlib
from django.conf import settings
from django.contrib.auth import get_user_model
import logging

from wallet import BaseWallet

# logger = logging.getLogger(__name__)

# client = gemlib.client()
# client.authenticate_identify(api_token=settings.GEM_API_TOKEN)
# app = client.authenticate_application(settings.GEM_API_TOKEN, settings.GEM_ADMIN_TOKEN)

class GemWallet(BaseWallet):
    def get_user_wallet_handel(self):
        pass

    def get_pending_balance(self):
        pass

    def __init__(self, user):
        super(BaseWallet, self).__init__(user)

    def send_to_user(self, user, amount_btc):
        pass

    def send_to_address(self, address, amount_btc):
        self.user

    def get_balance(self):
        pass

    def get_address(self):
        pass


def create_app_user(email, password):
    pass


# """
#     :param email The new user's email address
#     """
#     return client.users.create(email=email, device_name="Haedrian App", passphrase=password)
#
def create_sms_user(phone):
    pass


#     """Add a new Account to the Haedrian SMS wallet"""
#     pass

class GemBackend(object):
    pass

    def authenticate(self, username, password, **kwargs):
        pass
    #         UserModel = get_user_model()
    #         # import pdb; pdb.set_trace()
    #         if username is None:
    #             username = kwargs.get(UserModel.USERNAME_FIELD)
    #         try:
    #             db_user = UserModel._default_manager.get_by_natural_key(username)
    #             user = client.authenticate_device(email=db_user.email,
    #                                       device_token=db_user.userdata.device_token,
    #                                       api_token=settings.GEM_API_TOKEN)
    #             user.wallet.unlock(passphrase=password)
    #         except Exception as e:
    #             logger.error("Could not unlock the user's wallet: {}".format(e))
    #             pass
    #         return None