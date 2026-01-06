"use client"

import Image from 'next/image'
import type { NewsFeatureCardProps } from '@/types/ui/news-feature-card.types'

export function NewsFeatureCard({ imageSrc, imageAlt, title, date }: NewsFeatureCardProps) {
    return (
        <div className="w-full @Desktop:w-[357px] flex flex-col gap-4">
            <div className=" h-[190px] overflow-hidden rounded-lg">
                <Image src={imageSrc} alt={imageAlt} width={357} height={190} className="h-full w-full object-cover" />
            </div>
            <div className="font-inter text-neutral-900">
                <p className="pb-3 text-base font-medium">{title}</p>
                <p className="text-xs font-normal text-neutral-700">{date}</p>
            </div>
        </div>
    )
}
