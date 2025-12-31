"use client";

import type { FieldValues } from "react-hook-form";
import type { FloatingLabelInputProps } from "@/types/ui/floating-label-input.types";
import { useFloatingLabelInput } from "@/hooks/hooks-dash/hooks-UI-UX/useFloatingLabelInput.hook";

export function FloatingLabelInput<
  TFieldValues extends FieldValues = FieldValues,
>({
  label,
  name,
  register,
  errors,
  validation,
  value,
  onChange,
  type = "text",
  className = "",
  placeholder = "",
  onBlur,
  onFocus,
  maxLength,
  readOnly,
  disabled,
  control,
  onlyLetters = false,
  onlyNumbers = false,
  allowAllCharacters = false,
  mask, // agora aceitamos mask como prop
}: FloatingLabelInputProps<TFieldValues>) {
  const { registerProps, currentValue, uncontrolledValue, shouldShowLabel, errorMessage, hasError, baseProps, handleChange, applyMask } =
    useFloatingLabelInput<TFieldValues>({
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
    });
  if (registerProps) {
    return (
      <div className={`relative ${className}`}>
        <input
          {...baseProps}
          {...registerProps}
          value={mask ? applyMask(currentValue) : currentValue}
          onChange={(e) => {
            handleChange(e);
            if (registerProps.onChange) registerProps.onChange(e);
          }}
          className={`${baseProps.className} focus-visible:outline-2 focus-visible:outline-primary-500 focus-visible:outline-offset-2`}
        />
        <label
          className={`absolute left-4 pointer-events-none transition-all duration-200 font-normal ${shouldShowLabel
            ? `top-[-10px] text-sm bg-white px-2 rounded-lg ${hasError ? "text-red-500" : "text-secondary-500"
            }`
            : `top-6 -translate-y-1/2 text-base ${hasError ? "text-red-500" : "text-gray500"
            }`
            }`}
        >
          {label}
        </label>
        {hasError && errorMessage && (
          <p className="text-red-500 text-sm mt-1">{errorMessage}</p>
        )}
      </div>
    );
  }
  return (
    <div className={`relative ${className}`}>
      <input
        {...baseProps}
        value={uncontrolledValue}
        onChange={handleChange}
      />
      <label
        className={`absolute left-4 pointer-events-none transition-all duration-200 font-normal ${shouldShowLabel
          ? `top-[-8px] text-sm bg-white px-2 ${hasError ? "text-red500" : "text-secondary-500"
          }`
          : `top-1/2 -translate-y-1/2 text-base ${hasError ? "text-red-500" : "text-secondary-500"
          }`
          }`}
      >
        {label}
      </label>
      {hasError && errorMessage && (
        <p className="text-red-500 text-sm mt-1">{errorMessage}</p>
      )}
    </div>
  );
}
