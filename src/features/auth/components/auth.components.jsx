import React from 'react';

export const ForgotPasswordForm = ({ email, setEmail, onSubmit, loading }) => {
  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div>
        <label className="block text-[11px] font-semibold text-[#94a3b8] uppercase tracking-wider mb-1.5">
          RECOVERY EMAIL
        </label>
        <input
          type="email"
          placeholder="name@company.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full px-4 py-3.5 bg-white/5 border border-white/10 rounded-xl text-white text-sm placeholder:text-[#475569] focus:border-blue-500 focus:bg-blue-500/5 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all"
        />
      </div>
      <button
        type="submit"
        disabled={loading}
        className="w-full py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm rounded-xl transition-all disabled:opacity-60 disabled:cursor-not-allowed"
      >
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
      <div className="flex gap-2.5 justify-center my-6">
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
            className="w-12 h-[58px] text-center text-2xl font-semibold bg-white/5 border border-white/10 rounded-xl text-white outline-none focus:border-blue-500 focus:bg-blue-500/5 focus:ring-4 focus:ring-blue-500/10 transition-all"
          />
        ))}
      </div>
      <button
        onClick={onSubmit}
        disabled={loading}
        className="w-full py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm rounded-xl transition-all disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {loading ? 'Verifying...' : 'Verify and Continue'}
      </button>
      <div className="flex justify-between items-center text-sm text-[#94a3b8] mt-4">
        <span>RESEND CODE IN <span className="text-blue-500 font-semibold">00:{String(timer).padStart(2, '0')}</span></span>
        <button onClick={onResend} disabled={loading} className="text-blue-400 font-semibold hover:underline bg-transparent border-none cursor-pointer text-sm">
          Resend
        </button>
      </div>
    </>
  );
};

export const ResetPasswordForm = ({ newPassword, setNewPassword, confirmPassword, setConfirmPassword, onSubmit, loading }) => {
  return (
    <form onSubmit={onSubmit} className="space-y-5">
      <div>
        <label className="block text-[11px] font-semibold text-[#94a3b8] uppercase tracking-wider mb-1.5">
          NEW PASSWORD
        </label>
        <input
          type="password"
          placeholder="Enter new password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          required
          className="w-full px-4 py-3.5 bg-white/5 border border-white/10 rounded-xl text-white text-sm placeholder:text-[#475569] focus:border-blue-500 focus:bg-blue-500/5 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all"
        />
        <div className="flex items-center gap-2.5 mt-1.5 text-sm text-[#94a3b8]">
          <span className="w-4 h-4 border border-white/15 rounded bg-white/5 inline-block"></span>
          <span>Awaiting input</span>
        </div>
      </div>
      <div>
        <label className="block text-[11px] font-semibold text-[#94a3b8] uppercase tracking-wider mb-1.5">
          CONFIRM PASSWORD
        </label>
        <input
          type="password"
          placeholder="Confirm your password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
          className="w-full px-4 py-3.5 bg-white/5 border border-white/10 rounded-xl text-white text-sm placeholder:text-[#475569] focus:border-blue-500 focus:bg-blue-500/5 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all"
        />
      </div>
      <button
        type="submit"
        disabled={loading}
        className="w-full py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm rounded-xl transition-all disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {loading ? 'Updating...' : 'UPDATE CREDENTIALS →'}
      </button>
    </form>
  );
};