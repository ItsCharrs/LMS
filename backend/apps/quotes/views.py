from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import AllowAny, IsAdminUser
from decimal import Decimal
import math

from .models import QuoteCalculatorConfig
from .serializers import (
    QuoteRequestSerializer,
    QuoteResponseSerializer,
    QuoteCalculatorConfigSerializer
)


def estimate_distance(origin: str, destination: str) -> Decimal:
    """
    Simplified distance estimation.
    In production, integrate with Google Maps Distance Matrix API or similar.
    """
    # For now, return a placeholder based on string length difference (demo purposes)
    base_distance = abs(len(origin) - len(destination)) * 10
    return Decimal(str(max(base_distance, 50)))  # Minimum 50 miles


def estimate_delivery_days(distance: Decimal) -> str:
    """Estimate delivery time based on distance"""
    if distance < 100:
        return "1-2 days"
    elif distance < 500:
        return "2-4 days"
    elif distance < 1000:
        return "4-7 days"
    else:
        return "7-14 days"


@api_view(['POST'])
@permission_classes([AllowAny])
def calculate_quote(request):
    """
    Public API to calculate shipping quote.
    POST /api/v1/quotes/calculate/
    """
    serializer = QuoteRequestSerializer(data=request.data)
    
    if not serializer.is_valid():
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    data = serializer.validated_data
    config = QuoteCalculatorConfig.get_config()
    
    # Get or estimate distance
    if data.get('distance'):
        distance = Decimal(str(data['distance']))
    else:
        distance = estimate_distance(data['origin'], data['destination'])
    
    # Base cost from distance
    base_cost = distance * config.base_rate_per_mile
    
    # Apply service multiplier
    service_type = data['service_type']
    service_multiplier = Decimal(str(config.service_multipliers.get(service_type, 1.0)))
    service_cost = base_cost * service_multiplier
    
    # Add weight factor if provided
    weight_cost = Decimal('0.00')
    if data.get('weight'):
        weight = Decimal(str(data['weight']))
        weight_cost = weight * config.weight_factor
    
    # Calculate total
    total = service_cost + weight_cost
    
    # Apply minimum charge
    total = max(total, config.minimum_charge)
    
    # Round to 2 decimal places
    total = total.quantize(Decimal('0.01'))
    
    # Build breakdown
    breakdown = {
        'base_rate_per_mile': str(config.base_rate_per_mile),
        'distance': str(distance),
        'distance_cost': str(base_cost.quantize(Decimal('0.01'))),
        'service_multiplier': str(service_multiplier),
        'service_cost': str(service_cost.quantize(Decimal('0.01'))),
        'weight': str(data.get('weight') or '0'),
        'weight_cost': str(weight_cost.quantize(Decimal('0.01'))),
        'minimum_charge': str(config.minimum_charge),
    }
    
    response_data = {
        'estimated_price': total,
        'distance': distance,
        'service_type': service_type,
        'breakdown': breakdown,
        'estimated_days': estimate_delivery_days(distance),
    }
    
    response_serializer = QuoteResponseSerializer(response_data)
    return Response(response_serializer.data, status=status.HTTP_200_OK)


@api_view(['GET', 'PUT'])
@permission_classes([IsAdminUser])
def calculator_config(request):
    """
    Admin API to view/update calculator configuration.
    GET /api/v1/quotes/config/
    PUT /api/v1/quotes/config/
    """
    config = QuoteCalculatorConfig.get_config()
    
    if request.method == 'GET':
        serializer = QuoteCalculatorConfigSerializer(config)
        return Response(serializer.data)
    
    elif request.method == 'PUT':
        serializer = QuoteCalculatorConfigSerializer(config, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save(updated_by=request.user)
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
