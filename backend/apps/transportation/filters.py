# apps/transportation/filters.py
import django_filters
from .models import Shipment

class ShipmentFilter(django_filters.FilterSet):
    # We define a filter named 'job_id' that looks at the 'job__id' field.
    job_id = django_filters.UUIDFilter(field_name='job__id')

    class Meta:
        model = Shipment
        fields = ['job_id']