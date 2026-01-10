import { Icon } from "@/script/Icon";
import type { SubCardNotificacoesProps } from "@/types/shared/notificacoes.types";
import { Button } from "./Button";

export function SubCardNotificacoes({
    id,
    icon,
    titulo,
    descricao,
    data,
    link
}: SubCardNotificacoesProps) {
    return (
        <div className="h-[146px] flex gap-[16px]">
            <div className="w-[32px] h-[32px] flex items-center justify-center bg-neutral-50 border border-neutral-100 rounded-full relative">
                <Icon name={icon} className="text-neutral-700 " />
                <Icon name="iconPointBorderText" className="text-accent-default absolute -top-[2px] -right-[2px] w-[12px] h-[12px]" />
            </div>
            <div className="flex-1 flex flex-col gap-[8px]">
                <h3 className="font-inter text-sm font-semibold text-neutral-900">
                    {titulo}
                </h3>
                <p className="font-inter text-sm text-neutral-900 line-clamp-2">
                    {descricao}
                </p>
                <p className="font-inter font-light text-sm text-neutral-600">
                    {data}
                </p>
                <div className="w-full flex items-center gap-[24px] mt-[8px]">

                    <div className="w-[92px]">
                        <Button variant="secondary" size="sm" className="w-full bg-white text-neutral-800 font-medium">
                            Ir até lá
                        </Button>
                    </div>


                    <div className="w-max">
                        <Button
                            variant="tertiary"
                            size="default"
                            positionIcon="left"
                            className="w-max"
                        >
                            <Icon name="iconDuploCheck" />
                            Marcar como lido
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}
