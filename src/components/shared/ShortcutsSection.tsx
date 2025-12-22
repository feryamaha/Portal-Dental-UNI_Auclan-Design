"use client"

import { useMemo } from 'react'

import { ShortcutCard } from '@/components/ui/ShortcutCard'
import { getSidebarContent, type SidebarItem } from '@/context/dashboard/Sidebar/sidebar'
import type { PortalSlug } from '@/context/tela-login/portalConfig'

type ShortcutsSectionProps = {
    portal: PortalSlug
    title?: string
    shortcutIds?: string[]
    items?: SidebarItem[]
    maxItems?: number
    className?: string
}

export function ShortcutsSection({
    portal,
    title = 'Seus atalhos',
    shortcutIds,
    items,
    maxItems = 5,
    className = '',
}: ShortcutsSectionProps) {
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

    if (!resolvedItems.length) return null

    return (
        // Mantemos sempre `w-full flex flex-col` e usamos `className` só para complementar com estilos específicos no ponto de uso.
        <section className={`w-full flex flex-col ${className}`}>
            <header className="mb-5 flex items-center justify-between">
                <h2 className="font-inter text-xl font-semibold text-secondary-900">{title}</h2>
            </header>
            <div className="flex flex-wrap gap-4 ">
                {resolvedItems.map((shortcut) => (
                    <ShortcutCard key={shortcut.id} icon={shortcut.icon} label={shortcut.label} href={shortcut.href} />
                ))}
            </div>
        </section>
    )
}
