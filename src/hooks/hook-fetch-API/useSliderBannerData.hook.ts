'use client'

import { useEffect, useState } from 'react'
import type { SliderBannerItem } from '@/types/shared/slider-banner.types'

type UseSliderBannerDataReturn = {
    data: SliderBannerItem[]
    loading: boolean
    error: string | null
}

export function useSliderBannerData(portal: string): UseSliderBannerDataReturn {
    const [data, setData] = useState<SliderBannerItem[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const fetchSliderBanner = async () => {
            try {
                setLoading(true)
                setError(null)

                const response = await fetch(`/api/slider-banner?portal=${portal}`)

                if (!response.ok) {
                    throw new Error(`Failed to fetch slider banner: ${response.statusText}`)
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

        fetchSliderBanner()
    }, [portal])

    return { data, loading, error }
}
