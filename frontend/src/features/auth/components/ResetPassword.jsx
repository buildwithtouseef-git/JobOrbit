import React, { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Eye, EyeOff, LockKeyhole, Lock } from 'lucide-react'
import { resetPasswordSchema, getPasswordStrength } from '../../../common/validation/schemas'
import authService from '../services/authService'
import { useToast } from '../../../common/hooks/useToast'
import LoadingSpinner from '../../../common/components/LoadingSpinner'

export default function ResetPassword() {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()
  const toast = useToast()

  const email = location.state?.email
  const resetToken = location.state?.resetToken

  useEffect(() => {
    if (!email || !resetToken) {
      navigate('/forgot-password', { replace: true })
    }
  }, [email, resetToken, navigate])

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(resetPasswordSchema),
    mode: 'onBlur',
  })

  const passwordValue = watch('password', '')
  const strength = getPasswordStrength(passwordValue)

  const onSubmit = async (data) => {
    setIsSubmitting(true)
    try {
      await authService.resetPassword({
        email,
        resetToken,
        password: data.password,
      })
      toast.success('Password reset successfully! Please login with your new password.')
      navigate('/login', { replace: true })
    } catch (error) {
      const message =
        error.response?.data?.message || 'Failed to reset password. Please try again.'
      toast.error(message)
    } finally {
      setIsSubmitting(false)
    }
  }

  if (!email || !resetToken) return null

  return (
    <div className="page-container">
      <div className="auth-card animate-slide-up">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 text-white mb-4 shadow-lg shadow-emerald-500/30">
            <LockKeyhole className="w-8 h-8" />
          </div>
          <h1 className="text-2xl font-bold text-slate-800">Reset Password</h1>
          <p className="text-slate-500 mt-1">Create a strong new password for your account</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* New Password */}
          <div>
            <label htmlFor="password" className="form-label">
              New Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input
                id="password"
                type={showPassword ? 'text' : 'password'}
                {...register('password')}
                className={`input-field pl-11 pr-11 ${errors.password ? 'error' : ''}`}
                placeholder="••••••••"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
            {errors.password && (
              <p className="error-text">{errors.password.message}</p>
            )}

            {passwordValue && (
              <div className="mt-3 space-y-2">
                <div className="flex items-center gap-2">
                  <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${strength.color}`}
                      style={{ width: `${strength.percentage}%` }}
                    />
                  </div>
                  <span className="text-xs font-semibold text-slate-500 min-w-[80px] text-right">
                    {strength.label}
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Confirm Password */}
          <div>
            <label htmlFor="confirmPassword" className="form-label">
              Confirm New Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input
                id="confirmPassword"
                type={showConfirm ? 'text' : 'password'}
                {...register('confirmPassword')}
                className={`input-field pl-11 pr-11 ${errors.confirmPassword ? 'error' : ''}`}
                placeholder="••••••••"
              />
              <button
                type="button"
                onClick={() => setShowConfirm(!showConfirm)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
              >
                {showConfirm ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
            {errors.confirmPassword && (
              <p className="error-text">{errors.confirmPassword.message}</p>
            )}
          </div>

          <button type="submit" disabled={isSubmitting} className="btn-primary">
            {isSubmitting ? (
              <span className="flex items-center justify-center gap-2">
                <LoadingSpinner size="sm" />
                Resetting Password...
              </span>
            ) : (
              'Reset Password'
            )}
          </button>
        </form>
      </div>
    </div>
  )
}