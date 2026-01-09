"use client"

import { useState } from 'react'
import { SegmentedControl } from '@/components/ui/SegmentdControl'
import { Widgets } from '@/components/ui/Widgets'
import { NewsSectionHeader } from '@/components/ui/NewsSectionHeader'
import type { CardCronogramaProps } from '@/types/shared/card-cronograma.types'

export function CardCronograma({ data }: CardCronogramaProps) {
    const [selectedTab, setSelectedTab] = useState('Ctrl-1')

    if (!data) return null

    const isProducao = selectedTab === 'Ctrl-1'

    const cronogramaData = isProducao
        ? data.calendario.map(month => ({
            ...month,
            events: month.events.filter(event => event.type === 'PROD')
        }))
        : data.calendario

    return (

        <>
            <div className='w-full @Desktop:max-w-[360px] h-[260px] rounded-2xl border border-neutral-100 overflow-hidden relative'>
                <div className="absolute w-[5px] h-full right-0 top-0 translate-y-0 bg-neutral-200"></div>
                <div className="w-full h-full flex flex-col gap-[16px] bg-white p-[16px] overflow-y-auto scrollbar-none shadow-[0_1px_2px_rgba(0,0,0,0.08)]">

                    <div className="w-full">
                        <SegmentedControl
                            items={[
                                { value: 'Ctrl-1', label: 'Cronograma produção' },
                                { value: 'Ctrl-2', label: 'Calendário geral' },
                            ]}
                            value={selectedTab}
                            onChange={setSelectedTab}
                            size="lg"
                        />
                    </div>

                    <div className="w-full flex flex-col gap-[22px]">
                        <NewsSectionHeader
                            title="Cronograma"
                            ctaLabel="Ver mais"
                            ctaIconName="iconArrowRedRight"
                        />

                        <div className="w-full flex flex-col gap-[24px]">
                            {cronogramaData.map((monthData) => (
                                <div key={monthData.month} className="flex flex-col gap-[8px]">
                                    <h3 className="text-lg font-semibold text-neutral-900">{monthData.month}</h3>
                                    <div className="flex flex-col gap-[8px] ">
                                        {monthData.events.map((event) => (
                                            <Widgets
                                                key={event.id}
                                                title={event.title}
                                                date={event.date}
                                                dayOfWeek={event.dayOfWeek}
                                                day={event.day}
                                                month={event.month}
                                                className="border-b border-neutral-100 pb-[8px]"
                                            />
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                </div>
            </div>

        </>
    )
}
