import { PortalSlug } from '@/types/data/portal-config.types'
import type { UserMenuContent } from '@/types/dashboard/modal-user-menu.types'

const userMenuContents: Record<PortalSlug, UserMenuContent> = {
    beneficiario: {
        sections: [
            {
                id: 'general',
                title: 'GERAL',
                items: [
                    { id: 'permissions-MUM', label: 'Gerenciar Permissões', href: '#', icon: 'iconPermissoes' },
                    { id: 'debit-MUM', label: 'Autorizar Débito/Crédito', href: '#', icon: 'iconDebito' },
                ],
            },
            {
                id: 'others',
                title: 'OUTROS',
                items: [
                    { id: 'data-MUM', label: 'Alterar Dados Cadastrais', href: '#', icon: 'iconDadosCadastrais' },
                    { id: 'ir-MUM', label: 'Declaração de IR', href: '#', icon: 'iconIRPF' },
                    { id: 'quitacao-MUM', label: 'Declaração quitação anual', href: '#', icon: 'iconDeclQuitAnual' },
                ],
            },
        ],
    },
    dentista: {
        sections: [
            {
                id: 'general',
                title: '',
                items: [
                    { id: 'files-MUM', label: 'Arquivos úteis', href: '#', icon: 'iconArquivosUteis' },
                    { id: 'gto-MUM', label: 'Liberação GTO', href: '#', icon: 'iconLiberGto' },
                    { id: 'data-MUM', label: 'Alterar Dados Cadastrais', href: '#', icon: 'iconDadosCadastrais' },
                    { id: 'irpf-MUM', label: 'Declaração de IRPF', href: '#', icon: 'iconIRPF' },
                ],
            },
            {
                id: 'others',
                title: 'OUTROS',
                items: [
                    { id: 'school-MUM', label: 'Escola odontológica', href: '#', icon: 'iconLinkCta' },
                    { id: 'advisors-MUM', label: 'Membros conselheiros', href: '#', icon: 'iconLinkCta' },
                ],
            },
        ],
    },
    comercial: {
        sections: [
            {
                id: 'general',
                title: '',
                items: [
                    { id: 'files-MUM', label: 'Arquivos úteis', href: '#', icon: 'iconArquivosUteis' },
                ],
            },
            {
                id: 'others',
                title: 'OUTROS',
                items: [
                    { id: 'school-MUM', label: 'Escola odontológica', href: '#', icon: 'iconLinkCta' },
                    { id: 'irpf-MUM', label: 'Declaração IRPF', href: '#', icon: 'iconLinkCta' },
                    { id: 'data-MUM', label: 'Dados cadastrais', href: '#', icon: 'iconLinkCta' },
                    { id: 'advisors-MUM', label: 'Membros conselheiros', href: '#', icon: 'iconLinkCta' },
                ],
            },
        ],
    },
    empresa: {
        sections: [
            {
                id: 'general',
                title: '',
                items: [
                    { id: 'home-MUM', label: 'Dashboard', href: '#', icon: 'iconHome' },
                    { id: 'files-MUM', label: 'Arquivos úteis', href: '#', icon: 'iconArquivosUteis' },
                    { id: 'dental-MUM', label: 'Dental Uni', href: '#', icon: 'iconFaviconDental' },
                ],
            },
            {
                id: 'system',
                title: 'SISTEMA INTEGRADO ODONTOLÓGICO',
                items: [
                    { id: 'payment-MUM', label: 'Pagamento online', href: '#', icon: 'iconPagamentoOnline' },
                    { id: 'gto-MUM', label: 'Liberação GTO', href: '#', icon: 'iconLiberGto' },
                    { id: 'component-MUM', label: 'Componente cadastral', href: '#', icon: 'iconClassificados' },
                    { id: 'movimentacao-MUM', label: 'Movimentação cadastral', href: '#', icon: 'iconRelatorioProdChart' },
                ],
            },
            {
                id: 'others',
                title: 'OUTROS',
                items: [
                    { id: 'network-MUM', label: 'Rede credenciada', href: '#', icon: 'iconProtocolo' },
                ],
            },
        ],
    },
    representante: {
        sections: [
            {
                id: 'general',
                title: '',
                items: [
                    { id: 'home-MUM', label: 'Dashboard', href: '#', icon: 'iconHome' },
                    { id: 'files-MUM', label: 'Arquivos úteis', href: '#', icon: 'iconArquivosUteis' },
                    { id: 'dental-MUM', label: 'Dental Uni', href: '#', icon: 'iconFaviconDental' },
                ],
            },
            {
                id: 'system',
                title: 'SISTEMA INTEGRADO ODONTOLÓGICO',
                items: [
                    { id: 'payment-MUM', label: 'Pagamento online', href: '#', icon: 'iconPagamentoOnline' },
                    { id: 'gto-MUM', label: 'Liberação GTO', href: '#', icon: 'iconLiberGto' },
                    { id: 'component-MUM', label: 'Componente cadastral', href: '#', icon: 'iconClassificados' },
                    { id: 'movimentacao-MUM', label: 'Movimentação cadastral', href: '#', icon: 'iconRelatorioProdChart' },
                ],
            },
            {
                id: 'others',
                title: 'OUTROS',
                items: [
                    { id: 'network-MUM', label: 'Rede credenciada', href: '#', icon: 'iconProtocolo' },
                ],
            },
        ],
    },
}

export function getUserMenuContent(portal: PortalSlug = 'dentista'): UserMenuContent {
    const content = userMenuContents[portal]

    if (!content) {
        const defaultPortal: PortalSlug = Object.keys(userMenuContents)[0] as PortalSlug
        return userMenuContents[defaultPortal]
    }

    return content
}
