import { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";

mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_TOKEN;

export const useMapbox = (containerRef, options) => {
    const mapRef = useRef(null);

    // Create map only once
    useEffect(() => {
        if (!containerRef.current || mapRef.current) return;

        mapRef.current = new mapboxgl.Map({
            container: containerRef.current,
            style: options.style,
            center: options.center,
            zoom: options.zoom,
        });

        mapRef.current.addControl(new mapboxgl.NavigationControl());

        mapRef.current.addControl(
            new mapboxgl.GeolocateControl({
                positionOptions: { enableHighAccuracy: true },
                trackUserLocation: true,
            })
        );
    }, []);

    // 🔥 Handle style change separately
    useEffect(() => {
        if (!mapRef.current) return;

        mapRef.current.setStyle(options.style);
    }, [options.style]);

    return mapRef;
};