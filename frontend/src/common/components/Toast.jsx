import React, { useEffect, useState } from 'react'
import { X, CheckCircle, AlertCircle, Info, AlertTriangle } from 'lucide-react'

const icons = {
    success: CheckCircle,
    error: AlertCircle,
    info: Info,
    warning: AlertTriangle,
}

const styles = {
    success: 'bg-emerald-50 border-emerald-200 text-emerald-800',
    error: 'bg-red-50 border-red-200 text-red-800',
    info: 'bg-blue-50 border-blue-200 text-blue-800',
    warning: 'bg-amber-50 border-amber-200 text-amber-800',
}

const iconStyles = {
    success: 'text-emerald-500',
    error: 'text-red-500',
    info: 'text-blue-500',
    warning: 'text-amber-500',
}

export default function Toast({ id, message, type = 'info', duration = 5000, onClose }) {
    const [isVisible, setIsVisible] = useState(false)
    const [isLeaving, setIsLeaving] = useState(false)
    const Icon = icons[type]

    useEffect(() => {
        requestAnimationFrame(() => setIsVisible(true))
        const timer = setTimeout(() => handleClose(), duration)
        return () => clearTimeout(timer)
    }, [duration])

    const handleClose = () => {
        setIsLeaving(true)
        setTimeout(() => onClose?.(), 300)
    }

    return (
        <div
            className={`
        pointer-events-auto flex items-start gap-3 p-4 rounded-xl border shadow-lg
        ${styles[type]}
        transform transition-all duration-300 ease-out
        ${isVisible && !isLeaving ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'}
      `}
        >
            <Icon className={`w-5 h-5 mt-0.5 flex-shrink-0 ${iconStyles[type]}`} />
            <p className="text-sm font-medium flex-1 leading-relaxed">{message}</p>
            <button
                onClick={handleClose}
                className="flex-shrink-0 p-1 rounded-lg hover:bg-black/5 transition-colors"
            >
                <X className="w-4 h-4" />
            </button>
        </div>
    )
}