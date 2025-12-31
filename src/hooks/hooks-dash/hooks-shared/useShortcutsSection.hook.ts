"use client"

import { useMemo } from 'react'

import { getSidebarContent, type SidebarItem } from '@/data/portals/sidebar-config'
import type { PortalSlug } from '@/types/data/portal-config.types'

export function useShortcutsSection(params: {
    portal: PortalSlug
    shortcutIds?: string[]
    items?: SidebarItem[]
    maxItems?: number
}) {
    const { portal, shortcutIds, items, maxItems } = params

    const sidebarContent = getSidebarContent(portal)
    const flattenedItems = useMemo(() => sidebarContent.sections.flatMap((section) => section.items), [sidebarContent.sections])

    let resolvedItems: SidebarItem[]
    if (items?.length) {
        resolvedItems = items
    } else if (shortcutIds?.length) {
        resolvedItems = shortcutIds
            .map((id) => flattenedItems.find((item) => item.id === id))
            .filter((item): item is SidebarItem => Boolean(item))
    } else {
        resolvedItems = flattenedItems
    }

    if (maxItems && resolvedItems.length > maxItems) {
        resolvedItems = resolvedItems.slice(0, maxItems)
    }

    return {
        resolvedItems,
    }
}
