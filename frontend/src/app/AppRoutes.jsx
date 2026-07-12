import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import ProtectedRoute from '../common/components/ProtectedRoute'
import PublicRoute from '../common/components/PublicRoute'
import LandingPage from '../features/landing/components/LandingPage'
import Login from '../features/auth/components/Login'
import Register from '../features/auth/components/Register'
import OTPVerification from '../features/auth/components/OTPVerification'
import ForgotPassword from '../features/auth/components/ForgotPassword'
import ResetPassword from '../features/auth/components/ResetPassword'

export default function AppRoutes() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route
        path="/"
        element={
          <PublicRoute>
            <LandingPage />
          </PublicRoute>
        }
      />
      <Route
        path="/login"
        element={
          <PublicRoute>
            <Login />
          </PublicRoute>
        }
      />
      <Route
        path="/register"
        element={
          <PublicRoute>
            <Register />
          </PublicRoute>
        }
      />
      <Route path="/verify-otp" element={<OTPVerification />} />
      <Route
        path="/forgot-password"
        element={
          <PublicRoute>
            <ForgotPassword />
          </PublicRoute>
        }
      />
      <Route path="/reset-password" element={<ResetPassword />} />

      {/* Catch-all */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}