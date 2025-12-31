
import { getPortalLabel } from '@/data/portal-copy'
import type { PortalType } from '@/data/portal-copy'
import type { PortalTypeLabelProps } from '@/types/tela-login/portal-type-label.types'

export { getPortalLabel }
export type { PortalType }

export default function PortalTypeLabel({ type = 'beneficiario' }: PortalTypeLabelProps) {
    return <span className="flex items-center text-2xl font-normal">{getPortalLabel(type)}</span>
}
