import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import authService from "../services/auth.service";
import { ROUTES } from "../../../shared/constants/routes";

export default function useChangedPassword() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleChangePassword = async (data) => {
    try {
      setLoading(true);
      const response = await authService.changePassword(data);
      toast.success(response.data?.message || "Password updated.");
      navigate(ROUTES.ROOT);
    } catch (error) {
      toast.error(error.response?.data?.message || "Unable to change password.");
    } finally {
      setLoading(false);
    }
  };

  return { handleChangePassword, loading };
}