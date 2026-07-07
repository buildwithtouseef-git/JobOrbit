import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import useAuth from "../context/useAuth";
import { ROUTES } from "../../../shared/constants/routes";

export default function useLogout() {
  const navigate = useNavigate();
  const { logout: clearAuth } = useAuth();
  const [loading, setLoading] = useState(false);

  const logout = async () => {
    try {
      setLoading(true);
      await clearAuth();
      toast.success("You have been logged out.");
      navigate(ROUTES.ROOT);
    } catch {
      toast.error("Logout failed.");
    } finally {
      setLoading(false);
    }
  };

  return { logout, loading };
}