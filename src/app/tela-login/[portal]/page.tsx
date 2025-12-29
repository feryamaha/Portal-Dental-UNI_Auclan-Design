import SectionContentLeft from '@/components/tela-login/SectionContentLeft'
import SectionContentRight from '@/components/tela-login/SectionContentRight'
import { LoginFieldConfig } from '@/components/tela-login/LoginFormFields'
import { LoginDentistaFields } from '@/components/tela-login/LoginDentistaFields'
import {
    getPortalConfig,
    type PortalFieldCustomRenderer,
    type PortalFieldConfig,
} from '@/context/tela-login/portalConfig'
import { notFound } from 'next/navigation'
import type { TelaLoginPortalPageProps } from '@/types/app/tela-login/portal-page.types'

const customRendererMap: Record<PortalFieldCustomRenderer, () => React.ReactNode> = {
    dentistaDocuments: () => <LoginDentistaFields />,
}

function mapFieldsToLoginFields(fields: PortalFieldConfig[]): LoginFieldConfig[] {
    return fields.map<LoginFieldConfig>((field) => {
        if (!field.customRenderer) {
            return field
        }

        const renderFn = customRendererMap[field.customRenderer]
        const { customRenderer, ...rest } = field

        return {
            ...rest,
            render: renderFn,
        }
    })
}

export default async function TelaLoginPortalPage({ params }: TelaLoginPortalPageProps) {
    const { portal } = await params
    const slug = portal?.toLowerCase()
    const config = getPortalConfig(slug)

    if (!config) {
        notFound()
    }

    const fields = mapFieldsToLoginFields(config.fields)

    return (
        <section className="min-h-screen bg-white relative @laptop:flex ">
            <SectionContentLeft portalLabel={config.heroLabel} />
            <SectionContentRight
                portalType={config.portalType}
                fields={fields}
                forgotHref={config.forgotHref}
                forgotLabel={config.forgotLabel}
                ctaLabel={config.ctaLabel}
            />
        </section>
    )
}
