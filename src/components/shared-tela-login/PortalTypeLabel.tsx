
import { getPortalLabel } from '@/data/portal-copy'
import type { PortalType } from '@/data/portal-copy'
import type { PortalTypeLabelProps } from '@/types/tela-login/portal-type-label.types'

export { getPortalLabel }
export type { PortalType }

export default function PortalTypeLabel({ type = 'beneficiario' }: PortalTypeLabelProps) {
    return <span className="font-inter flex items-center text-base font-medium text-neutral-900">{getPortalLabel(type)}</span>
}
