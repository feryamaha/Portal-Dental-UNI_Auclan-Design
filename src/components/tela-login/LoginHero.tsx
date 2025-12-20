import Image from 'next/image'

export default function LoginHero() {
    return (
        <div className="flex flex-col gap-[56px] relative w-1/2 min-h-screen h-full bg-background-image-login bg-cover bg-center bg-no-repeat text-white overflow-hidden p-[16px_0px_0px_80px]">
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
                    <p className="text-white text-base font-normal">Beneficiários</p>
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
