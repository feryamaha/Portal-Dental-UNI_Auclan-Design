import SectionContentLeft from '@/components/shared-tela-login/SectionContentLeft'
import SectionContentRight from '@/components/shared-tela-login/SectionContentRight'
import { getPortalConfig } from '@/data/portal-config'
import { notFound } from 'next/navigation'
import type { TelaLoginPortalPageProps } from '@/types/app/tela-login/portal-page.types'

export default async function TelaLoginPortalPage({ params }: TelaLoginPortalPageProps) {
    const { portal } = await params
    const slug = portal?.toLowerCase()
    const config = getPortalConfig(slug)

    if (!config) {
        notFound()
    }

    return (
        <section className="min-h-screen bg-white relative @laptop:flex ">
            <SectionContentLeft portalLabel={config.heroLabel} />
            <SectionContentRight
                portalType={config.portalType}
                fields={config.fields}
                forgotHref={config.forgotHref}
                forgotLabel={config.forgotLabel}
                ctaLabel={config.ctaLabel}
            />
        </section>
    )
}
