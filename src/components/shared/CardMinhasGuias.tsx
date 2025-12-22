"use client"

import { SubCardMinhasGuias, type SubCardMinhasGuiasProps } from '@/components/ui/SubCardMinhasGuias'
import { NewsSectionHeader } from '@/components/ui/NewsSectionHeader'

type CardMinhasGuiasProps = {
    title?: string
    items: SubCardMinhasGuiasProps[]
    className?: string
}

export function CardMinhasGuias({ title = 'Minhas guias', items, className = '' }: CardMinhasGuiasProps) {
    if (!items.length) return null

    return (
        <div
            className={`max-w-[360px] h-[260px] flex-col gap-6 rounded-2xl border border-secondary-100 bg-white p-6 overflow-y-auto scrollbar-none shadow-[0_1px_2px_rgba(0,0,0,0.08)] ${className}`}
        >
            <div className="w-full flex flex-col gap-[20px] pb-[16px]">
                <div className="w-full">
                    <NewsSectionHeader title={title} ctaIconName="iconArrowRedRight" />
                </div>

                <div className="w-full flex flex-col gap-[16px]">
                    {items.map((item) => (
                        <SubCardMinhasGuias key={item.protocolNumber} {...item} />
                    ))}
                </div>
            </div>
        </div>
    )
}
