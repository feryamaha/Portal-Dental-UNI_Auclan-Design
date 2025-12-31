import type { PortalSlug } from '@/types/data/portal-config.types'

export type SidebarItem = {
    id: string
    label: string
    href: string
    icon: string
    badge?: string
}

export type SidebarSection = {
    id: string
    title: string
    items: SidebarItem[]
}

export type SidebarConfig = SidebarSection[]

export type SidebarHighlight = {
    title?: string
    pillLabel?: string
    subtitle?: string
    helperText?: string
    ctaLabel?: string
    ctaHref?: string
}

export type SidebarContent = {
    highlight?: SidebarHighlight | null
    sections: SidebarConfig
}
