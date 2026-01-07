import { z } from 'zod'

export const dentistaLoginSchema = z.object({
    login: z
        .string()
        .min(1, 'UF e CRO são obrigatórios')
        .refine(
            (val) => /^[A-Z]{2}-\d{5}$/.test(val),
            'CRO deve estar no formato 00000'
        ),
    password: z
        .string()
        .min(1, 'Senha é obrigatória'),
})

export const beneficiarioLoginSchema = z.object({
    login: z
        .string()
        .min(1, 'CPF ou número do cartão é obrigatório')
        .regex(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/, 'CPF deve estar no formato XXX.XXX.XXX-XX'),
    password: z
        .string()
        .min(1, 'Senha é obrigatória'),
})

export const comercialLoginSchema = z.object({
    login: z
        .string()
        .min(1, 'Código é obrigatório'),
    password: z
        .string()
        .min(1, 'Senha é obrigatória'),
})

export const empresaLoginSchema = z.object({
    login: z
        .string()
        .min(1, 'Código é obrigatório'),
    password: z
        .string()
        .min(1, 'Senha é obrigatória'),
})

export const representanteLoginSchema = z.object({
    login: z
        .string()
        .min(1, 'Código é obrigatório'),
    password: z
        .string()
        .min(1, 'Senha é obrigatória'),
})

export function normalizeLoginValue(portal: string, values: Record<string, string>): string {
    return (values.login ?? '').trim()
}
