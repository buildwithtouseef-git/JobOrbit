import React from 'react'
import { Link } from 'react-router-dom'
import { BriefcaseBusiness, Sparkles } from 'lucide-react'
import AvatarDropdown from './AvatarDropdown'

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/85 backdrop-blur-xl shadow-sm">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link to="/profile" className="flex items-center gap-3 group">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-600 via-violet-600 to-purple-600 shadow-lg shadow-indigo-500/25 transition-all duration-300 group-hover:scale-105 group-hover:shadow-indigo-500/35">
            <BriefcaseBusiness className="h-5 w-5 text-white" />
          </div>
          <div className="flex flex-col">
            <span className="text-lg font-semibold tracking-tight text-slate-900">JobOrbit</span>
            <span className="text-xs font-medium uppercase tracking-[0.24em] text-slate-500">
              Career Platform
            </span>
          </div>
        </Link>

        <div className="flex items-center gap-3">
          <div className="hidden items-center gap-2 rounded-full border border-indigo-100 bg-indigo-50/70 px-3 py-2 text-sm font-medium text-indigo-700 sm:flex">
            <Sparkles className="h-4 w-4" />
            Premium experience
          </div>
          <AvatarDropdown />
        </div>
      </div>
    </nav>
  )
}