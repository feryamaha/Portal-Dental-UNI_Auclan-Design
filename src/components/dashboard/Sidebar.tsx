"use client"

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { getSidebarContent, type SidebarSection } from '@/context/dashboard/Sidebar/sidebar'
import type { PortalSlug } from '@/context/tela-login/portalConfig'
import { getPortalLabel } from '@/context/tela-login/portalCopy'
import { Icon } from '@/script/Icon'
import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import SidebarHighlight from '@/components/dashboard/SidebarHighlight'
import { DivSelectMenu } from '@/components/dashboard/DivSelectMenu'
import { basePaths } from '@/data/sidebarHighlights'

function inferPortalFromPath(pathname?: string): PortalSlug {
    if (!pathname) return 'dentista'

    const segments = pathname.split('/').filter(Boolean)
    const dashSegment = segments.find((segment) => segment.startsWith('dash-'))

    if (!dashSegment) return 'dentista'

    const portal = dashSegment.replace('dash-', '') as PortalSlug
    return portal
}

export type SidebarProps = {
    portal?: PortalSlug
}

export default function Sidebar({ portal }: SidebarProps) {
    const pathname = usePathname()
    const resolvedPortal = portal ?? inferPortalFromPath(pathname)
    const { sections, highlight } = getSidebarContent(resolvedPortal)
    const portalBasePath = basePaths[resolvedPortal]

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
                                const normalizedPath = pathname?.replace(/\/$/, '') || ''
                                const normalizedHref = item.href.replace(/\/$/, '')
                                const isBaseLink = normalizedHref === portalBasePath
                                const isActive = isBaseLink
                                    ? normalizedPath === normalizedHref
                                    : normalizedPath === normalizedHref ||
                                    normalizedPath.startsWith(`${normalizedHref}/`)
                                const itemClasses = twMerge(
                                    clsx(
                                        'relative flex items-center gap-4 p-[8px_12px] rounded-lg text-sm transition-colors',
                                        'text-secondary-600 hover:bg-secondary-50',
                                        {
                                            'bg-primary-25 text-primary-500': isActive,
                                        }
                                    )
                                )

                                return (

                                    <Link key={item.id} href={item.href} className={itemClasses}>
                                        {isActive && (
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
                    className="flex items-center gap-[8px] "
                >
                    <Icon name="iconSioSistemaInt" />
                    <span className='font-inter font-medium text-sm text-secondary-700'>Acessar SIO</span>
                    <Icon name="iconLinkCta" />
                </Link>
            </div>
        </aside>
    )
}
