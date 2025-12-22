"use client"

import MainContentShell from '@/components/main-content/MainContentShell'
import { SliderBanner } from '@/components/shared/SliderBanner'
import { ShortcutsSection } from '@/components/shared/ShortcutsSection'
import { NewsHighlightSection } from '@/components/shared/NewsHighlightSection'
import { CardMeusProtocolos } from '@/components/shared/CardMeusProtocolos'
import { CardMinhasGuias } from '@/components/shared/CardMinhasGuias'
import { Container } from '@/components/ui/Container'

const SLIDER_DURATION = 6000

const sliderItems = [
    {
        id: 'banner-beneficiario-01',
        category: 'Informativo',
        imageSrc: '/assets/images/img-slider-home-bneficiario.webp',
    },
    {
        id: 'banner-beneficiario-02',
        category: 'Novidades',
        imageSrc: '/assets/images/img-slider-home-bneficiario.webp',
    },
    {
        id: 'banner-beneficiario-03',
        category: 'Social',
        imageSrc: '/assets/images/img-slider-home-bneficiario.webp',
    },
    {
        id: 'banner-beneficiario-04',
        category: 'Para você',
        imageSrc: '/assets/images/img-slider-home-bneficiario.webp',
    },
]

const newsFeature = {
    imageSrc: '/assets/images/img-noticias-recentes-1.webp',
    imageAlt: 'Jantar dos cooperados aniversariantes do 3º Trimestre de 2025',
    title: 'Jantar dos cooperados aniversariantes do 3º Trimestre de 2025',
    date: '9 de jul, 2025',
}

const newsArticles = [
    { title: 'Confira como foi o nosso workshop Dental Uni 2023', date: '4 de jul, 2025' },
    { title: 'Nesse sábado dia 9, a Dental Uni participa do XV CIOPAR 2023', date: '4 de jul, 2025' },
    { title: 'Palestra especial em Projeto Cultivar - Cocamar em parceria com a APAE', date: '1 de jul, 2025' },
]

const protocolosMock = [
    {
        statusLabel: 'Cancelado',
        statusVariant: 'danger' as const,
        title: 'Atualização de telefone',
        protocolNumber: '30448420230808004679',
        events: [
            { label: 'Data:', value: '01/05/2023' },
            { label: 'Data:', value: '01/05/2023' },
        ],
    },
    {
        statusLabel: 'Cancelado',
        statusVariant: 'danger' as const,
        title: 'Atualização de telefone',
        protocolNumber: '30448420230808004680',
        events: [
            { label: 'Data:', value: '01/05/2023' },
            { label: 'Data:', value: '01/05/2023' },
        ],
    },
    {
        statusLabel: 'Cancelado',
        statusVariant: 'danger' as const,
        title: 'Atualização de telefone',
        protocolNumber: '30448420230808004681',
        events: [
            { label: 'Data:', value: '01/05/2023' },
            { label: 'Data:', value: '01/05/2023' },
        ],
    },
    {
        statusLabel: 'Cancelado',
        statusVariant: 'danger' as const,
        title: 'Atualização de telefone',
        protocolNumber: '30448420230808004682',
        events: [
            { label: 'Data:', value: '01/05/2023' },
            { label: 'Data:', value: '01/05/2023' },
        ],
    },
    {
        statusLabel: 'Cancelado',
        statusVariant: 'danger' as const,
        title: 'Atualização de telefone',
        protocolNumber: '30448420230808004683',
        events: [
            { label: 'Data:', value: '01/05/2023' },
            { label: 'Data:', value: '01/05/2023' },
        ],
    },
]

const guiasMock = [
    {
        statusLabel: 'Status',
        statusVariant: 'info' as const,
        title: 'Maria Conselho Conceição',
        protocolNumber: 'CRO: 12013365',
        description: 'Atos autorizados: 1/2',
        events: [
            { label: 'Data:', value: '01/05/2023' },
            { label: 'Validade:', value: '01/05/2024' },
        ],
    },
    {
        statusLabel: 'Status',
        statusVariant: 'info' as const,
        title: 'João Pedro Andrade',
        protocolNumber: 'CRO: 10988231',
        description: 'Atos autorizados: 0/3',
        events: [
            { label: 'Data:', value: '02/05/2023' },
            { label: 'Validade:', value: '02/06/2024' },
        ],
    },
    {
        statusLabel: 'Status',
        statusVariant: 'info' as const,
        title: 'Ana Luiza Vicenzi',
        protocolNumber: 'CRO: 11445690',
        description: 'Atos autorizados: 2/2',
        events: [
            { label: 'Data:', value: '03/05/2023' },
            { label: 'Validade:', value: '03/05/2024' },
        ],
    },
]

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
