import os
from datetime import datetime
import joblib
import pandas as pd

MODEL_PATH = os.path.join(os.path.dirname(__file__), "model.pkl")
model = joblib.load(MODEL_PATH)

def predict_delay(airline, origin, destination, flight_date, dep_hour):
    dt = datetime.strptime(flight_date, "%Y-%m-%d")
    day_of_week = dt.weekday()
    month = dt.month
    is_weekend = 1 if day_of_week >= 5 else 0
    peak_hour = 1 if (7 <= int(dep_hour) <= 10 or 17 <= int(dep_hour) <= 21) else 0

    df = pd.DataFrame([{
        "Airline": airline,
        "Origin_Airport": origin,
        "Destination_Airport": destination,
        "Scheduled_Departure_Hour": int(dep_hour),
        "Day_of_Week": day_of_week,
        "Month": month,
        "Is_Weekend": is_weekend,
        "Peak_Hour": peak_hour,
    }])

    prob = float(model.predict_proba(df)[0][1]) * 100
    if prob >= 70:
        label = "High"
    elif prob >= 40:
        label = "Medium"
    else:
        label = "Low"

    return {"delay_probability": round(prob, 1), "risk_label": label}