'use client'

import { usePortalContentLogic } from '@/hooks/hooks-dash/usePortalContentLogic.hook'
import { HomeRepresentante } from '@/components/main-content/representante/HomeRepresentante'
import { RepresentanteProtocolosContent } from '@/components/main-content/representante/RepresentanteProtocolosContent'
import { RepresentanteGuiasContent } from '@/components/main-content/representante/RepresentanteGuiasContent'
import { RepresentanteClientesContent } from '@/components/main-content/representante/RepresentanteClientesContent'
import { RepresentanteVendedoresContent } from '@/components/main-content/representante/RepresentanteVendedoresContent'
import { RepresentanteDashboardContent } from '@/components/main-content/representante/RepresentanteDashboardContent'
import { RepresentanteArquivosContent } from '@/components/main-content/representante/RepresentanteArquivosContent'
import { RepresentanteVendasContent } from '@/components/main-content/representante/RepresentanteVendasContent'
import { RepresentanteProspectContent } from '@/components/main-content/representante/RepresentanteProspectContent'

export default function PortalRepresentanteDynamicPage() {
    const { currentContent } = usePortalContentLogic()

    return (
        <>
            {currentContent === 'home' && <HomeRepresentante />}
            {currentContent === 'protocolos' && <RepresentanteProtocolosContent />}
            {currentContent === 'guias' && <RepresentanteGuiasContent />}
            {currentContent === 'clientes' && <RepresentanteClientesContent />}
            {currentContent === 'vendedores' && <RepresentanteVendedoresContent />}
            {currentContent === 'dashboard' && <RepresentanteDashboardContent />}
            {currentContent === 'arquivos' && <RepresentanteArquivosContent />}
            {currentContent === 'vendas' && <RepresentanteVendasContent />}
            {currentContent === 'prospect' && <RepresentanteProspectContent />}
        </>
    )
}
