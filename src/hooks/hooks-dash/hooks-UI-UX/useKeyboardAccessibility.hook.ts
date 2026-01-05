"use client";

import { useCallback, useEffect, useMemo, type HTMLAttributes, type KeyboardEvent as ReactKeyboardEvent } from "react";
import clsx from "clsx";
import { twMerge } from "tailwind-merge";

type NavigationDirection = "next" | "prev";
type FocusStyleToken = "neutral" | "form";

export interface KeyboardAccessibilityOptions<TElement extends HTMLElement = HTMLElement> {
    role?: string;
    ariaLabel?: string;
    ariaControls?: string;
    ariaExpanded?: boolean;
    ariaPressed?: boolean;
    ariaCurrent?: "page" | "step" | "location";
    tabIndex?: number;
    isDisabled?: boolean;
    focusStyle?: FocusStyleToken;
    enableEnter?: boolean;
    enableSpace?: boolean;
    onActivate?: () => void;
    onArrowNavigate?: (direction: NavigationDirection) => void;
    onEscape?: () => void;
    onKeyDown?: (event: ReactKeyboardEvent<TElement>) => void;
    focusTrapRef?: React.RefObject<HTMLElement>;
    enableFocusTrap?: boolean;
    autoFocusFirst?: boolean;
}

const focusStyles = {
    neutral: "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2",
    form: "focus-visible:outline-2 focus-visible:outline-primary-500 focus-visible:outline-offset-2",
} as const;

const focusableSelector =
    'a[href], button, textarea, input, select, [tabindex]:not([tabindex="-1"])';

export function useKeyboardAccessibility<TElement extends HTMLElement = HTMLElement>(
    options: KeyboardAccessibilityOptions<TElement> = {},
) {
    const {
        role = "button",
        tabIndex,
        isDisabled = false,
        ariaLabel,
        ariaControls,
        ariaExpanded,
        ariaPressed,
        ariaCurrent,
        focusStyle = "neutral",
        enableEnter = true,
        enableSpace = true,
        onActivate,
        onArrowNavigate,
        onEscape,
        onKeyDown,
        focusTrapRef,
        enableFocusTrap = false,
        autoFocusFirst = false,
    } = options;

    const focusClassName = useMemo(
        () =>
            twMerge(
                clsx(
                    focusStyles[focusStyle],
                    isDisabled && "pointer-events-none opacity-60",
                ),
            ),
        [focusStyle, isDisabled],
    );

    const handleKeyDown = useCallback(
        (event: ReactKeyboardEvent<TElement>) => {
            if (isDisabled) {
                return;
            }

            const { key } = event;

            if (enableEnter && key === "Enter") {
                event.preventDefault();
                onActivate?.();
            } else if (enableSpace && (key === " " || key === "Spacebar")) {
                event.preventDefault();
                onActivate?.();
            } else if (key === "ArrowLeft" || key === "ArrowUp") {
                if (onArrowNavigate) {
                    event.preventDefault();
                    onArrowNavigate("prev");
                }
            } else if (key === "ArrowRight" || key === "ArrowDown") {
                if (onArrowNavigate) {
                    event.preventDefault();
                    onArrowNavigate("next");
                }
            } else if (key === "Escape") {
                onEscape?.();
            }

            onKeyDown?.(event);
        },
        [isDisabled, enableEnter, enableSpace, onActivate, onArrowNavigate, onEscape, onKeyDown],
    );

    useEffect(() => {
        if (!enableFocusTrap || !focusTrapRef?.current || typeof document === "undefined") {
            return;
        }

        const container = focusTrapRef.current;

        const getFocusableElements = () => {
            if (!container) return [] as HTMLElement[];
            return Array.from(
                container.querySelectorAll<HTMLElement>(focusableSelector),
            ).filter((element) => !element.hasAttribute("disabled") && element.tabIndex !== -1);
        };

        const handleFocusTrap = (event: KeyboardEvent) => {
            if (event.key !== "Tab") return;

            const focusable = getFocusableElements();
            if (!focusable.length) return;

            const first = focusable[0];
            const last = focusable[focusable.length - 1];

            if (event.shiftKey && document.activeElement === first) {
                event.preventDefault();
                last.focus();
            } else if (!event.shiftKey && document.activeElement === last) {
                event.preventDefault();
                first.focus();
            }
        };

        document.addEventListener("keydown", handleFocusTrap);

        if (autoFocusFirst) {
            const focusable = getFocusableElements();
            focusable[0]?.focus();
        }

        return () => {
            document.removeEventListener("keydown", handleFocusTrap);
        };
    }, [focusTrapRef, enableFocusTrap, autoFocusFirst]);

    const interactiveProps = useMemo(() => {
        const resolvedTabIndex = typeof tabIndex === "number" ? tabIndex : isDisabled ? -1 : 0;

        return {
            role,
            tabIndex: resolvedTabIndex,
            "aria-label": ariaLabel,
            "aria-controls": ariaControls,
            "aria-expanded": ariaExpanded,
            "aria-pressed": ariaPressed,
            "aria-current": ariaCurrent,
            "aria-disabled": isDisabled || undefined,
            onKeyDown: handleKeyDown,
            className: focusClassName,
        };
    }, [
        role,
        tabIndex,
        isDisabled,
        ariaLabel,
        ariaControls,
        ariaExpanded,
        ariaPressed,
        ariaCurrent,
        handleKeyDown,
        focusClassName,
    ]);

    const getInteractiveProps = useCallback(
        (attrs: HTMLAttributes<TElement> = {}) => ({
            ...interactiveProps,
            ...attrs,
            className: twMerge(clsx(interactiveProps.className, attrs.className)),
            onKeyDown: (event: ReactKeyboardEvent<TElement>) => {
                interactiveProps.onKeyDown(event);
                attrs.onKeyDown?.(event);
            },
        }),
        [interactiveProps],
    );

    return {
        getInteractiveProps,
        focusClassName,
        handleKeyDown,
    };
}
