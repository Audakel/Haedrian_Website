__author__ = 'audakel'
from rest_framework import serializers


class SmsIdSerializer(serializers.Serializer):
    def create(self, validated_data):
        return super(SmsIdSerializer, self).create(validated_data)
    def update(self, instance, validated_data):
        return super(SmsIdSerializer, self).update(instance, validated_data)

    MFI = ['mentors', 'ashi', 'test']
    application = serializers.ChoiceField(choices=MFI)
    org_id = serializers.CharField(max_length=30)
