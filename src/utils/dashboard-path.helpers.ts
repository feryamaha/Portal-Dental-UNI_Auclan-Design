import type { PortalSlug } from '@/types/data/portal-config.types'

export function normalizePathname(pathname?: string) {
    return pathname?.replace(/\/$/, '') || ''
}

export function inferPortalFromPathname(pathname?: string): PortalSlug {
    if (!pathname) return 'dentista'

    const segments = pathname.split('/').filter(Boolean)
    const dashSegment = segments.find((segment) => segment.startsWith('dash-'))

    if (!dashSegment) return 'dentista'

    return dashSegment.replace('dash-', '') as PortalSlug
}

export function isActiveHref(params: {
    pathname?: string
    href: string
    portalBasePath: string
}) {
    const { pathname, href, portalBasePath } = params

    const normalizedPath = normalizePathname(pathname)
    const normalizedHref = normalizePathname(href)
    const isBaseLink = normalizedHref === portalBasePath

    return isBaseLink
        ? normalizedPath === normalizedHref
        : normalizedPath === normalizedHref || normalizedPath.startsWith(`${normalizedHref}/`)
}

export function humanizeKebabSegment(segment: string) {
    return segment
        .split('-')
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ')
}
