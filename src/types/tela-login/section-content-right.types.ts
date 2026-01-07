import type { PortalType } from '@/components/shared-tela-login/PortalTypeLabel'
import type { PortalFieldConfig } from '@/types/data/portal-config.types'

export type SectionContentRightProps = {
    portalType: PortalType
    fields: PortalFieldConfig[]
    forgotHref?: string
    forgotLabel?: string
    ctaLabel?: string
}
