"use client"

import { SliderBanner } from '@/components/shared-dashboard/SliderBanner'
import { ShortcutsSection } from '@/components/shared-dashboard/ShortcutsSection'
import { NewsHighlightSection } from '@/components/shared-dashboard/NewsHighlightSection'
import { CardMeusProtocolos } from '@/components/shared-dashboard/CardMeusProtocolos'
import { CardMinhasGuias } from '@/components/shared-dashboard/CardMinhasGuias'
import {
    sliderItems,
    newsArticles,
    newsFeature,
    protocolosMock,
    guiasMock,
    SLIDER_DURATION,
} from '@/data/mocks/dentista-home-content.data'

export function HomeDentista() {
    return (
        <section className="w-full mx-auto p-[24px_32px_0px_32px]">
            <div className="flex flex-col @Desktop:flex-row gap-6">
                <div className="w-full flex flex-col gap-6">
                    <div className='w-full'>
                        <SliderBanner items={sliderItems} duration={SLIDER_DURATION} />
                    </div>

                    <div className="flex flex-col gap-6">
                        <ShortcutsSection
                            portal="dentista"
                            shortcutIds={['protocols', 'files', 'calendar', 'invoices', 'classifieds']}
                        />
                        <div>
                            <NewsHighlightSection feature={newsFeature} articles={newsArticles} />
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
