"use client"

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import type { PortalSlug } from '@/types/data/portal-config.types'
import mockLogin from '@/data/mock-login/mock-login-fake.json'
import {
    dentistaLoginSchema,
    beneficiarioLoginSchema,
    comercialLoginSchema,
    empresaLoginSchema,
    representanteLoginSchema,
    normalizeLoginValue,
} from '@/utils/tela-login-validation.helpers'

const credentialsMap = mockLogin as Record<PortalSlug, { login: string; password: string; redirect: string }>

const schemaMap = {
    dentista: dentistaLoginSchema,
    beneficiario: beneficiarioLoginSchema,
    comercial: comercialLoginSchema,
    empresa: empresaLoginSchema,
    representante: representanteLoginSchema,
}

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

            const schema = schemaMap[portal]
            const validationResult = schema.safeParse(values)

            if (!validationResult.success) {
                const firstError = validationResult.error.errors[0]
                setError(firstError.message)
                return
            }

            const loginValue = normalizeLoginValue(portal, values)
            const passwordValue = (values.password ?? '').trim()

            const isValid = loginValue === credentials.login && passwordValue === credentials.password

            if (isValid) {
                // Salvar token no cookie (simulado com mock)
                // Em produção, isso virá da API
                const token = btoa(JSON.stringify({ portal, login: loginValue, timestamp: Date.now() }))
                document.cookie = `authToken=${token}; path=/; max-age=${7 * 24 * 60 * 60}`
                document.cookie = `portalType=${portal}; path=/; max-age=${7 * 24 * 60 * 60}`

                router.push(credentials.redirect)
            } else {
                setError('Dados inválidos. Verifique suas credenciais.')
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
