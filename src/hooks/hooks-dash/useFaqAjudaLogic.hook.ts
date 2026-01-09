'use client'

import { useState, useMemo } from 'react'
import { useFaqAjudaData } from '@/hooks/hook-fetch-API'
import type { FaqItemData, FaqAjudaContent } from '@/types/shared/faq-ajuda.types'

interface UseFaqAjudaLogicReturn {
    data: FaqAjudaContent | null
    loading: boolean
    error: string | null
    selectedCategory: string
    setSelectedCategory: (category: string) => void
    searchTerm: string
    setSearchTerm: (term: string) => void
    segmentedItems: Array<{ value: string; label: string }>
    filteredItems: FaqItemData[]
}

export function useFaqAjudaLogic(portal: string): UseFaqAjudaLogicReturn {
    const { data, loading, error } = useFaqAjudaData(portal)
    const [selectedCategory, setSelectedCategory] = useState('all')
    const [searchTerm, setSearchTerm] = useState('')

    const segmentedItems = useMemo(() => {
        if (!data) return []
        return data.categories.map(category => ({
            value: category.value,
            label: category.label
        }))
    }, [data])

    const filteredItems = useMemo(() => {
        if (!data) return []

        const category = data.categories.find(cat => cat.value === selectedCategory)
        if (!category) return []

        if (!searchTerm.trim()) {
            return category.items
        }

        const searchLower = searchTerm.toLowerCase()
        return category.items.filter(
            item =>
                item.question.toLowerCase().includes(searchLower) ||
                item.answer.toLowerCase().includes(searchLower)
        )
    }, [data, selectedCategory, searchTerm])

    return {
        data,
        loading,
        error,
        selectedCategory,
        setSelectedCategory,
        searchTerm,
        setSearchTerm,
        segmentedItems,
        filteredItems
    }
}
