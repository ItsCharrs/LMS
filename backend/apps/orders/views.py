# apps/orders/views.py

from rest_framework import viewsets
from .models import Job
from .serializers import JobSerializer
from core.permissions import IsAdminOrManagerUser

class JobViewSet(viewsets.ModelViewSet):
    """
    A ViewSet for viewing and editing Jobs.
    Provides `list`, `create`, `retrieve`, `update`,
    and `destroy` actions for the Job model.
    """
    # We query the new Job model
    queryset = Job.objects.all().select_related('customer').order_by('-created_at')
    
    # We use the new JobSerializer
    serializer_class = JobSerializer
    
    # We protect the endpoint so only managers can access it
    permission_classes = [IsAdminOrManagerUser]