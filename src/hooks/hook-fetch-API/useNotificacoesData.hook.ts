import { useState, useEffect, useCallback, useMemo } from 'react'
import type { NotificacoesPorMes, UseNotificacoesDataReturn } from '@/types/shared/notificacoes.types'

export function useNotificacoesData(portal: string): UseNotificacoesDataReturn {
    const [data, setData] = useState<NotificacoesPorMes[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const fetchNotificacoes = async () => {
            try {
                setLoading(true)
                setError(null)

                const response = await fetch(`/api/notificacoes?portal=${portal}`)

                if (!response.ok) {
                    throw new Error(`Failed to fetch notificações: ${response.statusText}`)
                }

                const result = await response.json()

                if (!result.success) {
                    throw new Error(result.error || 'Unknown error')
                }

                setData(result.data)
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Unknown error occurred')
                setData([])
            } finally {
                setLoading(false)
            }
        }

        fetchNotificacoes()
    }, [portal])

    const unreadCount = useMemo(() => {
        return data.reduce((total, mes) => {
            return total + mes.notificacoes.filter(notif => !notif.lida).length
        }, 0)
    }, [data])

    const markAsRead = useCallback((notificacaoId: string) => {
        setData(prevData =>
            prevData.map(mes => ({
                ...mes,
                notificacoes: mes.notificacoes.map(notif =>
                    notif.id === notificacaoId ? { ...notif, lida: true } : notif
                )
            }))
        )
    }, [])

    return { data, loading, error, unreadCount, markAsRead }
}
