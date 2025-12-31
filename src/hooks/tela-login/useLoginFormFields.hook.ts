"use client"

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import type { PortalSlug } from '@/types/data/portal-config.types'
import mockLogin from '@/data/mock-login/mock-login-fake.json'

const credentialsMap = mockLogin as Record<PortalSlug, { login: string; password: string; redirect: string }>

export function useLoginFormFields(portal: PortalSlug) {
    const router = useRouter()
    const [values, setValues] = useState<Record<string, string>>({})
    const [error, setError] = useState<string | null>(null)
    const [isSubmitting, setIsSubmitting] = useState(false)

    const handleChange = (name: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target
        setValues((prev) => ({ ...prev, [name]: value }))
    }

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        setError(null)
        setIsSubmitting(true)

        try {
            const credentials = credentialsMap[portal]
            if (!credentials) {
                setError('Portal sem configuração de acesso.')
                return
            }

            const loginValue = (values.login ?? '').trim()
            const passwordValue = (values.password ?? '').trim()

            const isValid = loginValue === credentials.login && passwordValue === credentials.password

            if (isValid) {
                router.push(credentials.redirect)
            } else {
                setError('Dados inválidos. Verifique o CPF e a senha.')
            }
        } finally {
            setIsSubmitting(false)
        }
    }

    return {
        values,
        error,
        isSubmitting,
        handleChange,
        handleSubmit,
    }
}
