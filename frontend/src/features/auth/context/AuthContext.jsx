import React, { createContext, useContext, useState, useEffect, useCallback } from 'react'
import authService from '../services/authService'
import { clearAccessToken, getAccessToken } from '../../../api/tokenStore'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  const fetchUser = useCallback(async () => {
    try {
      const token = getAccessToken()
      if (!token) {
        setUser(null)
        setLoading(false)
        return
      }
      const data = await authService.getProfile()
      setUser(data.user || data)
    } catch (error) {
      clearAccessToken()
      setUser(null)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchUser()
  }, [fetchUser])

  const login = async (credentials) => {
    const data = await authService.login(credentials)
    setUser(data.user)
    return data
  }

  const logout = async () => {
    await authService.logout()
    setUser(null)
  }

  const updateUser = (userData) => {
    setUser((prev) => ({ ...prev, ...userData }))
  }

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, updateUser, fetchUser }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) throw new Error('useAuth must be used within AuthProvider')
  return context
}