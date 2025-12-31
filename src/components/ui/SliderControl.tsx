"use client";
import React from "react";
import { Icon } from "@/script/Icon";
import type { SliderControlProps } from "@/types/ui/slider-control.types";

const ProgressBar: React.FC<{
  isActive: boolean;
  onClick: () => void;
  isPlaying: boolean;
  ariaLabel?: string;
}> = ({ isActive, onClick, isPlaying, ariaLabel }) => (
  <div
    className={`h-[8px] bg-secondary-100 rounded-[9px] cursor-pointer overflow-hidden transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 ${isActive ? "w-[122px]" : "w-[58px]"
      }`}
    onClick={onClick}
    role="button"
    aria-label={ariaLabel}
    tabIndex={0}
    onKeyDown={(e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault()
        onClick()
      }
    }}
  >
    <div
      className={`h-full rounded-[9px] ${isActive && isPlaying ? "bg-[#8A1724] animate-progress" : ""}`}
      style={{
        width: isActive ? "100%" : "0",
        backgroundColor: isActive && !isPlaying ? "#000" : undefined,
        animationPlayState: isPlaying ? "running" : "paused",
      }}
    />
  </div>
);

const SliderControl: React.FC<SliderControlProps> = ({
  images,
  current,
  isPlaying,
  onPrev,
  onNext,
  onGoTo,
  onTogglePlay,
  progressDurationMs,
}) => {
  return (
    <>
      <style jsx global>{`
        @keyframes progress {
          0% {
            width: 0%;
          }
          100% {
            width: 100%;
          }
        }
        .animate-progress {
          animation: progress ${progressDurationMs}ms linear;
        }
      `}</style>

      <div className="flex items-center gap-2">
        <div className="flex items-center space-x-2">
          <div
            className="w-auto h-max bg-white text-secondary-900 border rounded-full flex items-center gap-[8px] p-[4px_8px] justify-center cursor-pointer text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2"
            onClick={onTogglePlay}
            role="button"
            aria-label={isPlaying ? "Pausar slider" : "Iniciar slider"}
            aria-pressed={isPlaying}
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault()
                onTogglePlay()
              }
            }}
          >
            <div
              className="inline-flex items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 rounded"
              onClick={(e) => {
                e.stopPropagation();
                onPrev();
              }}
              role="button"
              aria-label="Slide anterior"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault()
                  onPrev()
                }
              }}
            >
              <Icon name="iconArrow2Left" className="text-secondary-900" />
            </div>
            <div className="w-[18px] h-[18px] flex items-center justify-center text-secondary-900" >
              {isPlaying ? <Icon name="iconPause" className="w-full" /> : <Icon name="iconPlay" className="w-full" />}
            </div>

            <div
              className="inline-flex items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 rounded"
              onClick={(e) => {
                e.stopPropagation();
                onNext();
              }}
              role="button"
              aria-label="Próximo slide"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault()
                  onNext()
                }
              }}
            >
              <Icon name="iconArrow2Right" className="text-secondary-900" />
            </div>
          </div>
        </div>
        <div className="flex gap-[8px] ">
          {images.map((_, idx) => (
            <ProgressBar
              key={`${idx}-${current}`}
              isActive={current === idx}
              onClick={() => onGoTo(idx)}
              isPlaying={isPlaying}
              ariaLabel={`Ir para slide ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default SliderControl;
