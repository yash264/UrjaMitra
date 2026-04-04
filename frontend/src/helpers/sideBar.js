import { Menu } from "antd";
import {
    AppstoreOutlined,
    BarChartOutlined
} from "@ant-design/icons";

const Sidebar = ({ activeTab, onChange }) => {
    return (
        <div
            style={{
                height: "100%",
                display: "flex",
                flexDirection: "column"
            }}
        >
            <div
                style={{
                    height: 64,
                    background: "linear-gradient(135deg, #fbbf24, #f97316)", // gold → orange
                    color: "#ffffff",
                    fontSize: 20,
                    textAlign: "center",
                    lineHeight: "64px",
                    fontWeight: 800,
                    letterSpacing: "1px",
                    textTransform: "uppercase",
                    textShadow: "0 2px 4px rgba(0,0,0,0.35)",
                    boxShadow: "0 6px 20px rgba(249,115,22,0.45)",
                }}
            >
                Urja Mitra
            </div>

            {/* Menu */}
            <Menu
                mode="inline"
                selectedKeys={[activeTab]}
                onClick={(e) => onChange(e.key)}
                items={[
                    {
                        key: "tickets",
                        icon: <AppstoreOutlined />,
                        label: "Tickets"
                    },
                    {
                        key: "metrics",
                        icon: <BarChartOutlined />,
                        label: "Metrics"
                    }
                ]}
                style={{ flex: 1 }}
            />
        </div>
    );
};

export default Sidebar;