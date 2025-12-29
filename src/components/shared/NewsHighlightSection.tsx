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
        <div className="">
            <div className='w-[254px]'>
                <NewsSectionHeader title={title} ctaLabel={ctaLabel} />
            </div>
            <div className="flex flex-wrap gap-6 @Desktop:flex-nowrap">
                <NewsFeatureCard
                    imageSrc={feature.imageSrc}
                    imageAlt={feature.imageAlt}
                    title={feature.title}
                    date={feature.date}
                />
                <div className="w-full @Desktop:max-w-[352px] flex flex-col gap-2">
                    {articles.map((article) => (
                        <NewsListEntry key={article.title} title={article.title} date={article.date} />
                    ))}
                </div>
            </div>
        </div>
    )
}
