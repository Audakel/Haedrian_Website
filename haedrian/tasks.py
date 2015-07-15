import itertools
import xml.etree.cElementTree as ET
import requests

if __name__ == "__main__" and __package__ is None:
    # fix the path so this can be run from the commandline
    import os
    from os import sys, path
    sys.path.append(path.dirname(path.dirname(path.abspath(__file__))))
    if os.getenv('DJANGO_POSTGRES_PASSWORD'):
        os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'Haedrian_Website.settings.production')
    else:
        os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'Haedrian_Website.settings.development')
    import django
    django.setup()

from haedrian.models import ExchangeRates
from Haedrian_Website.celery import app
from abc import ABCMeta, abstractmethod
from decimal import Decimal
from datetime import datetime, timedelta

currencies_of_interest = [
    "PHP", "USD", "BTC"
]

class ExchangeProvider(object):
    __metaclass__ = ABCMeta

    def __init__(self, name, url, known_currencies):
        self.name = name
        self.url = url
        # if None, then use all currencies
        self.known_currencies = known_currencies or currencies_of_interest

    def _intersection(self):
        """
        :return the intersection of known_currencies and currencies of interest
        """
        return set(self.known_currencies).intersection(currencies_of_interest)

    @abstractmethod
    def fetch(self):
        pass
"""
{"meta":
 {
   "total_count":8,
   "next_page":null,
   "previous_page":null
 },
 "markets":[
   {
     "symbol":"BTC-CLP",
     "currency":"CLP",
     "product":"BTC",
     "bid":"1000000",
     "ask":"1000000",
     "expires_in_seconds":0
   },
   {"symbol":"BTC-HKD",
    "currency":"HKD",
    "product":"BTC",
    "bid":"1839.63",
    "ask":"1876.42",
    "expires_in_seconds":18
   },
   {
     "symbol":"BTC-IDR",
     "currency":"IDR",
     "product":"BTC",
     "bid":"3033900",
     "ask":"3092742",
     "expires_in_seconds":18
   },
   {
     "symbol":"BTC-MYR",
     "currency":"MYR",
     "product":"BTC",
     "bid":"855.85",
     "ask":"872.96",
     "expires_in_seconds":18
   },{
     "symbol":"BTC-PHP"
     ,"currency":"PHP",
     "product":"BTC",
     "bid":"10604",
     "ask":"10731",
     "expires_in_seconds":18
   },
   {
     "symbol":"BTC-THB",
     "currency":"THB",
     "product":"BTC",
     "bid":"7630.9",
     "ask":"7837.79",
     "expires_in_seconds":18
   },{
     "symbol":"BTC-TWD",
     "currency":"TWD",
     "product":"BTC",
     "bid":"7294.66",
     "ask":"7367.6",
     "expires_in_seconds":18
   },{
     "symbol":"BTC-VND",
     "currency":"VND",
     "product":"BTC",
     "bid":"5145595",
     "ask":"5197051",
     "expires_in_seconds":18
   }
 ]
}
"""
class CoinsphExchange(ExchangeProvider):
    def __init__(self):
        super(CoinsphExchange, self).__init__(
            "coinsph", "https://quote.coins.ph/v1/markets",
            # since all of these rates are to/from BTC we don't include it in the intersection
            ["USD", "PHP", "CLP", "HKD", "TWD", "VND"],
        )

    def fetch(self):
        interest = self._intersection()
        res = requests.get(self.url)
        try:
            res.raise_for_status()
        except Exception as e:
            return str(e)
        json = res.json()
        filtered = [sublist for sublist in json['markets'] if sublist['currency'] in interest]
        ret = []
        for market in filtered:
            ret.append({
                'from': market['currency'],
                'to': 'BTC',
                'buy': market['ask'],
                'sell': market['bid'],
            })
            ret.append({
                'from': 'BTC',
                'to': market['currency'],
                'buy': 1 / Decimal(market['bid']),
                'sell': 1 / Decimal(market['ask']),
            })
        return ret
    def __repr__(self):
        return "CoinsPH API"
    def __str__(self):
        return "CoinsPH API"

class YahooScraper(ExchangeProvider):
    def __init__(self):
        super(YahooScraper, self).__init__(
            "yahoo", "http://query.yahooapis.com/v1/public/yql", None
        )

    def fetch(self):
        interest = list(self._intersection())
        query = """
select * from yahoo.finance.xchange
where pair in {}
            """.format( tuple( i[0] + i[1] for i in itertools.product(interest, repeat=2) if i[0] != i[1] ))
        res = requests.get(self.url, params={
            "env": "store://datatables.org/alltableswithkeys",
            "q": query,
        })
        try:
            res.raise_for_status()
        except Exception as e:
            return str(e)
        xml = ET.fromstring(res.text)
        ret = []
        for rate in xml.findall("results/rate"):
            ret.append({
                'from': rate.attrib['id'][:3],
                'to': rate.attrib['id'][-3:],
                'buy': rate.find('Ask').text,
                'sell': rate.find('Bid').text,
            })
        return ret
    def __repr__(self):
        return "Yahoo (YML)"
    def __str__(self):
        return "Yahoo (YML)"

providers = [
    CoinsphExchange(),
    YahooScraper(),
]

@app.task
def fetch_exchange_rates():
    ExchangeRates.objects.filter(date__lte=datetime.now()-timedelta(days=30)).delete()
    failed = []
    for provider in providers:
        l = provider.fetch()
        if isinstance(l, basestring):
            failed.append("Provider {} failed to fetch data: {}".format(provider, l))
            continue
        for rate in l:
            obj = ExchangeRates(
                provider = provider,
                code_from = rate['from'],
                code_to = rate['to'],
                buy = rate['buy'],
                sell = rate['sell'],
            )
            try:
                obj.save()
            except Exception as e:
                failed.append("Provider {} could not save new rate {}".format(str(e)))
    return failed or None

if __name__ == "__main__" and __package__ is None:
    print("please only use this for testing!")
    print(fetch_exchange_rates())
