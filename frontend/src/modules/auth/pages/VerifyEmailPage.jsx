import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { toast } from "sonner";
import { AlertTriangle, MailCheck } from "lucide-react";
import AuthLayout from "../components/AuthLayout";
import { ROUTES } from "../../../shared/constants/routes";
import authService from "../services/auth.service";

export default function VerifyEmailPage() {
  const [searchParams] = useSearchParams();
  const [status, setStatus] = useState("pending");

  useEffect(() => {
    const token = searchParams.get("token");

    if (!token) {
      return;
    }

    const verify = async () => {
      try {
        await authService.verifyEmail(token);
        setStatus("success");
      } catch (error) {
        setStatus("failed");
        toast.error(error.response?.data?.message || "Verification failed.");
      }
    };

    verify();
  }, [searchParams]);

  const config = {
    pending: {
      title: "Verify your email",
      description: "We have sent a verification link to your email. Please confirm your address to continue.",
      icon: MailCheck,
      iconWrapper: "bg-violet-100 text-violet-600",
      titleClass: "text-slate-900",
      bodyClass: "text-slate-600",
      buttonClass: "bg-violet-600 hover:bg-violet-700",
    },
    success: {
      title: "Email verified",
      description: "Your email has been verified successfully. You can now sign in and continue.",
      icon: MailCheck,
      iconWrapper: "bg-emerald-100 text-emerald-600",
      titleClass: "text-emerald-700",
      bodyClass: "text-emerald-700",
      buttonClass: "bg-emerald-600 hover:bg-emerald-700",
    },
    failed: {
      title: "Verification issue",
      description: "Verification could not be completed. You can request a fresh email and try again.",
      icon: AlertTriangle,
      iconWrapper: "bg-red-100 text-red-600",
      titleClass: "text-red-700",
      bodyClass: "text-red-700",
      buttonClass: "bg-red-600 hover:bg-red-700",
    },
  };

  const current = config[status] ?? config.pending;
  const Icon = current.icon;

  return (
    <AuthLayout>
      <div className="flex items-center justify-center p-8 lg:p-12">
        <div className="w-full max-w-md rounded-[28px] border border-slate-200/70 bg-white p-8 shadow-[0_20px_60px_-28px_rgba(15,23,42,0.25)] sm:p-10">
          <div className={`mb-6 flex h-12 w-12 items-center justify-center rounded-2xl ${current.iconWrapper}`}>
            <Icon className="h-6 w-6" />
          </div>
          <h1 className={`text-3xl font-semibold tracking-tight ${current.titleClass}`}>{current.title}</h1>
          <p className={`mt-3 text-sm leading-6 ${current.bodyClass}`}>{current.description}</p>
          <div className="mt-8 flex flex-col gap-3">
            <Link to={ROUTES.RESEND_VERIFICATION} className={`rounded-2xl px-4 py-3 text-center font-semibold text-white transition ${current.buttonClass}`}>
              {status === "success" ? "Continue to login" : "Resend verification email"}
            </Link>
            <Link to={ROUTES.LOGIN} className="text-center text-sm font-semibold text-violet-600 transition hover:underline">
              Back to login
            </Link>
          </div>
        </div>
      </div>
      <div className="hidden items-center justify-center bg-violet-600 lg:flex">
        <div className="max-w-md text-center text-white">
          <h2 className="mb-4 text-4xl font-bold">Almost there</h2>
          <p className="text-violet-100">Complete your email verification and unlock the full JobOrbit experience.</p>
        </div>
      </div>
    </AuthLayout>
  );
}