import { Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "../modules/auth/pages/LoginPage";
import RegisterPage from "../modules/auth/pages/RegisterPage";
import ForgotPasswordPage from "../modules/auth/pages/ForgotPasswordPage";
import ResetPasswordPage from "../modules/auth/pages/ResetPasswordPage";
import ResetPasswordSentPage from "../modules/auth/pages/ResetPasswordSentPage";
import VerifyEmailPage from "../modules/auth/pages/VerifyEmailPage";
import VerificationSuccessPage from "../modules/auth/pages/VerificationSuccessPage";
import VerificationFailedPage from "../modules/auth/pages/VerificationFailedPage";
import ResendVerificationPage from "../modules/auth/pages/ResendVerificationPage";
import ChangePasswordPage from "../modules/auth/pages/ChangePasswordPage";
import ProtectedRoute from "./ProtectedRoute";
import PublicRoute from "./PublicRoute";
import { ROUTES } from "../shared/constants/routes";

function Dashboard() {
  return (
    <div className="mx-auto flex min-h-[60vh] max-w-6xl flex-col items-center justify-center px-6 text-center">
      <h1 className="text-4xl font-semibold text-slate-100">Welcome to your JobOrbit dashboard</h1>
      <p className="mt-4 max-w-xl text-lg text-slate-300">You can now manage your account, change your password, and keep your profile secure.</p>
    </div>
  );
}

export default function AppRoutes() {
  return (
    <Routes>
      <Route path={ROUTES.ROOT} element={<PublicRoute><LoginPage /></PublicRoute>} />
      <Route path={ROUTES.LOGIN} element={<PublicRoute><LoginPage /></PublicRoute>} />
      <Route path={ROUTES.REGISTER} element={<PublicRoute><RegisterPage /></PublicRoute>} />
      <Route path={ROUTES.FORGOT_PASSWORD} element={<PublicRoute><ForgotPasswordPage /></PublicRoute>} />
      <Route path={ROUTES.RESET_PASSWORD_SENT} element={<PublicRoute><ResetPasswordSentPage /></PublicRoute>} />
      <Route path={`${ROUTES.RESET_PASSWORD}/:token`} element={<PublicRoute><ResetPasswordPage /></PublicRoute>} />
      <Route path={ROUTES.VERIFY_EMAIL} element={<PublicRoute><VerifyEmailPage /></PublicRoute>} />
      <Route path={ROUTES.VERIFY_EMAIL_SUCCESS} element={<PublicRoute><VerificationSuccessPage /></PublicRoute>} />
      <Route path={ROUTES.VERIFY_EMAIL_FAILED} element={<PublicRoute><VerificationFailedPage /></PublicRoute>} />
      <Route path={ROUTES.RESEND_VERIFICATION} element={<PublicRoute><ResendVerificationPage /></PublicRoute>} />
      <Route path={ROUTES.CHANGE_PASSWORD} element={<ProtectedRoute><ChangePasswordPage /></ProtectedRoute>} />
      <Route path={ROUTES.DASHBOARD} element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
      <Route path="*" element={<Navigate to={ROUTES.ROOT} replace />} />
    </Routes>
  );
}