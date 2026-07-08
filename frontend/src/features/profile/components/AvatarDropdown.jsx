import React, { useState, useRef, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { User, Settings, LogOut, ChevronDown, Mail } from 'lucide-react'
import { useAuth } from '../../auth/context/AuthContext'
import { useToast } from '../../../common/hooks/useToast'

export default function AvatarDropdown() {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef(null)
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const toast = useToast()

  useEffect(() => {
    function handleClickOutside(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  useEffect(() => {
    function handleEscape(e) {
      if (e.key === 'Escape') setIsOpen(false)
    }
    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [])

  const handleLogout = async () => {
    setIsOpen(false)
    await logout()
    toast.success('Logged out successfully')
    navigate('/', { replace: true })
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

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-3 p-1.5 pr-3 rounded-full hover:bg-slate-100 transition-all duration-200 group"
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        {/* Avatar */}
        {user?.avatar ? (
          <img
            src={user.avatar}
            alt={user.fullName}
            className="w-9 h-9 rounded-full object-cover ring-2 ring-indigo-100 group-hover:ring-indigo-200 transition-all"
          />
        ) : (
          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white text-sm font-bold ring-2 ring-indigo-100 group-hover:ring-indigo-200 transition-all">
            {getInitials(user?.fullName)}
          </div>
        )}
        <span className="text-sm font-semibold text-slate-700 hidden sm:block">
          {user?.username || user?.fullName?.split(' ')[0]}
        </span>
        <ChevronDown
          className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </button>

      {/* Dropdown */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-72 bg-white rounded-2xl shadow-2xl shadow-slate-200/50 border border-slate-100 overflow-hidden animate-scale-in z-50">
          {/* User Info Header */}
          <div className="p-4 bg-gradient-to-r from-indigo-50 to-purple-50 border-b border-slate-100">
            <div className="flex items-center gap-3">
              {user?.avatar ? (
                <img
                  src={user.avatar}
                  alt={user.fullName}
                  className="w-12 h-12 rounded-full object-cover ring-2 ring-white shadow-md"
                />
              ) : (
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold ring-2 ring-white shadow-md text-lg">
                  {getInitials(user?.fullName)}
                </div>
              )}
              <div className="flex-1 min-w-0">
                <p className="text-sm font-bold text-slate-800 truncate">
                  {user?.fullName}
                </p>
                <p className="text-xs text-slate-500 truncate flex items-center gap-1">
                  <Mail className="w-3 h-3" />
                  {user?.email}
                </p>
              </div>
            </div>
          </div>

          {/* Menu Items */}
          <div className="py-2">
            <Link
              to="/profile"
              onClick={() => setIsOpen(false)}
              className="dropdown-item"
            >
              <User className="w-4.5 h-4.5 text-slate-400" />
              <span>My Profile</span>
            </Link>
            <Link
              to="/settings"
              onClick={() => setIsOpen(false)}
              className="dropdown-item"
            >
              <Settings className="w-4.5 h-4.5 text-slate-400" />
              <span>Settings</span>
            </Link>
          </div>

          {/* Logout */}
          <div className="border-t border-slate-100 py-2">
            <button
              onClick={handleLogout}
              className="dropdown-item text-red-600 hover:bg-red-50 hover:text-red-700 w-full"
            >
              <LogOut className="w-4.5 h-4.5" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      )}
    </div>
  )
}