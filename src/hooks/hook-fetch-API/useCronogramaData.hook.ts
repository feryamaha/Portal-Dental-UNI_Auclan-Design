'use client'

import { useEffect, useState } from 'react'
import type { CronogramaData } from '@/types/shared/card-cronograma.types'

type UseCronogramaDataReturn = {
    data: CronogramaData | null
    loading: boolean
    error: string | null
}

export function useCronogramaData(): UseCronogramaDataReturn {
    const [data, setData] = useState<CronogramaData | null>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const fetchCronograma = async () => {
            try {
                setLoading(true)
                setError(null)

                const response = await fetch('/api/cronograma')

                if (!response.ok) {
                    throw new Error(`Failed to fetch cronograma: ${response.statusText}`)
                }

                const result = await response.json()

                if (!result.success) {
                    throw new Error(result.error || 'Unknown error')
                }

                setData(result.data)
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Unknown error occurred')
                setData(null)
            } finally {
                setLoading(false)
            }
        }

        fetchCronograma()
    }, [])

    return { data, loading, error }
}
