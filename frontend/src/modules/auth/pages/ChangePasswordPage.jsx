import AuthLayout from "../components/AuthLayout";
import ChangePasswordForm from "../components/ChangePasswordForm";

export default function ChangePasswordPage() {
  return (
    <AuthLayout>
      <div className="flex items-center justify-center p-8 lg:p-12">
        <ChangePasswordForm />
      </div>
      <div className="hidden items-center justify-center bg-violet-600 lg:flex">
        <div className="max-w-md text-center text-white">
          <h2 className="mb-4 text-4xl font-bold">Secure your account</h2>
          <p className="text-violet-100">Keep your password fresh and your account protected with a stronger credential.</p>
        </div>
      </div>
    </AuthLayout>
  );
}
