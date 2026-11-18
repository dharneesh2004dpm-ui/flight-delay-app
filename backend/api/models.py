
from django.db import models
from django.contrib.auth.models import User

class PredictionLog(models.Model):
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, blank=True)
    airline = models.CharField(max_length=50)
    origin = models.CharField(max_length=10)
    destination = models.CharField(max_length=10)
    flight_date = models.CharField(max_length=20)
    dep_hour = models.IntegerField()
    delay_probability = models.FloatField()
    risk_label = models.CharField(max_length=20)
    created_at = models.DateTimeField(auto_now_add=True)
# Create your models here.
