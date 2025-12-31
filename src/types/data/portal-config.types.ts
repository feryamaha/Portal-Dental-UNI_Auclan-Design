import type { PortalType } from '@/components/shared-tela-login/PortalTypeLabel'
import type { LoginFieldConfig } from '@/components/shared-tela-login/LoginFormFields'
import { portalConfigRecord } from '@/data/portal-config'

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
    inputProps?: LoginFieldConfig['inputProps']
}

export type PortalConfig = {
    portalType: PortalType
    heroLabel: string
    fields: PortalFieldConfig[]
    forgotHref?: string
    forgotLabel?: string
    ctaLabel?: string
}

export type PortalSlug = keyof typeof portalConfigRecord
