import React from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../../features/auth/context/AuthContext'
import LoadingSpinner from './LoadingSpinner'

export default function PublicRoute({ children }) {
  const { user, loading } = useAuth()
  const location = useLocation()

  if (loading) {
    return <LoadingSpinner fullScreen text="Checking authentication..." />
  }

  if (user) {
    const from = location.state?.from?.pathname || '/profile'
    return <Navigate to={from} replace />
  }

  return children
}