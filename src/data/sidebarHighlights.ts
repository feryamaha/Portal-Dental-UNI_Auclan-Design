import type { PortalSlug } from '@/context/tela-login/portalConfig'
import type { SidebarHighlight } from '@/context/dashboard/Sidebar/sidebar'

export const basePaths = {
    beneficiario: '/dash-beneficiario',
    dentista: '/dash-dentista',
    corretor: '/dash-comercial',
    empresa: '/dash-empresa',
    representante: '/dash-representante',
} as const

export const sidebarHighlights: Record<PortalSlug, SidebarHighlight | null> = {
    beneficiario: {
        title: 'Premium',
        pillLabel: 'Mensal',
        subtitle: '4 beneficiários',
        helperText: '',
        ctaLabel: 'Adicionar dependente',
        ctaHref: `${basePaths.beneficiario}/dependentes/novo`,
    },
    dentista: null,
    corretor: {
        title: '53 clientes',
        subtitle: 'Empresas e beneficiários',
        helperText: 'Atualize a carteira',
        ctaLabel: 'Adicionar cliente',
        ctaHref: `${basePaths.corretor}/clientes/novo`,
    },
    empresa: {
        title: 'Premium',
        pillLabel: 'Mensal',
        subtitle: '262 beneficiários',
        helperText: 'Plano corporativo',
        ctaLabel: 'Adicionar beneficiário',
        ctaHref: `${basePaths.empresa}/beneficiarios/novo`,
    },
    representante: {
        title: '00 clientes',
        subtitle: 'Empresas e beneficiários',
        helperText: 'Comece a prospectar',
        ctaLabel: 'Adicionar cliente',
        ctaHref: `${basePaths.representante}/clientes/novo`,
    },
}
