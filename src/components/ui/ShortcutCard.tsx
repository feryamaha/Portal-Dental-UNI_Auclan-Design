"use client"
import Link from 'next/link'
import { Icon } from '@/script/Icon'

type ShortcutCardProps = {
    icon: string
    label: string
    href: string
}

export function ShortcutCard({ icon, label, href }: ShortcutCardProps) {
    return (
        <Link
            href={href}
            className="group flex h-[132px] w-[132px] flex-col justify-between rounded-lg border border-secondary-100 bg-white p-4 text-left shadow-[0_1px_4px_rgba(0,0,0,0.08),0_1px_2px_rgba(25,25,25,0.08)] transition-all duration-200 hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2"
            aria-label={label}
        >
            <div className="flex h-8 w-8 items-center justify-center rounded-md bg-secondary-50 text-secondary-900">
                <Icon name={icon} />
            </div>
            <p className="font-inter text-sm font-medium text-secondary-900">{label}</p>
        </Link>
    )
}
