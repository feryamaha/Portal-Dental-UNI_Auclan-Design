'use client'

import { usePortalContentLogic } from '@/hooks/hooks-dash/usePortalContentLogic.hook'
import { HomeBeneficiario } from '@/components/main-content/beneficiario/HomeBeneficiario'
import { BeneficiarioProtocolosContent } from '@/components/main-content/beneficiario/BeneficiarioProtocolosContent'
import { BeneficiarioGuiasContent } from '@/components/main-content/beneficiario/BeneficiarioGuiasContent'
import { BeneficiarioCartoesContent } from '@/components/main-content/beneficiario/BeneficiarioCartoesContent'
import { BeneficiarioBoletosContent } from '@/components/main-content/beneficiario/BeneficiarioBoletosContent'
import { BeneficiarioPlanoContent } from '@/components/main-content/beneficiario/BeneficiarioPlanoContent'
import { BeneficiarioDadosCadastraisContent } from '@/components/main-content/beneficiario/BeneficiarioDadosCadastraisContent'

export default function PortalBeneficiarioDynamicPage() {
    const { currentContent } = usePortalContentLogic()

    return (
        <>
            {currentContent === 'home' && <HomeBeneficiario />}
            {currentContent === 'protocolos' && <BeneficiarioProtocolosContent />}
            {currentContent === 'guias' && <BeneficiarioGuiasContent />}
            {currentContent === 'cartoes' && <BeneficiarioCartoesContent />}
            {currentContent === 'boletos' && <BeneficiarioBoletosContent />}
            {currentContent === 'plano' && <BeneficiarioPlanoContent />}
            {currentContent === 'dados-cadastrais' && <BeneficiarioDadosCadastraisContent />}
        </>
    )
}
