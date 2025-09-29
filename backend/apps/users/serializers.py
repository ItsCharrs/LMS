# apps/users/serializers.py

from rest_framework import serializers
from .models import User


class UserSerializer(serializers.ModelSerializer):
    """
    Serializer for the User model.
    """

    class Meta:
        model = User
        fields = ["id", "username", "email", "first_name", "last_name", "role"]


class FirebaseTokenSerializer(serializers.Serializer):
    """
    Serializer to accept the Firebase ID token.
    """

    token = serializers.CharField()

    class Meta:
        fields = ["token"]
