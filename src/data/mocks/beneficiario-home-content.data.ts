import type { SliderBannerItem } from '@/types/shared/slider-banner.types'
import type { NewsHighlightSectionProps } from '@/types/shared/news-highlight-section.types'
import type { SubCardMeusProtocolosProps } from '@/types/ui/sub-card-meus-protocolos.types'
import type { SubCardMinhasGuiasProps } from '@/types/ui/sub-card-minhas-guias.types'

export const SLIDER_DURATION = 6000

export const sliderItems: SliderBannerItem[] = [
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

export const newsFeature: NewsHighlightSectionProps['feature'] = {
    imageSrc: '/assets/images/img-noticias-recentes-1.webp',
    imageAlt: 'Jantar dos cooperados aniversariantes do 3º Trimestre de 2025',
    title: 'Jantar dos cooperados aniversariantes do 3º Trimestre de 2025',
    date: '9 de jul, 2025',
}

export const newsArticles: NewsHighlightSectionProps['articles'] = [
    { title: 'Confira como foi o nosso workshop Dental Uni 2023', date: '4 de jul, 2025' },
    { title: 'Nesse sábado dia 9, a Dental Uni participa do XV CIOPAR 2023', date: '4 de jul, 2025' },
    { title: 'Palestra especial em Projeto Cultivar - Cocamar em parceria com a APAE', date: '1 de jul, 2025' },
]

export const protocolosMock: SubCardMeusProtocolosProps[] = [
    {
        statusLabel: 'Cancelado',
        statusVariant: 'danger' as const,
        title: 'Atualização de telefone',
        protocolNumber: '30448420230808004679',
        priorityType: 'obrigatorio',
        receivedAt: '2025-07-08T09:00:00-03:00',
        events: [
            { label: 'Data:', value: '01/05/2023' },
            { label: 'Prazo:', value: '01/05/2023' },
        ],
    },
    {
        statusLabel: 'Cancelado',
        statusVariant: 'danger' as const,
        title: 'Atualização de telefone',
        protocolNumber: '30448420230808004680',
        priorityType: 'nao-lido',
        receivedAt: '2025-07-07T14:30:00-03:00',
        events: [
            { label: 'Data:', value: '01/05/2023' },
            { label: 'Prazo:', value: '01/05/2023' },
        ],
    },
    {
        statusLabel: 'Cancelado',
        statusVariant: 'danger' as const,
        title: 'Atualização de telefone',
        protocolNumber: '30448420230808004681',
        receivedAt: '2025-07-06T11:15:00-03:00',
        events: [
            { label: 'Data:', value: '01/05/2023' },
            { label: 'Prazo:', value: '01/05/2023' },
        ],
    },
    {
        statusLabel: 'Cancelado',
        statusVariant: 'danger' as const,
        title: 'Atualização de telefone',
        protocolNumber: '30448420230808004682',
        receivedAt: '2025-07-05T10:00:00-03:00',
        events: [
            { label: 'Data:', value: '01/05/2023' },
            { label: 'Prazo:', value: '01/05/2023' },
        ],
    },
    {
        statusLabel: 'Cancelado',
        statusVariant: 'danger' as const,
        title: 'Atualização de telefone',
        protocolNumber: '30448420230808004683',
        receivedAt: '2025-07-04T08:45:00-03:00',
        events: [
            { label: 'Data:', value: '01/05/2023' },
            { label: 'Prazo:', value: '01/05/2023' },
        ],
    },
]

export const guiasMock: SubCardMinhasGuiasProps[] = [
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
