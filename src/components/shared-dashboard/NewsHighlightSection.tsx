"use client"

import { NewsFeatureCard } from '@/components/ui/NewsFeatureCard'
import { NewsListEntry } from '@/components/ui/NewsListEntry'
import { NewsSectionHeader } from '@/components/ui/NewsSectionHeader'
import type { NewsHighlightSectionProps } from '@/types/shared/news-highlight-section.types'

export function NewsHighlightSection({
    title = 'Notícias recentes',
    ctaLabel = 'Ver mais',
    feature,
    articles,
}: NewsHighlightSectionProps) {
    if (!feature || !articles?.length) return null

    return (
        <div className="flex flex-col gap-[16px]">
            <div className='w-[256px]'>
                <NewsSectionHeader title={title} ctaLabel={ctaLabel} />
            </div>
            <div className="flex flex-wrap gap-[24px] @Desktop:flex-nowrap">
                <NewsFeatureCard
                    imageSrc={feature.imageSrc}
                    imageAlt={feature.imageAlt}
                    title={feature.title}
                    date={feature.date}
                />
                <div className="w-max @Desktop:max-w-[352px] flex flex-col justify-between gap-[6px]">
                    <div>
                        <NewsListEntry key={articles[0]?.title} title={articles[0]?.title} date={articles[0]?.date} />
                    </div>
                    <div className="border-t border-b border-gray-200 py-[8px]">
                        <NewsListEntry key={articles[1]?.title} title={articles[1]?.title} date={articles[1]?.date} />
                    </div>
                    <div>
                        <NewsListEntry key={articles[2]?.title} title={articles[2]?.title} date={articles[2]?.date} />
                    </div>
                </div>
            </div>
        </div>
    )
}
