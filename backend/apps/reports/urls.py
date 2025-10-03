# apps/reports/urls.py

from django.urls import path
from .views import (
    DashboardSummaryView, 
    RecentJobsChartView, 
    JobStatusReportView
)

urlpatterns = [
    # Endpoint for the main dashboard KPI cards
    path('summary/', DashboardSummaryView.as_view(), name='dashboard-summary'),
    
    # Endpoint for the time-series chart data (e.g., jobs per day)
    path('recent-jobs-chart/', RecentJobsChartView.as_view(), name='recent-jobs-chart'),
    
    # Endpoint for an aggregate report (e.g., total revenue per job status)
    path('job-status-report/', JobStatusReportView.as_view(), name='job-status-report'),
]