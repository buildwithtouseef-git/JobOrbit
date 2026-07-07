import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import authService from "../services/auth.service";
import { ROUTES } from "../../../shared/constants/routes";

export default function useRegister() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleRegister = async (data) => {
    try {
      setLoading(true);
      const response = await authService.register(data);
      toast.success(response.data?.message || "Registration successful.");
      navigate(ROUTES.VERIFY_EMAIL);
    } catch (error) {
      toast.error(error.response?.data?.message || "Registration failed.");
    } finally {
      setLoading(false);
    }
  };

  return { handleRegister, loading };
}