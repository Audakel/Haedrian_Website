from haedrian.wallets.wallet import BaseWallet, logger

__author__ = 'audakel'


class TestWallet(BaseWallet):

    def create_wallet(self, email, password):
        pass

    def get_user_wallet_handel(self):
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

    def get_balance(self):
        logger.debug("Test: user {} getting balance".format(self.user.username))
        data = {
            "balance": "0.00",
            "pending_balance": "0.00",
            "currency": "BTC"
        }
        return data

    def send_to_address(self, amount_local):
        data = {
            "status": "pending",
            "fee": "0.00000",
            "target": "Mentors International",
            "amount": amount_local,
            "currency": "PHP"
        }
        return data