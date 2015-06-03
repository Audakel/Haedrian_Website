__author__ = 'audakel'

from rest_framework import serializers


class CoinsphBuySerializer(serializers.Serializer):

    def update(self, instance, validated_data):
        pass

    def create(self, validated_data):
        pass

    btc_amount = serializers.DecimalField(max_digits=32, decimal_places=10, required=False)
    payment_method = serializers.CharField()
    currency = serializers.CharField(max_length=3)
    target_account_id = serializers.CharField()
    target_wallet = serializers.CharField(required=False)
    rate = serializers.DecimalField(max_digits=12, decimal_places=5, required=False)
    currency_amount = serializers.DecimalField(max_digits=32, decimal_places=10, required=False)


# def optional_check(input_dictionary):
#     if 'btc_amount' in input_dictionary.keys() and