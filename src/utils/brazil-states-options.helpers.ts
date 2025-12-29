import type { DropInputOption } from '@/types/ui/drop-input.types'
import { brazilStates } from '@/context/tela-login/brazilStates'

export const brazilStatesOptions: DropInputOption[] = brazilStates.map((state) => ({
    value: state,
    label: state,
}))
