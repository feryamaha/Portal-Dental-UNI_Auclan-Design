import { useState, useCallback } from 'react'

interface UseNotificacoesModalControlReturn {
    shouldRender: boolean
    openModal: () => void
    startClose: () => void
}

export function useNotificacoesModalControl(): UseNotificacoesModalControlReturn {
    const [isClosing, setIsClosing] = useState(false)
    const [isOpen, setIsOpen] = useState(false)

    const openModal = useCallback(() => {
        setIsOpen(true)
        setIsClosing(false)
    }, [])

    const startClose = useCallback(() => {
        setIsClosing(true)
        setTimeout(() => {
            setIsOpen(false)
            setIsClosing(false)
        }, 300)
    }, [])

    const shouldRender = isOpen

    return {
        shouldRender,
        openModal,
        startClose
    }
}
