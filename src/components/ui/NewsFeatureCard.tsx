"use client"

import Image from 'next/image'

type NewsFeatureCardProps = {
    imageSrc: string
    imageAlt: string
    title: string
    date: string
}

export function NewsFeatureCard({ imageSrc, imageAlt, title, date }: NewsFeatureCardProps) {
    return (
        <div className="flex max-w-[357px] flex-col gap-4">
            <div className="h-[190px] w-full overflow-hidden rounded-lg">
                <Image src={imageSrc} alt={imageAlt} width={357} height={190} className="h-full w-full object-cover" />
            </div>
            <div className="font-inter text-secondary-900">
                <p className="pb-3 text-base font-medium">{title}</p>
                <p className="text-xs font-normal text-secondary-600">{date}</p>
            </div>
        </div>
    )
}
