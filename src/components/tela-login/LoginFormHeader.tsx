import PortalTypeLabel, {
    PortalType,
    getPortalLabel,
} from '@/components/tela-login/PortalTypeLabel'
import { Icon } from '@/script/Icon'
import type { LoginFormHeaderProps } from '@/types/tela-login/login-form-header.types'

export default function LoginFormHeader({ portalType = 'beneficiario' }: LoginFormHeaderProps) {
    return (
        <div className="space-y-1">
            <div className="flex items-center gap-4">
                <h1 className="text-[32px] font-medium text-secondary-900">Entrar</h1>
                <Icon name="iconEdgeLine" className='text-secondary-100' />
                <PortalTypeLabel type={portalType} />
            </div>
            <p className="text-base text-secondary-700 font-normal">
                Acesse o seu portal <span>{getPortalLabel(portalType).toLowerCase()}</span>
            </p>
        </div>
    )
}
