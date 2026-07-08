import { Navigate } from "react-router-dom";
import useAuth from "../modules/auth/context/useAuth";
import Loader from "../shared/components/Loader/Loader";
import { ROUTES } from "../shared/constants/routes";

export default function ProtectedRoute({ children }) {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return <Loader />;
  }

  if (!isAuthenticated) {
    return <Navigate to={ROUTES.LOGIN} replace />;
  }

  return children;
}