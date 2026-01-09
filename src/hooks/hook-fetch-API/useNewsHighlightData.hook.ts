'use client'

import { useEffect, useState } from 'react'
import type { NewsHighlightSectionProps } from '@/types/shared/news-highlight-section.types'

type UseNewsHighlightDataReturn = {
    data: NewsHighlightSectionProps | null
    loading: boolean
    error: string | null
}

export function useNewsHighlightData(): UseNewsHighlightDataReturn {
    const [data, setData] = useState<NewsHighlightSectionProps | null>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const fetchNewsHighlight = async () => {
            try {
                setLoading(true)
                setError(null)

                const response = await fetch('/api/news-highlight')

                if (!response.ok) {
                    throw new Error(`Failed to fetch news highlight: ${response.statusText}`)
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

        fetchNewsHighlight()
    }, [])

    return { data, loading, error }
}
