'use client'

import { useEffect, useState } from 'react'
import type { SubCardMeusProtocolosProps } from '@/types/ui/sub-card-meus-protocolos.types'
import { sortProtocolsByPriority } from '@/utils/protocol-priority.utils'

type UseProtocolsDataReturn = {
    data: SubCardMeusProtocolosProps[]
    loading: boolean
    error: string | null
}

export function useProtocolsData(portal: string): UseProtocolsDataReturn {
    const [data, setData] = useState<SubCardMeusProtocolosProps[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const fetchProtocols = async () => {
            try {
                setLoading(true)
                setError(null)

                const response = await fetch(`/api/protocolos?portal=${portal}`)

                if (!response.ok) {
                    throw new Error(`Failed to fetch protocols: ${response.statusText}`)
                }

                const result = await response.json()

                if (!result.success) {
                    throw new Error(result.error || 'Unknown error')
                }

                const sortedData = sortProtocolsByPriority(result.data)
                setData(sortedData)
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Unknown error occurred')
                setData([])
            } finally {
                setLoading(false)
            }
        }

        fetchProtocols()
    }, [portal])

    return { data, loading, error }
}
