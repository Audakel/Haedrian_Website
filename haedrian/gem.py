# import round as gemlib
# from wallet import BaseWallet
#
# # For any authentication scheme, the workflow is the same.
# # Create an empty client instance or use an existing one.
# client = gemlib.client()
# # Add authentication to it.
# client.authenticate_identify(API_TOKEN)
# # You can add multiple auth schemes to one client
# app = client.authenticate_application(API_TOKEN, ADMIN_TOKEN)
# # client.authenticate_* calls generally return the most relevant object
# user = client.authenticate_device(API_TOKEN, DEVICE_TOKEN, EMAIL)
# # The app and user instances (and all objects created by the same client) are now authenticated
# # with both Gem-Device and Gem-Application. Authentication is shared through the client object.
# client.authenticate_identify(API_TOKEN)
#
# class GemWallet(BaseWallet):
#     def __init__(self):
#         # unlock the wallet
#         pass
#
#     def __enter__(self):
#         return self
#
#
#     def __exit__(self, type, value, traceback):
#         for file in self.files:
#             os.unlink(file)
#
#
# class SMSWallet(BaseWallet)