import { Navigate } from "react-router-dom";
import useAuth from "../modules/auth/context/useAuth";
import Loader from "../shared/components/Loader/Loader";
import { ROUTES } from "../shared/constants/routes";

export default function PublicRoute({ children }) {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return <Loader />;
  }

  if (isAuthenticated) {
    return <Navigate to={ROUTES.DASHBOARD} replace />;
  }

  return children;
}