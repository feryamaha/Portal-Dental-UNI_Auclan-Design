'use client'

import { usePortalContentLogic } from '@/hooks/hooks-dash/usePortalContentLogic.hook'
import { HomeEmpresa } from '@/components/main-content/empresa/HomeEmpresa'
import { EmpresaProtocolosContent } from '@/components/main-content/empresa/EmpresaProtocolosContent'
import { EmpresaGuiasContent } from '@/components/main-content/empresa/EmpresaGuiasContent'
import { EmpresaBoletosContent } from '@/components/main-content/empresa/EmpresaBoletosContent'
import { EmpresaBeneficiariosContent } from '@/components/main-content/empresa/EmpresaBeneficiariosContent'
import { EmpresaDashboardContent } from '@/components/main-content/empresa/EmpresaDashboardContent'
import { EmpresaArquivosContent } from '@/components/main-content/empresa/EmpresaArquivosContent'
import { EmpresaDadosCadastraisContent } from '@/components/main-content/empresa/EmpresaDadosCadastraisContent'
import { EmpresaDemonstrativoIRPFContent } from '@/components/main-content/empresa/EmpresaDemonstrativoIRPFContent'
import { EmpresaNotaFiscalContent } from '@/components/main-content/empresa/EmpresaNotaFiscalContent'
import { EmpresaLiberacaoGTOContent } from '@/components/main-content/empresa/EmpresaLiberacaoGTOContent'
import { EmpresaComponenteCadastralContent } from '@/components/main-content/empresa/EmpresaComponenteCadastralContent'
import { EmpresaMovimentacaoCadastralContent } from '@/components/main-content/empresa/EmpresaMovimentacaoCadastralContent'

export default function PortalEmpresaDynamicPage() {
    const { currentContent } = usePortalContentLogic()

    return (
        <>
            {currentContent === 'home' && <HomeEmpresa />}
            {currentContent === 'protocolos' && <EmpresaProtocolosContent />}
            {currentContent === 'guias' && <EmpresaGuiasContent />}
            {currentContent === 'boletos' && <EmpresaBoletosContent />}
            {currentContent === 'beneficiarios' && <EmpresaBeneficiariosContent />}
            {currentContent === 'dashboard' && <EmpresaDashboardContent />}
            {currentContent === 'arquivos' && <EmpresaArquivosContent />}
            {currentContent === 'dados-cadastrais' && <EmpresaDadosCadastraisContent />}
            {currentContent === 'demonstrativo-irpf' && <EmpresaDemonstrativoIRPFContent />}
            {currentContent === 'nota-fiscal' && <EmpresaNotaFiscalContent />}
            {currentContent === 'liberacao-gto' && <EmpresaLiberacaoGTOContent />}
            {currentContent === 'componente-cadastral' && <EmpresaComponenteCadastralContent />}
            {currentContent === 'movimentacao-cadastral' && <EmpresaMovimentacaoCadastralContent />}
        </>
    )
}
