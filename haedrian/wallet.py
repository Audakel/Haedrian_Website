from abc import ABCMeta, abstractmethod, abstractproperty

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
        """Return a unique address for this wallet"""
        pass

    @abstractmethod
    def get_balance(self):
        """Fetch the latest and most updated balance information"""
        pass

    @abstractmethod
    def send_to_address(self, address, amount_btc):
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

