from django.forms import widgets
from rest_framework import serializers
from haedrian.models import Transaction


# class ProjectSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Project
#         fields = ('id', 'user', 'title', 'description', 'category', 'location', 'goal')


class PlacesSerializer(serializers.Serializer):
    query = serializers.CharField()
    lat = serializers.DecimalField(max_digits=32, decimal_places=16)
    lng = serializers.DecimalField(max_digits=32, decimal_places=16)




class SendSerializer(serializers.Serializer):
    def create(self, validated_data):
        return super(SendSerializer,self).create(validated_data)

    def update(self, instance, validated_data):
        return super(SendSerializer,self).create(instance, validated_data)

    # sender = serializers.CharField()
    # TODO:: Fix default receiver
    username = serializers.CharField(required=False)
    # How to do phone serialzation?
    phone = serializers.CharField(required=False)
    email = serializers.EmailField(required=False)
    target_address = serializers.CharField(required=False)
    note = serializers.CharField(required=False, default="", allow_blank=True)
    amount_local = serializers.DecimalField(max_digits=32, decimal_places=16)

# class TransactionSerializer(serializers.Serializer):
#     name = serializers.CharField()
#     room_number = serializers.IntegerField(choices=[101, 102, 103, 201])
#     date = serializers.DateField()
#
#     class Meta:
#         # Each room only has one event per day.
#         validators = UniqueTogetherValidator(
#             queryset=Event.objects.all(),
#             fields=['room_number', 'date']
#         )