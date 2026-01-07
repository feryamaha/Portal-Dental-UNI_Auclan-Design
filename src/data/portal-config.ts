import { PortalType } from '@/components/shared-tela-login/PortalTypeLabel'
import type { LoginFieldConfig } from '@/components/shared-tela-login/LoginFormFields'

import type {
    PortalConfig,
    PortalFieldConfig,
    PortalFieldCustomRenderer,
    PortalSlug,
} from '@/types/data/portal-config.types'

export type {
    PortalConfig,
    PortalFieldConfig,
    PortalFieldCustomRenderer,
    PortalSlug,
} from '@/types/data/portal-config.types'

export const portalConfigRecord = {
    beneficiario: {
        portalType: 'beneficiario',
        heroLabel: 'Beneficiários',
        fields: [
            {
                id: 'beneficiario-id',
                label: 'Número do seu cartão ou CPF',
                name: 'login',
                placeholder: '',
                allowAllCharacters: true,
                inputProps: {
                    mask: 'cpf',
                },
            },
            {
                id: 'beneficiario-password',
                label: 'Senha',
                name: 'password',
                type: 'password',
                placeholder: '',
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
                name: 'login',
                customRenderer: 'dentistaDocuments',
            },
            {
                id: 'dentista-password',
                label: 'Senha',
                name: 'password',
                type: 'password',
                placeholder: '',
            },
        ],
    },
    comercial: {
        portalType: 'comercial',
        heroLabel: 'Comercial',
        fields: [
            {
                id: 'comercial-code',
                label: 'Código',
                name: 'login',
                placeholder: '',
            },
            {
                id: 'comercial-password',
                label: 'Senha',
                name: 'password',
                type: 'password',
                placeholder: '',
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
                name: 'login',
                placeholder: '',
            },
            {
                id: 'empresa-password',
                label: 'Senha',
                name: 'password',
                type: 'password',
                placeholder: '',
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
                name: 'login',
                placeholder: '',
            },
            {
                id: 'representante-password',
                label: 'Senha',
                name: 'password',
                type: 'password',
                placeholder: '',
            },
        ],
    },
} as const satisfies Record<string, PortalConfig>

export function getPortalConfig(slug?: string): PortalConfig | null {
    if (!slug) return null
    return portalConfigRecord[slug as PortalSlug] ?? null
}
