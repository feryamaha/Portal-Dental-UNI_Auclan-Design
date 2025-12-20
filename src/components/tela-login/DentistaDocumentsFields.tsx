import { DropInput } from '@/components/ui/DropInput'
import { FloatingLabelInput } from '@/components/ui/FloatingLabelInput'
import { brazilStates } from '@/context/tela-login/brazilStates'

export function DentistaDocumentsFields() {
    return (
        <div className="grid grid-cols-2 gap-3">
            <DropInput
                label="UF"
                name="uf"
                options={brazilStates.map((state) => ({ value: state, label: state }))}
                placeholder="UF"
            />
            <FloatingLabelInput label="CRO" name="cro" placeholder="CRO" />
        </div>
    )
}
