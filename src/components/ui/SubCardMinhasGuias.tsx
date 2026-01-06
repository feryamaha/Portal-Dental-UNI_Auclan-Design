"use client"

import { Fragment } from 'react'

import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { Icon } from '@/script/Icon'
import type { SubCardMinhasGuiasProps } from '@/types/ui/sub-card-minhas-guias.types'

export type { SubCardMinhasGuiasProps } from '@/types/ui/sub-card-minhas-guias.types'

export function SubCardMinhasGuias({
    statusLabel,
    statusVariant = 'info',
    title,
    protocolNumber,
    description,
    events,
}: SubCardMinhasGuiasProps) {
    return (
        <div className="w-full flex flex-col gap-[8px] border-b border-neutral-100 pb-[16px]">
            <div className="flex w-full items-center justify-between">
                <Badge variant={statusVariant}>{statusLabel}</Badge>
                <div>
                    <Button variant="tertiary" size="sm" className="p-0">
                        <Icon name="iconButtonMais" />
                    </Button>
                </div>
            </div>

            <div className="font-inter">
                <p className="text-sm font-medium text-neutral-900 pb-[4px]">{title}</p>
                <p className="text-xs font-normal text-neutral-600 pb-[12px]">{protocolNumber}</p>
                {description ? <p className="text-xs font-normal text-neutral-600">{description}</p> : null}
            </div>

            <div className="flex items-center gap-[8px]">
                {events.map((event, index) => (
                    <Fragment key={`${event.label}-${index}`}>
                        <div className="flex items-center gap-[6px]">
                            <Icon name="iconDataCheck" className="text-neutral-600" />
                            <p className="text-xs font-medium text-neutral-900">
                                <span className="pr-[3px] font-normal text-neutral-600">{event.label}</span>
                                {event.value}
                            </p>
                        </div>
                        {index < events.length - 1 && <Icon name="iconPointText" className="text-neutral-200" />}
                    </Fragment>
                ))}
            </div>
        </div>
    )
}
