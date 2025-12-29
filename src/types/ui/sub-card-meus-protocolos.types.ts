type ProtocolEvent = {
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
}
