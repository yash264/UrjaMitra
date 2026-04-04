import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestRegressor
from sklearn.metrics import mean_absolute_error
import joblib


df = pd.read_csv("dataset.csv")

df["speed"] = df["distance"] / (df["duration"] / 3600)
df["battery_used"] = df["battery_start"] - df["battery_end"]


df["charging_time"] = df["total_time"] - df["duration"]
df["charging_time"] = df["charging_time"].clip(lower=0)


X_battery = df[["distance", "battery_start", "range"]]
y_battery = df["battery_end"]

Xb_train, Xb_test, yb_train, yb_test = train_test_split(
    X_battery, y_battery, test_size=0.2, random_state=42
)

battery_model = RandomForestRegressor(n_estimators=300, random_state=42)
battery_model.fit(Xb_train, yb_train)

yb_pred = battery_model.predict(Xb_test)

print(f" Battery MAE: {mean_absolute_error(yb_test, yb_pred):.2f}")


X_charge = df[["distance", "battery_start", "battery_end"]]
y_charge = df["charging_time"]

Xc_train, Xc_test, yc_train, yc_test = train_test_split(
    X_charge, y_charge, test_size=0.2, random_state=42
)

charge_model = RandomForestRegressor(n_estimators=300, random_state=42)
charge_model.fit(Xc_train, yc_train)

yc_pred = charge_model.predict(Xc_test)

print(f" Charging Time MAE: {mean_absolute_error(yc_test, yc_pred):.2f}")


joblib.dump(battery_model, "models/battery_model.pkl")
joblib.dump(charge_model, "models/charge_model.pkl")

print(" Server running successfully")