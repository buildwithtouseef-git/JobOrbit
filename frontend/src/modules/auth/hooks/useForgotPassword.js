import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import authService from "../services/auth.service";
import { ROUTES } from "../../../shared/constants/routes";

export default function useForgotPassword() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleForgotPassword = async (data) => {
    try {
      setLoading(true);
      const response = await authService.forgotPassword(data);
      toast.success(response.data?.message || "If that email exists, a reset link has been sent.");
      navigate(ROUTES.RESET_PASSWORD_SENT);
    } catch (error) {
      toast.error(error.response?.data?.message || "Unable to process your request.");
    } finally {
      setLoading(false);
    }
  };

  return { handleForgotPassword, loading };
}