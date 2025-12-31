import type { SidebarHighlight } from '@/types/data/sidebar.types'
import type { PortalSlug } from '@/types/data/portal-config.types'

export type SidebarHighlightProps = {
    portal: PortalSlug
    highlight?: SidebarHighlight | null
}
