import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "../pages/Dashboard/index";
import PrivateRoute from "./private_route";
import Fleet from "../pages/Fleet/index";
import Drivers from "../pages/Drivers/Drivers";
import Managers from "../pages/Managers/Managers";
import Geofence from "../pages/GeoFence/Geofence";
import Reports from "../pages/Reports/Reports";
import Login from "../pages/Auth/Login";

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<PrivateRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/fleet" element={<Fleet />} />
          <Route path="/drivers" element={<Drivers />} />
          <Route path="/managers" element={<Managers />} />
          <Route path="/geofence" element={<Geofence />} />
          <Route path="/reports" element={<Reports />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default AppRoutes;
