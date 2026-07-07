import api from "../../../shared/api/axios";
import { API_ENDPOINTS } from "../../../shared/constants/apiEndpoints";

const authService = {
  login(data) {
    return api.post(API_ENDPOINTS.AUTH.LOGIN, data);
  },

  register(data) {
    return api.post(API_ENDPOINTS.AUTH.SIGNUP, data);
  },

  forgotPassword(data) {
    return api.post(API_ENDPOINTS.AUTH.FORGOT_PASSWORD, data);
  },

  resetPassword(data) {
    return api.post(API_ENDPOINTS.AUTH.RESET_PASSWORD, {
      token: data.token,
      newPassword: data.password,
      confirmPassword: data.confirmPassword,
    });
  },

  verifyEmail(token) {
    return api.post(API_ENDPOINTS.AUTH.VERIFY_EMAIL, { token });
  },

  resendVerification(data) {
    return api.post(API_ENDPOINTS.AUTH.RESEND_VERIFICATION, data);
  },

  logout() {
    return api.post(API_ENDPOINTS.AUTH.LOGOUT);
  },

  changePassword(data) {
    return api.patch(API_ENDPOINTS.AUTH.CHANGE_PASSWORD, data);
  },

  getCurrentUser() {
    return api.get(API_ENDPOINTS.AUTH.ME);
  },

  refreshToken() {
    return api.post(API_ENDPOINTS.AUTH.REFRESH_TOKEN);
  },
};

export default authService;