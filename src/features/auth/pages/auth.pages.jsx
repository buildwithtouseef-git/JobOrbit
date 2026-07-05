import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ForgotPasswordForm, VerifyCodeForm, ResetPasswordForm } from '../components/auth.components';

// ===== PAGE 1: Forgot Password (Image 7) =====
export const ForgotPasswordPage = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      alert('Reset link sent to your email!');
      setLoading(false);
    }, 1500);
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="logo">
          <h2>🚀 JobOrbit</h2>
          <div className="badge">Corporate Navigation</div>
        </div>
        <h1>Lost in space? 🌌</h1>
        <p className="subtitle">
          Don't worry, we'll help you navigate back to your account.
        </p>
        <ForgotPasswordForm
          email={email}
          setEmail={setEmail}
          onSubmit={handleSubmit}
          loading={loading}
        />
        <div className="auth-footer">
          <Link to="/login">← Back to Login</Link>
        </div>
        <div className="manual-rescue">
          Need manual rescue? <a href="#">Contact Mission Support</a>
        </div>
        <div className="corporate-footer">
          "Your career trajectory starts here."<br />
          JobOrbit Corporate Navigation
        </div>
      </div>
    </div>
  );
};

// ===== PAGE 2: Verify Code (Image 6) =====
export const VerifyCodePage = () => {
  const [code, setCode] = useState(['', '', '', '', '', '']);
  const [timer, setTimer] = useState(56);
  const [loading, setLoading] = useState(false);

  const handleVerify = () => {
    const fullCode = code.join('');
    if (fullCode.length === 6) {
      setLoading(true);
      setTimeout(() => {
        alert(`Verifying code: ${fullCode}`);
        setLoading(false);
      }, 1500);
    } else {
      alert('Please enter complete 6-digit code');
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="verify-header">
          <div className="logo" style={{ marginBottom: 0 }}>
            <h2 style={{ fontSize: '18px' }}>🚀 JobOrbit</h2>
          </div>
          <div className="alpha-tag">ALPHA-7 NODE</div>
        </div>
        <h1 style={{ fontSize: '22px', marginTop: '12px' }}>Verify your code</h1>
        <p className="subtitle" style={{ fontSize: '13px', marginBottom: '8px' }}>
          To maintain the security of your workspace, please enter the 6-digit
          authorization code sent to your professional email.
        </p>
        <VerifyCodeForm
          code={code}
          setCode={setCode}
          onSubmit={handleVerify}
          timer={timer}
          onResend={() => { setTimer(56); alert('Code resent!'); }}
          loading={loading}
        />
        <div className="auth-footer" style={{ marginTop: '18px' }}>
          <Link to="/forgot-password">← Back to Login</Link>
        </div>
      </div>
    </div>
  );
};

// ===== PAGE 3: Reset Password (Image 8) =====
export const ResetPasswordPage = () => {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      alert('Passwords do not match!');
      return;
    }
    if (newPassword.length < 6) {
      alert('Password must be at least 6 characters');
      return;
    }
    setLoading(true);
    setTimeout(() => {
      alert('Password updated successfully!');
      setLoading(false);
    }, 1500);
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="logo" style={{ marginBottom: '16px' }}>
          <h2 style={{ fontSize: '18px' }}>🚀 JobOrbit</h2>
        </div>
        <div className="security-badge">SECURITY PROTOCOL</div>
        <h1 style={{ fontSize: '24px' }}>Establish new credentials</h1>
        <p className="subtitle" style={{ fontSize: '13px', marginBottom: '24px' }}>
          Please enter your new password to secure your account.
        </p>
        <ResetPasswordForm
          newPassword={newPassword}
          setNewPassword={setNewPassword}
          confirmPassword={confirmPassword}
          setConfirmPassword={setConfirmPassword}
          onSubmit={handleSubmit}
          loading={loading}
        />
        <div className="auth-footer" style={{ marginTop: '18px' }}>
          <Link to="/login">← Back to Sign In</Link>
        </div>
        <div className="auth-service-footer">
          AUTH SERVICE V2.4<br />
          © 2024 JOBORBIT
        </div>
      </div>
    </div>
  );
};