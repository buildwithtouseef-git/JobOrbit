import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ForgotPasswordForm, ResetPasswordForm } from '../components/auth.components';
import { forgotPasswordAPI, resetPasswordAPI } from '../services/auth.services';

export const ForgotPasswordPage = () => {
  const [loading, setLoading] = useState(false);
  const handleSubmit = async (email) => {
    setLoading(true);
    try {
      await forgotPasswordAPI(email);
      alert("Reset link sent to your email!");
    } catch (err) {
      alert(err.response?.data?.message || "Error");
    }
    setLoading(false);
  };
  return <ForgotPasswordForm onSubmit={handleSubmit} loading={loading} />;
};

export const ResetPasswordPage = () => {
  const { token } = useParams(); // URL se token milega
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async ({ newPassword, confirmPassword }) => {
    setLoading(true);
    try {
      await resetPasswordAPI(token, newPassword, confirmPassword);
      alert("Password reset successful! Login now.");
      navigate('/login');
    } catch (err) {
      alert(err.response?.data?.message || "Error");
    }
    setLoading(false);
  };
  return <ResetPasswordForm onSubmit={handleSubmit} loading={loading} />;
};