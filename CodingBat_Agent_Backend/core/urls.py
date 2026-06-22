from django.urls import path, include
from . import views

urlpatterns = [
    path("", views.send_request_to_agent),
    path("check_status/", views.check_agent_status)
] 

