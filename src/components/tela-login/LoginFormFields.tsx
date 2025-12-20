import { ReactNode } from 'react'
import { FloatingLabelInput } from '@/components/ui/FloatingLabelInput'
import { Button } from '@/components/ui/Button'
import { Icon } from '@/script/Icon'

export type LoginFieldConfig = {
    id: string
    label: string
    name: string
    placeholder?: string
    type?: string
    className?: string
    allowAllCharacters?: boolean
    inputProps?: Omit<React.ComponentProps<typeof FloatingLabelInput>, 'label' | 'name'>
    render?: () => ReactNode
}

export type LoginFormFieldsProps = {
    fields: LoginFieldConfig[]
    forgotLabel?: string
    forgotHref?: string
    ctaLabel?: string
}

export default function LoginFormFields({
    fields,

}: LoginFormFieldsProps) {
    return (
        <form className="space-y-4">
            {fields.map((field) => (
                <div key={field.id} className={field.className ?? ''}>
                    {field.render ? (
                        field.render()
                    ) : (
                        <FloatingLabelInput
                            label={field.label}
                            name={field.name as never}
                            placeholder={field.placeholder}
                            type={field.type}
                            allowAllCharacters={field.allowAllCharacters}
                            {...(field.inputProps ?? {})}
                        />
                    )}
                </div>
            ))}

            <div className="inline-flex">
                <Button href='#' variant="tertiary" size="default" className='text-[#AF0F2A]' >
                    Esqueceu a senha? <Icon name='iconArrowRedRight' />
                </Button>
            </div>

            <Button href='#' type="button" variant="primary" size="sm" className='bg-[#AF0F2A]'>
                Acessar o portal
            </Button>
        </form>
    )
}
