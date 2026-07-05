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
    <div className="w-full max-w-[440px] mx-auto p-5">
      <div className="bg-[rgba(12,20,35,0.85)] backdrop-blur-md border border-white/5 rounded-3xl px-9 py-11 shadow-2xl">
        {/* Logo */}
        <div className="text-center mb-7">
          <h2 className="text-xl font-bold bg-gradient-to-r from-white to-[#94a3b8] bg-clip-text text-transparent">
            🚀 JobOrbit
          </h2>
          <span className="inline-block bg-white/5 border border-white/5 text-[10px] font-semibold tracking-[0.8px] text-[#94a3b8] px-3.5 py-1 rounded-full mt-1.5 uppercase">
            Corporate Navigation
          </span>
        </div>

        <h1 className="text-2xl font-bold mb-2">Lost in space? 🌌</h1>
        <p className="text-[#94a3b8] text-sm leading-relaxed mb-7">
          Don't worry, we'll help you navigate back to your account.
        </p>

        <ForgotPasswordForm
          email={email}
          setEmail={setEmail}
          onSubmit={handleSubmit}
          loading={loading}
        />

        <div className="text-center text-sm text-[#64748b] mt-6">
          <Link to="/login" className="text-[#94a3b8] font-medium hover:text-white transition">← Back to Login</Link>
        </div>
        <div className="text-center text-sm text-[#475569] mt-4">
          Need manual rescue? <a href="#" className="text-blue-400 hover:underline">Contact Mission Support</a>
        </div>
        <div className="text-center text-[11px] text-[#334155] tracking-wide border-t border-white/5 pt-4 mt-7 leading-relaxed">
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
    <div className="w-full max-w-[440px] mx-auto p-5">
      <div className="bg-[rgba(12,20,35,0.85)] backdrop-blur-md border border-white/5 rounded-3xl px-9 py-11 shadow-2xl">
        {/* Header */}
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-bold bg-gradient-to-r from-white to-[#94a3b8] bg-clip-text text-transparent">
            🚀 JobOrbit
          </h2>
          <span className="text-[10px] font-semibold text-[#475569] bg-white/5 border border-white/5 px-3 py-1 rounded-full">
            ALPHA-7 NODE
          </span>
        </div>

        <h1 className="text-[22px] font-bold mt-4">Verify your code</h1>
        <p className="text-[#94a3b8] text-sm leading-relaxed mb-2">
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

        <div className="text-center text-sm text-[#64748b] mt-4">
          <Link to="/forgot-password" className="text-[#94a3b8] font-medium hover:text-white transition">← Back to Login</Link>
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
    <div className="w-full max-w-[440px] mx-auto p-5">
      <div className="bg-[rgba(12,20,35,0.85)] backdrop-blur-md border border-white/5 rounded-3xl px-9 py-11 shadow-2xl">
        {/* Logo */}
        <h2 className="text-lg font-bold bg-gradient-to-r from-white to-[#94a3b8] bg-clip-text text-transparent text-center mb-4">
          🚀 JobOrbit
        </h2>

        <div className="inline-block bg-blue-500/10 border border-blue-500/20 rounded-full px-3.5 py-1 text-[10px] font-semibold text-blue-400 uppercase tracking-wide mb-3">
          SECURITY PROTOCOL
        </div>

        <h1 className="text-2xl font-bold">Establish new credentials</h1>
        <p className="text-[#94a3b8] text-sm leading-relaxed mb-6">
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

        <div className="text-center text-sm text-[#64748b] mt-4">
          <Link to="/login" className="text-[#94a3b8] font-medium hover:text-white transition">← Back to Sign In</Link>
        </div>

        <div className="text-center text-[11px] text-[#334155] tracking-wide border-t border-white/5 pt-4 mt-7 leading-relaxed">
          AUTH SERVICE V2.4<br />
          © 2024 JOBORBIT
        </div>
      </div>
    </div>
  );
};