import { useState, useRef, useEffect } from "react";
import { Layout, Grid } from "antd";

import { useMapbox } from "../components/mapView/useMapBox";
import { mapStyles, DEFAULT_CENTER, DEFAULT_ZOOM } from "../helpers/constants";
import "mapbox-gl/dist/mapbox-gl.css";

import MapControls from "../components/mapView/mapControls";
import EVStations from "../components/mapView/evStations";
import RouteControls from "../components/mapView/routeControl"; // ✅ NEW

import Sidebar from "../helpers/sideBar";
import MobileDrawer from "../components/mapView/mobileDrawer";

import { handleRouting } from "../helpers/optimizer"; // ✅ NEW

const { Sider } = Layout;
const { useBreakpoint } = Grid;

const MapView = () => {
    const mapContainer = useRef(null);

    const [mapStyle, setMapStyle] = useState(mapStyles["Streets"]);
    const [activeTab, setActiveTab] = useState("tickets");
    const [drawerOpen, setDrawerOpen] = useState(false);

    const [src, setSrc] = useState("");
    const [dst, setDst] = useState("");
    const [srcCoords, setSrcCoords] = useState(null);
    const [range, setRange] = useState(300);
    const [battery, setBattery] = useState(100);

    const [routeData, setRouteData] = useState(null); // ✅ NEW
    const [tripSummary, setTripSummary] = useState(null);

    const map = useMapbox(mapContainer, {
        style: mapStyle,
        center: DEFAULT_CENTER,
        zoom: DEFAULT_ZOOM,
    });

    const screens = useBreakpoint();
    const isMobile = !screens.md;

    // ✅ HANDLE ROUTING WHEN USER SUBMITS
    useEffect(() => {
        if (!routeData || !map.current) return;

        handleRouting(map.current, routeData);
    }, [routeData, map]);

    return (
        <Layout style={{ minHeight: "100vh" }}>

            {/* 🔹 Map Style Dropdown */}
            <MapControls
                mapStyle={mapStyle}
                setMapStyle={setMapStyle}
                mapStyles={mapStyles}
            />

            {/* 🔥 Route Input UI */}
            <RouteControls
                src={src}
                setSrc={setSrc}
                dst={dst}
                setDst={setDst}
                srcCoords={srcCoords}
                setSrcCoords={setSrcCoords}
                range={range}
                setRange={setRange}
                battery={battery}
                setBattery={setBattery}
                onSubmit={(data) =>
                    handleRouting(map.current, { ...data, setTripSummary })
                }
            />

            {/* 🔹 Sidebar (Desktop) */}
            {!isMobile && (
                <Sider collapsible collapsedWidth={80}>
                    <Sidebar
                        activeTab={activeTab}
                        onChange={setActiveTab}
                    />
                </Sider>
            )}

            {/* 🔹 Mobile Drawer */}
            {isMobile && (
                <MobileDrawer
                    open={drawerOpen}
                    setOpen={setDrawerOpen}
                    activeTab={activeTab}
                    setActiveTab={setActiveTab}
                />
            )}

            {/* 🗺️ Map */}
            <div
                ref={mapContainer}
                style={{ width: "100%", height: "100vh" }}
            />

            {/* Trip Summary Card */}
            {tripSummary && (
                <div className="absolute top-1/2 left-5 z-30 p-4 w-64 bg-gradient-to-r from-green-400 to-teal-500 text-white rounded-2xl shadow-2xl font-semibold space-y-2 transform -translate-y-1/2">
                    <h3 className="text-lg font-bold">🚗 Trip Summary</h3>
                    <p>📏 Distance: {tripSummary.distance} km</p>
                    <p>⏱️ Estimated Time: {tripSummary.totalTime} mins</p>
                    <p>🔋 Battery End: {tripSummary.batteryEnd} %</p>
                </div>
            )}

            {/* ⚡ EV Stations Button */}
            <EVStations
                srcCoords={srcCoords}
                setSrcCoords={setSrcCoords}
                map={map}
            />

        </Layout>
    );
};

export default MapView;