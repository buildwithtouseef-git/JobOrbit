export default function AuthHeader({ title, subtitle }) {
    return (
        <div className="auth-form-header">
            <div className="auth-brand">
                <span className="auth-orbit-mark" aria-hidden="true">
                    <span className="auth-orbit-ring" />
                    <span className="auth-orbit-core" />
                    <span className="auth-orbit-sat" />
                </span>
                <span className="auth-brand-name">JobOrbit</span>
            </div>
            <h1 className="auth-heading">{title}</h1>
            <p className="auth-subtitle">{subtitle}</p>
        </div>
    );
}
