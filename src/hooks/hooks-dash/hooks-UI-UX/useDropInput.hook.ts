"use client";

import { useEffect, useRef, useState } from "react";
import { useWatch } from "react-hook-form";

import { getErrorMessage } from "@/utils/react-hook-form-error-message.helpers";
import type { DropInputOption } from "@/types/ui/drop-input.types";
import type {
    Control,
    FieldErrors,
    FieldValues,
    Path,
    UseFormRegister,
    UseFormSetValue,
} from "react-hook-form";

export function useDropInput<TFieldValues extends FieldValues = FieldValues>(params: {
    label: string;
    name: Path<TFieldValues>;
    placeholder: string;
    options: DropInputOption[];
    register?: UseFormRegister<TFieldValues>;
    errors?: FieldErrors<TFieldValues>;
    control?: Control<TFieldValues>;
    setValue?: UseFormSetValue<TFieldValues>;
    disabled: boolean;
    value?: string;
    onChange?: (value: string) => void;
}) {
    const {
        label,
        name,
        placeholder,
        options,
        register,
        errors,
        control,
        setValue,
        disabled,
        value,
        onChange,
    } = params;

    const [isOpen, setIsOpen] = useState(false);
    const [isFocused, setIsFocused] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const [localValue, setLocalValue] = useState(value ?? "");

    useEffect(() => {
        if (value !== undefined) {
            setLocalValue(value);
        }
    }, [value]);

    const watchedValue = control
        ? (useWatch({ control, name }) as string)
        : undefined;

    const registerProps = register ? register(name) : null;

    const currentValue = control ? watchedValue ?? "" : localValue;
    const selectedOption = options.find((opt) => opt.value === currentValue);
    const displayValue = selectedOption?.label || placeholder;

    const hasValue = !!currentValue;
    const shouldShowLabel = isFocused || hasValue || isOpen;

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target as Node)
            ) {
                setIsOpen(false);
                setIsFocused(false);
            }
        }

        if (isOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isOpen]);

    const handleSelect = (optionValue: string) => {
        if (setValue) {
            setValue(name, optionValue as TFieldValues[typeof name], {
                shouldValidate: true,
            });
        } else {
            setLocalValue(optionValue);
            if (onChange) onChange(optionValue);
        }
        setIsOpen(false);
        setIsFocused(false);
    };

    const handleToggle = () => {
        if (!disabled) {
            setIsOpen(!isOpen);
            setIsFocused(!isOpen);
        }
    };

    const errorMessage = getErrorMessage({
        errors,
        name: name as string,
        label,
    });

    const hasError = !!errorMessage;

    return {
        isOpen,
        setIsOpen,
        dropdownRef,
        watchedValue,
        registerProps,
        currentValue,
        displayValue,
        hasValue,
        shouldShowLabel,
        handleSelect,
        handleToggle,
        errorMessage,
        hasError,
    };
}
