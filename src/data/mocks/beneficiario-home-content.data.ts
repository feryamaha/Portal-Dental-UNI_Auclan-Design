import type { SubCardMeusProtocolosProps } from '@/types/ui/sub-card-meus-protocolos.types'
import type { SubCardMinhasGuiasProps } from '@/types/ui/sub-card-minhas-guias.types'

{/* DESACOPLAR A HIDRATAÇÃO DOS DADOS DESTE ARQUIVO /data/mocks/beneficiario-home-content.data.ts
para arquivos dedicados meus protocolos e  minhas guias igual o card cronograma, news e slider */}

//CRIAR NOVO ARQUIVO minhas-guias-content.data.ts
//CRIAR NOVO ARQUIVO meus-protocolos-content.data.ts

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
