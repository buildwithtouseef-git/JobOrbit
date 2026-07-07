import { Link } from "react-router-dom";
import { MailCheck } from "lucide-react";
import AuthLayout from "../components/AuthLayout";
import { ROUTES } from "../../../shared/constants/routes";

export default function VerificationSuccessPage() {
  return (
    <AuthLayout>
      <div className="flex items-center justify-center p-8 lg:p-12">
        <div className="w-full max-w-md rounded-[28px] border border-emerald-200/70 bg-emerald-50 p-8 shadow-[0_20px_60px_-28px_rgba(15,23,42,0.25)] sm:p-10">
          <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-600">
            <MailCheck className="h-6 w-6" />
          </div>
          <h1 className="text-3xl font-semibold tracking-tight text-emerald-700">Email verified</h1>
          <p className="mt-3 text-sm leading-6 text-emerald-700">Your email address has been successfully verified. You can now sign in and continue.</p>
          <Link to={ROUTES.LOGIN} className="mt-8 inline-flex rounded-2xl bg-emerald-600 px-4 py-3 font-semibold text-white transition hover:bg-emerald-700">
            Continue to login
          </Link>
        </div>
      </div>
      <div className="hidden items-center justify-center bg-violet-600 lg:flex">
        <div className="max-w-md text-center text-white">
          <h2 className="mb-4 text-4xl font-bold">Verification complete</h2>
          <p className="text-violet-100">You are ready to explore everything JobOrbit has to offer.</p>
        </div>
      </div>
    </AuthLayout>
  );
}