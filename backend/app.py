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
time_model = joblib.load("models/time_model.pkl")


@app.route('/')
def home():
    return "<h1>Welcome to Server Side.</h1>"


@app.route("/predict", methods=["POST"])
def predict():
    try:
        data = request.get_json()

        X_battery = pd.DataFrame([{
            "distance": data["distance"],
            "range": data["range"],
            "battery_start": data["battery_start"]
        }])

        X_time = pd.DataFrame([{
            "distance": data["distance"],
            "duration": data["duration"],
            "battery_start": data["battery_start"]
        }])

        battery_end = battery_model.predict(X_battery)[0]
        total_time = time_model.predict(X_time)[0]

        return jsonify({
            "battery_end": round(battery_end, 2),
            "total_time": round(total_time, 2)
        })

    except Exception as e:
        return jsonify({"error": str(e)}), 400


#  start the server on hosting
@app.route("/startServer", methods=['GET'])
def start_server():
    return jsonify({
        "message": "Server started successfully!"
    })


if __name__ == '__main__':
    app.run(debug=True)