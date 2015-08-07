from django.conf import settings
from apiv1.serializers import CurrencySerializer
from moneyed.localization import format_money

from money import Money as Convert
from moneyed import Money

def format_currency_display(in_currency, out_currency, amount):
    # TODO fix rounding to be more acurate
    try:
        amount = float(amount)
        amount = round(amount, 8)
    except Exception as e:
        return {'success': False, 'error': str(e)}


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


def calculate_fees(currency, amount_local):
    original_send_amount = Money(amount=amount_local, currency=currency)
    amount_btc = Convert(amount=original_send_amount.amount, currency=currency).to('BTC')
    amount_fee = original_send_amount * settings.FEE_AMOUNT
    amount_fee_btc = Convert(amount=amount_fee.amount, currency=currency).to('BTC')
    amount_too_small = amount_fee_btc.amount < .0001
    total_sent_local = original_send_amount - amount_fee if not amount_too_small else original_send_amount

    return {'amount_btc': amount_btc, 'total_sent_local': total_sent_local, 'amount_too_small': amount_too_small,
            'amount_fee': amount_fee, 'amount_fee_btc': amount_fee_btc}