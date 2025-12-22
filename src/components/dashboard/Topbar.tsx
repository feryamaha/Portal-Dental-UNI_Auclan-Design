"use client"

"use client"

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { clsx } from 'clsx'

import { Icon } from '@/script/Icon'
import { Button } from '@/components/ui/Button'
import { Breadcrumbs, type BreadcrumbItem } from '@/components/ui/Breadcrumbs'
import { getTopbarConfig } from '@/context/dashboard/Topbar/topbar'
import { getSidebarContent } from '@/context/dashboard/Sidebar/sidebar'
import { basePaths } from '@/data/sidebarHighlights'
import type { PortalSlug } from '@/context/tela-login/portalConfig'

function inferPortalFromPath(pathname?: string): PortalSlug {
    if (!pathname) return 'dentista'

    const segments = pathname.split('/').filter(Boolean)
    const dashSegment = segments.find((segment) => segment.startsWith('dash-'))

    if (!dashSegment) return 'dentista'

    return dashSegment.replace('dash-', '') as PortalSlug
}

export type TopbarProps = {
    portal?: PortalSlug
    containerClassName?: string
}

export default function Topbar({ portal, containerClassName }: TopbarProps) {
    const pathname = usePathname()
    const resolvedPortal = portal ?? inferPortalFromPath(pathname)
    const { breadcrumbs, quickLinks, actions, user } = getTopbarConfig(resolvedPortal)
    const sidebarContent = getSidebarContent(resolvedPortal)

    const normalizedPath = pathname?.replace(/\/$/, '') || ''
    const flattenedItems = sidebarContent.sections.flatMap((section) => section.items)

    const selectedItem = flattenedItems.find((item) => {
        const normalizedHref = item.href.replace(/\/$/, '')
        const isBaseLink = normalizedHref === basePaths[resolvedPortal]

        if (isBaseLink) {
            return normalizedPath === normalizedHref
        }

        return normalizedPath === normalizedHref || normalizedPath.startsWith(`${normalizedHref}/`)
    })

    const breadcrumbItems: BreadcrumbItem[] = []

    if (selectedItem) {
        breadcrumbItems.push({
            label: selectedItem.label,
            href: selectedItem.href,
            icon: selectedItem.icon,
        })

        const normalizedHref = selectedItem.href.replace(/\/$/, '')
        const remainder = normalizedPath.slice(normalizedHref.length).replace(/^\/+/, '')

        if (remainder) {
            const segments = remainder.split('/').filter(Boolean)
            let accumulatedPath = normalizedHref

            segments.forEach((segment) => {
                accumulatedPath += `/${segment}`
                const label = segment
                    .split('-')
                    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                    .join(' ')

                breadcrumbItems.push({
                    label,
                    href: accumulatedPath,
                })
            })
        }
    } else {
        breadcrumbItems.push(
            ...breadcrumbs.map((crumb, index) => ({
                label: crumb,
                href: index === 0 ? basePaths[resolvedPortal] : '#',
            }))
        )
    }

    const innerClasses = clsx(
        'flex items-center justify-between py-6',
        containerClassName ?? 'px-[32px]'
    )

    return (
        <header className="w-full bg-white">
            <div className={innerClasses}>
                <Breadcrumbs items={breadcrumbItems} />

                <div className="flex items-center gap-6">
                    <nav className="flex items-center gap-4 text-sm font-medium text-secondary-900">
                        {quickLinks.map((link) => (
                            <Link key={link.id} href={link.href} className="inline-flex items-center gap-2 hover:text-[#AF0F2A]">
                                {link.icon && <Icon name={link.icon} size={16} className="text-current" />}
                                {link.label}
                            </Link>
                        ))}
                    </nav>
                    <div className="flex items-center gap-[16px]">
                        <div className="flex items-center gap-[16px]">
                            {actions.map((action) => (
                                <Button variant="tertiary" size="sm" className='px-0 text-secondary-900 '
                                    key={action.id}
                                    type="button"

                                >
                                    <Icon name={action.icon} className="text-current" />
                                </Button>
                            ))}
                        </div>

                        <div className="w-max flex items-center gap-3">
                            <div className='flex items-center gap-[16px]'>
                                <div className="w-max flex items-center justify-center">
                                    <Icon name="iconAvatar" />
                                </div>
                                <div className="w-max flex flex-col">
                                    <span className="w-max text-sm font-semibold text-secondary-900 pb-[2px]">{user.name}</span>
                                    <span className="w-max text-sm text-secondary-600">{user.role}</span>
                                </div>
                                <div>
                                    <Button variant="tertiary" size="sm" className='px-0'>
                                        <Icon name='iconFlechaDupla' className='text-secondary-900' />
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    )
}
