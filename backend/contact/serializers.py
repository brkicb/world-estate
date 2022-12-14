from rest_framework import serializers


class ContactSerializer(serializers.Serializer):
  first_name = serializers.CharField(max_length=100)
  email = serializers.EmailField(max_length=100)
  message = serializers.CharField(max_length=400)
