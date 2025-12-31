import type { PortalType } from '@/components/shared-tela-login/PortalTypeLabel'
import type { LoginFieldConfig } from '@/components/shared-tela-login/LoginFormFields'

export type SectionContentRightProps = {
    portalType: PortalType
    fields: LoginFieldConfig[]
    forgotHref?: string
    forgotLabel?: string
    ctaLabel?: string
}
