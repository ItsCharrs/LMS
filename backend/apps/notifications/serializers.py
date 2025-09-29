# apps/notifications/serializers.py
from rest_framework import serializers


class SMSSerializer(serializers.Serializer):
    to_number = serializers.CharField(max_length=20)
    body = serializers.CharField()
