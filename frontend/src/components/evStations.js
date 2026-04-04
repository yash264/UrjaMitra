// import { useState, useRef } from "react";
// import mapboxgl from "mapbox-gl";
// import { fetchEVStations } from "../helpers/evService";

// const EVStations = ({ map }) => {
//     const [loading, setLoading] = useState(false);
//     const markersRef = useRef([]);

//     const clearMarkers = () => {
//         markersRef.current.forEach((m) => m.remove());
//         markersRef.current = [];
//     };

//     const handleFindStations = () => {

//         if (!map.current) return;

//         setLoading(true);
//         clearMarkers();

//         navigator.geolocation.getCurrentPosition(
//             async (pos) => {
//                 try {
//                     const { latitude, longitude }= pos.coords;
//                     console.log("location", latitude, longitude);

//                     // 🔴 Debug marker (your current location)
//                     new mapboxgl.Marker({ color: "red" })
//                         .setLngLat([longitude, latitude])
//                         .setPopup(new mapboxgl.Popup().setText("You are here"))
//                         .addTo(map.current);

//                     console.log(latitude, longitude);

//                     const stations = await fetchEVStations(latitude, longitude);

//                     console.log("EV Stations:", stations);

//                     if (!stations.length) {
//                         alert("No EV stations found nearby 😕");
//                     }

//                     stations.forEach((station) => {
//                         if (!station.AddressInfo) return;

//                         const lat = station.AddressInfo.Latitude;
//                         const lng = station.AddressInfo.Longitude;

//                         if (!lat || !lng) return;

//                         const name = station.AddressInfo.Title || "EV Station";
//                         const address =
//                             station.AddressInfo.AddressLine1 || "No address";

//                         const connectors = station.Connections?.length || 0;
//                         const power =
//                             station.Connections?.[0]?.PowerKW || "N/A";

//                         const marker = new mapboxgl.Marker({ color: "green" })
//                             .setLngLat([lng, lat])
//                             .setPopup(
//                                 new mapboxgl.Popup().setHTML(`
//                   <h4>${name}</h4>
//                   <p>${address}</p>
//                   <p>⚡ Connectors: ${connectors}</p>
//                   <p>🔋 Power: ${power} kW</p>
//                 `)
//                             )
//                             .addTo(map.current);

//                         markersRef.current.push(marker);
//                     });

//                     map.current.flyTo({
//                         center: [longitude, latitude],
//                         zoom: 12,
//                     });
//                 } catch (err) {
//                     console.error(err);
//                     alert("Something went wrong while fetching EV stations");
//                 } finally {
//                     setLoading(false);
//                 }
//             },
//             (err) => {
//                 console.error("Geolocation error:", err);
//                 alert("Please enable location access");
//                 setLoading(false);
//             }
//         );
//     };

//     return (
//         <button
//             onClick={handleFindStations}
//             style={{
//                 position: "absolute",
//                 top: 10,
//                 right: 10,
//                 zIndex: 10,
//                 padding: "10px 14px",
//                 background: "#0f172a",
//                 color: "#fff",
//                 border: "none",
//                 borderRadius: "8px",
//                 cursor: "pointer",
//                 boxShadow: "0 4px 10px rgba(0,0,0,0.3)",
//             }}
//         >
//             {loading ? "Loading..." : "Find EV Stations ⚡"}
//         </button>
//     );
// };

// export default EVStations;


import { useState, useRef, useEffect } from "react";
import mapboxgl from "mapbox-gl";
import { fetchEVStations } from "../helpers/evService";

const EVStations = ({ map }) => {
    const [loading, setLoading] = useState(false);
    const markersRef = useRef([]);

    const clearMarkers = () => {
        markersRef.current.forEach((m) => m.remove());
        markersRef.current = [];
    };

    const handleFindStations = async () => {
        if (!map.current) return;

        setLoading(true);
        clearMarkers();

        try {
            const latitude = 28.0041;
            const longitude = 77.1325;

            // Wait for map to fully load
            if (!map.current.loaded()) {
                await new Promise((resolve) => map.current.on("load", resolve));
            }

            // 🔴 Add red marker for current location
            new mapboxgl.Marker({ color: "red" })
                .setLngLat([longitude, latitude])
                .setPopup(new mapboxgl.Popup().setText("You are here"))
                .addTo(map.current);

            const stations = await fetchEVStations(latitude, longitude);
            console.log("EV Stations:", stations);

            if (!stations.length) {
                alert("No EV stations found nearby 😕");
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

                // ✅ Make sure coordinates are [lng, lat]
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

            // Fly to user location
            map.current.flyTo({
                center: [longitude, latitude],
                zoom: 12,
                essential: true,
            });
        } catch (err) {
            console.error(err);
            alert("Something went wrong while fetching EV stations");
        } finally {
            setLoading(false);
        }
    };

    return (
        <button
            onClick={handleFindStations}
            style={{
                position: "absolute",
                top: 150,
                right: 10,
                zIndex: 10,
                padding: "10px 14px",
                background: "#0f172a",
                color: "#fff",
                border: "none",
                borderRadius: "8px",
                cursor: "pointer",
                boxShadow: "0 4px 10px rgba(0,0,0,0.3)",
            }}
            disabled={loading}
        >
            {loading ? "Loading..." : "Find EV Stations ⚡"}
        </button>
    );
};

export default EVStations;