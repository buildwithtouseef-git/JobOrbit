import { Link } from "react-router-dom";
import { MailCheck } from "lucide-react";
import AuthLayout from "../components/AuthLayout";
import AuthHeader from "../components/AuthHeader";
import { ROUTES } from "../../../shared/constants/routes";

export default function ResetPasswordSentPage() {
  return (
    <AuthLayout>
      <div className="flex items-center justify-center p-8 lg:p-12">
        <div className="w-full max-w-md rounded-[28px] border border-slate-200/70 bg-white p-8 shadow-[0_20px_60px_-28px_rgba(15,23,42,0.25)] sm:p-10">
          <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-2xl bg-violet-100 text-violet-600">
            <MailCheck className="h-6 w-6" />
          </div>
          <AuthHeader title="Check your inbox" subtitle="We sent a password reset link to the email address you provided." />
          <p className="text-sm leading-6 text-slate-600">If you do not receive it within a few minutes, please check your spam folder or request a new link.</p>
          <div className="mt-8 flex flex-col gap-3">
            <Link to={ROUTES.LOGIN} className="rounded-2xl bg-violet-600 px-4 py-3 text-center font-semibold text-white transition hover:bg-violet-700">
              Back to login
            </Link>
            <Link to={ROUTES.FORGOT_PASSWORD} className="text-center text-sm font-semibold text-violet-600 transition hover:underline">
              Request another email
            </Link>
          </div>
        </div>
      </div>
      <div className="hidden items-center justify-center bg-violet-600 lg:flex">
        <div className="max-w-md text-center text-white">
          <h2 className="mb-4 text-4xl font-bold">Secure password recovery</h2>
          <p className="text-violet-100">Follow the reset instructions in your inbox and regain access quickly.</p>
        </div>
      </div>
    </AuthLayout>
  );
}
