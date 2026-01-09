"use client"

import { SliderBanner } from '@/components/shared-dashboard/SliderBanner'
import { ShortcutsSection } from '@/components/shared-dashboard/ShortcutsSection'
import { NewsHighlightSection } from '@/components/shared-dashboard/NewsHighlightSection'
import { CardMeusProtocolos } from '@/components/shared-dashboard/CardMeusProtocolos'
import { CardCronograma } from '@/components/shared-dashboard/CardCronograma'
import { useSliderBannerData, useNewsHighlightData, useCronogramaData } from '@/hooks/hook-fetch-API'
import {
    protocolosMock,
} from '@/data/mocks/dentista-home-content.data'

export function HomeDentista() {
    const { data: sliderItems } = useSliderBannerData('dentista')
    const { data: newsHighlight } = useNewsHighlightData()
    const { data: cronogramaData } = useCronogramaData()

    return (
        <section className="w-full mx-auto p-[24px_32px_0px_32px]">
            <div className="w-full flex flex-col @Desktop:flex-row justify-between">
                <div className="w-full flex flex-col gap-6">
                    <div className='w-max'>
                        <SliderBanner items={sliderItems} />
                    </div>
                    <div className="flex flex-col gap-[32px]">
                        <div className='w-max'>
                            <ShortcutsSection
                                portal="dentista"
                                shortcutIds={['protocols', 'files', 'calendar', 'invoices', 'classifieds']}
                            />
                        </div>
                        <div className='w-max'>
                            {newsHighlight && (
                                <NewsHighlightSection feature={newsHighlight.feature} articles={newsHighlight.articles} />
                            )}
                        </div>
                    </div>
                    <div className='w-max'>
                        <SliderBanner items={sliderItems} />
                    </div>
                </div>

                <div className='flex flex-col gap-8'>
                    <CardMeusProtocolos items={protocolosMock} />
                    <CardCronograma data={cronogramaData} />
                </div>
            </div>
        </section>
    )
}
