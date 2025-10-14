# apps/transportation/filters.py (BEST version)
import django_filters
from .models import Shipment

class ShipmentFilter(django_filters.FilterSet):
    # This explicitly creates a filter that accepts 'job_id' as the query parameter
    # and correctly filters on the 'job' foreign key's ID.
    job_id = django_filters.UUIDFilter(field_name='job__id', lookup_expr='exact')

    class Meta:
        model = Shipment
        fields = ['job_id'] # We only expose the job_id filter