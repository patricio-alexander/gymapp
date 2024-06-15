import { useAuth } from "../context/AuthContext";
import { Navigate, Outlet } from "react-router-dom";

function ProtectedRoute() {
  const { isAuthenticated, isLoading } = useAuth();
  // console.log(isLoading, isAuthenticated);

// if (isLoading) return <h1>Cargando...</h1>

  if (!isLoading && !isAuthenticated) {
    return <Navigate to={"/"} replace />;
  }
  return <Outlet />;
}

export default ProtectedRoute;
