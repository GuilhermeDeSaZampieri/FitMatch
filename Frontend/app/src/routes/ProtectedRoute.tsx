import useAuth from "../hooks/useAuth";
import { Navigate, Outlet } from "react-router";

const ProtectedRoute = () => {
  const { token } = useAuth();

  if (!token) {
    return <Navigate to="Login" />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
