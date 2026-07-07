import { Link } from "react-router-dom";
import { AlertTriangle } from "lucide-react";
import AuthLayout from "../components/AuthLayout";
import { ROUTES } from "../../../shared/constants/routes";

export default function VerificationFailedPage() {
  return (
    <AuthLayout>
      <div className="flex items-center justify-center p-8 lg:p-12">
        <div className="w-full max-w-md rounded-[28px] border border-red-200/70 bg-red-50 p-8 shadow-[0_20px_60px_-28px_rgba(15,23,42,0.25)] sm:p-10">
          <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-2xl bg-red-100 text-red-600">
            <AlertTriangle className="h-6 w-6" />
          </div>
          <h1 className="text-3xl font-semibold tracking-tight text-red-700">Verification failed</h1>
          <p className="mt-3 text-sm leading-6 text-red-700">The verification link was invalid or has expired. Please request a fresh verification email.</p>
          <div className="mt-8 flex flex-col gap-3">
            <Link to={ROUTES.RESEND_VERIFICATION} className="rounded-2xl bg-red-600 px-4 py-3 text-center font-semibold text-white transition hover:bg-red-700">
              Resend verification email
            </Link>
            <Link to={ROUTES.LOGIN} className="text-center text-sm font-semibold text-red-600 transition hover:underline">
              Back to login
            </Link>
          </div>
        </div>
      </div>
      <div className="hidden items-center justify-center bg-violet-600 lg:flex">
        <div className="max-w-md text-center text-white">
          <h2 className="mb-4 text-4xl font-bold">Need a fresh start</h2>
          <p className="text-violet-100">Request another verification email and continue with your account setup.</p>
        </div>
      </div>
    </AuthLayout>
  );
}