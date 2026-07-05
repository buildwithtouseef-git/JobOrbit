import axios from 'axios';

const API_URL = 'http://localhost:5000/api/auth';

export const forgotPasswordAPI = (email) => {
  return axios.post(`${API_URL}/forgot-password`, { email });
};

export const resetPasswordAPI = (token, newPassword, confirmPassword) => {
  return axios.post(`${API_URL}/reset-password`, { token, newPassword, confirmPassword });
};