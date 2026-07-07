import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import AuthHeader from "./AuthHeader";
import Input from "../../../shared/components/Input/Input";
import Button from "../../../shared/components/Button/Button";
import forgotPasswordSchema from "../validation/forgotPassword.schema";
import useForgotPassword from "../hooks/useForgotPassword";

export default function ForgotPasswordForm() {
  const { handleForgotPassword, loading } = useForgotPassword();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    resolver: zodResolver(forgotPasswordSchema),
    mode: "onBlur",
    defaultValues: {
      email: "",
    },
  });

  return (
    <div className="w-full max-w-md rounded-[28px] border border-slate-200/70 bg-white p-8 shadow-[0_20px_60px_-28px_rgba(15,23,42,0.25)] sm:p-10">
      <AuthHeader title="Forgot password" subtitle="Enter your email and we will send a reset link." />

      <div className="mb-6 rounded-2xl border border-violet-100 bg-violet-50/80 px-4 py-3 text-sm text-violet-700">
        We’ll email a secure link so you can choose a new password.
      </div>

      <form onSubmit={handleSubmit(handleForgotPassword)} className="space-y-5">
        <Input label="Email" type="email" placeholder="Enter your email" {...register("email")} error={errors.email?.message} />

        <Button type="submit" loading={loading} disabled={!isValid}>
          Send reset link
        </Button>
      </form>
    </div>
  );
}