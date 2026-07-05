import React from 'react';

export const ForgotPasswordForm = ({ email, setEmail, onSubmit, loading }) => {
  return (
    <form onSubmit={onSubmit}>
      <div className="input-group">
        <label>RECOVERY EMAIL</label>
        <input
          type="email"
          placeholder="name@company.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <button type="submit" className="btn-primary" disabled={loading}>
        {loading ? 'Sending...' : 'Send Reset Link'}
      </button>
    </form>
  );
};

export const VerifyCodeForm = ({ code, setCode, onSubmit, timer, onResend, loading }) => {
  const inputs = React.useRef([]);

  const handleChange = (e, index) => {
    const value = e.target.value;
    if (value.length > 1) return;
    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);
    if (value && index < 5) {
      inputs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace' && !code[index] && index > 0) {
      inputs.current[index - 1].focus();
    }
  };

  return (
    <>
      <div className="code-inputs">
        {code.map((digit, index) => (
          <input
            key={index}
            type="text"
            maxLength="1"
            value={digit}
            ref={(el) => (inputs.current[index] = el)}
            onChange={(e) => handleChange(e, index)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            autoFocus={index === 0}
          />
        ))}
      </div>
      <button className="btn-primary" onClick={onSubmit} disabled={loading}>
        {loading ? 'Verifying...' : 'Verify and Continue'}
      </button>
      <div className="resend-row">
        <span>RESEND CODE IN <span className="timer">00:{String(timer).padStart(2, '0')}</span></span>
        <button onClick={onResend} disabled={loading}>Resend</button>
      </div>
    </>
  );
};

export const ResetPasswordForm = ({ newPassword, setNewPassword, confirmPassword, setConfirmPassword, onSubmit, loading }) => {
  return (
    <form onSubmit={onSubmit}>
      <div className="input-group">
        <label>NEW PASSWORD</label>
        <input
          type="password"
          placeholder="Enter new password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          required
        />
        <div className="complexity-row">
          <span className="checkbox"></span>
          <span>Awaiting input</span>
        </div>
      </div>
      <div className="input-group">
        <label>CONFIRM PASSWORD</label>
        <input
          type="password"
          placeholder="Confirm your password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
      </div>
      <button type="submit" className="btn-primary" disabled={loading}>
        {loading ? 'Updating...' : 'UPDATE CREDENTIALS →'}
      </button>
    </form>
  );
};