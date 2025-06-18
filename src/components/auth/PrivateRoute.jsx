import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

function PrivateRoute({ children }) {
  const { token, user } = useSelector((state) => state.auth);

  if (!token) {
    return <Navigate to="/auth" />;
  }

  if (user?.userType === "admin") {
    return children;
  } else if (user?.userType === "staff" || user?.userType === "provider") {
    return children;
  }

  return <Navigate to="/" />;
}

export default PrivateRoute;
