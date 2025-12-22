"use client"

import { NewsFeatureCard } from '@/components/ui/NewsFeatureCard'
import { NewsListEntry } from '@/components/ui/NewsListEntry'
import { NewsSectionHeader } from '@/components/ui/NewsSectionHeader'

type NewsHighlightSectionProps = {
    title?: string
    ctaLabel?: string
    feature: {
        imageSrc: string
        imageAlt: string
        title: string
        date: string
    }
    articles: {
        title: string
        date: string
    }[]
}

export function NewsHighlightSection({
    title = 'Notícias recentes',
    ctaLabel = 'Ver mais',
    feature,
    articles,
}: NewsHighlightSectionProps) {
    if (!feature || !articles?.length) return null

    return (
        <section className="w-full">
            <div className='w-[254px]'>
                <NewsSectionHeader title={title} ctaLabel={ctaLabel} />
            </div>
            <div className="w-max flex gap-6 ">
                <NewsFeatureCard
                    imageSrc={feature.imageSrc}
                    imageAlt={feature.imageAlt}
                    title={feature.title}
                    date={feature.date}
                />
                <div className="flex max-w-[352px] flex-col gap-2">
                    {articles.map((article) => (
                        <NewsListEntry key={article.title} title={article.title} date={article.date} />
                    ))}
                </div>
            </div>
        </section>
    )
}
