from rest_framework import serializers


class PlacesSerializer(serializers.Serializer):
    query = serializers.CharField()
    lat = serializers.DecimalField(max_digits=32, decimal_places=16)
    lng = serializers.DecimalField(max_digits=32, decimal_places=16)




class SendSerializer(serializers.Serializer):
    def create(self, validated_data):
        return super(SendSerializer, self).create(validated_data)

    def update(self, instance, validated_data):
        return super(SendSerializer, self).update(instance, validated_data)

    METHODS = ['username', 'phone', 'email', 'target_address']
    CURRENCIES = ['USD', 'PHP', 'BTC']

    send_method = serializers.ChoiceField(choices=METHODS)
    currency = serializers.ChoiceField(choices=CURRENCIES)
    send_to = serializers.CharField()
    note = serializers.CharField(required=False, default="", allow_blank=True)
    amount_local = serializers.DecimalField(max_digits=32, decimal_places=16)
    payment_id = serializers.IntegerField(required=False)
