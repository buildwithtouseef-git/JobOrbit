import { useState } from "react";
import { Link } from "react-router-dom";
import InputField from "./InputField.jsx";
import SocialButtons from "./SocialButtons.jsx";
import { useAuth } from "../hooks/auth.hooks.jsx";

const MailIcon = (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M3 6l9 7 9-7" />
        <rect x="3" y="5" width="18" height="14" rx="2" />
    </svg>
);

const LockIcon = (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <rect x="4" y="10" width="16" height="10" rx="2" />
        <path d="M8 10V7a4 4 0 018 0v3" />
    </svg>
);

const UserIcon = (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <circle cx="12" cy="8" r="4" />
        <path d="M4 21c0-4 4-6 8-6s8 2 8 6" />
    </svg>
);

const UsernameIcon = (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M4 20c1-4 15-4 16 0" />
        <circle cx="12" cy="8" r="4" />
    </svg>
);

const initialState = {
    fullName: "",
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
    agree: false,
};

function SignupForm() {
    const [form, setForm] = useState(initialState);
    const [validationError, setValidationError] = useState(null);
    const { signup, loading, error } = useAuth();

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setForm((prev) => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
    };

    const validatePassword = (password) => {
        if (!password) {
            return "Password is required.";
        }

        if (password.length < 8 || password.length > 32) {
            return "Password must be between 8 and 32 characters.";
        }

        if (!/(?=.*[a-z])/.test(password)) {
            return "Password must include at least one lowercase letter.";
        }

        if (!/(?=.*[A-Z])/.test(password)) {
            return "Password must include at least one uppercase letter.";
        }

        if (!/(?=.*\d)/.test(password)) {
            return "Password must include at least one number.";
        }

        if (!/(?=.*[@$!%*?&^#])/.test(password)) {
            return "Password must include at least one special character (@$!%*?&^#).";
        }

        return "";
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setValidationError(null);

        if (form.password !== form.confirmPassword) {
            setValidationError("Passwords do not match.");
            return;
        }

        const passwordError = validatePassword(form.password);
        if (passwordError) {
            setValidationError(passwordError);
            return;
        }

        if (!form.agree) {
            setValidationError("Please agree to the Terms & Privacy Policy.");
            return;
        }

        signup(form).catch(() => {
            /* error is already surfaced via useAuth's `error` state */
        });
    };

    return (
        <>
            <div className="brand">
                <span className="orbit-mark">
                    <span className="ring" />
                    <span className="core" />
                    <span className="sat" />
                </span>
                <span className="brand-name">JobOrbit</span>
            </div>

            <h1 className="heading">Create your account</h1>
            <p className="subtitle">Launch your job search — set up takes under a minute.</p>

            <form onSubmit={handleSubmit} noValidate>
                <InputField
                    id="regName"
                    name="fullName"
                    label="Full name"
                    placeholder="Jane Doe"
                    icon={UserIcon}
                    value={form.fullName}
                    onChange={handleChange}
                    autoComplete="name"
                    required
                />

                <InputField
                    id="regEmail"
                    name="email"
                    type="email"
                    label="Email"
                    placeholder="you@example.com"
                    icon={MailIcon}
                    value={form.email}
                    onChange={handleChange}
                    autoComplete="email"
                    required
                />

                <InputField
                    id="regUsername"
                    name="username"
                    label="Username"
                    placeholder="janedoe"
                    icon={UsernameIcon}
                    value={form.username}
                    onChange={handleChange}
                    autoComplete="off"
                    required
                />

                <InputField
                    id="regPassword"
                    name="password"
                    label="Password"
                    placeholder="••••••••"
                    icon={LockIcon}
                    value={form.password}
                    onChange={handleChange}
                    autoComplete="new-password"
                    isPassword
                    required
                />

                <InputField
                    id="regConfirm"
                    name="confirmPassword"
                    label="Confirm password"
                    placeholder="••••••••"
                    icon={LockIcon}
                    value={form.confirmPassword}
                    onChange={handleChange}
                    autoComplete="new-password"
                    isPassword
                    required
                />

                <label className="checkbox-line" style={{ marginTop: 2 }}>
                    <input type="checkbox" name="agree" checked={form.agree} onChange={handleChange} />
                    I agree to the <a className="link" href="#terms">Terms</a> &amp; <a className="link" href="#privacy">Privacy Policy</a>
                </label>

                {(validationError || error) && <p className="form-error">{validationError || error}</p>}

                <button type="submit" className="btn-primary" disabled={loading}>
                    {loading ? "Creating account…" : "Create account"}
                </button>
            </form>

            <SocialButtons label="Sign up with" />

            <div className="switch-line">
                Already have an account? <Link className="link" to="/login">Log in</Link>
            </div>
        </>
    );
}

export default SignupForm;
