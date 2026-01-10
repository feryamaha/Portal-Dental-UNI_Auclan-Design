import { Icon } from "@/script/Icon";
import type { HeaderNotificacoesProps } from "@/types/shared/notificacoes.types";

export function HeaderNotificacoes({ onClose }: HeaderNotificacoesProps) {
    return (
        <header className="w-full flex items-center justify-between rounded-bl-2xl rounded-br-2xl p-[20px] bg-white">
            <h2 className="font-inter text-2xl text-neutral-900 font-semibold">Notificações</h2>
            <div className="w-max flex items-center gap-[20px]">
                <button
                    className="w-[32px] h-[32px] flex items-center justify-center border border-stroke-100 rounded-full cursor-pointer"
                >
                    <Icon name="iconGerenciarPermissoes" />
                </button>
                <button
                    onClick={onClose}
                    className="w-[32px] h-[32px] flex items-center justify-center border border-stroke-100 rounded-full cursor-pointer"
                >
                    <Icon name="iconClose" />
                </button>
            </div>
        </header>
    )
}
