import { useState, useRef } from "react";
import mapboxgl from "mapbox-gl";
import { fetchEVStations } from "../../externalAPI/evService";

const EVStations = ({ map, srcCoords }) => {
    const [loading, setLoading] = useState(false);
    const markersRef = useRef([]);

    const clearMarkers = () => {
        markersRef.current.forEach((m) => m.remove());
        markersRef.current = [];
    };

    const fetchAndShowStations = async () => {
        if (!srcCoords) {
            alert("Please enter a source location first");
            return;
        }

        setLoading(true);
        clearMarkers();

        const [lng, lat] = srcCoords;
        console.log(lng, lat);

        try {
            if (!map.current.loaded()) {
                await new Promise((resolve) => map.current.on("load", resolve));
            }

            // 🔴 Source marker
            new mapboxgl.Marker({ color: "red" })
                .setLngLat([lng, lat])
                .setPopup(new mapboxgl.Popup().setText("Source"))
                .addTo(map.current);

            // Fetch EV stations
            const stations = await fetchEVStations(lat, lng);

            if (!stations.length) {
                alert("No EV stations found nearby 😕");
            }

            stations.forEach((station) => {
                const addr = station.AddressInfo;
                if (!addr?.Latitude || !addr?.Longitude) return;

                const popup = new mapboxgl.Popup({ offset: 25 }).setHTML(`
                    <h4>${addr.Title || "EV Station"}</h4>
                    <p>${addr.AddressLine1 || "No address"}</p>
                    <p>⚡ Connectors: ${station.Connections?.length || 0}</p>
                    <p>🔋 Power: ${station.Connections?.[0]?.PowerKW || "N/A"} kW</p>
                `);

                const marker = new mapboxgl.Marker({ color: "green" })
                    .setLngLat([addr.Longitude, addr.Latitude])
                    .setPopup(popup)
                    .addTo(map.current);

                markersRef.current.push(marker);
            });

            map.current.flyTo({ center: [lng, lat], zoom: 12 });
        } 
        catch (err) {
            console.error("EV station fetch error:", err);
            alert("Failed to fetch EV stations");
        } 
        finally {
            setLoading(false);
        }
    };

    return (
        <button
            onClick={fetchAndShowStations}
            disabled={loading}
            className={`
                absolute top-10 right-20 z-30
                px-5 py-3 rounded-xl
                bg-gradient-to-r from-blue-500 to-indigo-500
                text-white font-semibold text-sm
                shadow-lg hover:shadow-2xl
                hover:from-green-500 hover:to-teal-500
                transition-all duration-300
                flex items-center justify-center gap-2
                ${loading ? "opacity-70 cursor-not-allowed" : ""}
            `}
        >
            {loading ? "⏳ Loading..." : "⚡ Find EV Stations"}
        </button>
    );
};

export default EVStations;