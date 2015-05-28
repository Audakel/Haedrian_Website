from haedrian.wallets.wallet import BaseWallet, logger

__author__ = 'audakel'


class TestWallet(BaseWallet):

    def get_exchange_fees(self):
        pass

    def get_exchange_types(self):
        pass

    def create_wallet(self, email, password):
        pass

    def get_wallet_info(self):
        pass

    def get_pending_balance(self):
        pass

    def __init__(self, user):
        super(TestWallet, self).__init__(user)

    def send_to_user(self, user, amount_btc):
        logger.debug("Test: user {} sent {} to user: {}".format(self.user.username, amount_btc, user.username))

    def get_address(self):
        logger.debug("Test: user {} generated address".format(self.user.username))
        return "0"

    def get_balance(self, user):
        logger.debug("Test: user {} getting balance".format(self.user.username))
        data = {
            "balance": "205.80",
            "pending_balance": "16.41",
            "currency": "BTC"
        }
        return data

    def send_to_address(self, receiver, amount_local, target_address):
        data = {
            "status": "pending",
            "fee": 0.00000,
            "target": target_address,
            "amount": amount_local,
            "currency": "PHP"
        }
        return data