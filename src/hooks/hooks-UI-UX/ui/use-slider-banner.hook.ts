"use client";

import { useEffect, useMemo, useState } from "react";

import type { SliderBannerItem } from "@/types/shared/slider-banner.types";

export function useSliderBanner(items: SliderBannerItem[], duration: number) {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [isPlaying, setIsPlaying] = useState(items.length > 1);

    useEffect(() => {
        if (!isPlaying || items.length <= 1) return;

        const timeout = setTimeout(() => {
            setCurrentSlide((prev) => (prev + 1) % items.length);
        }, duration);

        return () => clearTimeout(timeout);
    }, [currentSlide, duration, isPlaying, items.length]);

    useEffect(() => {
        if (currentSlide >= items.length) {
            setCurrentSlide(0);
        }
    }, [currentSlide, items.length]);

    const sliderImages = useMemo(
        () =>
            items.map((item, index) => ({
                src: item.imageSrc,
                alt: `Banner ${item.category} ${index + 1}`,
            })),
        [items]
    );

    return {
        currentSlide,
        setCurrentSlide,
        isPlaying,
        setIsPlaying,
        sliderImages,
    };
}
