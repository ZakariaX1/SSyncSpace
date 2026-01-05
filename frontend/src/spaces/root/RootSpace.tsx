import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import MissionLogs from "./pages/MissionLogs";
import ShipInformation from "./pages/ShipInformation";
import Spaces from "./pages/Spaces";
import SystemStatus from "./pages/SystemStatus";
import RootNav from "./components/RootNav";

function RootSpace() {
    return (
        <div>
            <RootNav/>
            <Routes>
                {/* Root Space Routes */}
                <Route path="/" element={<Home />} />
                <Route path="/mission-logs" element={<MissionLogs />} />
                <Route path="/spaces" element={<Spaces />} />
                <Route path="/ship-info" element={<ShipInformation />} />
                <Route path="/system-status" element={<SystemStatus />} />
            </Routes>
        </div>
    )
}

export default RootSpace;