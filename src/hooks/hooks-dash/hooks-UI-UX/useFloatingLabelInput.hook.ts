"use client";

import { useEffect, useMemo, useState } from "react";
import { useWatch } from "react-hook-form";

import { applyMask } from "@/utils/input-mask.helpers";
import { getErrorMessage } from "@/utils/react-hook-form-error-message.helpers";
import type {
    Control,
    FieldErrors,
    FieldValues,
    Path,
    PathValue,
    UseFormRegister,
} from "react-hook-form";

export function useFloatingLabelInput<TFieldValues extends FieldValues = FieldValues>(params: {
    label: string;
    name: Path<TFieldValues>;
    register?: UseFormRegister<TFieldValues>;
    errors?: FieldErrors<TFieldValues>;
    validation?: Record<string, unknown>;
    value?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    type: string;
    placeholder: string;
    onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
    onFocus?: (e: React.FocusEvent<HTMLInputElement>) => void;
    maxLength?: number;
    readOnly?: boolean;
    disabled?: boolean;
    control?: Control<TFieldValues>;
    onlyLetters: boolean;
    onlyNumbers: boolean;
    allowAllCharacters: boolean;
    mask?: string;
}) {
    const {
        label,
        name,
        register,
        errors,
        validation,
        value,
        onChange,
        type,
        placeholder,
        onBlur,
        onFocus,
        maxLength,
        readOnly,
        disabled,
        control,
        onlyLetters,
        onlyNumbers,
        allowAllCharacters,
        mask,
    } = params;

    const [isFocused, setIsFocused] = useState(false);

    const applyMaskFn = useMemo(() => {
        return (val: string): string => applyMask(val, mask);
    }, [mask]);

    const registerProps =
        register && validation
            ? register(name, validation)
            : register
                ? register(name)
                : null;

    const watchedValue: string = control
        ? (((useWatch({ control, name }) as PathValue<TFieldValues, typeof name>) ||
            "") as string)
        : "";

    const [hasContent, setHasContent] = useState(false);
    useEffect(() => {
        const currentVal = value || watchedValue || "";
        setHasContent(currentVal.length > 0);
    }, [value, watchedValue]);

    const currentValue: string = value || watchedValue || "";

    const uncontrolledValue =
        value !== undefined ? (mask ? applyMaskFn(value) : value) : undefined;

    const hasValue =
        (currentValue && String(currentValue).length > 0) || hasContent;

    const shouldShowLabel = isFocused || hasValue;

    const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
        setIsFocused(true);
        setHasContent((e.target.value || "").length > 0);
        if (onFocus) onFocus(e);
    };

    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
        setIsFocused(false);
        setHasContent((e.target.value || "").length > 0);
        if (onBlur) onBlur(e);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let val = e.target.value;

        if (mask) {
            val = applyMaskFn(val);
            e.target.value = val;
        }

        let isValid = true;
        if (!allowAllCharacters) {
            if (onlyLetters) {
                isValid = /^[A-Za-zÀ-ÖØ-öø-ÿ\s]*$/.test(val);
            } else if (onlyNumbers) {
                isValid = /^[0-9]*$/.test(val.replace(/\D/g, ""));
            }
            if (!isValid) return;
        }

        if (onChange) onChange(e);
    };

    const controlKeys = ["Backspace", "Delete", "ArrowLeft", "ArrowRight", "Tab"];
    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (controlKeys.includes(e.key)) return;
        if (!allowAllCharacters) {
            if (onlyLetters && !/[A-Za-zÀ-ÖØ-öø-ÿ\s]/.test(e.key)) e.preventDefault();
            else if (onlyNumbers && !/[0-9]/.test(e.key)) e.preventDefault();
        }
    };

    const errorMessage = getErrorMessage({
        errors,
        name: name as string,
        label,
    });

    const hasError = !!errorMessage;

    let inputType = type;
    if (onlyNumbers && type === "text") {
        inputType = "tel";
    }

    const baseProps = {
        type: inputType,
        name,
        onFocus: handleFocus,
        onBlur: handleBlur,
        placeholder: isFocused ? placeholder : "",
        maxLength,
        readOnly,
        disabled,
        onKeyDown: handleKeyDown,
        className: `w-full h-12 border rounded-lg px-4 pt-2 pb-2 transition-colors ${hasError
            ? "border-red-500 ring-red-400 focus:outline-none focus:ring-1 focus:border-red-500"
            : "border-secondary-100 ring-gray950 focus:outline-none focus:ring-1 focus:border-gray-950"
            } ${readOnly ? "cursor-default" : ""} hover:border-gray-950`,
    };

    return {
        registerProps,
        watchedValue,
        currentValue,
        uncontrolledValue,
        hasValue,
        shouldShowLabel,
        errorMessage,
        hasError,
        baseProps,
        handleChange,
        applyMask: applyMaskFn,
    };
}
