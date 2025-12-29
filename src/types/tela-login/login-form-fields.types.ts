import type { ReactNode } from 'react'
import type { FloatingLabelInput } from '@/components/ui/FloatingLabelInput'

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
    onSubmit?: (event: React.FormEvent<HTMLFormElement>) => void
    onFieldChange?: (name: string) => (event: React.ChangeEvent<HTMLInputElement>) => void
    errorMessage?: string | null
    isSubmitting?: boolean
}
