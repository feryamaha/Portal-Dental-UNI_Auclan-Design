import { ReactNode, useRef } from 'react'
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
    const formRef = useRef<HTMLFormElement>(null)

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && formRef.current) {
            e.preventDefault()
            formRef.current.requestSubmit()
        }
    }

    return (
        <form ref={formRef} className="space-y-4" onSubmit={onSubmit} onKeyDown={handleKeyDown}>
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
                <Button href={forgotHref} variant="tertiary" size="default" className='text-[#AF0F2A]' aria-label={forgotLabel} tabIndex={-1}>
                    {forgotLabel} <Icon name='iconArrowRedRight' />
                </Button>
            </div>

            <Button
                type="submit"
                variant="primary"
                size="lg"
                className='bg-[#AF0F2A]'
                disabled={isSubmitting}
                tabIndex={0}
            >
                {isSubmitting ? 'Entrando...' : ctaLabel}
            </Button>
        </form>
    )
}
