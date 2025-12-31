import type { PortalType } from '@/types/data/portal-copy.types'

export const PORTAL_COPY = {
    beneficiario: 'Beneficiário',
    dentista: 'Dentista',
    corretor: 'Corretor',
    empresa: 'Empresa',
    representante: 'Representante',
} as const

export type { PortalType } from '@/types/data/portal-copy.types'

export function getPortalLabel(type: PortalType = 'beneficiario') {
    return PORTAL_COPY[type]
}
