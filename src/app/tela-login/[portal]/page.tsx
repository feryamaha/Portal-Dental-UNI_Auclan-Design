import LoginHero from '@/components/tela-login/LoginHero'
import LoginFormPanel from '@/components/tela-login/LoginFormPanel'
import { PortalType } from '@/components/tela-login/PortalTypeLabel'
import { LoginFieldConfig } from '@/components/tela-login/LoginFormFields'
import { DropInput } from '@/components/ui/DropInput'
import { FloatingLabelInput } from '@/components/ui/FloatingLabelInput'
import { notFound } from 'next/navigation'

const brazilStates = [
    'AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA',
    'MT', 'MS', 'MG', 'PA', 'PB', 'PR', 'PE', 'PI', 'RJ', 'RN',
    'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO',
]

const DentistaDocumentsFields = () => (
    <div className="grid grid-cols-2 gap-3">
        <DropInput
            label="UF"
            name="uf"
            options={brazilStates.map((state) => ({ value: state, label: state }))}
            placeholder="UF"
        />
        <FloatingLabelInput label="CRO" name="cro" placeholder="CRO" />
    </div>
)

type PortalConfig = {
    portalType: PortalType
    heroLabel: string
    fields: LoginFieldConfig[]
    forgotHref?: string
    forgotLabel?: string
    ctaLabel?: string
}

const portalConfig: Record<string, PortalConfig> = {
    beneficiario: {
        portalType: 'beneficiario',
        heroLabel: 'Beneficiários',
        fields: [
            {
                id: 'beneficiario-id',
                label: 'Número do seu cartão ou CPF',
                name: 'login',
                placeholder: 'Número do seu cartão ou CPF',
                allowAllCharacters: true,
            },
            {
                id: 'beneficiario-password',
                label: 'Senha',
                name: 'password',
                type: 'password',
                placeholder: 'Senha',
            },
        ],
    },
    dentista: {
        portalType: 'dentista',
        heroLabel: 'Dentista',
        fields: [
            {
                id: 'dentista-docs',
                label: 'Documentos',
                name: 'documents',
                render: () => <DentistaDocumentsFields />,
            },
            {
                id: 'dentista-password',
                label: 'Senha',
                name: 'password',
                type: 'password',
                placeholder: 'Senha',
            },
        ],
    },
    corretor: {
        portalType: 'corretor',
        heroLabel: 'Corretores',
        fields: [
            {
                id: 'corretor-code',
                label: 'Código',
                name: 'code',
                placeholder: 'Código',
            },
            {
                id: 'corretor-password',
                label: 'Senha',
                name: 'password',
                type: 'password',
                placeholder: 'Senha',
            },
        ],
    },
    empresa: {
        portalType: 'empresa',
        heroLabel: 'Empresas',
        fields: [
            {
                id: 'empresa-code',
                label: 'Código',
                name: 'code',
                placeholder: 'Código',
            },
            {
                id: 'empresa-password',
                label: 'Senha',
                name: 'password',
                type: 'password',
                placeholder: 'Senha',
            },
        ],
    },
    representante: {
        portalType: 'representante',
        heroLabel: 'Representantes',
        fields: [
            {
                id: 'representante-code',
                label: 'Código',
                name: 'code',
                placeholder: 'Código',
            },
            {
                id: 'representante-password',
                label: 'Senha',
                name: 'password',
                type: 'password',
                placeholder: 'Senha',
            },
        ],
    },
}

type TelaLoginPortalPageProps = {
    params: Promise<{
        portal: string
    }>
}

export default async function TelaLoginPortalPage({ params }: TelaLoginPortalPageProps) {
    const { portal } = await params
    const slug = portal?.toLowerCase()
    const config = portalConfig[slug]

    if (!config) {
        notFound()
    }

    return (
        <section className="min-h-screen bg-white">
            <div className="w-full min-h-screen flex items-stretch ">
                <LoginHero portalLabel={config.heroLabel} />
                <LoginFormPanel
                    portalType={config.portalType}
                    fields={config.fields}
                    forgotHref={config.forgotHref}
                    forgotLabel={config.forgotLabel}
                    ctaLabel={config.ctaLabel}
                />
            </div>
        </section>
    )
}
