__author__ = 'audakel'
from rest_framework import serializers
from django.utils.translation import ugettext_lazy as _


class SmsIdSerializer(serializers.Serializer):
    def create(self, validated_data):
        return super(SmsIdSerializer, self).create(validated_data)
    def update(self, instance, validated_data):
        return super(SmsIdSerializer, self).update(instance, validated_data)

    MI_ASIA = 'mi-asia'
    MI_AFRICA = 'mi-africa'
    MI_LATAM = 'mi-latam'
    ASHI = 'ashi'
    TEST = 'test'

    ORGANIZATIONS = (
        (MI_ASIA, _('Mentors Asia'),),
        (MI_AFRICA, _('Mentors Africa'),),
        (MI_LATAM, _('Mentors Latin America'),),
        (ASHI, _('Ahon sa Hirap, Inc'),),
        (TEST, _('Haedrian Test'),),
    )

    organization = serializers.ChoiceField(choices=ORGANIZATIONS)
    org_id = serializers.CharField(max_length=30)
