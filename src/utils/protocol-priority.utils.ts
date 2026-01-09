import type { SubCardMeusProtocolosProps } from '@/types/ui/sub-card-meus-protocolos.types'

export function sortProtocolsByPriority(items: SubCardMeusProtocolosProps[]): SubCardMeusProtocolosProps[] {
    const obrigatorios = items.filter((item) => item.priorityType === 'obrigatorio')
    const naoLidos = items.filter((item) => item.priorityType === 'nao-lido')
    const restantes = items
        .filter((item) => !item.priorityType)
        .sort((a, b) => new Date(b.receivedAt).getTime() - new Date(a.receivedAt).getTime())

    return [...obrigatorios, ...naoLidos, ...restantes]
}
