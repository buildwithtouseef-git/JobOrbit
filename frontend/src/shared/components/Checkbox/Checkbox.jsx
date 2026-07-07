export default function Checkbox({ label, error, className = "", ...props }) {
  return (
    <div className="auth-checkbox-field">
      <label className="auth-checkbox-line">
        <input type="checkbox" className={className} {...props} />
        <span>{label}</span>
      </label>
      {error ? <p className="auth-error">{error}</p> : null}
    </div>
  );
}
