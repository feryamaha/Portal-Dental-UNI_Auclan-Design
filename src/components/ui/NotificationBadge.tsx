import type { ReactNode } from 'react'

interface NotificationBadgeProps {
    children: ReactNode
}

export function NotificationBadge({ children }: NotificationBadgeProps) {
    return (
        <span className="flex h-[22px] w-[22px] justify-center items-center rounded-full bg-primary-500 text-[9px] font-semibold text-white border-[2px] border-primary-50">
            {children}
        </span>
    )
}
