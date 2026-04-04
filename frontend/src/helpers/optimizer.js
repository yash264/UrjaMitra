import mapboxgl from "mapbox-gl";
import { geocode, getRoute } from "../externalAPI/mapService";
import { fetchEVStations } from "../externalAPI/evService";
import { getDistance } from "./geolocation";
import { simulateBattery } from "./battery";



export const handleRouting = async (map, { src, dst, range, battery }) => {
    const start = await geocode(src);
    const end = await geocode(dst);

    let currentBattery = battery;
    let routePoints = [start]; // final route coordinates
    let lastPoint = start;

    // 1️⃣ Sample points along route in chunks
    const initialRoute = await getRoute(start, end);
    const coords = initialRoute.geometry.coordinates;

    for (let i = 1; i < coords.length; i++) {
        const point = coords[i];
        const dist = getDistance(coords[i - 1], point);
        currentBattery = simulateBattery(dist, range, currentBattery);

        if (currentBattery < 20) {
            // 2️⃣ Find nearest EV station to current location
            const stations = await fetchEVStations(point[1], point[0]);
            const nearest = stations[0]; // later: sort by distance to route
            if (nearest?.AddressInfo) {
                const stationCoords = [
                    nearest.AddressInfo.Longitude,
                    nearest.AddressInfo.Latitude,
                ];
                routePoints.push(stationCoords); // insert stop
                currentBattery = 80; // recharge
                lastPoint = stationCoords;
            }
        } else {
            lastPoint = point;
        }
        routePoints.push(point);
    }

    // 3️⃣ Recalculate final route including all stops
    const finalRoute = await getRoute(start, end, routePoints.slice(1, -1));

    // 4️⃣ Draw final route
    if (map.getSource("route")) {
        map.removeLayer("route");
        map.removeSource("route");
    }

    map.addSource("route", {
        type: "geojson",
        data: finalRoute.geometry,
    });

    map.addLayer({
        id: "route",
        type: "line",
        source: "route",
        paint: { "line-color": "#3b82f6", "line-width": 5 },
    });

    // 5️⃣ Add markers for start, end, and stops
    new mapboxgl.Marker({ color: "blue" }).setLngLat(start).addTo(map);
    new mapboxgl.Marker({ color: "black" }).setLngLat(end).addTo(map);

    routePoints.forEach(([lng, lat]) => {
        new mapboxgl.Marker({ color: "green" }).setLngLat([lng, lat]).addTo(map);
    });

    map.flyTo({ center: start, zoom: 10 });
};