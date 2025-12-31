import type { SidebarItem } from "@/types/data/sidebar.types";
import type { PortalSlug } from "@/types/data/portal-config.types";

export type ShortcutsSectionProps = {
    portal: PortalSlug
    title?: string
    shortcutIds?: string[]
    items?: SidebarItem[]
    maxItems?: number
    className?: string
}
