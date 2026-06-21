import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

export const PrivateRoute = () => {
  const { isAuth, isLoading } = useAuth();

  if (isLoading) return null;

  return isAuth ? <Outlet /> : <Navigate to="/" replace />;
};
