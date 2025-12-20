
const PORTAL_COPY = {
    beneficiario: 'Beneficiário',
    dentista: 'Dentista',
    corretor: 'Corretor',
    empresa: 'Empresa',
    representante: 'Representante',
} as const

export type PortalType = keyof typeof PORTAL_COPY

export function getPortalLabel(type: PortalType = 'beneficiario') {
    return PORTAL_COPY[type]
}

type PortalTypeLabelProps = {
    type?: PortalType
}

export default function PortalTypeLabel({ type = 'beneficiario' }: PortalTypeLabelProps) {
    return <span className="flex items-center text-2xl font-normal">{getPortalLabel(type)}</span>
}
