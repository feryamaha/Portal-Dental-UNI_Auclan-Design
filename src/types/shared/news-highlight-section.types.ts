export type NewsHighlightSectionProps = {
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
