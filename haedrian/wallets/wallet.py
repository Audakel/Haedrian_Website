from abc import ABCMeta, abstractmethod
import logging

logger = logging.getLogger(__name__)

class BaseWallet(object):
    __metaclass__ = ABCMeta

    def __init__(self, user):
        self.user = user

    # @abstractproperty
    # def user(self):
    #     return self.user

    # @abstractmethod
    # def get_transaction_history(self):
    #     """Returns the Transactions that this wallet has made"""
    #     pass

    def __repr__(self):
        return "BaseWallet"

    @abstractmethod
    def get_address(self):
        """Return a unique BTC address for this wallet"""
        pass

    @abstractmethod
    def create_wallet(self, email, password):
        """Make a new node on wallet provider backend"""

        pass

    @abstractmethod
    def get_user_wallet_handel(self):
        """Return a unique handle, ID, or other type of address that given wallet provider uses"""
        pass

    @abstractmethod
    def get_balance(self):
        """Fetch the latest and most updated balance information in BTC"""
        pass

    @abstractmethod
    def get_pending_balance(self):
        """Fetch the latest and most updated pending balance information in BTC"""
        pass

    @abstractmethod
    def send_to_address(self, receiving_user, amount_btc,target_address):
        """Send Bitcoins amount from this wallet to the address provided
        :param address - the address to send the BTC to
        :param amount_btc - Amount to send in BTC"""
        pass

    @abstractmethod
    def send_to_user(self, user, amount_btc):
        """Send Bitcoins amount from this wallet to the user provided
        Each wallet is responsible for finding the appropriate handle or address to send to

        :param user - the Haedrian User to send the BTC to
        :param amount_btc - Amount to send in BTC
        :exception UserNotFound if the wallet cannot find the user to send to"""
        pass

