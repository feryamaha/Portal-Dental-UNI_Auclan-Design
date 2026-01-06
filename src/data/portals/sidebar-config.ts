import { PortalSlug } from '@/types/data/portal-config.types'
import { sidebarHighlights, basePaths } from '@/data/sidebarHighlights'

import type {
    SidebarConfig,
    SidebarContent,
    SidebarHighlight,
    SidebarItem,
    SidebarSection,
} from '@/types/data/sidebar.types'

export type {
    SidebarConfig,
    SidebarContent,
    SidebarHighlight,
    SidebarItem,
    SidebarSection,
} from '@/types/data/sidebar.types'

const sidebarContents: Record<PortalSlug, SidebarContent> = {
    beneficiario: {
        highlight: sidebarHighlights.beneficiario,
        sections: [
            {
                id: 'general',
                title: 'GERAL',
                items: [
                    { id: 'home', label: 'Home', href: basePaths.beneficiario, icon: 'iconHome' },
                    { id: 'protocols', label: 'Meus protocolos', href: `${basePaths.beneficiario}/protocolos`, icon: 'iconProtocolo', badge: '2' },
                    { id: 'guides', label: 'Minhas Guias', href: `${basePaths.beneficiario}/guias`, icon: 'iconCalendSimples' },
                    { id: 'cards', label: 'Cartões Dental Uni', href: `${basePaths.beneficiario}/cartoes`, icon: 'iconCartoesDentalUni' },
                    { id: 'invoices', label: 'Meus boletos', href: `${basePaths.beneficiario}/boletos`, icon: 'iconMeusBoletos' },
                    { id: 'plan', label: 'Meu plano', href: `${basePaths.beneficiario}/plano`, icon: 'iconMeuPlano' },
                    { id: 'data', label: 'Dados cadastrais', href: `${basePaths.beneficiario}/dados-cadastrais`, icon: 'iconDadosCadastrais' },
                ],
            },
            {
                id: 'others',
                title: 'OUTROS',
                items: [
                    { id: 'ir', label: 'Declaração de IR', href: `${basePaths.beneficiario}/declaracao-ir`, icon: 'iconIRPF' },
                    { id: 'quitacao', label: 'Declaração quitação anual', href: `${basePaths.beneficiario}/quitacao-anual`, icon: 'iconDeclQuitAnual' },
                    { id: 'payment', label: 'Pagamento online', href: `${basePaths.beneficiario}/pagamentos`, icon: 'iconPagamentoOnline' },
                    { id: 'pin', label: 'PIN-SS', href: `${basePaths.beneficiario}/pin-ss`, icon: 'iconPINSS' },
                    { id: 'invoice', label: 'Nota fiscal', href: `${basePaths.beneficiario}/nota-fiscal`, icon: 'iconNotaFiscal' },
                ],
            },
        ],
    },
    dentista: {
        highlight: sidebarHighlights.dentista,
        sections: [
            {
                id: 'general',
                title: 'GERAL',
                items: [
                    { id: 'home', label: 'Home', href: basePaths.dentista, icon: 'iconHome' },
                    { id: 'protocols', label: 'Meus protocolos', href: `${basePaths.dentista}/protocolos`, icon: 'iconProtocolo', badge: '3' },
                    { id: 'files', label: 'Arquivos úteis', href: `${basePaths.dentista}/arquivos`, icon: 'iconArquivosUteis' },
                    { id: 'calendar', label: 'Calendário', href: `${basePaths.dentista}/calendario`, icon: 'iconCalendSimples' },
                    { id: 'invoices', label: 'Faturas', href: `${basePaths.dentista}/faturas`, icon: 'iconFatura' },
                    { id: 'classifieds', label: 'Classificados', href: `${basePaths.dentista}/classificados`, icon: 'iconClassificados' },
                ],
            },
            {
                id: 'others',
                title: 'OUTROS',
                items: [
                    { id: 'data', label: 'Dados cadastrais', href: `${basePaths.dentista}/dados-cadastrais`, icon: 'iconDadosCadastrais' },
                    { id: 'irpf', label: 'Demonstrativo IRPF', href: `${basePaths.dentista}/demonstrativo-irpf`, icon: 'iconIRPF' },
                    { id: 'income', label: 'Informe de rendimentos', href: `${basePaths.dentista}/informe-rendimentos`, icon: 'iconInformeRendimentos' },
                    { id: 'gto', label: 'Liberação de GTO', href: `${basePaths.dentista}/liberacao-gto`, icon: 'iconLiberGto' },
                    { id: 'reports', label: 'Relatório de produção', href: `${basePaths.dentista}/relatorio-producao`, icon: 'iconRelatorioProdChart' },
                    { id: 'sales', label: 'Vendas PF', href: `${basePaths.dentista}/vendas-pf`, icon: 'iconVendasPf' },
                ],
            },
        ],
    },
    comercial: {
        highlight: sidebarHighlights.comercial,
        sections: [
            {
                id: 'general',
                title: 'GERAL',
                items: [
                    { id: 'home', label: 'Home', href: basePaths.comercial, icon: 'iconHome' },
                    { id: 'guides', label: 'Minhas Guias', href: `${basePaths.comercial}/guias`, icon: 'iconCalendSimples' },
                    { id: 'clients', label: 'Clientes', href: `${basePaths.comercial}/clientes`, icon: 'iconProtocolo' },
                    { id: 'dashboard', label: 'Dashboard', href: `${basePaths.comercial}/dashboard`, icon: 'iconRelatorioProdChart' },
                    { id: 'files', label: 'Arquivos úteis', href: `${basePaths.comercial}/arquivos`, icon: 'iconArquivosUteis' },
                ],
            },
            {
                id: 'others',
                title: 'OUTROS',
                items: [
                    { id: 'ecommerce', label: 'E-commerce', href: `${basePaths.comercial}/ecommerce`, icon: 'iconVendasPf' },
                    { id: 'prospect', label: 'Prospect', href: `${basePaths.comercial}/prospect`, icon: 'iconClassificados' },
                ],
            },
        ],
    },
    empresa: {
        highlight: sidebarHighlights.empresa,
        sections: [
            {
                id: 'general',
                title: 'GERAL',
                items: [
                    { id: 'home', label: 'Home', href: basePaths.empresa, icon: 'iconHome' },
                    { id: 'protocols', label: 'Meus protocolos', href: `${basePaths.empresa}/protocolos`, icon: 'iconProtocolo', badge: '2' },
                    { id: 'guides', label: 'Minhas Guias', href: `${basePaths.empresa}/guias`, icon: 'iconCalendSimples' },
                    { id: 'boletos', label: 'Boletos', href: `${basePaths.empresa}/boletos`, icon: 'iconFatura' },
                    { id: 'beneficiarios', label: 'Beneficiários', href: `${basePaths.empresa}/beneficiarios`, icon: 'iconDadosCadastrais' },
                    { id: 'dashboard', label: 'Dashboard', href: `${basePaths.empresa}/dashboard`, icon: 'iconRelatorioProdChart' },
                    { id: 'files', label: 'Arquivos úteis', href: `${basePaths.empresa}/arquivos`, icon: 'iconArquivosUteis' },
                ],
            },
            {
                id: 'others',
                title: 'OUTROS',
                items: [
                    { id: 'data', label: 'Dados cadastrais', href: `${basePaths.empresa}/dados-cadastrais`, icon: 'iconDadosCadastrais' },
                    { id: 'irpf', label: 'Demonstrativo IRPF', href: `${basePaths.empresa}/demonstrativo-irpf`, icon: 'iconIRPF' },
                    { id: 'invoice', label: 'Emissão nota fiscal', href: `${basePaths.empresa}/nota-fiscal`, icon: 'iconFatura' },
                    { id: 'gto', label: 'Liberação GTO', href: `${basePaths.empresa}/liberacao-gto`, icon: 'iconLiberGto' },
                    { id: 'component', label: 'Componente cadastral', href: `${basePaths.empresa}/componente-cadastral`, icon: 'iconClassificados' },
                    { id: 'movimentacao', label: 'Movimentação cadastral', href: `${basePaths.empresa}/movimentacao-cadastral`, icon: 'iconRelatorioProdChart' },
                ],
            },
        ],
    },
    representante: {
        highlight: sidebarHighlights.representante,
        sections: [
            {
                id: 'general',
                title: 'GERAL',
                items: [
                    { id: 'home', label: 'Home', href: basePaths.representante, icon: 'iconHome' },
                    { id: 'protocols', label: 'Meus protocolos', href: `${basePaths.representante}/protocolos`, icon: 'iconProtocolo', badge: '2' },
                    { id: 'guides', label: 'Minhas Guias', href: `${basePaths.representante}/guias`, icon: 'iconCalendSimples' },
                    { id: 'clients', label: 'Clientes', href: `${basePaths.representante}/clientes`, icon: 'iconProtocolo' },
                    { id: 'sellers', label: 'Vendedores', href: `${basePaths.representante}/vendedores`, icon: 'iconLiberGto' },
                    { id: 'dashboard', label: 'Dashboard', href: `${basePaths.representante}/dashboard`, icon: 'iconRelatorioProdChart' },
                    { id: 'files', label: 'Arquivos úteis', href: `${basePaths.representante}/arquivos`, icon: 'iconArquivosUteis' },
                ],
            },
            {
                id: 'others',
                title: 'OUTROS',
                items: [
                    { id: 'sales', label: 'Vendas PF e PME', href: `${basePaths.representante}/vendas`, icon: 'iconVendasPf' },
                    { id: 'prospect', label: 'Prospect', href: `${basePaths.representante}/prospect`, icon: 'iconClassificados' },
                ],
            },
        ],
    },
}

export function getSidebarContent(portal: PortalSlug = 'dentista'): SidebarContent {
    const content = sidebarContents[portal]

    if (!content) {
        return sidebarContents.dentista
    }

    return content
}
