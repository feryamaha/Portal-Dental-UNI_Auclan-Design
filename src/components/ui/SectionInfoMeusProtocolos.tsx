
import { Button } from '@/components/ui/Button'
import { Icon } from '@/script/Icon'
import { ProtocolPriorityTag } from '@/components/ui/ProtocolPriorityTag'
import type { SectionInfoMeusProtocolosProps } from '@/types/ui/section-info-meus-protocolos.types'

export function SectionInfoMeusProtocolos({ protocols, className }: SectionInfoMeusProtocolosProps) {
    return (
        <div className={`w-full flex flex-col ${className ?? ''}`}>
            <div className="w-full grid grid-cols-[150px_124px_1fr_224px] gap-[16px] px-[16px] py-[12px] bg-neutral-50 sticky top-0 z-10 items-center">
                <div className="flex items-center justify-center text-sm font-medium text-neutral-600">Protocolo</div>
                <div className="flex items-center gap-[8px] text-sm font-medium text-neutral-600 pl-[24px]">
                    Data
                    <Icon name="iconFlechaDupla" className="text-neutral-600" />
                </div>
                <div className="text-sm font-medium text-neutral-600">Assunto</div>
                <div className="text-sm font-medium text-neutral-600 pl-[8px]">Status</div>
            </div>

            <div className="w-full flex flex-col divide-y divide-neutral-100 bg-white">
                {protocols.map((protocol) => (
                    <div
                        key={protocol.protocolNumber}
                        className="w-full grid grid-cols-[150px_124px_1fr_224px] gap-[16px] p-[12px] items-center"
                    >
                        {/* Protocolo */}
                        <div className="flex items-center gap-[8px] min-w-0">
                            <div className="w-[44px] h-[44px] flex items-center justify-center">
                                {protocol.priorityType && <ProtocolPriorityTag priorityType={protocol.priorityType} iconOnly />}
                            </div>
                            <div className="flex min-w-0 p-[2px_8px] border border-neutral-100 rounded-[8px] bg-neutral-25
                            shadow-[0_1px_4px_0_rgba(0,0,0,0.08),0_1px_2px_0_rgba(25,25,25,0.08)]
                            text-xs text-neutral-800 font-normal
                            ">
                                {/* Exibe o primeiro dígito fixo # */}
                                {/* Não deletar se precisar usar direto da API e não hardcoded */}
                                {/* {protocol.protocolNumber.slice(0, 1)} */}
                                <span className="shrink-0">
                                    #
                                </span>

                                {/* Trunca todo o restante mostrando apenas o final */}
                                <span className="truncate [direction:rtl] text-left">
                                    {protocol.protocolNumber.slice(1)}
                                </span>
                            </div>
                        </div>
                        {/* Data */}
                        <div className="text-sm font-medium text-neutral-900 whitespace-nowrap pl-[24px]">
                            {new Date(protocol.receivedAt).toLocaleDateString('pt-BR')}
                        </div>
                        {/* Assunto */}
                        <div className="text-sm font-medium text-neutral-900 whitespace-nowrap">{protocol.subject}</div>
                        {/* Status */}
                        <div className="flex items-center justify-between">
                            {/* CODIGO LEGADO NÃO DELETAR - USAR PARA EDIÇÃO FUTURA */}
                            {/* <Badge variant={protocol.statusVariant || 'info'}>{protocol.statusLabel}</Badge> */}
                            <div className='w-max flex items-center bg-auxiliary-info-background border border-auxiliary-info-border rounded-[8px] p-[2px_8px] '>
                                <span className='w-full text-xs font-medium text-auxiliary-info-default whitespace-nowrap'> {protocol.status}</span>
                            </div>
                            <div>
                                <Button
                                    variant="tertiary"
                                    size="sm"
                                    className="w-max p-0 text-neutral-700"
                                >
                                    <Icon name="iconButtonMais" />
                                </Button>
                            </div>

                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

