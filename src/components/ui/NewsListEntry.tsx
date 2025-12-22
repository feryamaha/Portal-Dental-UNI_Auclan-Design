"use client"

type NewsListEntryProps = {
    title: string
    date: string
    className?: string
}

export function NewsListEntry({ title, date, className = '' }: NewsListEntryProps) {
    return (
        <div className={`font-inter border-b border-secondary-100 pb-4 ${className}`}>
            <p className="pb-3 text-base font-medium text-secondary-900">{title}</p>
            <p className="text-xs font-normal text-secondary-600">{date}</p>
        </div>
    )
}
