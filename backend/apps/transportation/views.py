# apps/transportation/views.py

from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated , AllowAny
from django_filters.rest_framework import DjangoFilterBackend


from .models import Vehicle, Driver, Shipment
from .serializers import VehicleSerializer, DriverSerializer, ShipmentSerializer
from .filters import ShipmentFilter # Import our new custom filter class

class VehicleViewSet(viewsets.ModelViewSet):
    """
    A ViewSet for viewing and editing Vehicle instances.
    """
    queryset = Vehicle.objects.all().order_by('make', 'model')
    serializer_class = VehicleSerializer
    permission_classes = [IsAuthenticated]
    # Allow filtering by status, e.g., /api/v1/vehicles/?status=AVAILABLE
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['status']


class DriverViewSet(viewsets.ModelViewSet):
    """
    A ViewSet for viewing and editing Driver profiles.
    """
    queryset = Driver.objects.all().select_related('user').order_by('user__first_name')
    serializer_class = DriverSerializer
    permission_classes = [IsAuthenticated]


class ShipmentViewSet(viewsets.ModelViewSet):
    """
    A ViewSet for viewing and editing Shipments.
    This ViewSet is now correctly filterable by the job's ID.
    """
    queryset = Shipment.objects.all().select_related(
        'job', 
        'vehicle', 
        'driver__user' # Pre-fetch the related user for efficiency
    )
    serializer_class = ShipmentSerializer
    permission_classes = [AllowAny]
    
    # --- THIS IS THE FIX ---
    # We specify the filter backend and tell it to use our custom filter class.
    filter_backends = [DjangoFilterBackend]
    filterset_class = ShipmentFilter