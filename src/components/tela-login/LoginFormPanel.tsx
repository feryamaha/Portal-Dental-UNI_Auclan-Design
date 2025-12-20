
import LoginFormHeader from '@/components/tela-login/LoginFormHeader'
import LoginFormFields, { LoginFieldConfig } from '@/components/tela-login/LoginFormFields'
import TermoPoliticaUso from '@/components/tela-login/TermoPoliticaUso'
import { PortalType } from '@/components/tela-login/PortalTypeLabel'
import { Button } from '@/components/ui/Button'
import { Icon } from '@/script/Icon'

type LoginFormPanelProps = {
    portalType: PortalType
    fields: LoginFieldConfig[]
    forgotHref?: string
    forgotLabel?: string
    ctaLabel?: string
}

export default function LoginFormPanel({
    portalType,
    fields,
    forgotHref,
    forgotLabel,
    ctaLabel,
}: LoginFormPanelProps) {
    return (
        <div className="w-1/2 min-h-screen flex flex-col justify-between pl-[48px] py-[32px] ">
            <div className="inline-flex">
                <Button href="#" variant="tertiary" size="default" className='text-[#AF0F2A]'>
                    <Icon name='iconArrowRedLeft' />
                    Voltar para o site
                </Button>
            </div>

            <div className="w-full max-w-md flex flex-col gap-[32px]">
                <LoginFormHeader portalType={portalType} />
                <LoginFormFields
                    fields={fields}
                    forgotHref={forgotHref}
                    forgotLabel={forgotLabel}
                    ctaLabel={ctaLabel}
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
    )
}
