from django.urls import path
from .views import predict_view, stats_view

urlpatterns = [
    path("predict/", predict_view),
    path("stats/", stats_view),
]