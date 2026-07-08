import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Eye, EyeOff, UserPlus, Mail, Lock, User, AtSign, Sparkles, BriefcaseBusiness } from 'lucide-react'
import { registerSchema, getPasswordStrength } from '../../../common/validation/schemas'
import authService from '../services/authService'
import { useToast } from '../../../common/hooks/useToast'
import LoadingSpinner from '../../../common/components/LoadingSpinner'

export default function Register() {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const navigate = useNavigate()
  const toast = useToast()

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(registerSchema),
    mode: 'onBlur',
  })

  const passwordValue = watch('password', '')
  const strength = getPasswordStrength(passwordValue)

  const onSubmit = async (data) => {
    setIsSubmitting(true)
    try {
      const { confirmPassword, ...payload } = data
      await authService.register(payload)
      toast.success('Registration successful! Please verify your email.')
      navigate('/verify-otp', { state: { email: data.email, type: 'registration' } })
    } catch (error) {
      const message =
        error.response?.data?.message || 'Registration failed. Please try again.'
      toast.error(message)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="page-container">
      <div className="auth-card animate-slide-up border border-indigo-100/80 shadow-[0_25px_70px_-24px_rgba(79,70,229,0.45)]">
        <div className="mb-8 text-center">
          <div className="mb-4 inline-flex items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-600 via-violet-600 to-purple-600 p-3 text-white shadow-lg shadow-indigo-500/30">
            <BriefcaseBusiness className="h-8 w-8" />
          </div>
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-indigo-100 bg-indigo-50 px-3 py-1 text-sm font-medium text-indigo-700">
            <Sparkles className="h-4 w-4" />
            Grow with JobOrbit
          </div>
          <h1 className="text-2xl font-semibold tracking-tight text-slate-900">Create your account</h1>
          <p className="mt-1 text-slate-500">Join thousands building their next opportunity</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* Full Name */}
          <div>
            <label htmlFor="fullName" className="form-label">
              Full Name
            </label>
            <div className="relative">
              <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input
                id="fullName"
                type="text"
                {...register('fullName')}
                className={`input-field pl-11 ${errors.fullName ? 'error' : ''}`}
                placeholder="John Doe"
              />
            </div>
            {errors.fullName && (
              <p className="error-text">{errors.fullName.message}</p>
            )}
          </div>

          {/* Username */}
          <div>
            <label htmlFor="username" className="form-label">
              Username
            </label>
            <div className="relative">
              <AtSign className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input
                id="username"
                type="text"
                {...register('username')}
                className={`input-field pl-11 ${errors.username ? 'error' : ''}`}
                placeholder="johndoe"
              />
            </div>
            {errors.username && (
              <p className="error-text">{errors.username.message}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className="form-label">
              Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input
                id="email"
                type="email"
                {...register('email')}
                className={`input-field pl-11 ${errors.email ? 'error' : ''}`}
                placeholder="john@example.com"
              />
            </div>
            {errors.email && (
              <p className="error-text">{errors.email.message}</p>
            )}
          </div>

          {/* Password */}
          <div>
            <label htmlFor="password" className="form-label">
              Password
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

            {/* Password Strength Bar */}
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
                {strength.feedback.length > 0 && (
                  <div className="flex flex-wrap gap-1.5">
                    {strength.feedback.map((item, i) => (
                      <span key={i} className="badge-warning text-[10px]">
                        {item}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Confirm Password */}
          <div>
            <label htmlFor="confirmPassword" className="form-label">
              Confirm Password
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
                Creating Account...
              </span>
            ) : (
              'Create Account'
            )}
          </button>
        </form>

        <p className="text-center text-sm text-slate-500 mt-6">
          Already have an account?{' '}
          <Link to="/login" className="link">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  )
}