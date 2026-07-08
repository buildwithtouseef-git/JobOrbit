import React, { useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Eye, EyeOff, LogIn, Mail, Lock, Sparkles, BriefcaseBusiness } from 'lucide-react'
import { loginSchema } from '../../../common/validation/schemas'
import { useAuth } from '../context/AuthContext'
import { useToast } from '../../../common/hooks/useToast'
import LoadingSpinner from '../../../common/components/LoadingSpinner'

export default function Login() {
  const [showPassword, setShowPassword] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { login } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const toast = useToast()

  const from = location.state?.from?.pathname || '/profile'

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
    mode: 'onBlur',
  })

  const onSubmit = async (data) => {
    setIsSubmitting(true)
    try {
      await login(data)
      toast.success('Welcome back!')
      navigate(from, { replace: true })
    } catch (error) {
      const message = error.response?.data?.message || 'Login failed. Please try again.'

      if (error.response?.status === 403 && error.response?.data?.requiresVerification) {
        toast.warning('Please verify your email first.')
        navigate('/verify-otp', { state: { email: data.email, type: 'registration' } })
        return
      }

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
            Welcome to JobOrbit
          </div>
          <h1 className="text-2xl font-semibold tracking-tight text-slate-900">Welcome back</h1>
          <p className="mt-1 text-slate-500">Sign in to continue your career journey</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
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
            <div className="flex items-center justify-between mb-2">
              <label htmlFor="password" className="form-label mb-0">
                Password
              </label>
              <Link to="/forgot-password" className="text-sm link">
                Forgot password?
              </Link>
            </div>
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
          </div>

          <button type="submit" disabled={isSubmitting} className="btn-primary">
            {isSubmitting ? (
              <span className="flex items-center justify-center gap-2">
                <LoadingSpinner size="sm" />
                Signing in...
              </span>
            ) : (
              'Sign In'
            )}
          </button>
        </form>

        <p className="text-center text-sm text-slate-500 mt-6">
          Don't have an account?{' '}
          <Link to="/register" className="link">
            Create one
          </Link>
        </p>
      </div>
    </div>
  )
}