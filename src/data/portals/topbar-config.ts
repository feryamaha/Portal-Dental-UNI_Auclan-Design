import { PortalSlug } from '@/types/data/portal-config.types'

import type {
    TopbarAction,
    TopbarConfig,
    TopbarQuickLink,
    TopbarUser,
} from '@/types/data/topbar.types'

export type {
    TopbarAction,
    TopbarConfig,
    TopbarQuickLink,
    TopbarUser,
} from '@/types/data/topbar.types'

const defaultActions: TopbarAction[] = [
    { id: 'help', icon: 'iconDuvidas' },
    { id: 'notifications', icon: 'iconNotificacaoSino' },
]

const topbarConfigs: Record<PortalSlug, TopbarConfig> = {
    beneficiario: {
        breadcrumbs: ['Home'],
        quickLinks: [],
        actions: defaultActions,
        user: { name: 'Joaquim Jow', role: 'Titular' },
    },
    corretor: {
        breadcrumbs: ['Home'],
        quickLinks: [],
        actions: defaultActions,
        user: { name: 'Felipe Rossi', role: 'Corretor' },
    },
    empresa: {
        breadcrumbs: ['Home'],
        quickLinks: [],
        actions: defaultActions,
        user: { name: 'Maycon Martins', role: 'Empresa' },
    },
    representante: {
        breadcrumbs: ['Home'],
        quickLinks: [],
        actions: defaultActions,
        user: { name: 'Fernando M', role: 'Representante' },
    },
    dentista: {
        breadcrumbs: ['Home'],
        quickLinks: [
            { id: 'club', label: 'Dental Uni Club', href: '/dash-dentista/club', icon: 'iconLinkCta' },
            { id: 'workshop', label: 'Workshop 2024', href: '/dash-dentista/workshop', icon: 'iconLinkCta' },
        ],
        actions: [
            { id: 'help', icon: 'iconDuvidas' },
            { id: 'notifications', icon: 'iconNotificacaoSino' },
        ],
        user: {
            name: 'Jonatas Jow',
            role: 'Dentista',
        },
    },
}

export function getTopbarConfig(portal: PortalSlug = 'dentista'): TopbarConfig {
    const config = topbarConfigs[portal]
    return config ?? topbarConfigs.dentista
}
