import { Button } from '@/components/ui/Button'
import { Icon } from '@/script/Icon'
import type { FooterConsentimentoModalProtocolosProps } from '@/types/ui/footer-consentimento-modal-protocolos.types'

export function FooterConsentimentoModalProtocolos({
    isCheckboxChecked,
    onCheckboxChange,
    onGoBack,
    onConfirm,
}: FooterConsentimentoModalProtocolosProps) {
    return (
        <footer className="w-full flex flex-col items-center justify-between bg-white border-t border-neutral-50">
            <div className="w-full h-[140px] flex items-center justify-between px-[20px]">
                <div className='w-[220px]'>
                    <h3 className="w-full font-inter text-2xl font-semibold text-neutral-900">Cuidado quando for gerar token para os beneficiários</h3>
                </div>
                <div className='max-w-[470px]'>
                    <p className="w-full font-inter text-base font-normal text-neutral-900">
                        Para mais informações sobre os tokens, entre em contato com o GRC Atendimentos ou pelos telefones disponíveis acima.d adasdadadadadsda adasd asda ada dadasdadadasdasdada
                    </p>
                </div>
            </div>
            <div className="w-full flex items-center justify-end gap-[12px] p-[16px_20px]">
                <div className="w-full flex items-start gap-[8px]">
                    <input
                        type="checkbox"
                        id="consent-check"
                        checked={isCheckboxChecked}
                        onChange={(e) => onCheckboxChange(e.target.checked)}
                        className="w-[16px] h-[16px] cursor-pointer accent-primary-600 rounded-[5px]"
                        aria-label="Aceitar termos e consentimento"
                    />
                    <label htmlFor="consent-check" className="font-inter text-sm font-medium text-neutral-900 cursor-pointer">
                        Li e entendi. Não mostrar novamente.
                    </label>
                </div>

                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-[8px]">
                        <div className='w-[32px] h-[32px] flex items-center justify-center'>
                            <Icon name="iconPointText" className='text-neutral-600 w-[7px] h-[7px]' />
                        </div>
                        <div className='w-[32px] h-[32px] flex items-center justify-center bg-accent-light rounded-md'>
                            <Icon name="iconPointText" className='text-accent-default w-[7px] h-[7px]' />
                        </div>
                    </div>

                    <div className="flex items-center gap-[12px]">
                        <Button
                            variant="tertiary"
                            size="md"
                            className='w-max'
                            onClick={onGoBack}
                        >
                            Voltar
                        </Button>
                        <Button
                            variant="primary"
                            size="md"
                            className='w-max'
                            disabled={!isCheckboxChecked}
                            onClick={onConfirm}
                        >
                            Entendi, fechar
                        </Button>
                    </div>
                </div>
            </div>

        </footer>
    )
}
