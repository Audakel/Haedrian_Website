import decimal

from money.exchange import BackendBase, xrates

from haedrian.models import ExchangeRates

class ExchangeBackend(BackendBase):
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
        if currency == self._base:
            return decimal.Decimal(1)
        # TODO: should it be sell rate or buy rate?
        return decimal.Decimal(ExchangeRates.objects.filter(provider="CoinsPH API", code_from=currency, code_to=self._base).latest('date').sell)
        # return self._rates.get(currency, None)

    def quotation(self, origin, target):
        return super(ExchangeBackend, self).quotation(origin, target)

