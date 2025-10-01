# apps/reports/urls.py
from django.urls import path
from .views import DashboardSummaryView, SalesReportView, RecentOrdersChartView

urlpatterns = [
    path("summary/", DashboardSummaryView.as_view(), name="dashboard-summary"),
    path("sales/", SalesReportView.as_view(), name="sales-report"),
    path("recent-orders/", RecentOrdersChartView.as_view(), name="recent-orders-chart"),
]
