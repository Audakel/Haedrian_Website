import decimal

from money.exchange import BackendBase

from haedrian.models import BitcoinRates


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
        # TODO: should it be sell rate or buy rate?
        return decimal.Decimal(BitcoinRates.objects.get(code=currency).sell_rate)
        # return self._rates.get(currency, None)

    def quotation(self, origin, target):
        return super(BTCExchangeBackend, self).quotation(origin, target)