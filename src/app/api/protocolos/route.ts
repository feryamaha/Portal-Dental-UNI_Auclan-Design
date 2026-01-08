import { NextRequest, NextResponse } from 'next/server'
import { protocolosMock as beneficiarioProtocolosMock } from '@/data/mocks/beneficiario-home-content.data'
import { protocolosMock as dentistaProtocolosMock } from '@/data/mocks/dentista-home-content.data'
import type { SubCardMeusProtocolosProps } from '@/types/ui/sub-card-meus-protocolos.types'

type ProtocolsResponse = {
    success: boolean
    data?: SubCardMeusProtocolosProps[]
    error?: string
}

const portalMocks: Record<string, SubCardMeusProtocolosProps[]> = {
    beneficiario: beneficiarioProtocolosMock,
    dentista: dentistaProtocolosMock,
}

export async function GET(request: NextRequest): Promise<NextResponse<ProtocolsResponse>> {
    try {
        const { searchParams } = new URL(request.url)
        const portal = searchParams.get('portal')

        if (!portal) {
            return NextResponse.json(
                {
                    success: false,
                    error: 'Portal parameter is required',
                },
                { status: 400 }
            )
        }

        const protocols = portalMocks[portal]

        if (!protocols) {
            return NextResponse.json(
                {
                    success: false,
                    error: `Portal "${portal}" not found`,
                },
                { status: 404 }
            )
        }

        return NextResponse.json({
            success: true,
            data: protocols,
        })
    } catch (error) {
        return NextResponse.json(
            {
                success: false,
                error: error instanceof Error ? error.message : 'Internal server error',
            },
            { status: 500 }
        )
    }
}
