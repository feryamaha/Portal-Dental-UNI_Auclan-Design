"use client"

import Link from 'next/link'
import { getSidebarContent, type SidebarSection } from '@/data/portals/sidebar-config'
import { getPortalLabel } from '@/data/portal-copy'
import { Icon } from '@/script/Icon'
import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import SidebarHighlight from '@/components/dashboard-layout/SidebarHighlight'
import { DivSelectMenu } from '@/components/dashboard-layout/DivSelectMenu'
import { usePortalDetector as useDashboardSidebar } from '@/hooks/hooks-dash/hooks-shared/usePortalDetector.hook'
import type { SidebarProps } from '@/types/dashboard/sidebar.types'
import { NotificationBadge } from '@/components/ui/NotificationBadge'

export type { SidebarProps } from '@/types/dashboard/sidebar.types'

export default function Sidebar({ portal }: SidebarProps) {
    const { resolvedPortal, isActive } = useDashboardSidebar({ portal })
    const { sections, highlight } = getSidebarContent(resolvedPortal)

    return (
        <aside className="w-max min-h-screen bg-white border-r border-secondary-50 flex flex-col py-[20px]">
            <div className="px-[20px]">
                <div className="flex items-center gap-[12px]">
                    <Icon name='iconFaviconDental' />
                    <div className='flex flex-col gap-[2px]'>
                        <span className="font-inter text-sm font-medium text-neutral-900">Dental Uni</span>
                        <span className="font-inter text-sm font-normal text-neutral-600">
                            Portal {getPortalLabel(resolvedPortal)}
                        </span>
                    </div>
                </div>
                <SidebarHighlight portal={resolvedPortal} highlight={highlight} />
            </div>

            <nav className="flex-1 overflow-y-auto space-y-6 px-2 mt-[20px]">
                {sections.map((section: SidebarSection) => (
                    <div key={section.id}>
                        <p className="px-4 font-inter text-xs font-medium text-neutral-500 mb-2">
                            {section.title}
                        </p>
                        <div className="space-y-1">
                            {section.items.map((item) => {
                                const itemIsActive = isActive(item.href)
                                const itemClasses = twMerge(
                                    clsx(
                                        'relative flex items-center gap-4 p-[8px_12px] rounded-lg text-sm transition-colors',
                                        'text-secondary-600 hover:bg-neutral-50',
                                        {
                                            'bg-primary-25 text-primary-500': itemIsActive,
                                        }
                                    )
                                )

                                return (
                                    <Link key={item.id} href={item.href} className={itemClasses}>
                                        {itemIsActive && (
                                            <DivSelectMenu className='absolute top-1/2 left-[-8px]' />
                                        )}
                                        <Icon name={item.icon} className="text-current" size={20} />
                                        <span className="flex-1 text-left">{item.label}</span>
                                        {item.badge && (
                                            <NotificationBadge>{item.badge}</NotificationBadge>
                                        )}
                                    </Link>
                                )
                            })}
                        </div>
                    </div>
                ))}
            </nav>

            <div className="w-full pl-[24px]">
                <Link
                    href="/sio"
                    className="flex items-center gap-[8px] rounded"
                    aria-label="Acessar SIO - Sistema Integrado de Operações"
                >
                    <Icon name="iconSioSistemaInt" className='text-secondary-700' />
                    <span className='font-inter font-medium text-sm text-secondary-700'>Acessar SIO</span>
                    <Icon name="iconLinkCta" className='text-secondary-700' />
                </Link>
            </div>
        </aside>
    )
}
