import { PortalSlug } from '@/context/tela-login/portalConfig'

export type TopbarQuickLink = {
    id: string
    label: string
    href: string
    icon?: string
}

export type TopbarAction = {
    id: string
    icon: string
    href?: string
}

export type TopbarUser = {
    name: string
    role: string
}

export type TopbarConfig = {
    breadcrumbs: string[]
    quickLinks: TopbarQuickLink[]
    actions: TopbarAction[]
    user: TopbarUser
}

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
