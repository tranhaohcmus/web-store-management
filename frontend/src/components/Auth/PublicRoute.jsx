import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

/**
 * PublicRoute - Cho phép truy cập public pages
 * Nhưng redirect admin sang /admin
 */
function PublicRoute() {
  const { user, isAuthenticated } = useSelector((state) => state.auth);

  // Nếu là admin, redirect sang admin dashboard
  if (isAuthenticated && user?.role === "admin") {
    return <Navigate to="/admin" replace />;
  }

  return <Outlet />;
}

export default PublicRoute;
