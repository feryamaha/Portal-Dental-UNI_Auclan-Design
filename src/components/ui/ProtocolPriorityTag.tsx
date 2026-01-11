import type { ProtocolPriorityType } from '@/types/ui/sub-card-meus-protocolos.types'
import { Icon } from '@/script/Icon'

type ProtocolPriorityTagProps = {
    priorityType?: ProtocolPriorityType
    iconOnly?: boolean
    className?: string
}

type PriorityText = 'Obrigatório' | 'Não lido'

interface PriorityMapItem {
    icon: string
    text: PriorityText
}

const priorityMap: Record<Exclude<ProtocolPriorityType, null | undefined>, PriorityMapItem> = {
    obrigatorio: {
        icon: 'iconObrigatorio',
        text: 'Obrigatório',
    },
    'nao-lido': {
        icon: 'iconPointBorderText',
        text: 'Não lido',
    },
    '': {
        icon: 'iconPointBorderText',
        text: 'Não lido',
    }
}

export function ProtocolPriorityTag({ priorityType, iconOnly = false }: ProtocolPriorityTagProps) {
    if (!priorityType || !priorityMap[priorityType]) {
        return null
    }

    const { icon, text } = priorityMap[priorityType]

    if (iconOnly) {
        return (
            <span className="flex items-center">
                <Icon name={icon} className='current' />
            </span>
        )
    }

    return (
        <span className="flex items-center gap-2 font-inter font-normal text-xs text-accent-default whitespace-nowrap">
            <span className="flex items-center">
                <Icon name={icon} />
            </span>
            <span className="whitespace-nowrap flex items-center pt-[1px]">
                {text}
            </span>
        </span>
    )
}
