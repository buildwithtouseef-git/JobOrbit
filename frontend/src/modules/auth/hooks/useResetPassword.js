import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import authService from "../services/auth.service";
import { ROUTES } from "../../../shared/constants/routes";

export default function useResetPassword() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleResetPassword = async (data) => {
    try {
      setLoading(true);
      const response = await authService.resetPassword(data);
      toast.success(response.data?.message || "Password updated.");
      navigate(ROUTES.LOGIN);
    } catch (error) {
      toast.error(error.response?.data?.message || "Password reset failed.");
    } finally {
      setLoading(false);
    }
  };

  return { handleResetPassword, loading };
}