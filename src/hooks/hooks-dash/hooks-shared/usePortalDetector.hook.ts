"use client"

import { usePathname } from 'next/navigation'

import type { PortalSlug } from '@/types/data/portal-config.types'
import { basePaths } from '@/data/sidebarHighlights'
import { inferPortalFromPathname, isActiveHref } from '@/utils/dashboard-path.helpers'

export function usePortalDetector(params: { portal?: PortalSlug }) {
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
