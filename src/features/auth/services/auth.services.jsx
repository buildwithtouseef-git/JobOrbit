import axios from 'axios';

// Backend ka base URL (maan liya backend 5000 port par chal raha hai)
const API_BASE_URL = 'http://localhost:5000/api/auth';

// 1. Forgot Password API
export const forgotPasswordAPI = (email) => {
  return axios.post(`${API_BASE_URL}/forgot-password`, { email });
};

// 2. Verify Reset Token API (Optional - Token check karne ke liye)
export const verifyResetTokenAPI = (token) => {
  return axios.get(`${API_BASE_URL}/verify-reset-token/${token}`);
};

// 3. Reset Password API
export const resetPasswordAPI = (token, newPassword, confirmPassword) => {
  return axios.post(`${API_BASE_URL}/reset-password`, {
    token,
    newPassword,
    confirmPassword
  });
};