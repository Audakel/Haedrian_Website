from apiv1.serializers import CurrencySerializer
from moneyed.localization import format_money

from money import Money as Convert
from moneyed import Money

def format_currency_display(in_currency, out_currency, amount):
    in_currency = "PHP" if in_currency == "PBTC" else in_currency

    convert_data = CurrencySerializer(data={
        'in_currency': in_currency,
        'out_currency': out_currency,
        'amount': amount
    })

    if convert_data.is_valid():
        # if in_currency == out_currency:
        #     return amount

        amount_out = Convert(amount=convert_data.data['amount'],
                           currency=convert_data.data['in_currency']).to(convert_data.data['out_currency'])
        amount_final = Money(amount=amount_out.amount, currency=amount_out.currency)

        if amount_out.currency == 'USD':
            return format_money(amount_final, locale='en_US')

        if amount_out.currency == 'BTC':
            return format_money(amount_final, decimal_places=5)

        return format_money(amount_final)


    else:
        return {'success': False, 'error': convert_data.errors}