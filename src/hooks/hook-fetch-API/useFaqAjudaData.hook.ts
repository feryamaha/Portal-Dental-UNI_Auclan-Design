'use client'

import { useState, useEffect } from 'react'
import type { FaqAjudaContent, UseFaqAjudaDataReturn } from '@/types/shared/faq-ajuda.types'

export function useFaqAjudaData(portal: string): UseFaqAjudaDataReturn {
    const [data, setData] = useState<FaqAjudaContent | null>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const fetchFaqAjuda = async () => {
            try {
                setLoading(true)
                setError(null)

                const response = await fetch(`/api/faq-ajuda?portal=${portal}`)

                if (!response.ok) {
                    throw new Error(`Failed to fetch FAQ: ${response.statusText}`)
                }

                const result = await response.json()

                if (!result.success) {
                    throw new Error(result.error?.message || 'Unknown error')
                }

                setData(result.data)
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Unknown error occurred')
                setData(null)
            } finally {
                setLoading(false)
            }
        }

        fetchFaqAjuda()
    }, [portal])

    return { data, loading, error }
}
