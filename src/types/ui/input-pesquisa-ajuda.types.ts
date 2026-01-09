import type { ChangeEvent } from 'react'

export interface InputPesquisaAjudaProps {
    value?: string
    onChange?: (e: ChangeEvent<HTMLInputElement>) => void
    placeholder?: string
}
