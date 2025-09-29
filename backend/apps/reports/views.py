# apps/reports/views.py

from rest_framework import views, status
from rest_framework.response import Response
from django.db.models import Count, Sum
from datetime import datetime, timedelta

from core.permissions import IsAdminOrManagerUser
from orders.models import Order
from inventory.models import Product, Warehouse
from transportation.models import Shipment
from users.models import User


class DashboardSummaryView(views.APIView):
    """
    Provides a high-level summary of key metrics for the dashboard.
    """

    permission_classes = [IsAdminOrManagerUser]

    def get(self, request, *args, **kwargs):
        # Count total objects for key models
        total_customers = User.objects.filter(role=User.Role.CUSTOMER).count()
        total_orders = Order.objects.count()
        total_products = Product.objects.count()
        shipments_in_transit = Shipment.objects.filter(
            status=Shipment.ShipmentStatus.IN_TRANSIT
        ).count()

        # Calculate sales for the last 30 days
        thirty_days_ago = datetime.now() - timedelta(days=30)
        recent_sales = (
            Order.objects.filter(
                status=Order.OrderStatus.DELIVERED, order_date__gte=thirty_days_ago
            ).aggregate(total_revenue=Sum("invoice__total_amount"))["total_revenue"]
            or 0
        )

        summary_data = {
            "total_customers": total_customers,
            "total_orders": total_orders,
            "total_products": total_products,
            "shipments_in_transit": shipments_in_transit,
            "recent_revenue_30d": f"{recent_sales:.2f}",
        }

        return Response(summary_data, status=status.HTTP_200_OK)


class SalesReportView(views.APIView):
    """
    Provides a report on sales, groupable by a specified period.
    Example: /api/v1/reports/sales/?group_by=month
    """

    permission_classes = [IsAdminOrManagerUser]

    def get(self, request, *args, **kwargs):
        # For simplicity, we'll just show total sales per status for now.
        # A real implementation would parse date ranges from query params.

        sales_by_status = (
            Order.objects.values("status")
            .annotate(
                order_count=Count("id"), total_revenue=Sum("invoice__total_amount")
            )
            .order_by("-total_revenue")
        )

        return Response(sales_by_status, status=status.HTTP_200_OK)
