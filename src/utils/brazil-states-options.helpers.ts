import type { DropInputOption } from '@/types/ui/drop-input.types'
import { brazilStates } from '@/data/brazil-states'

export const brazilStatesOptions: DropInputOption[] = brazilStates.map((state) => ({
    value: state,
    label: state,
}))
