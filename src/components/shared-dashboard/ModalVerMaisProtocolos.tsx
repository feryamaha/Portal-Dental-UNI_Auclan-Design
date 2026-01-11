"use client"

import { HeaderModalProtocolos } from '@/components/ui/HeaderModalProtocolos'
import { SectionInfoMeusProtocolos } from '@/components/ui/SectionInfoMeusProtocolos'
import { FooterInfoModalProtocolos } from '@/components/ui/FooterInfoModalProtocolos'
import { sortProtocolsByPriority } from '@/utils/protocol-priority.utils'
import { useModalVerMaisProtocolosUI } from '@/hooks/hook-fetch-API/useModalVerMaisProtocolosUI.hook'
import type { ModalVerMaisProtocolosProps } from '@/types/shared/modal-ver-mais-protocolos.types'

export function ModalVerMaisProtocolos({
    isOpen,
    protocols,
    onClose,
    onProceedToConsent,
}: ModalVerMaisProtocolosProps) {
    if (!isOpen) return null

    const orderedProtocols = sortProtocolsByPriority(protocols)
    const { statusMessage } = useModalVerMaisProtocolosUI(orderedProtocols)

    const handleNext = () => {
        onProceedToConsent?.()
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
            <div className="w-[800px] max-h-[90vh] flex flex-col bg-white rounded-2xl shadow-lg overflow-hidden">
                <HeaderModalProtocolos
                    title="Meus protocolos"
                    statusMessage={statusMessage}
                    onClose={onClose}
                />

                <div className="overflow-y-auto bg-neutral-50 pb-[64px]">
                    <SectionInfoMeusProtocolos protocols={orderedProtocols} className='border-b border-neutral-100' />
                </div>

                <FooterInfoModalProtocolos
                    onPrevious={onClose}
                    onNext={handleNext}
                    disablePrevious={false}
                    disableNext={false}
                />
            </div>
        </div>
    )
}
