import React from 'react'

export default function LoadingSpinner({ size = 'md', text, fullScreen = false }) {
  const sizes = {
    sm: 'w-5 h-5 border-2',
    md: 'w-8 h-8 border-3',
    lg: 'w-12 h-12 border-4',
    xl: 'w-16 h-16 border-4',
  }

  const spinner = (
    <div className="flex flex-col items-center gap-3">
      <div
        className={`
          ${sizes[size]}
          border-indigo-200 border-t-indigo-600
          rounded-full animate-spin
        `}
      />
      {text && (
        <p className="text-sm text-slate-500 font-medium animate-pulse">{text}</p>
      )}
    </div>
  )

  if (fullScreen) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/80 backdrop-blur-sm">
        {spinner}
      </div>
    )
  }

  return spinner
}