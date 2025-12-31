import { DropInput } from '@/components/ui/DropInput'
import { FloatingLabelInput } from '@/components/ui/FloatingLabelInput'
import { brazilStatesOptions } from '@/utils/brazil-states-options.helpers'

export function LoginDentistaFields() {
    return (
        <div className="grid grid-cols-2 gap-3">
            <DropInput
                label="UF"
                name="uf"
                options={brazilStatesOptions}
                placeholder="UF"
            />
            <FloatingLabelInput label="CRO" name="cro" placeholder="CRO" />
        </div>
    )
}
