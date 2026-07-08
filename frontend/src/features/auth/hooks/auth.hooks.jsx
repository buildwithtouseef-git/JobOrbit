import { useCallback, useState } from "react";
import authService from "../services/authService";

function getErrorMessage(err, fallback) {
  const serverErrors = err?.response?.data?.errors;
  const serverMessage = err?.response?.data?.message;

  if (Array.isArray(serverErrors) && serverErrors.length > 0) {
    const firstMessage = serverErrors.find((item) => item?.message)?.message;

    if (firstMessage) {
      return firstMessage;
    }
  }

  if (serverErrors && typeof serverErrors === "object") {
    const firstError = Object.values(serverErrors).find((value) => {
      if (Array.isArray(value)) {
        return value.length > 0;
      }

      return Boolean(value);
    });

    if (Array.isArray(firstError) && firstError.length > 0) {
      return firstError[0];
    }

    if (typeof firstError === "string" && firstError.trim()) {
      return firstError;
    }
  }

  if (typeof serverMessage === "string" && serverMessage.trim()) {
    return serverMessage;
  }

  return fallback;
}

export function useAuth() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const resetStatus = useCallback(() => {
    setError(null);
    setSuccess(null);
  }, []);

  const login = useCallback(async (payload) => {
    setLoading(true);
    setError(null);
    setSuccess(null);
    try {
      const response = await authService.login(payload);
      // Placeholder: persist token once a real backend returns one.
      // localStorage.setItem("accessToken", response.data.token);
      setSuccess("Signed in successfully.");
      return response.data;
    } catch (err) {
      setError(getErrorMessage(err, "Unable to sign in right now."));
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const signup = useCallback(async (payload) => {
    setLoading(true);
    setError(null);
    setSuccess(null);
    try {
      const response = await authService.signup(payload);
      setSuccess("Account created successfully.");
      return response.data;
    } catch (err) {
      setError(getErrorMessage(err, "Unable to create your account right now."));
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const forgotPassword = useCallback(async (email) => {
    setLoading(true);
    setError(null);
    setSuccess(null);
    try {
      const response = await authService.forgotPassword({ email });
      setSuccess("Reset link sent — check your inbox.");
      return response.data;
    } catch (err) {
      setError(getErrorMessage(err, "Unable to send the reset link right now."));
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return { login, signup, forgotPassword, loading, error, success, resetStatus };
}

export default useAuth;
