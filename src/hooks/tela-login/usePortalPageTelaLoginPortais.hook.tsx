"use client"

import { useMemo } from 'react'
import { LoginDentistaFields } from '@/components/shared-tela-login/LoginDentistaFields'
import type { PortalFieldConfig } from '@/types/data/portal-config.types'
import type { LoginFieldConfig } from '@/types/tela-login/login-form-fields.types'

const customRendererMap: Record<string, () => React.ReactNode> = {
    dentistaDocuments: () => <LoginDentistaFields />,
}

export function usePortalPageTelaLoginPortais(fields: PortalFieldConfig[]): LoginFieldConfig[] {
    return useMemo(() => {
        return fields.map<LoginFieldConfig>((field) => {
            if (!field.customRenderer) {
                return field
            }

            const renderFn = customRendererMap[field.customRenderer]

            return {
                ...field,
                render: renderFn,
            }
        })
    }, [fields])
}
