import type { SubCardMeusProtocolosProps } from '@/types/ui/sub-card-meus-protocolos.types'
import type { SubCardMinhasGuiasProps } from '@/types/ui/sub-card-minhas-guias.types'

export const protocolosMock: SubCardMeusProtocolosProps[] = [
    {
        statusLabel: 'Cancelado',
        statusVariant: 'danger',
        status: 'Retorno atendimento chat',
        subject: 'Atendimento ao beneficiário',
        title: 'Solicitação de materiais clínicos',
        protocolNumber: '12345678901234567890',
        priorityType: 'obrigatorio',
        receivedAt: '2025-07-08T10:30:00-03:00',
        events: [
            { label: 'Data:', value: '03/07/2025' },
            { label: 'Prazo:', value: '12/07/2025' },
        ],
    },
    {
        statusLabel: 'Pendente',
        statusVariant: 'warning',
        status: 'Retorno atendimento chat',
        subject: 'Atendimento ao beneficiário',
        title: 'Atualização cadastral CRO',
        protocolNumber: '23456789012345678901',
        priorityType: '',
        receivedAt: '2025-07-07T15:45:00-03:00',
        events: [
            { label: 'Data:', value: '23/06/2025' },
            { label: 'Prazo:', value: '01/07/2025' },
        ],
    },
    {
        statusLabel: 'Pendente',
        statusVariant: 'info',
        status: 'Retorno atendimento chat',
        subject: 'Atendimento ao beneficiário',
        title: 'Solicitação de agenda extra',
        protocolNumber: '34567890123456789012',
        priorityType: 'nao-lido',
        receivedAt: '2025-07-06T09:20:00-03:00',
        events: [
            { label: 'Data:', value: '08/07/2025' },
            { label: 'Prazo:', value: '18/07/2025' },
        ],
    },
    {
        statusLabel: 'Em análise',
        statusVariant: 'warning',
        status: 'Retorno atendimento chat',
        subject: 'Atendimento ao beneficiário',
        title: 'Recurso de glosa GTO',
        protocolNumber: '45678901234567890123',
        priorityType: '',
        receivedAt: '2025-07-05T13:00:00-03:00',
        events: [
            { label: 'Data:', value: '05/07/2025' },
            { label: 'Prazo:', value: '20/07/2025' },
        ],
    },
    {
        statusLabel: 'Concluído',
        statusVariant: 'success',
        status: 'Retorno atendimento chat',
        subject: 'Atendimento ao beneficiário',
        title: 'Atualização de dados bancários',
        protocolNumber: '56789012345678901234',
        priorityType: 'nao-lido',
        receivedAt: '2025-07-04T11:10:00-03:00',
        events: [
            { label: 'Data:', value: '30/06/2025' },
            { label: 'Prazo:', value: '04/07/2025' },
        ],
    },
]

export const guiasMock: SubCardMinhasGuiasProps[] = [
    {
        statusLabel: 'Autorizada',
        statusVariant: 'success',
        title: 'Paciente: Lucas Andrade',
        protocolNumber: '67890123456789012345',
        description: 'Procedimentos aprovados: 2/2',
        events: [
            { label: 'Data:', value: '05/07/2025' },
            { label: 'Validade:', value: '05/01/2026' },
        ],
    },
    {
        statusLabel: 'Pendente',
        statusVariant: 'warning',
        title: 'Paciente: Camila Monteiro',
        protocolNumber: '78901234567890123456',
        description: 'Procedimentos aprovados: 1/3',
        events: [
            { label: 'Data:', value: '07/07/2025' },
            { label: 'Validade:', value: '07/02/2026' },
        ],
    },
    {
        statusLabel: 'Autorizada',
        statusVariant: 'success',
        title: 'Paciente: Bianca Ferreira',
        protocolNumber: '89012345678901234567',
        description: 'Procedimentos aprovados: 1/1',
        events: [
            { label: 'Data:', value: '02/07/2025' },
            { label: 'Validade:', value: '02/01/2026' },
        ],
    },
    {
        statusLabel: 'Pendente',
        statusVariant: 'info',
        title: 'Paciente: Renan Duarte',
        protocolNumber: '90123456789012345678',
        description: 'Procedimentos aprovados: 0/2',
        events: [
            { label: 'Data:', value: '09/07/2025' },
            { label: 'Validade:', value: '09/02/2026' },
        ],
    },
    {
        statusLabel: 'Em revisão',
        statusVariant: 'warning',
        title: 'Paciente: Sofia Navarro',
        protocolNumber: '01234567890123456789',
        description: 'Procedimentos aprovados: 1/4',
        events: [
            { label: 'Data:', value: '11/07/2025' },
            { label: 'Validade:', value: '11/03/2026' },
        ],
    },
]
