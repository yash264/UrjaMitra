// src/helpers/tripPrediction.js

export const fetchTripPrediction = async ({ distance, duration, range, battery_start }) => {
    try {
        const res = await fetch("http://localhost:5000/predict", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ distance, duration, range, battery_start })
        });
        const data = await res.json();
        return data;
    } catch (err) {
        console.error("Prediction API error:", err);
        return null;
    }
};