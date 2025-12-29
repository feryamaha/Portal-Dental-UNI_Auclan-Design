import type { PortalType } from '@/components/tela-login/PortalTypeLabel'
import type { LoginFieldConfig } from '@/components/tela-login/LoginFormFields'

export type SectionContentRightProps = {
    portalType: PortalType
    fields: LoginFieldConfig[]
    forgotHref?: string
    forgotLabel?: string
    ctaLabel?: string
}
