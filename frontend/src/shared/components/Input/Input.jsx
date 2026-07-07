export default function Input({
    label,
    error,
    className = "",
    ...props
}) {
    return (
        <div className="auth-field">
            {label && (
                <label>
                    {label}
                </label>
            )}

            <input
                {...props}
                className={`auth-input ${className}`}
            />

            {error && (
                <p className="auth-error">
                    {error}
                </p>
            )}
        </div>
    );
}
