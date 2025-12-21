from django.urls import path
from . import views

urlpatterns = [
    path('calculate/', views.calculate_quote, name='calculate_quote'),
    path('config/', views.calculator_config, name='calculator_config'),
]
