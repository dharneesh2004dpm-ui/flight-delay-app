import os
import pandas as pd
from django.conf import settings
from django.contrib.auth import authenticate
from django.contrib.auth.models import User
from rest_framework.authtoken.models import Token
from rest_framework.decorators import api_view
from rest_framework.response import Response
from ml.predict import predict_delay
from .models import PredictionLog

DATA_PATH = os.path.join(settings.BASE_DIR.parent, "data", "india_flight_delay_model_input.csv")

@api_view(["POST"])
def register_view(request):
    username = request.data.get("username")
    password = request.data.get("password")
    if not username or not password:
        return Response({"error": "Username and password required"}, status=400)
    if User.objects.filter(username=username).exists():
        return Response({"error": "Username already exists"}, status=400)
    user = User.objects.create_user(username=username, password=password)
    token, _ = Token.objects.get_or_create(user=user)
    return Response({"token": token.key, "username": user.username})

@api_view(["POST"])
def login_view(request):
    user = authenticate(username=request.data.get("username"), password=request.data.get("password"))
    if not user:
        return Response({"error": "Invalid credentials"}, status=401)
    token, _ = Token.objects.get_or_create(user=user)
    return Response({"token": token.key, "username": user.username})

@api_view(["POST"])
def predict_view(request):
    data = request.data
    result = predict_delay(
        airline=data["airline"],
        origin=data["origin"],
        destination=data["destination"],
        flight_date=data["date"],
        dep_hour=data["dep_hour"],
    )
    PredictionLog.objects.create(
        airline=data["airline"],
        origin=data["origin"],
        destination=data["destination"],
        flight_date=data["date"],
        dep_hour=int(data["dep_hour"]),
        delay_probability=result["delay_probability"],
        risk_label=result["risk_label"],
    )
    return Response(result)

@api_view(["GET"])
def history_view(request):
    logs = PredictionLog.objects.order_by("-created_at")[:10].values(
        "id", "airline", "origin", "destination", "flight_date", "dep_hour", "delay_probability", "risk_label", "created_at"
    )
    return Response(list(logs))

@api_view(["GET"])
def stats_view(request):
    df = pd.read_csv(DATA_PATH)
    by_airline = (df.groupby("Airline")["Delay_Target"].mean() * 100).round(1).reset_index()
    by_hour = (df.groupby("Scheduled_Departure_Hour")["Delay_Target"].mean() * 100).round(1).reset_index()
    by_weather = (df.groupby("Weather")["Delay_Target"].mean() * 100).round(1).reset_index()
    by_airport = (df.groupby("Origin_Airport")["Delay_Target"].mean() * 100).round(1).head(10).reset_index()

    return Response({
        "total_flights": len(df),
        "overall_delay_rate": round(float(df["Delay_Target"].mean()) * 100, 1),
        "by_airline": by_airline.rename(columns={"Airline": "name", "Delay_Target": "delay_rate"}).to_dict("records"),
        "by_hour": by_hour.rename(columns={"Scheduled_Departure_Hour": "hour", "Delay_Target": "delay_rate"}).to_dict("records"),
        "by_weather": by_weather.rename(columns={"Weather": "weather", "Delay_Target": "delay_rate"}).to_dict("records"),
        "by_airport": by_airport.rename(columns={"Origin_Airport": "airport", "Delay_Target": "delay_rate"}).to_dict("records"),
    })