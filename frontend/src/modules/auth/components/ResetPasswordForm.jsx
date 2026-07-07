import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useParams } from "react-router-dom";

import AuthHeader from "./AuthHeader";
import PasswordInput from "../../../shared/components/PasswordInput/PasswordInput";
import Button from "../../../shared/components/Button/Button";
import resetPasswordSchema from "../validation/resetPassword.schema";
import useResetPassword from "../hooks/useResetPassword";

export default function ResetPasswordForm() {
  const { token } = useParams();
  const { handleResetPassword, loading } = useResetPassword();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    resolver: zodResolver(resetPasswordSchema),
    mode: "onBlur",
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data) => {
    await handleResetPassword({ token, ...data });
  };

  return (
    <div className="w-full max-w-md rounded-[28px] border border-slate-200/70 bg-white p-8 shadow-[0_20px_60px_-28px_rgba(15,23,42,0.25)] sm:p-10">
      <AuthHeader title="Reset password" subtitle="Choose a strong new password for your account." />

      <div className="mb-6 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-600">
        Use at least 8 characters, with a mix of letters, numbers, and symbols.
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <PasswordInput label="New password" placeholder="Enter a new password" {...register("password")} error={errors.password?.message} />
        <PasswordInput label="Confirm password" placeholder="Re-enter your password" {...register("confirmPassword")} error={errors.confirmPassword?.message} />

        <Button type="submit" loading={loading} disabled={!isValid}>
          Reset password
        </Button>
      </form>
    </div>
  );
}
