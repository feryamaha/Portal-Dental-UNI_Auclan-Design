"use client"
import { ShortcutCard } from '@/components/ui/ShortcutCard'
import type { SidebarItem } from '@/types/data/sidebar.types'
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
        <section className={`w-full flex flex-col gap-[16px] ${className}`}>
            <header className="flex items-center justify-between">
                <h2 className="font-inter text-xl font-semibold text-neutral-900">{title}</h2>
            </header>
            <div className="flex flex-wrap gap-4 ">
                {resolvedItems.map((shortcut) => (
                    <ShortcutCard key={shortcut.id} icon={shortcut.icon} label={shortcut.label} href={shortcut.href} />
                ))}
            </div>
        </section>
    )
}
