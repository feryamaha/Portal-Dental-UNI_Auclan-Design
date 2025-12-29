"use client"

import Image from 'next/image'

import SliderControl from '@/components/ui/SliderControl'
import type { SliderBannerProps } from '@/types/shared/slider-banner.types'
import { useSliderBanner } from '@/hooks/hooks-UI-UX/ui/use-slider-banner.hook'

export function SliderBanner({ items, duration = 6000 }: SliderBannerProps) {
    const { currentSlide, setCurrentSlide, isPlaying, setIsPlaying, sliderImages } = useSliderBanner(items, duration)

    if (!items.length) return null

    return (
        <div className="w-full flex flex-col gap-4">
            <div className="relative w-full overflow-hidden rounded-2xl text-secondary-0 p-3" style={{ aspectRatio: '728 / 88' }}>
                <Image
                    src={items[currentSlide].imageSrc}
                    alt={`Banner ${items[currentSlide].category}`}
                    fill
                    sizes="(min-width: 1280px) 960px, 100vw"
                    className="object-cover"
                    priority
                />
                <div className="absolute inset-0 bg-secondary-900/20" aria-hidden />
                <div className="relative z-10 flex h-full flex-col justify-start">
                    <span className="w-[112px] h-[24px] flex items-center justify-center text-lg font-medium rounded-lg bg-[rgba(34,34,34,0.40)] px-2 py-0.5 shadow-[0_1px_4px_rgba(0,0,0,0.08),0_1px_2px_rgba(25,25,25,0.08)]">
                        {items[currentSlide].category}
                    </span>
                </div>
            </div>

            <div>
                <SliderControl
                    images={sliderImages}
                    current={currentSlide}
                    isPlaying={isPlaying}
                    onPrev={() => setCurrentSlide((prev) => (prev - 1 + items.length) % items.length)}
                    onNext={() => setCurrentSlide((prev) => (prev + 1) % items.length)}
                    onGoTo={(idx) => setCurrentSlide(idx)}
                    onTogglePlay={() => setIsPlaying((prev) => !prev)}
                    progressDurationMs={duration}
                />
            </div>
        </div>
    )
}
