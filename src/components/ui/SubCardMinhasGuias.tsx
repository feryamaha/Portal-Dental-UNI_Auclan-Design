"use client"

import { Fragment } from 'react'

import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { Icon } from '@/script/Icon'

type GuiaEvent = {
    label: string
    value: string
}

export type SubCardMinhasGuiasProps = {
    statusLabel: string
    statusVariant?: 'danger' | 'success' | 'warning' | 'info'
    title: string
    protocolNumber: string
    description?: string
    events: GuiaEvent[]
}

export function SubCardMinhasGuias({
    statusLabel,
    statusVariant = 'info',
    title,
    protocolNumber,
    description,
    events,
}: SubCardMinhasGuiasProps) {
    return (
        <div className="w-full flex flex-col gap-[8px] border-b border-secondary-100 pb-[16px]">
            <div className="flex w-full items-center justify-between">
                <Badge variant={statusVariant}>{statusLabel}</Badge>
                <div>
                    <Button variant="tertiary" size="sm" className="p-0">
                        <Icon name="iconButtonMais" />
                    </Button>
                </div>
            </div>

            <div className="font-inter">
                <p className="text-sm font-medium text-secondary-900 pb-[4px]">{title}</p>
                <p className="text-xs font-normal text-secondary-600 pb-[12px]">{protocolNumber}</p>
                {description ? <p className="text-xs font-normal text-secondary-600">{description}</p> : null}
            </div>

            <div className="flex items-center gap-[8px]">
                {events.map((event, index) => (
                    <Fragment key={`${event.label}-${index}`}>
                        <div className="flex items-center gap-[6px]">
                            <Icon name="iconDataCheck" />
                            <p className="text-xs font-medium text-secondary-900">
                                <span className="pr-[3px] font-normal text-secondary-600">{event.label}</span>
                                {event.value}
                            </p>
                        </div>
                        {index < events.length - 1 && <Icon name="iconPointText" className="text-secondary-500" />}
                    </Fragment>
                ))}
            </div>
        </div>
    )
}
