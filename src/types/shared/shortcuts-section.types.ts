import type { SidebarItem } from "@/context/dashboard/Sidebar/sidebar";
import type { PortalSlug } from "@/context/tela-login/portalConfig";

export type ShortcutsSectionProps = {
    portal: PortalSlug
    title?: string
    shortcutIds?: string[]
    items?: SidebarItem[]
    maxItems?: number
    className?: string
}
