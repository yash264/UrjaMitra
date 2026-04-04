import { Drawer } from "antd";
import Sidebar from "../../helpers/sideBar";

const MobileDrawer = ({ open, setOpen, activeTab, setActiveTab }) => {
    return (
        <Drawer
            open={open}
            onClose={() => setOpen(false)}
            placement="left"
            width="100%"
            bodyStyle={{ padding: 0 }}
        >
            <Sidebar
                activeTab={activeTab}
                onChange={(key) => {
                    setActiveTab(key);
                    setOpen(false);
                }}
            />
        </Drawer>
    );
};

export default MobileDrawer;