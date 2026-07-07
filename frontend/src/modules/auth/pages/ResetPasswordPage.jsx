import AuthLayout from "../components/AuthLayout";
import ResetPasswordForm from "../components/ResetPasswordForm";

export default function ResetPasswordPage() {
  return (
    <AuthLayout>
      <div className="flex items-center justify-center p-8 lg:p-12">
        <ResetPasswordForm />
      </div>
      <div className="hidden items-center justify-center bg-violet-600 lg:flex">
        <div className="max-w-md text-center text-white">
          <h2 className="mb-4 text-4xl font-bold">Create a new password</h2>
          <p className="text-violet-100">Use a strong and unique password to protect your account.</p>
        </div>
      </div>
    </AuthLayout>
  );
}