"use client"

import { Fragment } from 'react'

import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { Icon } from '@/script/Icon'
import type { SubCardMeusProtocolosProps } from '@/types/ui/sub-card-meus-protocolos.types'

export type { SubCardMeusProtocolosProps } from '@/types/ui/sub-card-meus-protocolos.types'

export function SubCardMeusProtocolos({
    statusLabel,
    statusVariant = 'danger',
    title,
    protocolNumber,
    description,
    events,
}: SubCardMeusProtocolosProps) {
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
                <p className="text-sm font-medium text-secondary-900">{title}</p>
                <p className="text-xs font-normal text-secondary-600">{protocolNumber}</p>
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
