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

const initialState = { email: "", password: "", remember: false };
const initialReset = { email: "" };

function LoginForm() {
    const [form, setForm] = useState(initialState);
    const [resetOpen, setResetOpen] = useState(false);
    const [resetForm, setResetForm] = useState(initialReset);
    const [resetSent, setResetSent] = useState(false);
    const { login, forgotPassword, loading, error } = useAuth();

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setForm((prev) => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        login(form).catch(() => {
            /* error is already surfaced via useAuth's `error` state */
        });
    };

    const handleReset = () => {
        if (!resetForm.email.trim()) return;
        forgotPassword(resetForm.email)
            .then(() => setResetSent(true))
            .catch(() => { });
    };

    const closeReset = () => {
        setResetOpen(false);
        setResetSent(false);
        setResetForm(initialReset);
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

            <h1 className="heading">Welcome back</h1>
            <p className="subtitle">Sign in to keep your job search in orbit.</p>

            <form onSubmit={handleSubmit} noValidate>
                <InputField
                    id="loginEmail"
                    name="email"
                    label="Email or username"
                    placeholder="you@example.com"
                    icon={MailIcon}
                    value={form.email}
                    onChange={handleChange}
                    autoComplete="username"
                    required
                />

                <InputField
                    id="loginPassword"
                    name="password"
                    label="Password"
                    placeholder="••••••••"
                    icon={LockIcon}
                    value={form.password}
                    onChange={handleChange}
                    autoComplete="current-password"
                    isPassword
                    required
                />

                <div className="row-between">
                    <label className="checkbox-line">
                        <input type="checkbox" name="remember" checked={form.remember} onChange={handleChange} />
                        Remember me
                    </label>
                    <button type="button" className="link" onClick={() => setResetOpen(true)}>
                        Forgot password?
                    </button>
                </div>

                {error && <p className="form-error">{error}</p>}

                <button type="submit" className="btn-primary" disabled={loading}>
                    {loading ? "Signing in…" : "Sign in"}
                </button>
            </form>

            <SocialButtons label="Continue with" />

            <div className="switch-line">
                Don&apos;t have an account? <Link className="link" to="/signup">Sign up</Link>
            </div>

            <div className="badges">
                <span className="badge">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                        <path d="M12 2l7 4v6c0 5-3.4 8.4-7 10-3.6-1.6-7-5-7-10V6z" />
                    </svg>
                    SSL secure
                </span>
                <span className="badge">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                        <rect x="4" y="10" width="16" height="10" rx="2" />
                        <path d="M8 10V7a4 4 0 018 0v3" />
                    </svg>
                    Data protected
                </span>
            </div>

            {/* Forgot password overlay */}
            <div className={`reset-overlay${resetOpen ? " show" : ""}`}>
                <div className="reset-card">
                    <h3>Reset your password</h3>
                    <p>Enter the email on your account and we&apos;ll send a link to reset your password.</p>

                    <InputField
                        id="resetEmail"
                        label="Email"
                        type="email"
                        icon={MailIcon}
                        placeholder="you@example.com"
                        value={resetForm.email}
                        onChange={(e) => setResetForm({ email: e.target.value })}
                    />

                    {resetSent && (
                        <div className="reset-success show">
                            <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2.4">
                                <path d="M20 6L9 17l-5-5" />
                            </svg>
                            Reset link sent — check your inbox.
                        </div>
                    )}

                    <div className="reset-card-footer">
                        <button type="button" className="btn-secondary" onClick={closeReset}>
                            Cancel
                        </button>
                        <button type="button" className="btn-primary" onClick={handleReset} disabled={loading}>
                            Send link
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default LoginForm;
