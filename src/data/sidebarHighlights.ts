import type { PortalSlug } from '@/types/data/portal-config.types'
import type { SidebarHighlight } from '@/types/data/sidebar.types'

export const basePaths = {
    beneficiario: '/portal-beneficiario',
    dentista: '/portal-dentista',
    comercial: '/portal-comercial',
    empresa: '/portal-empresa',
    representante: '/portal-representante',
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
    comercial: {
        title: '53 clientes',
        subtitle: 'Empresas e beneficiários',
        helperText: 'Atualize a carteira',
        ctaLabel: 'Adicionar cliente',
        ctaHref: `${basePaths.comercial}/clientes/novo`,
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
