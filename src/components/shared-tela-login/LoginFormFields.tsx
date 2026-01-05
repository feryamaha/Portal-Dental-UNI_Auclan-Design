import { ReactNode } from 'react'
import { FloatingLabelInput } from '@/components/ui/FloatingLabelInput'
import { Button } from '@/components/ui/Button'
import { Icon } from '@/script/Icon'
import type { LoginFieldConfig, LoginFormFieldsProps } from '@/types/tela-login/login-form-fields.types'

export type { LoginFieldConfig, LoginFormFieldsProps } from '@/types/tela-login/login-form-fields.types'

export default function LoginFormFields({
    fields,
    forgotLabel = 'Esqueceu a senha?',
    forgotHref = '#',
    ctaLabel = 'Acessar o portal',
    onSubmit,
    onFieldChange,
    errorMessage,
    isSubmitting = false,
}: LoginFormFieldsProps) {
    return (
        <form className="space-y-4" onSubmit={onSubmit}>
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
                            onChange={onFieldChange?.(field.name)}
                            {...(field.inputProps ?? {})}
                        />
                    )}
                </div>
            ))}

            {errorMessage && (
                <p className="text-sm text-[#AF0F2A] font-medium">{errorMessage}</p>
            )}

            <div className="inline-flex">
                <Button href={forgotHref} variant="tertiary" size="default" className='text-[#AF0F2A]'>
                    {forgotLabel} <Icon name='iconArrowRedRight' />
                </Button>
            </div>

            <Button
                type="submit"
                variant="primary"
                size="lg"
                className='bg-[#AF0F2A]'
                disabled={isSubmitting}
            >
                {isSubmitting ? 'Entrando...' : ctaLabel}
            </Button>
        </form>
    )
}
