import React, { useState, useRef } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  Camera,
  Mail,
  User,
  AtSign,
  Calendar,
  CheckCircle,
  Edit3,
  Save,
  X,
} from 'lucide-react'
import { profileUpdateSchema } from '../../../common/validation/schemas'
import { useAuth } from '../../auth/context/AuthContext'
import profileService from '../services/profileService'
import { useToast } from '../../../common/hooks/useToast'
import Navbar from './Navbar'
import LoadingSpinner from '../../../common/components/LoadingSpinner'

export default function ProfilePage() {
  const { user, updateUser } = useAuth()
  const [isEditing, setIsEditing] = useState(false)
  const [isUploading, setIsUploading] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const fileInputRef = useRef(null)
  const toast = useToast()

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isDirty },
  } = useForm({
    resolver: zodResolver(profileUpdateSchema),
    defaultValues: {
      fullName: user?.fullName || '',
      username: user?.username || '',
      bio: user?.bio || '',
    },
  })

  const handleAvatarUpload = async (e) => {
    const file = e.target.files?.[0]
    if (!file) return

    if (!file.type.startsWith('image/')) {
      toast.error('Please select an image file')
      return
    }

    if (file.size > 5 * 1024 * 1024) {
      toast.error('Image must be smaller than 5MB')
      return
    }

    setIsUploading(true)
    try {
      const formData = new FormData()
      formData.append('avatar', file)
      const data = await profileService.uploadAvatar(formData)
      updateUser({ avatar: data.avatar || data.url })
      toast.success('Avatar updated successfully')
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to upload avatar')
    } finally {
      setIsUploading(false)
    }
  }

  const onSubmit = async (data) => {
    setIsSaving(true)
    try {
      const res = await profileService.updateProfile(data)
      updateUser(res.user || data)
      setIsEditing(false)
      toast.success('Profile updated successfully')
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to update profile')
    } finally {
      setIsSaving(false)
    }
  }

  const handleCancel = () => {
    setIsEditing(false)
    reset({
      fullName: user?.fullName || '',
      username: user?.username || '',
      bio: user?.bio || '',
    })
  }

  const getInitials = (name) => {
    if (!name) return 'U'
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2)
  }

  const formatDate = (date) => {
    if (!date) return 'N/A'
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  }

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,_rgba(99,102,241,0.14),_transparent_32%),linear-gradient(135deg,_#f8fafc_0%,_#eef2ff_45%,_#f5f3ff_100%)]">
      <Navbar />

      <main className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
        {/* Profile Header Card */}
        <div className="card-elevated mb-8 overflow-hidden border border-indigo-100/80 bg-white/90 p-6 shadow-[0_20px_60px_-20px_rgba(79,70,229,0.35)] animate-slide-up sm:p-8">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-center">
            {/* Avatar */}
            <div className="relative group">
              {user?.avatar ? (
                <img
                  src={user.avatar}
                  alt={user.fullName}
                  className="w-28 h-28 rounded-2xl object-cover ring-4 ring-indigo-100 shadow-xl"
                />
              ) : (
                <div className="flex h-28 w-28 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-600 via-violet-600 to-purple-600 text-3xl font-bold text-white shadow-xl ring-4 ring-indigo-100">
                  {getInitials(user?.fullName)}
                </div>
              )}

              {/* Upload Overlay */}
              <button
                onClick={() => fileInputRef.current?.click()}
                disabled={isUploading}
                className="absolute inset-0 rounded-2xl bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-all duration-200 cursor-pointer"
              >
                {isUploading ? (
                  <LoadingSpinner size="sm" />
                ) : (
                  <Camera className="w-7 h-7 text-white" />
                )}
              </button>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleAvatarUpload}
                className="hidden"
              />
            </div>

            {/* Info */}
            <div className="flex-1 text-center sm:text-left">
              <div className="inline-flex items-center gap-2 rounded-full border border-emerald-100 bg-emerald-50 px-3 py-1 text-sm font-medium text-emerald-700">
                <CheckCircle className="h-4 w-4" />
                Verified account
              </div>
              <h1 className="mt-3 text-2xl font-semibold tracking-tight text-slate-900">{user?.fullName}</h1>
              <p className="mt-1 flex items-center justify-center gap-1.5 text-slate-500 sm:justify-start">
                <AtSign className="w-4 h-4" />
                {user?.username}
              </p>
              <div className="mt-4 flex flex-wrap items-center justify-center gap-2 sm:justify-start">
                <span className="rounded-full bg-slate-900 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-white">
                  JobSeeker
                </span>
                <span className="flex items-center gap-1 text-sm text-slate-500">
                  <Calendar className="w-4 h-4" />
                  Joined {formatDate(user?.createdAt)}
                </span>
              </div>
            </div>

            {/* Edit Button */}
            {!isEditing && (
              <button
                onClick={() => setIsEditing(true)}
                className="inline-flex w-auto items-center justify-center gap-2 rounded-2xl border border-indigo-200 bg-indigo-50 px-5 py-3 font-semibold text-indigo-700 transition-all duration-200 hover:bg-indigo-100 hover:shadow-md"
              >
                <Edit3 className="w-4 h-4" />
                Edit Profile
              </button>
            )}
          </div>
        </div>

        {/* Profile Details / Edit Form */}
        <div className="card-elevated animate-slide-up border border-slate-200/80 bg-white/90 shadow-[0_20px_50px_-20px_rgba(15,23,42,0.25)]" style={{ animationDelay: '100ms' }}>
          <div className="mb-6 flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-indigo-600">Profile overview</p>
              <h2 className="text-xl font-semibold text-slate-900">Personal details</h2>
            </div>
            <div className="hidden rounded-full bg-slate-100 px-3 py-1 text-sm font-medium text-slate-600 sm:block">
              Secure & synced
            </div>
          </div>

          {isEditing ? (
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              <div>
                <label className="form-label">Full Name</label>
                <div className="relative">
                  <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <input
                    type="text"
                    {...register('fullName')}
                    className={`input-field pl-11 ${errors.fullName ? 'error' : ''}`}
                  />
                </div>
                {errors.fullName && (
                  <p className="error-text">{errors.fullName.message}</p>
                )}
              </div>

              <div>
                <label className="form-label">Username</label>
                <div className="relative">
                  <AtSign className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <input
                    type="text"
                    {...register('username')}
                    className={`input-field pl-11 ${errors.username ? 'error' : ''}`}
                  />
                </div>
                {errors.username && (
                  <p className="error-text">{errors.username.message}</p>
                )}
              </div>

              <div>
                <label className="form-label">Bio</label>
                <textarea
                  {...register('bio')}
                  rows={3}
                  className={`input-field resize-none ${errors.bio ? 'error' : ''}`}
                  placeholder="Tell us about yourself..."
                />
                {errors.bio && (
                  <p className="error-text">{errors.bio.message}</p>
                )}
              </div>

              <div className="flex items-center gap-3 pt-2">
                <button
                  type="submit"
                  disabled={isSaving || !isDirty}
                  className="btn-primary w-auto px-6 flex items-center gap-2"
                >
                  {isSaving ? (
                    <>
                      <LoadingSpinner size="sm" /> Saving...
                    </>
                  ) : (
                    <>
                      <Save className="w-4 h-4" /> Save Changes
                    </>
                  )}
                </button>
                <button type="button" onClick={handleCancel} className="btn-ghost flex items-center gap-2">
                  <X className="w-4 h-4" /> Cancel
                </button>
              </div>
            </form>
          ) : (
            <div className="space-y-6">
              {[
                { icon: User, label: 'Full Name', value: user?.fullName },
                { icon: AtSign, label: 'Username', value: user?.username },
                { icon: Mail, label: 'Email', value: user?.email },
                {
                  icon: Calendar,
                  label: 'Member Since',
                  value: formatDate(user?.createdAt),
                },
              ].map(({ icon: Icon, label, value }) => (
                <div key={label} className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center flex-shrink-0">
                    <Icon className="w-5 h-5 text-slate-500" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                      {label}
                    </p>
                    <p className="text-sm font-medium text-slate-800 mt-0.5">{value || 'Not set'}</p>
                  </div>
                </div>
              ))}

              {user?.bio && (
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center flex-shrink-0">
                    <Edit3 className="w-5 h-5 text-slate-500" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                      Bio
                    </p>
                    <p className="text-sm font-medium text-slate-800 mt-0.5">{user.bio}</p>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </main>
    </div>
  )
}