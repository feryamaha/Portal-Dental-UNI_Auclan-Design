"use client"

import { SubCardMeusProtocolos } from '@/components/ui/SubCardMeusProtocolos'
import { NewsSectionHeader } from '@/components/ui/NewsSectionHeader'
import type { CardMeusProtocolosProps } from '@/types/shared/card-meus-protocolos.types'

export function CardMeusProtocolos({ title = 'Meus protocolos', items, className = '' }: CardMeusProtocolosProps) {
    if (!items.length) return null

    return (
        <div
            className={`w-full @Desktop:max-w-[360px] h-[260px] flex-col gap-6 rounded-2xl border border-neutral-100 bg-white p-6 overflow-y-auto scrollbar-none shadow-[0_1px_2px_rgba(0,0,0,0.08)] ${className}`}
        >
            <div className="w-full flex flex-col gap-[20px] pb-[16px]">
                <div className="w-full">
                    <NewsSectionHeader title={title} ctaIconName="iconArrowRedRight" />
                </div>

                <div className="w-full flex flex-col gap-[16px]">
                    {items.map((item) => (
                        <SubCardMeusProtocolos key={item.protocolNumber} {...item} />
                    ))}
                </div>
            </div>
        </div>
    )
}
