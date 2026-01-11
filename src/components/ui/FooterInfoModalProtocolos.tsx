import { Button } from '@/components/ui/Button'
import { Icon } from '@/script/Icon'
import type { FooterInfoModalProtocolosProps } from '@/types/ui/footer-info-modal-protocolos.types'

export function FooterInfoModalProtocolos({
    onPrevious,
    onNext,
    disablePrevious = false,
    disableNext = false,
}: FooterInfoModalProtocolosProps) {
    return (
        <footer className="w-full flex flex-col items-center justify-between bg-white border-t border-neutral-50">
            <div className="w-full h-[152px] flex items-center justify-between px-[20px]">
                <div className='w-[120px]'>
                    <h3 className="w-full font-inter text-2xl font-semibold text-neutral-900">Atenção ao protocolos!</h3>
                </div>
                <div className='max-w-[470px]'>
                    <p className="w-full font-inter text-base font-normal text-neutral-900">
                        Lembre-se, os protocolos são os principais meios de conexão entre Dental Uni, Cooperado e Beneficiários.
                    </p>
                </div>
            </div>

            <div className="w-full flex items-center justify-end gap-[12px] p-[16px_20px]">
                <div className="flex items-center gap-[8px]">
                    <div className='w-[32px] h-[32px] flex items-center justify-center bg-accent-light rounded-md'>
                        <Icon name="iconPointText" className='text-accent-default w-[7px] h-[7px]' />
                    </div>
                    <div className='w-[32px] h-[32px] flex items-center justify-center '>
                        <Icon name="iconPointText" className='text-neutral-600 w-[7px] h-[7px]' />
                    </div>
                </div>

                <div className="flex items-center gap-[12px]">
                    <Button
                        variant="tertiary"
                        size="md"
                        disabled
                        onClick={onPrevious}
                        className='w-max'
                    >
                        Voltar
                    </Button>
                    <Button
                        variant="primary"
                        size="md"
                        disabled={disableNext}
                        onClick={onNext}
                        className='w-max'
                    >
                        Avançar
                    </Button>
                </div>
            </div>
        </footer>
    )
}
