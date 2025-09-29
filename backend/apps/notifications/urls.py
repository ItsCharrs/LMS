# apps/notifications/urls.py
from django.urls import path
from .views import SendTestSMSView

urlpatterns = [
    path("send-test-sms/", SendTestSMSView.as_view(), name="send-test-sms"),
]
