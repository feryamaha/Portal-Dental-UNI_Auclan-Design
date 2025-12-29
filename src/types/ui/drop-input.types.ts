import type {
    Control,
    FieldErrors,
    FieldValues,
    Path,
    UseFormRegister,
    UseFormSetValue,
} from "react-hook-form";

export interface DropInputOption {
    value: string;
    label: string;
}

export interface DropInputProps<TFieldValues extends FieldValues = FieldValues> {
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
    value?: string;
    onChange?: (value: string) => void;
}
