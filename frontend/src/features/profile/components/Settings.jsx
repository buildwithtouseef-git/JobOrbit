import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Eye, EyeOff, Lock, Shield, Trash2, AlertTriangle, Sparkles } from 'lucide-react'
import { changePasswordSchema, getPasswordStrength } from '../../../common/validation/schemas'
import profileService from '../services/profileService'
import { useAuth } from '../../auth/context/AuthContext'
import { useToast } from '../../../common/hooks/useToast'
import Navbar from './Navbar'
import LoadingSpinner from '../../../common/components/LoadingSpinner'
import { useNavigate } from 'react-router-dom'

export default function Settings() {
  const [showCurrent, setShowCurrent] = useState(false)
  const [showNew, setShowNew] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const [isChangingPassword, setIsChangingPassword] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const { logout } = useAuth()
  const navigate = useNavigate()
  const toast = useToast()

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(changePasswordSchema),
    mode: 'onBlur',
  })

  const newPasswordValue = watch('newPassword', '')
  const strength = getPasswordStrength(newPasswordValue)

  const onChangePassword = async (data) => {
    setIsChangingPassword(true)
    try {
      await profileService.changePassword({
        currentPassword: data.currentPassword,
        newPassword: data.newPassword,
      })
      toast.success('Password changed successfully')
      reset()
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to change password')
    } finally {
      setIsChangingPassword(false)
    }
  }

  const handleDeleteAccount = async () => {
    setIsDeleting(true)
    try {
      await profileService.deleteAccount()
      await logout()
      toast.success('Account deleted successfully')
      navigate('/', { replace: true })
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to delete account')
    } finally {
      setIsDeleting(false)
      setShowDeleteModal(false)
    }
  }

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,_rgba(99,102,241,0.14),_transparent_32%),linear-gradient(135deg,_#f8fafc_0%,_#eef2ff_45%,_#f5f3ff_100%)]">
      <Navbar />

      <main className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
        <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between animate-fade-in">
          <div>
            <div className="mb-2 inline-flex items-center gap-2 rounded-full border border-indigo-100 bg-indigo-50 px-3 py-1 text-sm font-medium text-indigo-700">
              <Sparkles className="h-4 w-4" />
              Account controls
            </div>
            <h1 className="text-2xl font-semibold tracking-tight text-slate-900">Settings</h1>
            <p className="mt-1 text-sm text-slate-500">Manage your password and account preferences securely.</p>
          </div>
        </div>

        {/* Change Password */}
        <div className="card-elevated mb-8 animate-slide-up border border-indigo-100/80 bg-white/90">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-indigo-100 flex items-center justify-center">
              <Shield className="w-5 h-5 text-indigo-600" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-800">Change Password</h2>
              <p className="text-sm text-slate-500">Update your password to keep your account secure</p>
            </div>
          </div>

          <form onSubmit={handleSubmit(onChangePassword)} className="space-y-5">
            {/* Current Password */}
            <div>
              <label className="form-label">Current Password</label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  type={showCurrent ? 'text' : 'password'}
                  {...register('currentPassword')}
                  className={`input-field pl-11 pr-11 ${errors.currentPassword ? 'error' : ''}`}
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowCurrent(!showCurrent)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                >
                  {showCurrent ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              {errors.currentPassword && (
                <p className="error-text">{errors.currentPassword.message}</p>
              )}
            </div>

            {/* New Password */}
            <div>
              <label className="form-label">New Password</label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  type={showNew ? 'text' : 'password'}
                  {...register('newPassword')}
                  className={`input-field pl-11 pr-11 ${errors.newPassword ? 'error' : ''}`}
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowNew(!showNew)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                >
                  {showNew ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              {errors.newPassword && (
                <p className="error-text">{errors.newPassword.message}</p>
              )}

              {newPasswordValue && (
                <div className="mt-3">
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

            {/* Confirm New Password */}
            <div>
              <label className="form-label">Confirm New Password</label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  type={showConfirm ? 'text' : 'password'}
                  {...register('confirmNewPassword')}
                  className={`input-field pl-11 pr-11 ${errors.confirmNewPassword ? 'error' : ''}`}
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
              {errors.confirmNewPassword && (
                <p className="error-text">{errors.confirmNewPassword.message}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={isChangingPassword}
              className="btn-primary w-auto px-8"
            >
              {isChangingPassword ? (
                <span className="flex items-center gap-2">
                  <LoadingSpinner size="sm" /> Updating...
                </span>
              ) : (
                'Update Password'
              )}
            </button>
          </form>
        </div>

        {/* Danger Zone */}
        <div className="card-elevated animate-slide-up border-red-100/80 bg-white/90" style={{ animationDelay: '100ms' }}>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-red-100 flex items-center justify-center">
              <AlertTriangle className="w-5 h-5 text-red-600" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-red-800">Danger Zone</h2>
              <p className="text-sm text-red-500">Irreversible actions</p>
            </div>
          </div>

          <p className="text-sm text-slate-600 mb-4">
            Once you delete your account, there is no going back. All your data will be permanently removed.
          </p>

          <button
            onClick={() => setShowDeleteModal(true)}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-red-600 bg-red-50 border-2 border-red-100 hover:bg-red-100 hover:border-red-200 transition-all duration-200"
          >
            <Trash2 className="w-4 h-4" />
            Delete Account
          </button>
        </div>

        {/* Delete Confirmation Modal */}
        {showDeleteModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fade-in">
            <div
              className="absolute inset-0 bg-black/50 backdrop-blur-sm"
              onClick={() => setShowDeleteModal(false)}
            />
            <div className="relative bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full animate-scale-in">
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-red-100 mb-4">
                  <AlertTriangle className="w-8 h-8 text-red-600" />
                </div>
                <h3 className="text-xl font-bold text-slate-800 mb-2">Delete Account?</h3>
                <p className="text-slate-500 text-sm mb-6">
                  This action cannot be undone. All your data, including your profile,
                  settings, and history will be permanently deleted.
                </p>

                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setShowDeleteModal(false)}
                    className="btn-secondary flex-1"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleDeleteAccount}
                    disabled={isDeleting}
                    className="flex-1 py-3 px-6 rounded-xl font-semibold text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-all duration-200 disabled:opacity-50"
                  >
                    {isDeleting ? (
                      <span className="flex items-center justify-center gap-2">
                        <LoadingSpinner size="sm" /> Deleting...
                      </span>
                    ) : (
                      'Yes, Delete'
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}