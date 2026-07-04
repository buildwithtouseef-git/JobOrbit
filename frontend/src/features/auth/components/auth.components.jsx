import React, { useState } from 'react';

// 1. Forgot Password Form Component
export const ForgotPasswordForm = ({ onSubmit, loading }) => {
  const [email, setEmail] = useState('');
  return (
    <form onSubmit={(e) => { e.preventDefault(); onSubmit(email); }}>
      <input type="email" placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)} required />
      <button type="submit" disabled={loading}>{loading ? "Sending..." : "Send Reset Link"}</button>
    </form>
  );
};

// 2. Reset Password Form Component
export const ResetPasswordForm = ({ onSubmit, loading }) => {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  return (
    <form onSubmit={(e) => { e.preventDefault(); onSubmit({ newPassword, confirmPassword }); }}>
      <input type="password" placeholder="New Password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} required />
      <input type="password" placeholder="Confirm Password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
      <button type="submit" disabled={loading}>{loading ? "Resetting..." : "Reset Password"}</button>
    </form>
  );
};