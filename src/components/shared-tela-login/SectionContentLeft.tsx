import Image from 'next/image'
import type { SectionContentLeftProps } from '@/types/tela-login/section-content-left.types'

export default function SectionContentLeft({ portalLabel = 'Beneficiários' }: SectionContentLeftProps) {
    return (
        <div className="flex flex-col gap-[56px] relative w-full min-h-screen h-full bg-background-image-login bg-cover bg-center bg-no-repeat text-white overflow-hidden p-[24px] @laptop:p-[16px_0px_0px_80px] @laptop:w-1/2 @laptop:h-screen @laptop:flex-shrink-0">
            <div className="pointer-events-none absolute inset-0 z-0 bg-[url('/assets/images/mask-image.webp')] bg-cover bg-center" />

            <div className="w-max flex items-center relative z-10 ">
                <div className="border-r border-white pr-4">
                    <Image
                        src="/assets/images/du-logo-white.svg"
                        width={154}
                        height={24}
                        alt="logo-dentaluni"
                    />
                </div>
                <div className="pl-4">
                    <p className="font-inter text-white text-base font-medium">{portalLabel}</p>
                </div>
            </div>
            <div className="relative z-10">
                <p className="text-[32px] font-semibold text-white font-openSans leading-tight">
                    Pode sorrir.
                    <br />
                    A gente garante.
                </p>
            </div>
        </div>
    )
}
