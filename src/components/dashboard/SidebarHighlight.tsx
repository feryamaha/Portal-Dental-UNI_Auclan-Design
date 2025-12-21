"use client"

import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import type { SidebarHighlight } from '@/context/dashboard/Sidebar/sidebar'
import type { PortalSlug } from '@/context/tela-login/portalConfig'
import { Icon } from '@/script/Icon'

type SidebarHighlightProps = {
    portal: PortalSlug
    highlight?: SidebarHighlight | null
}

export default function SidebarHighlight({ highlight }: SidebarHighlightProps) {
    if (!highlight) return null

    const { title, pillLabel, subtitle, helperText, ctaHref, ctaLabel } = highlight
    if (!ctaHref || !ctaLabel) return null

    return (
        <div className="flex flex-col gap-4 rounded-lg border border-secondary-100 p-[12px_16px] shadow-[0_1px_2px_rgba(0,0,0,0.06)] my-[20px]">
            <div className="flex items-start justify-between gap-2">
                <div className='w-full flex items-start justify-between'>
                    <div className='flex flex-col gap-1'>
                        <div className='h-[22px] flex items-center gap-2'>
                            {title && <p className="text-sm font-medium text-secondary-900">{title}</p>}
                            {pillLabel && (
                                <Badge variant="danger">
                                    {pillLabel}
                                </Badge>
                            )}
                        </div>
                        {subtitle && <p className="text-xs text-secondary-500">{subtitle}</p>}
                    </div>
                    <div>
                        <Button variant='tertiary' size='sm' className='p-0'>
                            <Icon name="iconArrowRedRight" className='text-secondary-900' />
                        </Button>
                    </div>
                </div>
            </div>
            {helperText && <p className="mt-2 text-xs text-secondary-500">{helperText}</p>}
            <div className="w-max">
                <Button href={ctaHref} variant="primary" size="sm" className='text-sm' >
                    <Icon name="iconPlusCta" />
                    <span>{ctaLabel}</span>
                </Button>
            </div>

        </div>
    )
}
