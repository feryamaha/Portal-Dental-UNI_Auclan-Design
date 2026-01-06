'use client'

import { usePortalContentLogic } from '@/hooks/hooks-dash/usePortalContentLogic.hook'
import { HomeDentista } from '@/components/main-content/dentista/HomeDentista'
import { DentistaProtocolosContent } from '@/components/main-content/dentista/DentistaProtocolosContent'
import { DentistaArquivosContent } from '@/components/main-content/dentista/DentistaArquivosContent'
import { DentistaCalendarioContent } from '@/components/main-content/dentista/DentistaCalendarioContent'
import { DentistaFaturasContent } from '@/components/main-content/dentista/DentistaFaturasContent'
import { DentistaClassificadosContent } from '@/components/main-content/dentista/DentistaClassificadosContent'
import { DentistaDadosCadastraisContent } from '@/components/main-content/dentista/DentistaDadosCadastraisContent'
import { DentistaDemonstrativoIRPFContent } from '@/components/main-content/dentista/DentistaDemonstrativoIRPFContent'
import { DentistaInformeRendimentosContent } from '@/components/main-content/dentista/DentistaInformeRendimentosContent'
import { DentistaLiberacaoGTOContent } from '@/components/main-content/dentista/DentistaLiberacaoGTOContent'
import { DentistaRelatorioProducaoContent } from '@/components/main-content/dentista/DentistaRelatorioProducaoContent'
import { DentistaVendasPFContent } from '@/components/main-content/dentista/DentistaVendasPFContent'

export default function PortalDentistaDynamicPage() {
    const { currentContent } = usePortalContentLogic()

    return (
        <>
            {currentContent === 'home' && <HomeDentista />}
            {currentContent === 'protocolos' && <DentistaProtocolosContent />}
            {currentContent === 'arquivos' && <DentistaArquivosContent />}
            {currentContent === 'calendario' && <DentistaCalendarioContent />}
            {currentContent === 'faturas' && <DentistaFaturasContent />}
            {currentContent === 'classificados' && <DentistaClassificadosContent />}
            {currentContent === 'dados-cadastrais' && <DentistaDadosCadastraisContent />}
            {currentContent === 'demonstrativo-irpf' && <DentistaDemonstrativoIRPFContent />}
            {currentContent === 'informe-rendimentos' && <DentistaInformeRendimentosContent />}
            {currentContent === 'liberacao-gto' && <DentistaLiberacaoGTOContent />}
            {currentContent === 'relatorio-producao' && <DentistaRelatorioProducaoContent />}
            {currentContent === 'vendas-pf' && <DentistaVendasPFContent />}
        </>
    )
}
