import { Navigate } from "react-router-dom";
import { getVehicleRegistrationStatus, isUserBlocked } from "./api";

const ProtectedRoute = ({ children }) => {
  const isRegistered = getVehicleRegistrationStatus();
  const blocked = isUserBlocked();

  if (blocked) {
    return <Navigate to="/blocked" replace />;
  }

  return isRegistered ? children : <Navigate to="/register" replace />;
};

export default ProtectedRoute;
