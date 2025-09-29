# apps/transportation/serializers.py

from rest_framework import serializers
from .models import Vehicle, Driver, Shipment
from users.serializers import UserSerializer


class VehicleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Vehicle
        fields = "__all__"


class DriverSerializer(serializers.ModelSerializer):
    # Display the nested User details, read-only
    user = UserSerializer(read_only=True)

    # Accept the user's UUID for creation/updates
    user_id = serializers.UUIDField(write_only=True)

    class Meta:
        model = Driver
        fields = ["id", "user", "user_id", "license_number", "phone_number"]


class ShipmentSerializer(serializers.ModelSerializer):
    # Display nested details on read, but accept IDs on write
    driver = DriverSerializer(read_only=True)
    driver_id = serializers.UUIDField(write_only=True, required=False, allow_null=True)

    vehicle = VehicleSerializer(read_only=True)
    vehicle_id = serializers.UUIDField(write_only=True, required=False, allow_null=True)

    class Meta:
        model = Shipment
        # We exclude 'order' for now as we'll specify it on creation
        fields = [
            "id",
            "order",
            "vehicle",
            "vehicle_id",
            "driver",
            "driver_id",
            "status",
            "estimated_departure",
            "actual_departure",
            "estimated_arrival",
            "actual_arrival",
        ]
        read_only_fields = ["status"]
