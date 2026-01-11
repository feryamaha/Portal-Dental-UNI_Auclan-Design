import type { SubCardMeusProtocolosProps } from '@/types/ui/sub-card-meus-protocolos.types'

export interface ModalVerMaisProtocolosProps {
    isOpen: boolean
    protocols: SubCardMeusProtocolosProps[]
    onClose: () => void
    onProceedToConsent?: () => void
}

export interface ModalVerMaisProtocolosConsentimentoProps {
    isOpen: boolean
    onClose: () => void
    onConfirm: () => void
    onGoBack: () => void
}
