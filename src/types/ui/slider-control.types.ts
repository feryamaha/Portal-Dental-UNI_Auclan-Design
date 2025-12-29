import type { StaticImageData } from "next/image";

export interface SliderControlProps {
    images: { src: string | StaticImageData; alt: string }[];
    current: number;
    isPlaying: boolean;
    onPrev: () => void;
    onNext: () => void;
    onGoTo: (idx: number) => void;
    onTogglePlay: () => void;
    progressDurationMs: number;
}
