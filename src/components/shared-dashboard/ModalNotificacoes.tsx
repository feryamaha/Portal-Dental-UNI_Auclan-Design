'use client'

import { HeaderNotificacoes } from '@/components/ui/HeaderNotificacoes'
import { SubCardNotificacoes } from '@/components/ui/SubCardNotificacoes'
import { useNotificacoesData } from '@/hooks/hook-fetch-API'
import { Icon } from '@/script/Icon'
import type { ModalNotificacoesProps, NotificacoesPorMes, NotificacaoItem } from '@/types/shared/notificacoes.types'

export function ModalNotificacoes({ portal, onClose }: ModalNotificacoesProps) {
    const { data, loading, error } = useNotificacoesData(portal)

    const handleClose = onClose || (() => { })

    return (
        <div className="w-[568px] h-full bg-neutral-50 absolute top-0 right-0 shadow-2xl z-60 flex flex-col">
            <HeaderNotificacoes onClose={handleClose} />
            <div className='bg-neutral-50 w-full h-full rounded-tl-2xl rounded-tr-2xl mt-[3px] flex flex-col overflow-hidden relative'>
                <div className="w-full flex-1 overflow-y-auto scrollbar-none">
                    {loading && (
                        <div className="py-8 text-center">
                            <p className="text-neutral-500 animate-pulse">Carregando notificações...</p>
                        </div>
                    )}

                    {error && (
                        <div className="py-8 text-center">
                            <p className="text-error-default">{error}</p>
                        </div>
                    )}

                    {!loading && !error && data.length > 0 ? (
                        <div className="space-y-1">
                            {data.map((mesData: NotificacoesPorMes, mesIndex) => {
                                const isLastMonth = mesIndex === data.length - 1
                                return (
                                    <div
                                        key={`${mesData.mes}-${mesData.ano}`}
                                        className={`bg-white w-full rounded-2xl flex flex-col overflow-hidden ${isLastMonth ? 'pb-[80px]' : ''}`}
                                    >
                                        <div className="w-full px-5 py-5 space-y-1">
                                            <h2 className="font-inter text-lg font-semibold text-neutral-900 mb-[16px]">
                                                {mesData.mes}, {mesData.ano}
                                            </h2>
                                            <div className="space-y-2">
                                                {mesData.notificacoes.map((notificacao: NotificacaoItem, index) => {
                                                    const hasDivider = index < mesData.notificacoes.length - 1

                                                    return (
                                                        <div key={notificacao.id}>
                                                            <SubCardNotificacoes
                                                                id={notificacao.id}
                                                                icon={notificacao.icon}
                                                                titulo={notificacao.titulo}
                                                                descricao={notificacao.descricao}
                                                                data={notificacao.data}
                                                                link={notificacao.link}
                                                            />
                                                            {hasDivider && (
                                                                <div className="relative flex gap-[16px] h-0 pointer-events-none my-4">
                                                                    <div className="w-[32px] relative">
                                                                        <Icon
                                                                            name="iconDivisorTracejado"
                                                                            className="text-neutral-200 absolute left-1/2 -translate-x-1/2 -top-[120px]"
                                                                        />
                                                                    </div>
                                                                    <div className="flex-1" />
                                                                </div>
                                                            )}
                                                        </div>
                                                    )
                                                })}
                                            </div>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    ) : !loading && !error && data.length === 0 ? (
                        <div className="py-8 text-center">
                            <p className="text-neutral-500">Nenhuma notificação disponível</p>
                        </div>
                    ) : null}
                </div>
            </div>
            <div
                className="w-full h-[80px] bg-[url('/assets/images/bg-opacity-modal-compare-plans.webp')]
                 bg-cover bg-no-repeat absolute bottom-0 left-0 rotate-180 transform origin-center"
            ></div>
        </div>
    )
}
