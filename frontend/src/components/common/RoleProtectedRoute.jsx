import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

function RoleProtectedRoute({ children, allowedRole }) {
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (user?.role !== allowedRole) {
    return <Navigate to="/" replace />;
  }

  return children;
}

export default RoleProtectedRoute;