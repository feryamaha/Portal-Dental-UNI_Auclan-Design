import { NextResponse } from 'next/server'
import { faqAjudaContentMock } from '@/data/Faq-ajuda-content.data'
import type { FaqAjudaContent } from '@/types/shared/faq-ajuda.types'

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url)
        const portal = searchParams.get('portal') || 'beneficiario'

        const validPortals = ['dentista', 'beneficiario', 'comercial', 'empresa', 'representante']

        if (!validPortals.includes(portal)) {
            return NextResponse.json(
                {
                    success: false,
                    error: {
                        code: 'INVALID_PORTAL',
                        message: `Portal inválido. Portais válidos: ${validPortals.join(', ')}`,
                        statusCode: 400
                    },
                    timestamp: new Date().toISOString()
                },
                { status: 400 }
            )
        }

        const faqContent: FaqAjudaContent | undefined = faqAjudaContentMock[portal]

        if (!faqContent) {
            return NextResponse.json(
                {
                    success: false,
                    error: {
                        code: 'NOT_FOUND',
                        message: `Conteúdo FAQ não encontrado para o portal: ${portal}`,
                        statusCode: 404
                    },
                    timestamp: new Date().toISOString()
                },
                { status: 404 }
            )
        }

        return NextResponse.json(
            {
                success: true,
                data: faqContent,
                timestamp: new Date().toISOString(),
                metadata: {
                    portal,
                    totalCategories: faqContent.categories.length,
                    cached: true
                }
            },
            {
                headers: {
                    'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=7200'
                }
            }
        )
    } catch (error) {
        console.error('❌ API Error - FAQ Ajuda:', error)

        return NextResponse.json(
            {
                success: false,
                error: {
                    code: 'INTERNAL_SERVER_ERROR',
                    message: 'Erro ao buscar conteúdo FAQ',
                    statusCode: 500
                },
                timestamp: new Date().toISOString()
            },
            { status: 500 }
        )
    }
}
