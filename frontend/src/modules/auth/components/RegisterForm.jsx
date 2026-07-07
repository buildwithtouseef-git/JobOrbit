import { Link } from "react-router-dom";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMemo } from "react";

import AuthHeader from "./AuthHeader";
import SocialLogin from "./SocialLogin";
import Input from "../../../shared/components/Input/Input";
import PasswordInput from "../../../shared/components/PasswordInput/PasswordInput";
import Button from "../../../shared/components/Button/Button";
import Checkbox from "../../../shared/components/Checkbox/Checkbox";
import registerSchema from "../validation/register.schema";
import useRegister from "../hooks/useRegister";
import { ROUTES } from "../../../shared/constants/routes";

const passwordChecks = [
  { label: "At least 8 characters", test: (value) => value.length >= 8 },
  { label: "One uppercase letter", test: (value) => /[A-Z]/.test(value) },
  { label: "One lowercase letter", test: (value) => /[a-z]/.test(value) },
  { label: "One number", test: (value) => /[0-9]/.test(value) },
  { label: "One special character", test: (value) => /[^A-Za-z0-9]/.test(value) },
];

export default function RegisterForm() {
  const { handleRegister, loading } = useRegister();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isValid },
  } = useForm({
    resolver: zodResolver(registerSchema),
    mode: "onBlur",
    defaultValues: {
      fullName: "",
      email: "",
      username: "",
      password: "",
      confirmPassword: "",
      termsAccepted: false,
    },
  });

  const passwordValue = useWatch({ control, name: "password" }) ?? "";
  const passwordScore = useMemo(() => passwordChecks.filter((check) => check.test(passwordValue)).length, [passwordValue]);

  return (
    <div className="auth-form-card auth-form-card-register">
      <AuthHeader title="Create your account" subtitle="Launch your job search - set up takes under a minute." />

      <form onSubmit={handleSubmit(handleRegister)} className="auth-form">
        <Input label="Full name" placeholder="Jane Doe" {...register("fullName")} error={errors.fullName?.message} />
        <Input label="Email" type="email" placeholder="you@example.com" {...register("email")} error={errors.email?.message} />
        <Input label="Username" placeholder="janedoe" {...register("username")} error={errors.username?.message} />

        <PasswordInput label="Password" placeholder="........" {...register("password")} error={errors.password?.message} />
        <div className="auth-strength-card">
          <div className="auth-strength-head">
            <span>Password strength</span>
            <strong>{passwordScore}/5</strong>
          </div>
          <div className="auth-strength-list">
            {passwordChecks.map((check) => (
              <span key={check.label} className={check.test(passwordValue) ? "met" : ""}>
                {check.label}
              </span>
            ))}
          </div>
        </div>

        <PasswordInput label="Confirm password" placeholder="........" {...register("confirmPassword")} error={errors.confirmPassword?.message} />
        <Checkbox label="I agree to the Terms & Privacy Policy" {...register("termsAccepted")} error={errors.termsAccepted?.message} />

        <Button type="submit" loading={loading} disabled={!isValid}>
          Create account
        </Button>
      </form>

      <SocialLogin label="Sign up with" />

      <p className="auth-switch-line">
        Already have an account?
        <Link to={ROUTES.LOGIN} className="auth-link">
          Log in
        </Link>
      </p>
    </div>
  );
}
