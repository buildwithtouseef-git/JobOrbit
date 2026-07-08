import React, { useState, useEffect, useRef, useCallback } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { ShieldCheck, RotateCcw, Sparkles } from 'lucide-react'
import { otpSchema } from '../../../common/validation/schemas'
import authService from '../services/authService'
import { useToast } from '../../../common/hooks/useToast'
import LoadingSpinner from '../../../common/components/LoadingSpinner'

export default function OTPVerification() {
  const navigate = useNavigate()
  const location = useLocation()
  const toast = useToast()

  const email = location.state?.email
  const type = location.state?.type || 'registration'

  const OTP_DURATION = 60
  const OTP_START_KEY = `otp_start_${type}`

  // Restore remaining time from sessionStorage if page was refreshed
  const getInitialTimer = () => {
    const start = sessionStorage.getItem(OTP_START_KEY)
    if (start) {
      const elapsed = Math.floor((Date.now() - parseInt(start, 10)) / 1000)
      const remaining = OTP_DURATION - elapsed
      return remaining > 0 ? remaining : 0
    }
    sessionStorage.setItem(OTP_START_KEY, Date.now().toString())
    return OTP_DURATION
  }

  const [otp, setOtp] = useState(Array(6).fill(''))
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isResending, setIsResending] = useState(false)
  const [timer, setTimer] = useState(getInitialTimer)
  const [canResend, setCanResend] = useState(timer === 0)
  const [error, setError] = useState('')
  const inputRefs = useRef([])

  useEffect(() => {
    if (!email) {
      if (type === 'password-reset') {
        navigate('/forgot-password', { replace: true })
      } else {
        navigate('/register', { replace: true })
      }
    }
  }, [email, type, navigate])

  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => setTimer((t) => t - 1), 1000)
      return () => clearInterval(interval)
    }
    setCanResend(true)
  }, [timer])

  useEffect(() => {
    inputRefs.current[0]?.focus()
  }, [])

  const handleChange = (index, value) => {
    if (!/^\d?$/.test(value)) return
    setError('')

    const newOtp = [...otp]
    newOtp[index] = value
    setOtp(newOtp)

    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus()
    }

    // Auto-submit when all filled
    if (value && index === 5) {
      const fullOtp = newOtp.join('')
      if (fullOtp.length === 6) {
        handleVerify(fullOtp)
      }
    }
  }

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus()
    }
  }

  const handlePaste = (e) => {
    e.preventDefault()
    const text = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6)
    if (text.length === 6) {
      const newOtp = text.split('')
      setOtp(newOtp)
      inputRefs.current[5]?.focus()
      handleVerify(text)
    }
  }

  const handleVerify = useCallback(
    async (otpString) => {
      const otpValue = otpString || otp.join('')
      const validation = otpSchema.safeParse({ otp: otpValue })

      if (!validation.success) {
        setError(validation.error.errors[0].message)
        return
      }

      setIsSubmitting(true)
      setError('')

      try {
        if (type === 'registration') {
          await authService.verifyOTP({ email, otp: otpValue })
          sessionStorage.removeItem(OTP_START_KEY)
          toast.success('Email verified successfully! Please login.')
          navigate('/login', { replace: true })
        } else if (type === 'password-reset') {
          const data = await authService.verifyResetOTP({ email, otp: otpValue })
          sessionStorage.removeItem(OTP_START_KEY)
          toast.success('OTP verified! Set your new password.')
          navigate('/reset-password', {
            state: { email, resetToken: data.resetToken },
            replace: true,
          })
        }
      } catch (err) {
        const message = err.response?.data?.message || 'Invalid or expired OTP'
        setError(message)
        toast.error(message)
        setOtp(Array(6).fill(''))
        inputRefs.current[0]?.focus()
      } finally {
        setIsSubmitting(false)
      }
    },
    [otp, email, type, navigate, toast, OTP_START_KEY]
  )

  const handleResend = async () => {
    setIsResending(true)
    try {
      await authService.resendOTP({ email, type })
      toast.success('New OTP sent to your email')
      sessionStorage.setItem(OTP_START_KEY, Date.now().toString())
      setTimer(OTP_DURATION)
      setCanResend(false)
      setOtp(Array(6).fill(''))
      setError('')
      inputRefs.current[0]?.focus()
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to resend OTP')
    } finally {
      setIsResending(false)
    }
  }

  if (!email) return null

  return (
    <div className="page-container">
      <div className="auth-card animate-slide-up border border-emerald-100/80 shadow-[0_25px_70px_-24px_rgba(16,185,129,0.35)]">
        <div className="mb-8 text-center">
          <div className="mb-4 inline-flex items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 p-3 text-white shadow-lg shadow-emerald-500/30">
            <ShieldCheck className="h-8 w-8" />
          </div>
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-emerald-100 bg-emerald-50 px-3 py-1 text-sm font-medium text-emerald-700">
            <Sparkles className="h-4 w-4" />
            One more step
          </div>
          <h1 className="text-2xl font-semibold tracking-tight text-slate-900">Verify your account</h1>
          <p className="mt-1 text-slate-500">
            We sent a 6-digit code to{' '}
            <span className="font-semibold text-slate-700">{email}</span>
          </p>
        </div>

        {/* OTP Inputs */}
        <div className="flex justify-center gap-3 mb-6" onPaste={handlePaste}>
          {otp.map((digit, index) => (
            <input
              key={index}
              ref={(el) => (inputRefs.current[index] = el)}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              className={`otp-input ${digit ? 'filled' : ''} ${error ? 'border-red-400 focus:ring-red-500' : ''}`}
              disabled={isSubmitting}
            />
          ))}
        </div>

        {error && (
          <p className="text-center text-sm text-red-500 font-medium mb-4 animate-shake">
            {error}
          </p>
        )}

        {/* Timer */}
        <div className="text-center mb-6">
          {!canResend ? (
            <div className="flex items-center justify-center gap-2 text-sm text-slate-500">
              <div className="relative w-10 h-10">
                <svg className="w-10 h-10 -rotate-90" viewBox="0 0 36 36">
                  <circle
                    cx="18"
                    cy="18"
                    r="15"
                    fill="none"
                    stroke="#e2e8f0"
                    strokeWidth="3"
                  />
                  <circle
                    cx="18"
                    cy="18"
                    r="15"
                    fill="none"
                    stroke="#6366f1"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeDasharray={`${(timer / OTP_DURATION) * 94.2} 94.2`}
                    className="transition-all duration-1000 ease-linear"
                  />
                </svg>
                <span className="absolute inset-0 flex items-center justify-center text-xs font-bold text-slate-700">
                  {timer}
                </span>
              </div>
              <span>seconds remaining</span>
            </div>
          ) : (
            <button
              onClick={handleResend}
              disabled={isResending}
              className="inline-flex items-center gap-2 text-sm link"
            >
              {isResending ? (
                <>
                  <LoadingSpinner size="sm" /> Sending...
                </>
              ) : (
                <>
                  <RotateCcw className="w-4 h-4" /> Resend Code
                </>
              )}
            </button>
          )}
        </div>

        <button
          onClick={() => handleVerify()}
          disabled={isSubmitting || otp.join('').length !== 6}
          className="btn-primary"
        >
          {isSubmitting ? (
            <span className="flex items-center justify-center gap-2">
              <LoadingSpinner size="sm" />
              Verifying...
            </span>
          ) : (
            'Verify Email'
          )}
        </button>

        <p className="text-center text-xs text-slate-400 mt-4">
          Didn't receive the email? Check your spam folder.
        </p>
      </div>
    </div>
  )
}