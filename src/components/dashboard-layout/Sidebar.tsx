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

export type { SidebarProps } from '@/types/dashboard/sidebar.types'

export default function Sidebar({ portal }: SidebarProps) {
    const { resolvedPortal, isActive } = useDashboardSidebar({ portal })
    const { sections, highlight } = getSidebarContent(resolvedPortal)

    return (
        <aside className="w-max min-h-screen bg-white border-r border-secondary-50 flex flex-col py-[20px]">
            <div className="px-[20px] ">
                <div className="flex items-center gap-[12px]">
                    <Icon name='iconFaviconDental' />
                    <div className='flex flex-col gap-[2px]'>
                        <span className="text-sm font-inter font-medium text-secondary-900">Dental Uni</span>
                        <span className="text-sm font-inter font-normal text-secondary-600">
                            Portal {getPortalLabel(resolvedPortal)}
                        </span>
                    </div>
                </div>
                <SidebarHighlight portal={resolvedPortal} highlight={highlight} />
            </div>

            <nav className="flex-1 overflow-y-auto space-y-6 px-2">
                {sections.map((section: SidebarSection) => (
                    <div key={section.id}>
                        <p className="px-4 text-xs font-medium text-secondary-500 mb-2">
                            {section.title}
                        </p>
                        <div className="space-y-1">
                            {section.items.map((item) => {
                                const itemIsActive = isActive(item.href)
                                const itemClasses = twMerge(
                                    clsx(
                                        'relative flex items-center gap-4 p-[8px_12px] rounded-lg text-sm transition-colors',
                                        'text-secondary-600 hover:bg-secondary-50',
                                        {
                                            'bg-primary-25 text-primary-500': itemIsActive,
                                        }
                                    )
                                )

                                return (
                                    <Link key={item.id} href={item.href} className={itemClasses} tabIndex={1}>
                                        {itemIsActive && (
                                            <DivSelectMenu className='absolute top-1/2 left-[-8px]' />
                                        )}
                                        <Icon name={item.icon} className="text-current" size={20} />
                                        <span className="flex-1 text-left">{item.label}</span>
                                        {item.badge && (
                                            <span className="inline-flex h-5 min-w-[20px] items-center justify-center rounded-full bg-primary-500 px-2 text-xs font-semibold text-white">
                                                {item.badge}
                                            </span>
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
                    className="flex items-center gap-[8px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 rounded"
                    aria-label="Acessar SIO - Sistema Integrado de Operações"
                >
                    <Icon name="iconSioSistemaInt" />
                    <span className='font-inter font-medium text-sm text-secondary-700'>Acessar SIO</span>
                    <Icon name="iconLinkCta" />
                </Link>
            </div>
        </aside>
    )
}
