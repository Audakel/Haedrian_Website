from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import authentication
from rest_framework.decorators import api_view, authentication_classes
from django.conf import settings
from django.contrib.auth import get_user_model
from money import Money, xrates
from haedrian.models import Transaction, Wallet
from apiv1.serializers import SendSerializer
from coins_ph.wallet_commands import *
from haedrian.wallets.coins_ph import CoinsPhWallet
from haedrian.views import _create_account
import requests
from haedrian.models import UserData

xrates.install('apiv1.btc_exchange_rate.BTCExchangeBackend')

@api_view(http_method_names=['POST'])
@authentication_classes((authentication.BasicAuthentication, authentication.TokenAuthentication,))
def new_user(request):
    try:
        data = _new_user(request.user, request.data)
        return Response(data)
    except:
        return Response(status=400)


@api_view(http_method_names=['GET'])
@authentication_classes((authentication.BasicAuthentication, authentication.TokenAuthentication,))
def get_exchanges(request):
    try:
        data = _get_exchanges(request.user, request.data)
        return Response(data)
    except:
        return Response(status=400)


@api_view(http_method_names=['GET'])
@authentication_classes((authentication.BasicAuthentication, authentication.TokenAuthentication,))
def get_address(request):
    try:
        data = _get_address(request.user, request.data)
        return Response(data)
    except:
        return Response(status=400)


@api_view(http_method_names=['GET'])
@authentication_classes((authentication.BasicAuthentication, authentication.TokenAuthentication,))
def get_user_wallet_handel(request):
    try:
        data = _get_user_wallet_handel(request.user, request.data)
        return Response(data)
    except:
        return Response(status=400)


@api_view(http_method_names=['GET'])
@authentication_classes((authentication.BasicAuthentication, authentication.TokenAuthentication,))
def get_balance(request):
    try:
        data = _get_balance(request.user, request.data)
        return Response(data)
    except Exception as e:
        return Response(e, status=400)

@api_view(http_method_names=['GET'])
@authentication_classes((authentication.BasicAuthentication, authentication.TokenAuthentication,))
def get_pending_balance(request):
    try:
        data = _get_pending_balance(request.user, request.data)
        return Response(data)
    except:
        return Response(status=400)


@api_view(http_method_names=['POST'])
@authentication_classes((authentication.BasicAuthentication, authentication.TokenAuthentication,))
def send_to_address(request):
    try:
        data = _send_to_address(request.user, request.data)
        return Response(data)
    except Exception as e:
        return Response(e, status=400)


@api_view(http_method_names=['POST'])
@authentication_classes((authentication.BasicAuthentication, authentication.TokenAuthentication,))
def send_to_user_handle(request):
    try:
        data = _send_to_user_handle(request.user, request.data)
        return Response(data)
    except:
        return Response(status=400)


@api_view(http_method_names=['POST'])
@authentication_classes((authentication.BasicAuthentication, authentication.TokenAuthentication,))
def create_wallet(request):
    try:
        data = _create_wallet(request.user, request.data)
        return Response(data)
    except:
        return Response(status=400)


def _create_wallet(user, data):
    # TODO: fix hard coded only creation of coins.ph wallets
    # wallet = get_temp_wallet(user)
    wallet = CoinsPhWallet(user)
    try:
        data = wallet.create_wallet(data['email'], data['password'])
        return data
    except:
        return False


def _new_user(user, data):
    new_data = {
        "username": data['username'],
        "email": data['email'],
        "password1": data['password'],
        "password2": data['password'],
        "phone": data['phone'],
        "country": data['country']
    }
    try:
        user = _create_account(new_data)
        return user
    except Exception as e:
        return e


def _get_exchanges(user, data):
    wallet = get_temp_wallet(user)
    try:
        data = wallet.get_exchanges()
        return data
    except:
        return False


def _send_to_user_handle(user, data):
    pass
    # wallet = get_temp_wallet(user)
    # try:
    #     data = wallet.send_to_user(data["receiving_user"], data["amount_btc"], data["target_address"])
    #     return data
    # except:
    #     return False


def _send_to_address(user, data):
    wallet = get_temp_wallet(user)

    UserModel = get_user_model()
    haedrian_account = UserModel.objects.get(username='haedrian')
    """ Internal API for the SMS app to call as well """
    send_data = SendSerializer(data=data)
    try:
        if send_data.is_valid():
            sender = user
            # import pdb; pdb.set_trace()
            # TODO figure out whether this is a handle, phone number or email.
            # receiver = UserModel.objects.get(username=send_data.data['receiver'])
            receiver = UserModel.objects.get(username='mentors_international')
            currency = UserData.objects.get(user_id=sender.id).default_currency
            amount_btc = Money(amount=send_data.data['amount_local'], currency=currency).to('BTC')
            amount_fee = amount_btc * settings.FEE_AMOUNT
            total_sent = amount_btc - amount_fee
            total_sent_local = Money(amount=total_sent.amount, currency='BTC').to(currency)
            fee_local = Money(amount=amount_fee.amount, currency='BTC').to(currency)

            try:
                data = wallet.send_to_address(total_sent)
            except Exception as e:
                return e.message

            transaction = Transaction(sender=sender, receiver=receiver,
                                      amount_btc=total_sent.amount, amount_btc_currency='BTC',
                                      amount_local=total_sent_local.amount, amount_local_currency=total_sent_local.currency)
            fee = Transaction(sender=sender, receiver=haedrian_account,
                              amount_btc=amount_fee.amount, amount_btc_currency='BTC',
                              amount_local=fee_local.amount, amount_local_currency=fee_local.currency)

            fee.save()
            transaction.save()
            return Response(data, status=200)
        return Response(send_data.errors, status=400)
    except Exception as e:
        return e.message



def _get_pending_balance(user, data):
    wallet = get_temp_wallet(user)
    try:
        data = wallet.get_pending_balance()
        return data
    except:
        return False


def _get_balance(user, data=None):
    wallet = get_temp_wallet(user)
    try:
        data = wallet.get_balance()
        return data
    except:
        return False


def _get_user_wallet_handel(user, data):
    wallet = get_temp_wallet(user)
    try:
        data = wallet.get_user_wallet_handel()
        return data
    except:
        return False


def _get_address(user, data):
    wallet = get_temp_wallet(user)
    try:
        data = wallet.get_address()
        return data
    except:
        return False


def get_temp_wallet(sender):
    wallets = Wallet.objects.filter(user=sender)
    wallet = wallets[0]
    wallet_class = Wallet.WALLET_CLASS[wallet.type]
    return wallet_class(sender)










def _send(user, data):
    UserModel = get_user_model()
    haedrian_account = UserModel.objects.get(handle='@haedrian')
    """ Internal API for the SMS app to call as well """
    send_data = SendSerializer(data=data)
    if send_data.is_valid():
        sender = user
        # TODO figure out whether this is a handle, phone number or email.
        receiver = UserModel.objects.get(handle=send_data.data['receiver'])
        currency = sender.default_currency
        amount_btc = Money(amount=send_data.data['amount_local'], currency=currency).to('BTC')
        amount_fee = amount_btc * settings.FEE_AMOUNT
        total_sent = amount_btc - amount_fee
        total_sent_local = Money(amount=total_sent.amount, currency='BTC').to(currency)
        fee_local = Money(amount=amount_fee.amount, currency='BTC').to(currency)
        transaction = Transaction(sender=sender, receiver=receiver,
                                  amount_btc=total_sent.amount, amount_btc_currency='BTC',
                                  amount_local=total_sent_local.amount, amount_local_currency=total_sent_local.currency)
        fee = Transaction(sender=sender, receiver=haedrian_account,
                          amount_btc=amount_fee.amount, amount_btc_currency='BTC',
                          amount_local=fee_local.amount, amount_local_currency=fee_local.currency)

        fee.save()
        transaction.save()
        return Response(status=200)
    return Response(send_data.errors, status=400)

# TODO check with James - Userdata and authuser have same PK?
def create_user(msg):
    pass


def history(request):
    return _history(request.user)

def _history(user):
    outgoing = Transaction.objects.filter(sender=user)
    incoming = Transaction.objects.filter(receiver=user)
    data = {'outgoing': 10, 'incoming': 36, 'loan': 528}

    return Response(data, status=200)



# Testing for coins.ph


@api_view(http_method_names=['POST'])
@authentication_classes((authentication.BasicAuthentication, authentication.TokenAuthentication,))
def wallet_info(request):
    return _wallet_info()


def _wallet_info():

    return Response()


@api_view(http_method_names=['GET'])
@authentication_classes((authentication.BasicAuthentication, authentication.TokenAuthentication,))
# TODO: put in the amount and address, using dummy data now
def coins_send(request):
    return _coins_send()


def _coins_send():
    url = 'https://coins.ph/api/v3/transfers/'
    headers = coinsph_send(url)
    data = requests.get(url, headers=headers).text
    return Response(data)


@api_view(http_method_names=['GET'])
@authentication_classes((authentication.BasicAuthentication, authentication.TokenAuthentication,))
def exchange(request):
    url = 'https://coins.ph/d/api/payout-outlets'
    headers = coinsph_wallet_info(url)
    data = requests.get(url, headers=headers).text
    return Response(data)
# class Projects(APIView):
#     """Create or list projects by a user
#     * Requires token authentication.
#     """
#     authentication_classes = (authentication.TokenAuthentication,)
#     # permission_classes = (permissions.IsAdminUser,)
#
#     def get(self, request, format=None):
#         """Return a list of all projects
#         """
#         snippets = Project.objects.all()
#         serializer = ProjectSerializer(snippets, many=True)
#         return Response(serializer.data)
#
#     def post(self, request, format=None):
#         serializer = ProjectSerializer(data=request.data)
#         if serializer.is_valid():
#             serializer.save()
#             return Response(serializer.data, status=201)
#         return Response(serializer.errors, status=400)

