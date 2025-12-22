"use client"

import { Button } from '@/components/ui/Button'
import { Icon } from '@/script/Icon'

type NewsSectionHeaderProps = {
    title: string
    ctaLabel?: string
    ctaIconName?: string
    onCtaClick?: () => void
}

export function NewsSectionHeader({ title, ctaLabel = 'Ver mais', ctaIconName = 'iconLinkCta', onCtaClick }: NewsSectionHeaderProps) {
    return (
        <div className="w-full flex items-center justify-between">
            <h2 className="font-inter text-xl font-semibold text-secondary-900">{title}</h2>
            {ctaLabel ? (
                <div className="flex items-center gap-2 text-accent-default">
                    <Button variant="tertiary" size="sm" className="p-0" onClick={onCtaClick}>
                        {ctaLabel}
                    </Button>
                    <Icon name={ctaIconName} />
                </div>
            ) : null}
        </div>
    )
}
