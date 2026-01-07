import { useState } from 'react'
import { DropInput } from '@/components/ui/DropInput'
import { FloatingLabelInput } from '@/components/ui/FloatingLabelInput'
import { brazilStatesOptions } from '@/utils/brazil-states-options.helpers'

interface LoginDentistaFieldsProps {
    onFieldChange?: (name: string) => (event: React.ChangeEvent<HTMLInputElement>) => void
}

export function LoginDentistaFields({ onFieldChange }: LoginDentistaFieldsProps) {
    const [uf, setUF] = useState('')
    const [cro, setCRO] = useState('')

    const handleUFChange = (value: string) => {
        setUF(value)
        const croNumbers = cro.replace(/\D/g, '')
        const concatenated = croNumbers ? `${value}-${croNumbers}` : ''
        const event = {
            target: { value: concatenated, name: 'login' }
        } as React.ChangeEvent<HTMLInputElement>
        onFieldChange?.('login')?.(event)
    }

    const handleCROChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const croValue = event.target.value
        const croNumbers = croValue.replace(/\D/g, '')
        setCRO(croNumbers)
        const concatenated = uf && croNumbers ? `${uf}-${croNumbers}` : ''
        const loginEvent = {
            target: { value: concatenated, name: 'login' }
        } as React.ChangeEvent<HTMLInputElement>
        onFieldChange?.('login')?.(loginEvent)
    }

    return (
        <div className="grid grid-cols-2 gap-3">
            <DropInput
                label=""
                name="uf"
                options={brazilStatesOptions}
                placeholder="UF"
                onChange={handleUFChange}
            />
            <FloatingLabelInput
                label="CRO"
                name="cro"
                placeholder="12345"
                mask="cro"
                allowAllCharacters={false}
                onlyNumbers={true}
                onChange={handleCROChange}
            />
        </div>
    )
}
