'use client'

import { useState } from 'react'

interface UseFaqModalControlReturn {
    shouldRender: boolean
    openModal: () => void
    startClose: () => void
}

export function useFaqModalControl(): UseFaqModalControlReturn {
    const [isOpen, setIsOpen] = useState(false)

    const openModal = () => {
        setIsOpen(true)
    }

    const startClose = () => {
        setIsOpen(false)
    }

    return {
        shouldRender: isOpen,
        openModal,
        startClose
    }
}
