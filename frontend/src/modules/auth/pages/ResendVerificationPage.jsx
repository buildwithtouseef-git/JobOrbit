import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { MailCheck } from "lucide-react";
import AuthLayout from "../components/AuthLayout";
import AuthHeader from "../components/AuthHeader";
import Input from "../../../shared/components/Input/Input";
import Button from "../../../shared/components/Button/Button";
import authService from "../services/auth.service";
import forgotPasswordSchema from "../validation/forgotPassword.schema";

export default function ResendVerificationPage() {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    resolver: zodResolver(forgotPasswordSchema),
    mode: "onBlur",
    defaultValues: { email: "" },
  });

  const onSubmit = async (data) => {
    try {
      const response = await authService.resendVerification(data);
      toast.success(response.data?.message || "Verification email sent.");
    } catch (error) {
      toast.error(error.response?.data?.message || "Unable to send verification email.");
    }
  };

  return (
    <AuthLayout>
      <div className="flex items-center justify-center p-8 lg:p-12">
        <div className="w-full max-w-md rounded-[28px] border border-slate-200/70 bg-white p-8 shadow-[0_20px_60px_-28px_rgba(15,23,42,0.25)] sm:p-10">
          <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-2xl bg-violet-100 text-violet-600">
            <MailCheck className="h-6 w-6" />
          </div>
          <AuthHeader title="Resend verification" subtitle="Enter your email address to receive another verification link." />
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <Input label="Email" type="email" placeholder="Enter your email" {...register("email")} error={errors.email?.message} />
            <Button type="submit" disabled={!isValid}>
              Send again
            </Button>
          </form>
        </div>
      </div>
      <div className="hidden items-center justify-center bg-violet-600 lg:flex">
        <div className="max-w-md text-center text-white">
          <h2 className="mb-4 text-4xl font-bold">Verify quickly</h2>
          <p className="text-violet-100">A fresh email makes it easy to finish account verification without friction.</p>
        </div>
      </div>
    </AuthLayout>
  );
}