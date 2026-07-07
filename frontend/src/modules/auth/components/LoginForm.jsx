import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import AuthHeader from "./AuthHeader";
import SocialLogin from "./SocialLogin";
import Button from "../../../shared/components/Button/Button";
import Input from "../../../shared/components/Input/Input";
import PasswordInput from "../../../shared/components/PasswordInput/PasswordInput";
import Checkbox from "../../../shared/components/Checkbox/Checkbox";
import loginSchema from "../validation/login.schema";
import useLogin from "../hooks/useLogin";
import { ROUTES } from "../../../shared/constants/routes";

export default function LoginForm() {
  const { handleLogin, loading } = useLogin();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    resolver: zodResolver(loginSchema),
    mode: "onBlur",
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
  });

  const onSubmit = async (data) => {
    await handleLogin(data);
  };

  return (
    <div className="auth-form-card">
      <AuthHeader title="Welcome back" subtitle="Sign in to keep your job search in orbit." />

      <form onSubmit={handleSubmit(onSubmit)} className="auth-form">
        <Input label="Email or username" type="email" placeholder="you@example.com" {...register("email")} error={errors.email?.message} />
        <PasswordInput label="Password" placeholder="........" {...register("password")} error={errors.password?.message} />

        <div className="auth-row-between">
          <Checkbox label="Remember me" {...register("rememberMe")} />
          <Link to={ROUTES.FORGOT_PASSWORD} className="auth-link">
            Forgot password?
          </Link>
        </div>

        <Button type="submit" loading={loading} disabled={!isValid}>
          Sign in
        </Button>
      </form>

      <SocialLogin />

      <div className="auth-switch-line">
        <span>Don't have an account?</span>
        <Link to={ROUTES.REGISTER} className="auth-link">
          Sign up
        </Link>
      </div>

      <div className="auth-badges">
        <span className="auth-badge">SSL secure</span>
        <span className="auth-badge">Data protected</span>
      </div>
    </div>
  );
}
