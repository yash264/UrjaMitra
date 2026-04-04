import mapboxgl from "mapbox-gl";
import { geocode, getRoute } from "../externalAPI/mapService";
import { fetchEVStations } from "../externalAPI/evService";
import { getDistance } from "./geolocation";
import { simulateBattery } from "./battery";
import { fetchTripPrediction } from "../externalAPI/tripPrediction";

// Global trackers
let currentMarkers = [];
let currentRouteLayer = null;
let currentPredictionPopup = null;

export const handleRouting = async (map, { src, dst, range, battery, setTripSummary }) => {
    if (!map) return;

    // Clear previous markers, route, and popup
    currentMarkers.forEach((m) => m.remove());
    currentMarkers = [];

    if (currentRouteLayer && map.getSource("route")) {
        map.removeLayer("route");
        map.removeSource("route");
        currentRouteLayer = null;
    }

    if (currentPredictionPopup) {
        currentPredictionPopup.remove();
        currentPredictionPopup = null;
    }

    const start = await geocode(src);
    const end = await geocode(dst);

    let currentBattery = battery;
    let routePoints = [start];

    let totalDistance = 0;
    let totalDuration = 0;

    // Sample route points
    const initialRoute = await getRoute(start, end);
    const coords = initialRoute.geometry.coordinates;

    for (let i = 1; i < coords.length; i++) {
        const point = coords[i];
        const dist = getDistance(coords[i - 1], point);
        totalDistance += dist;
        totalDuration += (dist / 60) * 60; // approximate
        currentBattery = simulateBattery(dist, range, currentBattery);

        if (currentBattery < 20) {
            const stations = await fetchEVStations(point[1], point[0]);
            const nearest = stations[0];
            if (nearest?.AddressInfo) {
                const stationCoords = [
                    nearest.AddressInfo.Longitude,
                    nearest.AddressInfo.Latitude,
                ];
                routePoints.push(stationCoords);
                currentBattery = 80;
            }
        }

        routePoints.push(point);
    }

    // Recalculate final route
    const finalRoute = await getRoute(start, end, routePoints.slice(1, -1));

    // Draw route
    map.addSource("route", { type: "geojson", data: finalRoute.geometry });
    map.addLayer({
        id: "route",
        type: "line",
        source: "route",
        paint: { "line-color": "#3b82f6", "line-width": 5 },
    });
    currentRouteLayer = "route";

    // Add markers
    const addMarker = (coords, color, popupHTML = null) => {
        const marker = new mapboxgl.Marker({ color }).setLngLat(coords);
        if (popupHTML) marker.setPopup(new mapboxgl.Popup().setHTML(popupHTML));
        marker.addTo(map);
        currentMarkers.push(marker);
    };

    addMarker(start, "blue"); // Source
    addMarker(end, "red"); // Destination
    for (let point of routePoints) addMarker(point, "green"); // EV stations

    map.flyTo({ center: start, zoom: 10 });

    // Fetch trip predictions
    const predictions = await fetchTripPrediction({
        distance: totalDistance,
        duration: totalDuration,
        range,
        battery_start: battery,
    });

    if (predictions) {
        const { battery_end, total_time } = predictions;

        // Set trip summary in state for frontend card
        setTripSummary({
            distance: totalDistance.toFixed(1),
            totalTime: (total_time / 60).toFixed(1),
            batteryEnd: Math.max(battery_end, 0).toFixed(1),
        });
    }
};