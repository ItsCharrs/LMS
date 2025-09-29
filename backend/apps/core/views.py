# apps/core/views.py

from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework import status


@api_view(["GET"])
@permission_classes([AllowAny])
def health_check(request):
    """
    Returns a simple success message to indicate the API is running.
    This endpoint is publicly accessible.
    """
    return Response({"message": "API is up and running!"}, status=status.HTTP_200_OK)
