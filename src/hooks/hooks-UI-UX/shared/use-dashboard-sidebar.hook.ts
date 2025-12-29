"use client"

import { usePathname } from 'next/navigation'

import type { PortalSlug } from '@/context/tela-login/portalConfig'
import { basePaths } from '@/data/sidebarHighlights'
import { inferPortalFromPathname, isActiveHref } from '@/utils/dashboard-path.helpers'

export function useDashboardSidebar(params: { portal?: PortalSlug }) {
    const { portal } = params

    const pathname = usePathname()
    const resolvedPortal = portal ?? inferPortalFromPathname(pathname)
    const portalBasePath = basePaths[resolvedPortal]

    return {
        pathname,
        resolvedPortal,
        portalBasePath,
        isActive: (href: string) =>
            isActiveHref({
                pathname,
                href,
                portalBasePath,
            }),
    }
}
