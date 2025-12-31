import type { PortalSlug } from '@/types/data/portal-config.types'

export type TopbarQuickLink = {
    id: string
    label: string
    href: string
    icon?: string
}

export type TopbarAction = {
    id: string
    icon: string
    href?: string
}

export type TopbarUser = {
    name: string
    role: string
}

export type TopbarConfig = {
    breadcrumbs: string[]
    quickLinks: TopbarQuickLink[]
    actions: TopbarAction[]
    user: TopbarUser
}
