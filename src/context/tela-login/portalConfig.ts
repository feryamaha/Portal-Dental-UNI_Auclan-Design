import { PortalType } from '@/components/tela-login/PortalTypeLabel'

export type PortalFieldCustomRenderer = 'dentistaDocuments'

export type PortalFieldConfig = {
    id: string
    label: string
    name: string
    placeholder?: string
    type?: string
    className?: string
    allowAllCharacters?: boolean
    customRenderer?: PortalFieldCustomRenderer
}

export type PortalConfig = {
    portalType: PortalType
    heroLabel: string
    fields: PortalFieldConfig[]
    forgotHref?: string
    forgotLabel?: string
    ctaLabel?: string
}

const portalConfigRecord = {
    beneficiario: {
        portalType: 'beneficiario',
        heroLabel: 'Beneficiários',
        fields: [
            {
                id: 'beneficiario-id',
                label: 'Número do seu cartão ou CPF',
                name: 'login',
                placeholder: 'Número do seu cartão ou CPF',
                allowAllCharacters: true,
            },
            {
                id: 'beneficiario-password',
                label: 'Senha',
                name: 'password',
                type: 'password',
                placeholder: 'Senha',
            },
        ],
    },
    dentista: {
        portalType: 'dentista',
        heroLabel: 'Dentista',
        fields: [
            {
                id: 'dentista-docs',
                label: 'Documentos',
                name: 'documents',
                customRenderer: 'dentistaDocuments',
            },
            {
                id: 'dentista-password',
                label: 'Senha',
                name: 'password',
                type: 'password',
                placeholder: 'Senha',
            },
        ],
    },
    corretor: {
        portalType: 'corretor',
        heroLabel: 'Corretores',
        fields: [
            {
                id: 'corretor-code',
                label: 'Código',
                name: 'code',
                placeholder: 'Código',
            },
            {
                id: 'corretor-password',
                label: 'Senha',
                name: 'password',
                type: 'password',
                placeholder: 'Senha',
            },
        ],
    },
    empresa: {
        portalType: 'empresa',
        heroLabel: 'Empresas',
        fields: [
            {
                id: 'empresa-code',
                label: 'Código',
                name: 'code',
                placeholder: 'Código',
            },
            {
                id: 'empresa-password',
                label: 'Senha',
                name: 'password',
                type: 'password',
                placeholder: 'Senha',
            },
        ],
    },
    representante: {
        portalType: 'representante',
        heroLabel: 'Representantes',
        fields: [
            {
                id: 'representante-code',
                label: 'Código',
                name: 'code',
                placeholder: 'Código',
            },
            {
                id: 'representante-password',
                label: 'Senha',
                name: 'password',
                type: 'password',
                placeholder: 'Senha',
            },
        ],
    },
} as const satisfies Record<string, PortalConfig>

export type PortalSlug = keyof typeof portalConfigRecord

export function getPortalConfig(slug?: string): PortalConfig | null {
    if (!slug) return null
    return portalConfigRecord[slug as PortalSlug] ?? null
}
