type GuiaEvent = {
    label: string
    value: string
}

export type SubCardMinhasGuiasProps = {
    statusLabel: string
    statusVariant?: 'danger' | 'success' | 'warning' | 'info'
    title: string
    protocolNumber: string
    description?: string
    events: GuiaEvent[]
}
