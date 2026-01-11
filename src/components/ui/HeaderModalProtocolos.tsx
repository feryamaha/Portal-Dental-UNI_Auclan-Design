import { Icon } from "@/script/Icon"
import type { HeaderModalProtocolosProps } from "@/types/ui/header-modal-protocolos.types"

export function HeaderModalProtocolos({ title, statusMessage, onClose, className }: HeaderModalProtocolosProps) {
    return (
        <header className={`w-full flex items-start justify-between p-[24px_20px] ${className ?? ''}`}>
            <div className="flex flex-col gap-[8px]">
                <h2 className="font-inter text-2xl text-neutral-900 font-semibold">{title}</h2>
                <p className="font-inter text-sm text-neutral-700 font-normal">{statusMessage}</p>
            </div>
            <button
                onClick={onClose}
                className="border border-stroke-100 rounded-full p-1 cursor-pointer shadow-30 transition-colors 
                ease-in duration-200 hover:bg-neutral-25]"
                aria-label="Fechar modal"
            >
                <Icon name="iconClose" />
            </button>
        </header>
    )
}
