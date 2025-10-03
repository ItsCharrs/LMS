# apps/orders/serializers.py

from rest_framework import serializers
from .models import Job
from users.serializers import UserSerializer

class JobSerializer(serializers.ModelSerializer):
    """
    Serializer for the Job model.
    Handles nested representation of the customer.
    """
    # On read requests, display the full nested customer object.
    customer = UserSerializer(read_only=True)
    
    # On write requests (POST/PUT), we only need to provide the customer's ID.
    customer_id = serializers.UUIDField(write_only=True, source='customer')

    class Meta:
        model = Job
        # List all fields from the Job model that we want in our API
        fields = [
            'id',
            'customer',
            'customer_id',
            'status',
            'cargo_description',
            'pickup_address',
            'pickup_city',
            'pickup_contact_person',
            'pickup_contact_phone',
            'delivery_address',
            'delivery_city',
            'delivery_contact_person',
            'delivery_contact_phone',
            'requested_pickup_date',
            'created_at',
            'updated_at',
        ]
        
        # Make the status field read-only during creation.
        # It defaults to 'PENDING' and should be updated via separate actions.
        read_only_fields = ['status', 'created_at', 'updated_at']