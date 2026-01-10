export interface NotificacaoItem {
    lida: any
    id: string
    icon: string
    titulo: string
    descricao: string
    data: string
    link?: string
    portal: string
}

export interface NotificacoesPorMes {
    mes: string
    ano: number
    notificacoes: NotificacaoItem[]
}

export interface SubCardNotificacoesProps {
    id: string
    icon: string
    titulo: string
    descricao: string
    data: string
    link?: string
    showDividerBelow?: boolean
}

export interface HeaderNotificacoesProps {
    onClose: () => void
}

export interface ModalNotificacoesProps {
    portal: string
    onClose: () => void
}

export interface UseNotificacoesDataReturn {
    data: NotificacoesPorMes[]
    loading: boolean
    error: string | null
    unreadCount: number
    markAsRead: (notificacaoId: string) => void
}

export interface NotificacoesApiResponse {
    success: boolean
    data: NotificacoesPorMes[]
    timestamp: string
    metadata?: {
        total?: number
        portal?: string
    }
}
