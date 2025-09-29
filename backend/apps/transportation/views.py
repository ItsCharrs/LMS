# apps/transportation/views.py

from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from .models import Vehicle, Driver, Shipment
from .serializers import VehicleSerializer, DriverSerializer, ShipmentSerializer
from core.permissions import IsAdminOrManagerUser


class VehicleViewSet(viewsets.ModelViewSet):
    queryset = Vehicle.objects.all()
    serializer_class = VehicleSerializer
    permission_classes = [IsAdminOrManagerUser]


class DriverViewSet(viewsets.ModelViewSet):
    queryset = Driver.objects.all().select_related("user")
    serializer_class = DriverSerializer
    permission_classes = [IsAdminOrManagerUser]


class ShipmentViewSet(viewsets.ModelViewSet):
    queryset = Shipment.objects.all().select_related("order", "vehicle", "driver")
    serializer_class = ShipmentSerializer
    permission_classes = [IsAdminOrManagerUser]
