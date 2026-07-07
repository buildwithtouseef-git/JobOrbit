import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import authService from "../services/auth.service";
import useAuth from "../context/useAuth";
import { ROUTES } from "../../../shared/constants/routes";

export default function useLogin() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [loading, setLoading] = useState(false);

  const handleLogin = async (data) => {
    try {
      setLoading(true);
      const response = await authService.login(data);
      const authData = response.data?.data;
      login(authData?.user, authData?.accessToken);
      toast.success(response.data?.message || "Login successful.");
      navigate(ROUTES.ROOT);
    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed.");
    } finally {
      setLoading(false);
    }
  };

  return { handleLogin, loading };
}