"use client"

import { SliderBanner } from '@/components/shared-dashboard/SliderBanner'
import { ShortcutsSection } from '@/components/shared-dashboard/ShortcutsSection'
import { NewsHighlightSection } from '@/components/shared-dashboard/NewsHighlightSection'
import { CardMeusProtocolos } from '@/components/shared-dashboard/CardMeusProtocolos'
import { CardMinhasGuias } from '@/components/shared-dashboard/CardMinhasGuias'
import { useSliderBannerData, useNewsHighlightData } from '@/hooks/hook-fetch-API'
import {
    guiasMock,
    protocolosMock,
} from '@/data/mocks/beneficiario-home-content.data'

export function HomeBeneficiario() {
    const { data: sliderItems } = useSliderBannerData('beneficiario')
    const { data: newsHighlight } = useNewsHighlightData()

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
                </div>

                <div className='flex flex-col gap-8'>
                    <CardMeusProtocolos items={protocolosMock} />
                    <CardMinhasGuias items={guiasMock} />
                </div>
            </div>
        </section>
    )
}
