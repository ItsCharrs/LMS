# apps/orders/views.py
from rest_framework import viewsets
from .models import Job
from .serializers import JobSerializer
from core.permissions import IsAdminOrManagerUser
from transportation.models import Shipment # <-- Import Shipment

class JobViewSet(viewsets.ModelViewSet):
    queryset = Job.objects.all().select_related('customer').order_by('-created_at')
    serializer_class = JobSerializer
    permission_classes = [IsAdminOrManagerUser]

    # --- ADD THIS METHOD ---
    def perform_create(self, serializer):
        """
        Custom logic to run after a new job is created.
        We will create the associated Shipment record here.
        """
        # First, save the Job instance itself
        job_instance = serializer.save()

        # Now, create the Shipment, explicitly setting it to unassigned
        try:
            Shipment.objects.create(
                job=job_instance,
                driver=None,
                vehicle=None,
                status=Shipment.ShipmentStatus.PENDING
            )
            print(f"SUCCESS: Shipment created for new job {job_instance.id} from perform_create.")
        except Exception as e:
            print(f"ERROR: Failed to create shipment for job {job_instance.id} from perform_create. Reason: {e}")