
import { getPortalLabel } from '@/context/tela-login/portalCopy'
import type { PortalType } from '@/context/tela-login/portalCopy'

export { getPortalLabel }
export type { PortalType }

type PortalTypeLabelProps = {
    type?: PortalType
}

export default function PortalTypeLabel({ type = 'beneficiario' }: PortalTypeLabelProps) {
    return <span className="flex items-center text-2xl font-normal">{getPortalLabel(type)}</span>
}
