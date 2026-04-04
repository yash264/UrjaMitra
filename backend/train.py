import pandas as pd
import random
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestRegressor
from sklearn.metrics import mean_absolute_error
import joblib


df = pd.read_csv("dataset.csv")

X_battery = df[["distance", "range", "battery_start"]]
y_battery = df["battery_end"]

X_time = df[["distance", "duration", "battery_start"]]
y_time = df["total_time"]

Xb_train, Xb_test, yb_train, yb_test = train_test_split(X_battery, y_battery, test_size=0.2, random_state=42)
Xt_train, Xt_test, yt_train, yt_test = train_test_split(X_time, y_time, test_size=0.2, random_state=42)


battery_model = RandomForestRegressor(n_estimators=200, random_state=42)
battery_model.fit(Xb_train, yb_train)

time_model = RandomForestRegressor(n_estimators=200, random_state=42)
time_model.fit(Xt_train, yt_train)


yb_pred = battery_model.predict(Xb_test)
yt_pred = time_model.predict(Xt_test)

print(f" Battery Model MAE: {mean_absolute_error(yb_test, yb_pred):.2f}")
print(f" Time Model MAE: {mean_absolute_error(yt_test, yt_pred):.2f}")


joblib.dump(battery_model, "models/battery_model.pkl")
joblib.dump(time_model, "models/time_model.pkl")

print(" Server running successfully")