from django.forms import widgets
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

    # TODO: Fix default receiver
    receiver = serializers.CharField()
    note = serializers.CharField(required=False, default="", allow_blank=True)
    target_address = serializers.CharField(required=False, default="", allow_blank=True)
    amount_local = serializers.DecimalField(max_digits=32, decimal_places=16)
