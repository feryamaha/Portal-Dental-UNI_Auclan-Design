"use client"

import { useMemo } from 'react'
import { usePathname } from 'next/navigation'

import { getSidebarContent } from '@/context/dashboard/Sidebar/sidebar'
import { getTopbarConfig } from '@/context/dashboard/Topbar/topbar'
import type { PortalSlug } from '@/context/tela-login/portalConfig'
import { basePaths } from '@/data/sidebarHighlights'
import type { BreadcrumbItem } from '@/types/ui/breadcrumbs.types'
import {
    humanizeKebabSegment,
    inferPortalFromPathname,
    isActiveHref,
    normalizePathname,
} from '@/utils/dashboard-path.helpers'

export function useDashboardTopbar(params: { portal?: PortalSlug }) {
    const { portal } = params

    const pathname = usePathname()
    const resolvedPortal = portal ?? inferPortalFromPathname(pathname)

    const config = useMemo(() => getTopbarConfig(resolvedPortal), [resolvedPortal])
    const sidebarContent = useMemo(() => getSidebarContent(resolvedPortal), [resolvedPortal])

    const breadcrumbItems = useMemo<BreadcrumbItem[]>(() => {
        const normalizedPath = normalizePathname(pathname)
        const flattenedItems = sidebarContent.sections.flatMap((section) => section.items)

        const selectedItem = flattenedItems.find((item) =>
            isActiveHref({
                pathname: normalizedPath,
                href: item.href,
                portalBasePath: basePaths[resolvedPortal],
            })
        )

        const items: BreadcrumbItem[] = []

        if (selectedItem) {
            items.push({
                label: selectedItem.label,
                href: selectedItem.href,
                icon: selectedItem.icon,
            })

            const normalizedHref = normalizePathname(selectedItem.href)
            const remainder = normalizedPath.slice(normalizedHref.length).replace(/^\/+/, '')

            if (remainder) {
                const segments = remainder.split('/').filter(Boolean)
                let accumulatedPath = normalizedHref

                segments.forEach((segment) => {
                    accumulatedPath += `/${segment}`

                    items.push({
                        label: humanizeKebabSegment(segment),
                        href: accumulatedPath,
                    })
                })
            }

            return items
        }

        items.push(
            ...config.breadcrumbs.map((crumb, index) => ({
                label: crumb,
                href: index === 0 ? basePaths[resolvedPortal] : '#',
            }))
        )

        return items
    }, [config.breadcrumbs, pathname, resolvedPortal, sidebarContent.sections])

    return {
        pathname,
        resolvedPortal,
        breadcrumbItems,
        ...config,
    }
}
