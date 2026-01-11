"use client"

import { HeaderModalProtocolos } from '@/components/ui/HeaderModalProtocolos'
import { FooterConsentimentoModalProtocolos } from '@/components/ui/FooterConsentimentoModalProtocolos'
import type { ModalVerMaisProtocolosConsentimentoProps } from '@/types/shared/modal-ver-mais-protocolos.types'
import Image from 'next/image'

interface ModalVerMaisProtocolosConsentimentoWithLogicProps extends ModalVerMaisProtocolosConsentimentoProps {
    isConsentimentoChecked: boolean
    onCheckboxChange: (checked: boolean) => void
}

export function ModalVerMaisProtocolosConsentimento({
    isOpen,
    onClose,
    onConfirm,
    onGoBack,
    isConsentimentoChecked,
    onCheckboxChange,
}: ModalVerMaisProtocolosConsentimentoWithLogicProps) {
    if (!isOpen) return null

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
            <div className="w-[800px] max-h-[90vh] flex flex-col bg-primary-600 rounded-2xl shadow-lg overflow-hidden">
                <HeaderModalProtocolos
                    onClose={onClose}
                    className="p-[20px_24px] text-white"
                />
                <div className="w-full h-max px-[48px] pb-[24px] flex flex-col gap-[12px]">
                    <div className="flex flex-col gap-[12px] max-w-[700px]">
                        <h2 className="font-inter text-3xl font-semibold text-white">
                            Prezado(a) Dentista,
                        </h2>
                        <p className="font-inter text-base font-normal text-white">
                            Reiteramos que, conforme o Manual do Cirurgião-Dentista, o Token deve ser gerado exclusivamente com os dados do beneficiário. Não é permitido o uso de e-mail ou telefone celular pessoal do(a) dentista ou da clínica para essa finalidade, nem de contatos criados exclusivamente para gerar tokens para grupos de beneficiários. <span className="font-bold">Guias fora desse padrão estão sujeitas à glosa.</span>
                        </p>
                    </div>

                    <div className="w-full flex flex-col gap-[12px] max-w-[700px]">
                        <p className="font-inter text-base font-normal text-white">
                            Para mais informações, entre em contato com o GRC Atendimentos ou pelos telefones:
                        </p>
                        <div className="font-inter text-base font-normal text-white">
                            <p>Capitais e região metropolitana: <span className="font-semibold">4007-2300</span></p>
                            <p>Demais localidades: <span className="font-semibold">0800 052 6000</span></p>
                        </div>
                        <p className="font-inter text-base font-semibold text-white">Atenciosamente,</p>
                        <div className="pt-[4px]">
                            <Image
                                src="/assets/images/du-logo-white.svg"
                                width={170}
                                height={26}
                                alt="logo-dentaluni"
                                className="h-auto w-auto"
                            />
                        </div>
                    </div>
                </div>
                <FooterConsentimentoModalProtocolos
                    isCheckboxChecked={isConsentimentoChecked}
                    onCheckboxChange={onCheckboxChange}
                    onGoBack={onGoBack}
                    onConfirm={onConfirm}
                />
            </div>
        </div>
    )
}
