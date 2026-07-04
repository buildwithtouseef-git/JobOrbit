import { Routes, Route } from 'react-router-dom';
import { ForgotPasswordPage, ResetPasswordPage } from '../pages/auth.pages';

export const AuthRoutes = () => {
  return (
    <Routes>
      <Route path="forgot-password" element={<ForgotPasswordPage />} />
      <Route path="reset-password/:token" element={<ResetPasswordPage />} />
    </Routes>
  );
};