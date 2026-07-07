import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import AuthHeader from "./AuthHeader";
import PasswordInput from "../../../shared/components/PasswordInput/PasswordInput";
import Button from "../../../shared/components/Button/Button";
import changePasswordSchema from "../validation/changePassword.schema";
import useChangedPassword from "../hooks/useChangedPassword";

export default function ChangePasswordForm() {
  const { handleChangePassword, loading } = useChangedPassword();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    resolver: zodResolver(changePasswordSchema),
    mode: "onBlur",
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  return (
    <div className="w-full max-w-md rounded-[28px] border border-slate-200/70 bg-white p-8 shadow-[0_20px_60px_-28px_rgba(15,23,42,0.25)] sm:p-10">
      <AuthHeader title="Change password" subtitle="Update your credential securely." />

      <div className="mb-6 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-600">
        Keep your account protected with a fresh password that only you know.
      </div>

      <form onSubmit={handleSubmit(handleChangePassword)} className="space-y-5">
        <PasswordInput label="Current password" placeholder="Enter your current password" {...register("currentPassword")} error={errors.currentPassword?.message} />
        <PasswordInput label="New password" placeholder="Enter a new password" {...register("newPassword")} error={errors.newPassword?.message} />
        <PasswordInput label="Confirm password" placeholder="Re-enter your new password" {...register("confirmPassword")} error={errors.confirmPassword?.message} />

        <Button type="submit" loading={loading} disabled={!isValid}>
          Update password
        </Button>
      </form>
    </div>
  );
}
