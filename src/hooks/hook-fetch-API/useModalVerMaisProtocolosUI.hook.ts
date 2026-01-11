import { useMemo } from 'react'
import type { SubCardMeusProtocolosProps } from '@/types/ui/sub-card-meus-protocolos.types'

export function useModalVerMaisProtocolosUI(protocols: SubCardMeusProtocolosProps[]) {
    const { obrigatoriosCount, naoLidosCount, statusMessage } = useMemo(() => {
        const obrigatorios = protocols.filter((p) => p.priorityType === 'obrigatorio').length
        const naoLidos = protocols.filter((p) => p.priorityType === 'nao-lido').length

        const status = `${obrigatorios} chamado${obrigatorios !== 1 ? 's' : ''} obrigatório${obrigatorios !== 1 ? 's' : ''} e ${naoLidos} não lido${naoLidos !== 1 ? 's' : ''}.`

        return {
            obrigatoriosCount: obrigatorios,
            naoLidosCount: naoLidos,
            statusMessage: status,
        }
    }, [protocols])

    return {
        obrigatoriosCount,
        naoLidosCount,
        statusMessage,
    }
}
