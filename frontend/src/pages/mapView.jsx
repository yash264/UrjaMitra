import { useState, useRef } from "react";
import { Layout, Grid } from "antd";

import { useMapbox } from "../components/useMapBox";
import { mapStyles, DEFAULT_CENTER, DEFAULT_ZOOM } from "../helpers/constants";
import "mapbox-gl/dist/mapbox-gl.css";

import MapControls from "../components/mapControls";
import EVStations from "../components/evStations";
import Sidebar from "../helpers/sideBar";
import MobileDrawer from "../components/mobileDrawer";

const { Sider } = Layout;
const { useBreakpoint } = Grid;

const MapView = () => {
    const mapContainer = useRef(null);

    const [mapStyle, setMapStyle] = useState(mapStyles["Streets"]);
    const [activeTab, setActiveTab] = useState("tickets");
    const [drawerOpen, setDrawerOpen] = useState(false);

    const map = useMapbox(mapContainer, {
        style: mapStyle,
        center: DEFAULT_CENTER,
        zoom: DEFAULT_ZOOM,
    });

    const screens = useBreakpoint();
    const isMobile = !screens.md;

    return (
        <Layout style={{ minHeight: "100vh" }}>
            <MapControls
                mapStyle={mapStyle}
                setMapStyle={setMapStyle}
                mapStyles={mapStyles}
            />

            {!isMobile && (
                <Sider collapsible collapsedWidth={80}>
                    <Sidebar activeTab={activeTab} onChange={setActiveTab} />
                </Sider>
            )}

            {isMobile && (
                <MobileDrawer
                    open={drawerOpen}
                    setOpen={setDrawerOpen}
                    activeTab={activeTab}
                    setActiveTab={setActiveTab}
                />
            )}

            <div ref={mapContainer} style={{ width: "100%", height: "100vh" }} />

            <EVStations map={map} />
        </Layout>
    );
};

export default MapView;