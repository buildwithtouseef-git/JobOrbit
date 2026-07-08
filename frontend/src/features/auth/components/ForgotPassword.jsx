import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { KeyRound, Mail, ArrowLeft, Sparkles, BriefcaseBusiness } from 'lucide-react'
import { forgotPasswordSchema } from '../../../common/validation/schemas'
import authService from '../services/authService'
import { useToast } from '../../../common/hooks/useToast'
import LoadingSpinner from '../../../common/components/LoadingSpinner'

export default function ForgotPassword() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const navigate = useNavigate()
  const toast = useToast()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(forgotPasswordSchema),
    mode: 'onBlur',
  })

  const onSubmit = async (data) => {
    setIsSubmitting(true)
    try {
      await authService.forgotPassword(data)
      toast.success('OTP sent to your email address')
      navigate('/verify-otp', {
        state: { email: data.email, type: 'password-reset' },
      })
    } catch (error) {
      const message =
        error.response?.data?.message || 'Failed to send reset email. Please try again.'
      toast.error(message)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="page-container">
      <div className="auth-card animate-slide-up border border-amber-100/80 shadow-[0_25px_70px_-24px_rgba(245,158,11,0.35)]">
        <div className="mb-8 text-center">
          <div className="mb-4 inline-flex items-center justify-center rounded-2xl bg-gradient-to-br from-amber-500 to-orange-600 p-3 text-white shadow-lg shadow-amber-500/30">
            <KeyRound className="h-8 w-8" />
          </div>
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-amber-100 bg-amber-50 px-3 py-1 text-sm font-medium text-amber-700">
            <Sparkles className="h-4 w-4" />
            Secure recovery
          </div>
          <h1 className="text-2xl font-semibold tracking-tight text-slate-900">Reset your password</h1>
          <p className="mt-1 text-slate-500">Enter your email and we’ll send you a verification code</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
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

          <button type="submit" disabled={isSubmitting} className="btn-primary">
            {isSubmitting ? (
              <span className="flex items-center justify-center gap-2">
                <LoadingSpinner size="sm" />
                Sending Code...
              </span>
            ) : (
              'Send Verification Code'
            )}
          </button>
        </form>

        <Link
          to="/login"
          className="flex items-center justify-center gap-2 mt-6 text-sm text-slate-500 hover:text-slate-700 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Login
        </Link>
      </div>
    </div>
  )
}