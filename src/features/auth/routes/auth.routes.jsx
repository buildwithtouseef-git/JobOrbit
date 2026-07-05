import { Routes, Route } from 'react-router-dom';
import { ForgotPasswordPage, VerifyCodePage, ResetPasswordPage } from '../pages/auth.pages';

export const AuthRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<ForgotPasswordPage />} />
      <Route path="/forgot-password" element={<ForgotPasswordPage />} />
      <Route path="/verify-code" element={<VerifyCodePage />} />
      <Route path="/reset-password" element={<ResetPasswordPage />} />
    </Routes>
  );
};