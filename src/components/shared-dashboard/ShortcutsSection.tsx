"use client"

import { ShortcutCard } from '@/components/ui/ShortcutCard'
import type { SidebarItem } from '@/context/dashboard/Sidebar/sidebar'
import type { ShortcutsSectionProps } from '@/types/shared/shortcuts-section.types'
import { useShortcutsSection } from '@/hooks/hooks-dash/hooks-shared/useShortcutsSection.hook'

export function ShortcutsSection({
    portal,
    title = 'Seus atalhos',
    shortcutIds,
    items,
    maxItems = 5,
    className = '',
}: ShortcutsSectionProps) {
    const { resolvedItems } = useShortcutsSection({
        portal,
        shortcutIds,
        items: items as SidebarItem[] | undefined,
        maxItems,
    })

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
