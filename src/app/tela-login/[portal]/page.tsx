import LoginHero from '@/components/tela-login/LoginHero'
import LoginFormPanel from '@/components/tela-login/LoginFormPanel'
import { LoginFieldConfig } from '@/components/tela-login/LoginFormFields'
import { DentistaDocumentsFields } from '@/components/tela-login/DentistaDocumentsFields'
import {
    getPortalConfig,
    type PortalFieldCustomRenderer,
    type PortalFieldConfig,
} from '@/context/tela-login/portalConfig'
import { notFound } from 'next/navigation'

type TelaLoginPortalPageProps = {
    params: Promise<{
        portal: string
    }>
}

const customRendererMap: Record<PortalFieldCustomRenderer, () => React.ReactNode> = {
    dentistaDocuments: () => <DentistaDocumentsFields />,
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
        <section className="min-h-screen bg-white">
            <div className="w-full min-h-screen flex items-stretch ">
                <LoginHero portalLabel={config.heroLabel} />
                <LoginFormPanel
                    portalType={config.portalType}
                    fields={fields}
                    forgotHref={config.forgotHref}
                    forgotLabel={config.forgotLabel}
                    ctaLabel={config.ctaLabel}
                />
            </div>
        </section>
    )
}
