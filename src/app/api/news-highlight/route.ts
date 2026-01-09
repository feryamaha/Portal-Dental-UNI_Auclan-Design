import { NextRequest, NextResponse } from 'next/server'
import { newsHighlight } from '@/data/mocks/news-highlight-content.data'
import type { NewsHighlightSectionProps } from '@/types/shared/news-highlight-section.types'

type NewsHighlightResponse = {
    success: boolean
    data?: NewsHighlightSectionProps
    error?: string
}

export async function GET(request: NextRequest): Promise<NextResponse<NewsHighlightResponse>> {
    try {
        return NextResponse.json({
            success: true,
            data: newsHighlight,
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
