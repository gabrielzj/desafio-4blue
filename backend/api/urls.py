from django.urls import path
from . import views

urlpatterns = [
    path('users/', views.register_list_user),
    path('message/', views.register_list_message),
]
