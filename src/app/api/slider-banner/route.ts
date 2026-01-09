import { NextRequest, NextResponse } from 'next/server'
import { sliderItemsBeneficiario, sliderItemsDentista } from '@/data/mocks/slider-banner-content.data'
import type { SliderBannerItem } from '@/types/shared/slider-banner.types'

type SliderBannerResponse = {
    success: boolean
    data?: SliderBannerItem[]
    error?: string
}

const portalSliders: Record<string, SliderBannerItem[]> = {
    beneficiario: sliderItemsBeneficiario,
    dentista: sliderItemsDentista,
}

export async function GET(request: NextRequest): Promise<NextResponse<SliderBannerResponse>> {
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

        const sliderItems = portalSliders[portal]

        if (!sliderItems) {
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
            data: sliderItems,
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
