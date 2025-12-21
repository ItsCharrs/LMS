from rest_framework import serializers
from .models import QuoteCalculatorConfig


class QuoteRequestSerializer(serializers.Serializer):
    """Serializer for incoming quote requests"""
    origin = serializers.CharField(max_length=255, help_text="Origin city/address")
    destination = serializers.CharField(max_length=255, help_text="Destination city/address")
    service_type = serializers.ChoiceField(
        choices=[
            ('RESIDENTIAL_MOVING', 'Residential Moving'),
            ('OFFICE_RELOCATION', 'Office Relocation'),
            ('PALLET_DELIVERY', 'Pallet Delivery'),
            ('SMALL_DELIVERIES', 'Small Deliveries'),
        ],
        help_text="Type of service needed"
    )
    weight = serializers.DecimalField(
        max_digits=10,
        decimal_places=2,
        required=False,
        allow_null=True,
        help_text="Estimated weight in pounds"
    )
    distance = serializers.DecimalField(
        max_digits=10,
        decimal_places=2,
        required=False,
        allow_null=True,
        help_text="Distance in miles (will be calculated if not provided)"
    )


class QuoteResponseSerializer(serializers.Serializer):
    """Serializer for quote response"""
    estimated_price = serializers.DecimalField(max_digits=10, decimal_places=2)
    distance = serializers.DecimalField(max_digits=10, decimal_places=2)
    service_type = serializers.CharField()
    breakdown = serializers.DictField(help_text="Price breakdown details")
    estimated_days = serializers.CharField(help_text="Estimated delivery time")


class QuoteCalculatorConfigSerializer(serializers.ModelSerializer):
    """Serializer for calculator configuration (admin use)"""
    class Meta:
        model = QuoteCalculatorConfig
        fields = [
            'id',
            'base_rate_per_mile',
            'service_multipliers',
            'weight_factor',
            'minimum_charge',
            'updated_at',
            'updated_by'
        ]
        read_only_fields = ['id', 'updated_at', 'updated_by']
