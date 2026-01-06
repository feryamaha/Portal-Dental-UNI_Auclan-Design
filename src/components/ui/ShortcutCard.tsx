"use client"
import Link from 'next/link'
import { Icon } from '@/script/Icon'
import type { ShortcutCardProps } from '@/types/ui/shortcut-card.types'

export function ShortcutCard({ icon, label, href }: ShortcutCardProps) {
    return (
        <Link
            href={href}
            className="group flex h-[132px] w-[132px] flex-col justify-between rounded-lg border border-neutral-100 bg-white p-4 text-left shadow-[0_1px_4px_rgba(0,0,0,0.08),0_1px_2px_rgba(25,25,25,0.08)]"
            aria-label={`Acessar ${label}`}
        >
            <div className="flex h-8 w-8 items-center justify-center rounded-md bg-neutral-50 text-neutral-900">
                <Icon name={icon} />
            </div>
            <p className="font-inter text-sm font-medium text-neutral-900">{label}</p>
        </Link>
    )
}
