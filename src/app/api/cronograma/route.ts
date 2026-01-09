import { NextResponse } from 'next/server'
import { cronogramaContent } from '@/data/mocks/cronograma-content.data'
import type { CronogramaData } from '@/types/shared/card-cronograma.types'

type CronogramaResponse = {
    success: boolean
    data?: CronogramaData
    error?: string
    timestamp?: string
}

export async function GET(): Promise<NextResponse<CronogramaResponse>> {
    try {
        return NextResponse.json(
            {
                success: true,
                data: cronogramaContent,
                timestamp: new Date().toISOString(),
            },
            {
                headers: { 'Cache-Control': 'public, s-maxage=60' },
            }
        )
    } catch (error) {
        return NextResponse.json(
            {
                success: false,
                error: error instanceof Error ? error.message : 'Internal server error',
                timestamp: new Date().toISOString(),
            },
            { status: 500 }
        )
    }
}
