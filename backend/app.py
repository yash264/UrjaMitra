from flask import Flask, request, jsonify
import joblib
import pandas as pd
from flask_cors import CORS

app = Flask(__name__)

# set the cors value
cors_options = {
    "origins": "http://localhost:3000",
    "methods": ["GET", "POST", "PUT", "DELETE", "PATCH", "HEAD"],
    "allow_headers": ["Content-Type", "Authorization"],
    "supports_credentials": True
}

CORS(app, resources={r"/*": cors_options})


battery_model = joblib.load("models/battery_model.pkl")
charge_model = joblib.load("models/charge_model.pkl")


@app.route('/')
def home():
    return "<h1>EV Prediction Server Running ⚡</h1>"


@app.route("/predict", methods=["POST"])
def predict():
    try:
        data = request.get_json()

        distance = data["distance"]
        battery_start = data["battery_start"]
        range_val = data["range"]


        X_battery = pd.DataFrame([{
            "distance": distance,
            "battery_start": battery_start,
            "range": range_val
        }])

        battery_end = battery_model.predict(X_battery)[0]
        battery_end = max(0, min(100, battery_end))

        avg_speed = 60  # km/h 

        travel_time = (distance / avg_speed) * 3600  # seconds

        X_charge = pd.DataFrame([{
            "distance": distance,
            "battery_start": battery_start,
            "battery_end": battery_end
        }])

        charging_time = charge_model.predict(X_charge)[0]
        charging_time = max(0, charging_time)

        total_time = travel_time + charging_time

        return jsonify({
            "battery_end": round(battery_end, 2),
            "travel_time": round(travel_time, 2),
            "charging_time": round(charging_time, 2),
            "total_time": round(total_time, 2)
        })

    except Exception as e:
        return jsonify({"error": str(e)}), 400


@app.route("/startServer", methods=['GET'])
def start_server():
    return jsonify({
        "message": "Server started successfully!"
    })


if __name__ == '__main__':
    app.run(debug=True)