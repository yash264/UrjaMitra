# ⚡ Route Prediction System without running out of fuel

A Route Prediction System that predicts **battery usage** and **travel time** for Electric Vehicles (EVs) using a hybrid approach of **Physics + Machine Learning**.

It integrates with Mapbox for real-time route visualization and leverages Open Charge Map to locate nearby EV charging stations, ensuring drivers have an optimized, efficient, and reliable EV journey.

---

### 🔹 Major Features
- 🔄 **Frontend Integration** – Easily integrates with React + Tailwind CSS for a modern UI experience.
- 🗺️ **Map Integration** – Uses Mapbox for route visualization and Open Charge Map for locating nearby EV charging stations.
- 🌐 **REST API** – Built with Flask to provide endpoints for predictions and server interactions.
- 🔋 **Battery Consumption Prediction** – Estimate remaining battery after a trip using Random Forest ML algorithm.
- ⏱ **Realistic Travel Time Calculation** – Physics-based computation (`time = distance / speed`) ensures realistic outputs.
- ⚡ **Interactive UI Experience** – Real Time UI/UX experience for users via Tailwind Css and MapBox for Geo-Location.

---
## ⚙️ Basic Architecture
```
┌──────────────┐
│   Frontend   │  (React + Tailwind CSS)
│──────────────│
│ Context API  │
│ Mapbox Map   │
│OpenCharge Map│
│ Tailwind Css │ 
└──────┬───────┘
       │ HTTPS (REST API)
       ▼
┌─────────────┐
│   Backend   │  (Flask + Python)
│─────────────│
│ REST APIs   │ 
│  ML Model   │  (RandomForest Regression)
└─────────────┘
```
---

### 🔹 Tech Stack
- **Frontend:** React, Tailwind CSS
- **Backend:** Python, Flask
- **Machine Learning:** scikit-learn (RandomForestRegressor)
- **Mapping & EV Stations:** Mapbox API, Open Charge Map API
