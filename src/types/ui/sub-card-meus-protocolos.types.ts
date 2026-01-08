export type ProtocolPriorityType = 'obrigatorio' | 'nao-lido' | null | undefined

export type ProtocolEvent = {
    label: string
    value: string
}

export type SubCardMeusProtocolosProps = {
    statusLabel: string
    statusVariant?: 'danger' | 'success' | 'warning' | 'info'
    title: string
    protocolNumber: string
    description?: string
    events: ProtocolEvent[]
    priorityType?: ProtocolPriorityType
    receivedAt: string
}
