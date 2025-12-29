export type SliderBannerItem = {
    id: string
    category: string
    imageSrc: string
}

export type SliderBannerProps = {
    items: SliderBannerItem[]
    duration?: number
}
