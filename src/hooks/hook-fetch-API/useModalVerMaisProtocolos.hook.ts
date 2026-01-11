import { useState } from 'react'

export function useModalVerMaisProtocolos() {
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [isConsentimentoModalOpen, setIsConsentimentoModalOpen] = useState(false)

    const openModal = () => {
        setIsModalOpen(true)
    }

    const closeModal = () => {
        setIsModalOpen(false)
        setIsConsentimentoModalOpen(false)
    }

    const proceedToConsent = () => {
        setIsModalOpen(false)
        setIsConsentimentoModalOpen(true)
    }

    const goBackFromConsent = () => {
        setIsConsentimentoModalOpen(false)
        setIsModalOpen(true)
    }

    const confirmConsent = () => {
        setIsConsentimentoModalOpen(false)
        setIsModalOpen(false)
    }

    return {
        isModalOpen,
        isConsentimentoModalOpen,
        openModal,
        closeModal,
        proceedToConsent,
        goBackFromConsent,
        confirmConsent,
    }
}
