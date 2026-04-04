import { useState, useRef, useEffect } from "react";
import mapboxgl from "mapbox-gl";
import { fetchEVStations } from "../../externalAPI/evService";

// Minimum distance in meters to refetch stations when moving
const REFRESH_DISTANCE = 5000;

const EVStations = ({ map, srcCoords, dstCoords }) => {
    console.log(srcCoords, dstCoords);

    const [loading, setLoading] = useState(false);
    const markersRef = useRef([]);
    const lastFetchRef = useRef(null); // store last fetch position

    const clearMarkers = () => {
        markersRef.current.forEach((m) => m.remove());
        markersRef.current = [];
    };

    const fetchStationsAt = async (latitude, longitude) => {
        setLoading(true);
        clearMarkers();

        try {
            // Wait for map to load
            if (!map.current.loaded()) {
                await new Promise((resolve) => map.current.on("load", resolve));
            }

            // 🔴 Red marker: user location or src
            new mapboxgl.Marker({ color: "red" })
                .setLngLat([longitude, latitude])
                .setPopup(new mapboxgl.Popup().setText("You are here"))
                .addTo(map.current);

            const stations = await fetchEVStations(latitude, longitude);

            if (!stations.length) {
                console.warn("No EV stations found nearby 😕");
            }

            stations.forEach((station) => {
                if (!station.AddressInfo) return;

                const lat = station.AddressInfo.Latitude;
                const lng = station.AddressInfo.Longitude;

                if (!lat || !lng) return;

                const name = station.AddressInfo.Title || "EV Station";
                const address = station.AddressInfo.AddressLine1 || "No address";
                const connectors = station.Connections?.length || 0;
                const power = station.Connections?.[0]?.PowerKW || "N/A";

                const marker = new mapboxgl.Marker({ color: "green" })
                    .setLngLat([lng, lat])
                    .setPopup(
                        new mapboxgl.Popup().setHTML(`
                            <h4>${name}</h4>
                            <p>${address}</p>
                            <p>⚡ Connectors: ${connectors}</p>
                            <p>🔋 Power: ${power} kW</p>
                        `)
                    )
                    .addTo(map.current);

                markersRef.current.push(marker);
            });

            map.current.flyTo({
                center: [longitude, latitude],
                zoom: 12,
                essential: true,
            });

            lastFetchRef.current = { latitude, longitude };
        } catch (err) {
            console.error(err);
            alert("Something went wrong while fetching EV stations");
        } finally {
            setLoading(false);
        }
    };

    const handleFindStations = async () => {
        let latitude, longitude;

        if (srcCoords) {
            // Use coordinates from autocomplete src
            [longitude, latitude] = srcCoords;
        } else {
            // Use browser geolocation
            await new Promise((resolve, reject) =>
                navigator.geolocation.getCurrentPosition(resolve, reject)
            )
                .then((pos) => {
                    latitude = pos.coords.latitude;
                    longitude = pos.coords.longitude;
                })
                .catch((err) => {
                    console.error("Geolocation error:", err);
                    alert("Please enable location access or enter a source");
                    setLoading(false);
                    return;
                });
        }

        if (latitude && longitude) {
            fetchStationsAt(latitude, longitude);
        }
    };

    // 🔄 Re-fetch stations if user moves far from last fetch
    useEffect(() => {
        if (!map.current) return;

        const onMoveEnd = () => {
            if (!map.current) return;
            const center = map.current.getCenter();
            const last = lastFetchRef.current;

            if (!last) return;

            const distance = mapboxgl.LngLat.convert([center.lng, center.lat])
                .distanceTo([last.longitude, last.latitude]);

            if (distance >= REFRESH_DISTANCE) {
                fetchStationsAt(center.lat, center.lng);
            }
        };

        map.current.on("moveend", onMoveEnd);
        return () => {
            map.current.off("moveend", onMoveEnd);
        };
    }, [map]);

    return (
        <button
            onClick={handleFindStations}
            disabled={loading}
            className={`
                absolute top-10 right-20 z-30
                px-5 py-3 rounded-xl
                bg-blue-500
                text-white font-semibold text-sm
                shadow-lg hover:shadow-2xl
                hover:bg-green-600 
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