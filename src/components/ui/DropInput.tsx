"use client"
import type { FieldValues } from "react-hook-form";
import { Icon } from "@/script/Icon";
import type { DropInputProps } from "@/types/ui/drop-input.types";
import { useDropInput } from "@/hooks/hooks-dash/hooks-UI-UX/useDropInput.hook";

export function DropInput<TFieldValues extends FieldValues = FieldValues>({
  label,
  name,
  placeholder = "Selecione uma opção",
  options,
  register,
  errors,
  control,
  setValue,
  className = "",
  disabled = false,
  value,
  onChange,
}: DropInputProps<TFieldValues>) {
  const {
    isOpen,
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
  } = useDropInput<TFieldValues>({
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
  });

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      {/* Input hidden para RHF */}
      {registerProps && (
        <input type="hidden" {...registerProps} value={currentValue || ""} />
      )}

      {/* Campo visual (não é input real) */}
      <button
        type="button"
        onClick={handleToggle}
        disabled={disabled}
        className={`w-full h-12 border rounded-lg px-4 pt-2 pb-2 transition-colors text-left flex items-center justify-between ${hasError
          ? "border-red-500 ring-red-400"
          : "border-secondary-100 ring-gray950"
          } ${disabled ? "cursor-not-allowed opacity-50" : "cursor-pointer hover:border-gray-950"}`}
      >
        <span className={`${!hasValue ? "text-gray-400" : "text-gray-900"}`}>
          {displayValue}
        </span>
        <Icon
          name="iconArrow2Down"
          className={`transition-transform ${isOpen ? "rotate-180" : ""}`}
        />
      </button>

      {/* Floating Label */}
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

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute z-50 w-full mt-2 bg-white rounded-lg border border-gray100 shadow-[0_1px_2px_0_rgba(0,0,0,0.08),0_1px_2px_0_rgba(25,25,25,0.08)] max-h-[240px] overflow-y-auto">
          <div className="p-[4px] flex flex-col gap-[4px]">
            {options.map((option) => (
              <button
                key={option.value}
                type="button"
                onClick={() => handleSelect(option.value)}
                className={`w-full text-left flex items-center gap-[8px] p-[6px_8px] transition-colors TypographyPinter16w500g900 hover:text-redSTD hover:bg-red25 rounded-lg ${watchedValue === option.value
                  ? "bg-red25 text-redSTD"
                  : ""
                  }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Mensagem de erro */}
      {hasError && errorMessage && (
        <p className="text-red-500 text-sm mt-1">{errorMessage}</p>
      )}
    </div>
  );
}
