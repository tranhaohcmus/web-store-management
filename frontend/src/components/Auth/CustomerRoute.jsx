import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

function CustomerRoute() {
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Nếu là admin và đang cố vào trang customer, redirect sang admin dashboard
  if (user?.role === "admin") {
    return <Navigate to="/admin" replace />;
  }

  return <Outlet />;
}

export default CustomerRoute;
