from rest_framework import serializers


class PlacesSerializer(serializers.Serializer):
    query = serializers.CharField()
    lat = serializers.DecimalField(max_digits=32, decimal_places=16)
    lng = serializers.DecimalField(max_digits=32, decimal_places=16)

CURRENCIES = ['USD', 'PHP', 'BTC']

class SendSerializer(serializers.Serializer):
    def create(self, validated_data):
        return super(SendSerializer, self).create(validated_data)

    def update(self, instance, validated_data):
        return super(SendSerializer, self).update(instance, validated_data)

    METHODS = ['username', 'phone', 'email', 'target_address']

    send_method = serializers.ChoiceField(choices=METHODS)
    send_to = serializers.CharField()
    currency = serializers.CharField(max_length=3, min_length=3)
    note = serializers.CharField(required=False, default="", allow_blank=True)
    amount_local = serializers.DecimalField(max_digits=32, decimal_places=16)
    payment_id = serializers.IntegerField(required=False)


class ExchangeWorkerSerializer(serializers.Serializer):
    def create(self, validated_data):
        return super(ExchangeWorkerSerializer, self).create(validated_data)

    def update(self, instance, validated_data):
        return super(ExchangeWorkerSerializer, self).update(instance, validated_data)

    code = serializers.CharField(max_length=8, min_length=8)


class CurrencySerializer(serializers.Serializer):
    def create(self, validated_data):
        return super(CurrencySerializer, self).create(validated_data)

    def update(self, instance, validated_data):
        return super(CurrencySerializer, self).update(instance, validated_data)


    in_currency = serializers.ChoiceField(choices=CURRENCIES)
    out_currency = serializers.ChoiceField(choices=CURRENCIES)
    amount = serializers.DecimalField(max_digits=32, decimal_places=8)
