import { Routes, Route } from 'react-router-dom';
import { ForgotPasswordPage, VerifyCodePage, ResetPasswordPage } from '../pages/auth.pages';

export const AuthRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<ForgotPasswordPage />} />
      <Route path="/forgot-password" element={<ForgotPasswordPage />} />
      <Route path="/verify-code" element={<VerifyCodePage />} />
      {/* Yahan :token parameter add kiya hai taake URL se token mile */}
      <Route path="/reset-password/:token" element={<ResetPasswordPage />} />
    </Routes>
  );
};