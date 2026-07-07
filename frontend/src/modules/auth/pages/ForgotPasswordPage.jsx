import AuthLayout from "../components/AuthLayout";
import ForgotPasswordForm from "../components/ForgotPasswordForm";

export default function ForgotPasswordPage() {
  return (
    <AuthLayout>
      <div className="flex items-center justify-center p-8 lg:p-12">
        <ForgotPasswordForm />
      </div>

      <div className="hidden lg:flex items-center justify-center bg-violet-600">
        <div className="max-w-md text-center text-white">
          <h2 className="text-4xl font-bold">
            Reset Your Password
          </h2>

          <p className="mt-4 text-violet-100">
            Enter your email address and we'll send you a password reset link.
          </p>
        </div>
      </div>
    </AuthLayout>
  );
}