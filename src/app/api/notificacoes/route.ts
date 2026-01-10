import { NextResponse } from 'next/server'
import { getNotificacoesByPortal } from '@/data/Notificacoes-content.data'

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url)
        const portal = searchParams.get('portal') || 'beneficiario'

        const notificacoes = getNotificacoesByPortal(portal)

        return NextResponse.json({
            success: true,
            data: notificacoes,
            timestamp: new Date().toISOString(),
            metadata: {
                total: notificacoes.reduce((acc, mes) => acc + mes.notificacoes.length, 0),
                portal
            }
        }, {
            headers: { 'Cache-Control': 'public, s-maxage=30, stale-while-revalidate=60' }
        })
    } catch (error) {
        return NextResponse.json({
            success: false,
            error: {
                code: 'INTERNAL_SERVER_ERROR',
                message: 'Failed to fetch notificações',
                statusCode: 500
            },
            timestamp: new Date().toISOString()
        }, { status: 500 })
    }
}
