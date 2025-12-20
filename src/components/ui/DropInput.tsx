import { useState, useEffect, useRef } from "react";
import {
  UseFormRegister,
  FieldErrors,
  useWatch,
  Control,
  FieldValues,
  Path,
  UseFormSetValue,
} from "react-hook-form";
import { Icon } from "@/script/Icon";

interface DropInputOption {
  value: string;
  label: string;
}

interface DropInputProps<TFieldValues extends FieldValues = FieldValues> {
  label: string;
  name: Path<TFieldValues>;
  placeholder?: string;
  options: DropInputOption[];
  register?: UseFormRegister<TFieldValues>;
  errors?: FieldErrors<TFieldValues>;
  control?: Control<TFieldValues>;
  setValue?: UseFormSetValue<TFieldValues>;
  className?: string;
  disabled?: boolean;
}

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
}: DropInputProps<TFieldValues>) {
  const [isOpen, setIsOpen] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Watch do valor atual via RHF
  const watchedValue = useWatch({ control, name }) as string;

  // Registra o campo no RHF
  const registerProps = register ? register(name) : null;

  // Label do valor selecionado
  const selectedOption = options.find((opt) => opt.value === watchedValue);
  const displayValue = selectedOption?.label || "";

  const hasValue = !!watchedValue;
  const shouldShowLabel = isFocused || hasValue || isOpen;

  // Click outside to close
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

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;

      if (e.key === "Escape") {
        setIsOpen(false);
        setIsFocused(false);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  const handleSelect = (optionValue: string) => {
    if (setValue) {
      setValue(name, optionValue as TFieldValues[typeof name], {
        shouldValidate: true,
      });
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

  // Função para obter mensagem de erro (mesma lógica do FloatingLabelInput)
  const getErrorMessage = (): string | null => {
    if (!errors || !name) return null;

    const nameParts = name.split(".");
    let currentError: unknown = errors;

    for (const part of nameParts) {
      if (
        currentError &&
        typeof currentError === "object" &&
        part in (currentError as Record<string, unknown>)
      ) {
        currentError = (currentError as Record<string, unknown>)[part];
      } else {
        return null;
      }
    }

    if (!currentError) return null;

    if (typeof currentError === "object" && currentError !== null) {
      if (
        "message" in currentError &&
        typeof (currentError as { message?: unknown }).message === "string"
      ) {
        return (currentError as { message: string }).message;
      }
      if (
        "type" in currentError &&
        (currentError as { type?: unknown }).type === "required"
      ) {
        return `${label.replace("*", "").trim()} é obrigatório`;
      }
    }

    return null;
  };

  const errorMessage = getErrorMessage();
  const hasError = !!errorMessage;

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      {/* Input hidden para RHF */}
      {registerProps && (
        <input type="hidden" {...registerProps} value={watchedValue || ""} />
      )}

      {/* Campo visual (não é input real) */}
      <button
        type="button"
        onClick={handleToggle}
        disabled={disabled}
        className={`w-full h-12 border rounded-lg px-4 pt-2 pb-2 transition-colors text-left flex items-center justify-between ${hasError
          ? "border-red-500 ring-red-400 focus:outline-none focus:ring-1 focus:border-red-500"
          : "border-secondary-100 ring-gray950 focus:outline-none focus:ring-1 focus:border-gray-950"
          } ${disabled ? "cursor-not-allowed opacity-50" : "cursor-pointer hover:border-gray-950"}`}
      >
        <span className={`${!hasValue ? "text-gray-400" : "text-gray-900"}`}>
          {displayValue || (isFocused || isOpen ? placeholder : "")}
        </span>
        <Icon
          name="iconArrrow2Down"
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
