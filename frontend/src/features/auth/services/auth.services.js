import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_URL;

const authApi = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

authApi.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export const authService = {
  login(data) {
    return authApi.post("/auth/login", data);
  },

  signup(data) {
    return authApi.post("/auth/signup", data);
  },

  forgotPassword(data) {
    return authApi.post("/auth/forgot-password", data);
  },

  logout() {
    return authApi.post("/auth/logout");
  },

  getCurrentUser() {
    return authApi.get("/auth/me");
  },
};

export default authApi;