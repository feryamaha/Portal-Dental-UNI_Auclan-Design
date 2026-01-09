"use client";
import clsx from "clsx";
import React, { ComponentProps, useState } from "react";
import { twMerge } from "tailwind-merge";
import { Icon } from "@/script/Icon";

interface SegmentedControlItem {
    value: string;
    label: string;
}

interface SegmentedControlProps
    extends Omit<ComponentProps<"nav">, "onChange"> {
    items: SegmentedControlItem[];
    value: string;
    onChange: (value: string) => void;
    size?: "sm" | "md" | "lg";
    withIcon?: boolean;
    disabled?: boolean;
}

export function SegmentedControl({
    items,
    value,
    onChange,
    size = "md",
    withIcon = false,
    disabled = false,
    className,
    ...props
}: SegmentedControlProps) {
    const [hoveredValue, setHoveredValue] = useState<string | null>(null);

    const classes = twMerge(
        clsx(
            "inline-flex items-center p-[2px] bg-secondary-200 rounded-md overflow-hidden transition-colors duration-200 ease-linear ",
            size === "sm" && "h-max w-full @mobile:w-max ",
            size === "md" && "h-max w-full @mobile:w-max ",
            size === "lg" && "h-max w-full @mobile:w-max ",
            disabled && "opacity-50 cursor-not-allowed",
            className,
        ),
    );

    const handleKeyDown = (event: React.KeyboardEvent) => {
        if (disabled) return;

        const currentIndex = items.findIndex((item) => item.value === value);
        let newIndex = currentIndex;

        switch (event.key) {
            case "ArrowLeft":
                event.preventDefault();
                newIndex = currentIndex > 0 ? currentIndex - 1 : items.length - 1;
                break;
            case "ArrowRight":
                event.preventDefault();
                newIndex = currentIndex < items.length - 1 ? currentIndex + 1 : 0;
                break;
            case "Enter":
            case " ":
                event.preventDefault();
                return;
            default:
                return;
        }

        onChange(items[newIndex].value);
    };

    const getButtonClasses = (item: SegmentedControlItem, index: number) => {
        const isSelected = item.value === value;
        const isHovered = hoveredValue === item.value;
        const isLast = index === items.length - 1;

        return twMerge(
            clsx(
                "font-inter font-normal text-sm transition-colors duration-200 ease-linear flex items-center justify-center gap-[6px] rounded-md shadow-[0 1px 4px 0 rgba(0, 0, 0, 0.08), 0 1px 2px 0 rgba(25, 25, 25, 0.08)] overflow-hidden",
                !isLast && "border-r border-secondary-200",
                size === "sm" && "w-full @mobile:w-max h-max p-[2px_6px]",
                size === "md" && "w-full @mobile:w-max h-max p-[4px_12px]",
                size === "lg" && "w-full @mobile:w-max h-max p-[6px_12px]",
                isSelected &&
                !disabled &&
                "bg-white text-secondary-900 border border-secondary-100",
                !isSelected &&
                !disabled &&
                "text-secondary-600 bg-secondary-200 border border-secondary-200 ",
                disabled && "opacity-50 cursor-not-allowed",
            ),
        );
    };

    return (
        <nav
            aria-label="Segmented control"
            className={classes}
            onKeyDown={handleKeyDown}
            {...props}
        >
            {items.map((item, index) => {
                const isSelected = item.value === value;
                const isLast = index === items.length - 1;

                return (
                    <div key={item.value}>
                        <button
                            type="button"
                            className={getButtonClasses(item, index)}
                            aria-selected={isSelected}
                            disabled={disabled}
                            onClick={() => !disabled && onChange(item.value)}
                            onMouseEnter={() => !disabled && setHoveredValue(item.value)}
                            onMouseLeave={() => setHoveredValue(null)}
                        >
                            {withIcon && (
                                <span className="w-[14px] h-[14px] flex items-center flex-shrink-0">
                                    <Icon name="iconDoubleArrow" />
                                </span>
                            )}

                            <span className="truncate min-w-0">{item.label}</span>
                        </button>
                    </div>
                );
            })}
        </nav>
    );
}