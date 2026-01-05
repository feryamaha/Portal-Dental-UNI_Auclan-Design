"use client"

import { useMemo } from 'react'
import LoginFormHeader from '@/components/shared-tela-login/LoginFormHeader'
import LoginFormFields, { LoginFieldConfig } from '@/components/shared-tela-login/LoginFormFields'
import TermoPoliticaUso from '@/components/shared-tela-login/TermoPoliticaUso'
import { PortalType } from '@/components/shared-tela-login/PortalTypeLabel'
import { Button } from '@/components/ui/Button'
import { Icon } from '@/script/Icon'
import { useLoginFormFields } from '@/hooks/tela-login/useLoginFormFields.hook'
import type { SectionContentRightProps } from '@/types/tela-login/section-content-right.types'

export default function SectionContentRight({
    portalType,
    fields,
    forgotHref,
    forgotLabel,
    ctaLabel,
}: SectionContentRightProps) {
    const portalSlug = useMemo(() => portalType, [portalType])
    const { handleSubmit, handleChange, error, isSubmitting } = useLoginFormFields(portalSlug)

    return (
        <div className='fixed inset-0 w-full h-full bg-[rgba(58,58,58,0.58)] backdrop-blur-sm z-10 @laptop:static @laptop:bg-transparent @laptop:backdrop-blur-none'>
            <div className="w-[90%] h-[95%] bg-white rounded-xl z-20 p-[16px] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 @mobile:w-[70%] @mobile:h-[60%] shadow-[0_1px_4px_0_rgba(0,0,0,0.08),0_1px_2px_0_rgba(25,25,25,0.08)] @laptop:relative @laptop:top-0 @laptop:left-0 @laptop:translate-x-0 @laptop:translate-y-0 @laptop:w-1/2 @laptop:h-screen @laptop:rounded-none @laptop:p-[48px_32px_32px_48px] @laptop:shadow-none @laptop:flex-shrink-0">

                <div className='w-full h-full flex flex-col justify-between'>
                    <div className="inline-flex">
                        <Button href="https://dental-uni-auclan-institucional-v0.vercel.app/" variant="tertiary" size="default" className='text-[#AF0F2A]'>
                            <Icon name='iconArrowRedLeft' />
                            Voltar para o site
                        </Button>
                    </div>

                    <div className="w-full @laptop:w-[420px] flex flex-col gap-[32px]">
                        <LoginFormHeader portalType={portalType} />
                        <LoginFormFields
                            fields={fields}
                            forgotHref={forgotHref}
                            forgotLabel={forgotLabel}
                            ctaLabel={ctaLabel}
                            onSubmit={handleSubmit}
                            onFieldChange={handleChange}
                            errorMessage={error}
                            isSubmitting={isSubmitting}
                        />
                        <div className="flex flex-wrap items-center gap-2 text-sm text-neutral-700">
                            <span>Cartão bloqueado?</span>
                            <div className="inline-flex">
                                <Button href="#" variant="tertiary" size="default" className='text-[#AF0F2A]' >
                                    Desbloqueie o seu cartão <Icon name='iconArrowRedRight' />
                                </Button>
                            </div>
                        </div>
                    </div>
                    <TermoPoliticaUso />
                </div>
            </div>
        </div>
    )
}
