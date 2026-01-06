'use client'

import { usePortalContentLogic } from '@/hooks/hooks-dash/usePortalContentLogic.hook'
import { HomeComercial } from '@/components/main-content/comercial/HomeComercial'
import { ComercialGuiasContent } from '@/components/main-content/comercial/ComercialGuiasContent'
import { ComercialClientesContent } from '@/components/main-content/comercial/ComercialClientesContent'
import { ComercialDashboardContent } from '@/components/main-content/comercial/ComercialDashboardContent'
import { ComercialArquivosContent } from '@/components/main-content/comercial/ComercialArquivosContent'
import { ComercialEcommerceContent } from '@/components/main-content/comercial/ComercialEcommerceContent'
import { ComercialProspectContent } from '@/components/main-content/comercial/ComercialProspectContent'

export default function PortalComercialDynamicPage() {
    const { currentContent } = usePortalContentLogic()

    return (
        <>
            {currentContent === 'home' && <HomeComercial />}
            {currentContent === 'guias' && <ComercialGuiasContent />}
            {currentContent === 'clientes' && <ComercialClientesContent />}
            {currentContent === 'dashboard' && <ComercialDashboardContent />}
            {currentContent === 'arquivos' && <ComercialArquivosContent />}
            {currentContent === 'ecommerce' && <ComercialEcommerceContent />}
            {currentContent === 'prospect' && <ComercialProspectContent />}
        </>
    )
}
