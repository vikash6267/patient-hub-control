import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

function OpenRoute({ children }) {
  const { token, user } = useSelector((state) => state.auth);

  if (!token) {
    return children;
  }

  if (user?.userType === "admin") {
    return <Navigate to="/admin-dashboard" />;
  }
  if (user?.userType === "provider") {
    return <Navigate to="/provider-dashboard" />;
  }
  if (user?.userType === "staff") {
    return <Navigate to="/staff-dashboard" />;
  }

  return <Navigate to="/" />;
}

export default OpenRoute;
