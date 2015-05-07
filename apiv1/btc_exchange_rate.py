
import decimal
from haedrian.models import BitcoinRates
from money.exchange import BackendBase

class BTCExchangeBackend(BackendBase):
    def __init__(self):
        self._base = 'BTC'
        # self._rates = {}

    @property
    def base(self):
        return self._base

    @base.setter
    def base(self, currency):
        self._base = currency

    def rate(self, currency):
        if currency == self.base:
            return decimal.Decimal(1)
        return decimal.Decimal(BitcoinRates.objects.get(code=currency).rate)
        # return self._rates.get(currency, None)

    def quotation(self, origin, target):
        return super(BTCExchangeBackend, self).quotation(origin, target)