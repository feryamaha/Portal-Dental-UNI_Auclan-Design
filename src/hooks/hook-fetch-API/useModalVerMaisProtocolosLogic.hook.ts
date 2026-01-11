import { useState } from 'react'

export function useModalVerMaisProtocolosLogic() {
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [isConsentimentoModalOpen, setIsConsentimentoModalOpen] = useState(false)
    const [currentPage, setCurrentPage] = useState<'first' | 'second'>('first')
    const [isConsentimentoChecked, setIsConsentimentoChecked] = useState(false)

    const openModal = () => {
        setIsModalOpen(true)
        setCurrentPage('first')
        setIsConsentimentoChecked(false)
    }

    const closeModal = () => {
        setIsModalOpen(false)
        setIsConsentimentoModalOpen(false)
        setCurrentPage('first')
        setIsConsentimentoChecked(false)
    }

    const goToConsent = () => {
        setIsModalOpen(false)
        setIsConsentimentoModalOpen(true)
    }

    const goBackToProtocols = () => {
        setIsConsentimentoModalOpen(false)
        setIsModalOpen(true)
        setIsConsentimentoChecked(false)
    }

    const confirmConsent = () => {
        setIsConsentimentoModalOpen(false)
        setIsModalOpen(false)
        setIsConsentimentoChecked(false)
    }

    const handleConsentimentoCheckboxChange = (checked: boolean) => {
        setIsConsentimentoChecked(checked)
    }

    return {
        isModalOpen,
        isConsentimentoModalOpen,
        currentPage,
        isConsentimentoChecked,
        openModal,
        closeModal,
        goToConsent,
        goBackToProtocols,
        confirmConsent,
        handleConsentimentoCheckboxChange,
    }
}
