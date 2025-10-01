from rest_framework import views, status
from rest_framework.response import Response
from django.db.models import Count, Sum
from django.db.models.functions import TruncDate
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


class RecentOrdersChartView(views.APIView):
    """
    Provides data formatted for a chart of orders over the last N days.
    Defaults to 7 days.
    """
    permission_classes = [IsAdminOrManagerUser]

    def get(self, request, *args, **kwargs):
        # Get the number of days from query params, default to 7
        try:
            days_ago = int(request.query_params.get('days', 7))
        except (ValueError, TypeError):
            days_ago = 7

        # Calculate the start date (days_ago days before today, time component zeroed out)
        # Using .date() here simplifies the comparison to only the day part
        end_date = datetime.now().date()
        start_date = end_date - timedelta(days=days_ago - 1) # Start date is inclusive
        
        # Query orders, group by date, and count them
        orders_by_day = Order.objects.filter(
            # Filter orders that occurred on or after the start date
            order_date__date__gte=start_date
        ).annotate(
            # TruncDate('order_date') extracts just the date part (YYYY-MM-DD)
            date=TruncDate('order_date')
        ).values('date').annotate(
            count=Count('id')
        ).order_by('date')

        # To ensure all days in the range are present (even with 0 orders),
        # we can build a complete date range map.
        date_map = {item['date'].strftime('%Y-%m-%d'): item['count'] for item in orders_by_day}
        
        chart_data = []
        # Iterate over the date range from start_date up to and including end_date
        for i in range(days_ago):
            date = start_date + timedelta(days=i)
            date_str = date.strftime('%Y-%m-%d')
            chart_data.append({
                'date': date_str,
                # Format date for display (e.g., "Sep 30")
                'short_date': date.strftime('%b %d'), 
                'orders': date_map.get(date_str, 0) # Use the count from our query, or 0
            })

        return Response(chart_data, status=status.HTTP_200_OK)


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
