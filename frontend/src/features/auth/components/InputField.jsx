import { useState } from "react";

function InputField({
    id,
    label,
    type = "text",
    name,
    value,
    onChange,
    placeholder,
    icon,
    autoComplete,
    isPassword = false,
    required = false,
}) {
    const [visible, setVisible] = useState(false);
    const resolvedType = isPassword ? (visible ? "text" : "password") : type;

    return (
        <div className="field">
            <label htmlFor={id}>{label}</label>
            <div className="field-input">
                {icon && <span className="icon-lead">{icon}</span>}
                <input
                    id={id}
                    name={name || id}
                    type={resolvedType}
                    value={value}
                    onChange={onChange}
                    placeholder={placeholder}
                    autoComplete={autoComplete}
                    required={required}
                />
                {isPassword && (
                    <button
                        type="button"
                        className="toggle-eye"
                        aria-label={visible ? "Hide password" : "Show password"}
                        onClick={() => setVisible((prev) => !prev)}
                    >
                        <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.8">
                            <path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7-11-7-11-7z" />
                            <circle cx="12" cy="12" r="3" />
                        </svg>
                    </button>
                )}
            </div>
        </div>
    );
}

export default InputField;
