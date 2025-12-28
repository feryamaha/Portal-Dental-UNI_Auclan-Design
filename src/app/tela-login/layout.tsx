import type { ReactNode } from 'react'
import type { Metadata } from 'next'
import { headers } from 'next/headers'
import { Inter, Lato, Open_Sans } from 'next/font/google'

export const metadata: Metadata = {
    title: 'Portal - Dental UNI',
    description:
        'Seja um dentista. Dental Uni. Atuamos em mais de 15 mil áreas de atendimento em todo o Brasil, beneficiando mais de um milhão de pessoas.',
    icons: {
        icon: [{ url: '/favicon.ico', type: 'image/x-icon', rel: 'icon' }],
        shortcut: ['/favicon.ico'],
        apple: ['/favicon.ico'],
    },
}

const lato = Lato({
    variable: '--font-lato',
    subsets: ['latin'],
    weight: ['400', '700', '900'],
})

const inter = Inter({
    variable: '--font-inter',
    subsets: ['latin'],
    weight: ['400', '500', '600'],
})

const openSans = Open_Sans({
    variable: '--font-open-sans',
    subsets: ['latin'],
    weight: ['400', '600', '700'],
})

export default async function TelaLoginLayout({ children }: { children: ReactNode }) {
    const headersList = await headers()
    const nonce = headersList.get('X-Nonce') || undefined

    return (
        <html
            lang="pt-BR"
            suppressHydrationWarning
            className={`${lato.variable} ${inter.variable} ${openSans.variable}`}
        >
            <head nonce={nonce} suppressHydrationWarning></head>
            <body nonce={nonce} suppressHydrationWarning>
                {children}
            </body>
        </html>
    )
}
