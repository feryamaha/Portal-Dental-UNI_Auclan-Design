import type { SidebarHighlight } from '@/context/dashboard/Sidebar/sidebar'
import type { PortalSlug } from '@/context/tela-login/portalConfig'

export type SidebarHighlightProps = {
    portal: PortalSlug
    highlight?: SidebarHighlight | null
}
