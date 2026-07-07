import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

export default function PasswordInput({
    label,
    error,
    className = "",
    ...props
}) {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <div className="auth-field">
            {label && (
                <label>
                    {label}
                </label>
            )}

            <div className="auth-password-wrap">
                <input
                    type={showPassword ? "text" : "password"}
                    className={`auth-input auth-password-input ${className}`}
                    {...props}
                />

                <button
                    type="button"
                    onClick={() => setShowPassword((prev) => !prev)}
                    className="auth-eye-btn"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
            </div>

            {error && (
                <p className="auth-error">
                    {error}
                </p>
            )}
        </div>
    );
}
