"use client"

import MainContentShell from '@/components/main-content/MainContentShell'
import { SliderBanner } from '@/components/shared/SliderBanner'
import { ShortcutsSection } from '@/components/shared/ShortcutsSection'
import { NewsHighlightSection } from '@/components/shared/NewsHighlightSection'
import { CardMeusProtocolos } from '@/components/shared/CardMeusProtocolos'
import { CardMinhasGuias } from '@/components/shared/CardMinhasGuias'
import {
    guiasMock,
    newsArticles,
    newsFeature,
    protocolosMock,
    sliderItems,
    SLIDER_DURATION,
} from '@/data/mocks/beneficiario-home-content.data'

export function BeneficiarioHomeContent() {
    return (
        <MainContentShell title="Home">

            <div className="flex flex-col @Desktop:flex-row gap-6">
                <div className="w-full flex flex-col gap-6">
                    <div className='w-full'>
                        <SliderBanner items={sliderItems} duration={SLIDER_DURATION} />
                    </div>


                    <div className="flex flex-col gap-6">
                        <ShortcutsSection
                            portal="beneficiario"
                            shortcutIds={['invoices', 'protocols', 'guides', 'ir', 'payment']}
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


        </MainContentShell>
    )
}
