"use client"

import type { NewsListEntryProps } from '@/types/ui/news-list-entry.types'

export function NewsListEntry({ title, date, className = '' }: NewsListEntryProps) {
    return (
        <div className={`h-full flex flex-col justify-between font-inter${className}`}>
            <p className="text-base font-medium text-secondary-900 pb-[12px]">{title}</p>
            <p className="text-xs font-normal text-secondary-600">{date}</p>
        </div>
    )
}
