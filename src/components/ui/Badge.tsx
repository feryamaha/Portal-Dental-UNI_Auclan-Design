import clsx from "clsx";
import { ComponentProps } from "react";
import { twMerge } from "tailwind-merge";

interface BadgeProps extends ComponentProps<"span"> {
  variant:
  | "default"
  | "light"
  | "success"
  | "info"
  | "warning"
  | "danger"
  | "number";
  disabled?: boolean;
}

export function Badge({ variant, disabled = false, ...props }: BadgeProps) {
  const classes = twMerge(
    clsx(
      "font-inter text-xs font-normal leading-[150%] rounded-[8px] flex justify-center items-center duration-200 ease-linear transition-colors gap-[2px]",
      !disabled &&
      "shadow-[0_1px_4px_0_rgba(0,0,0,0.08),0_1px_2px_0_rgba(25,25,25,0.08)]",

      variant === "default" &&
      (disabled
        ? "bg-secondary-100 grayscale opacity-60 p-[2px_8px]"
        : "bg-secondary-25 text-secondary-800 border border-secondary-100 p-[2px_8px]"),

      variant === "light" &&
      (disabled
        ? "bg-secondary-200 grayscale opacity-60 border border-secondary-100 p-[2px_8px_2px_4px]"
        : "bg-secondary-0 text-secondary-800 border border-secondary-100 p-[2px_8px_2px_4px]"),

      variant === "success" &&
      (disabled
        ? "bg-secondary-200 grayscale opacity-60 border border-secondary-100 p-[2px_8px_2px_4px]"
        : "bg-auxiliary-success-background text-auxiliary-success-default border border-auxiliary-success-border p-[2px_8px_2px_4px]"),

      variant === "info" &&
      (disabled
        ? "bg-secondary-200 grayscale opacity-60 border border-secondary-100 p-[2px_8px_2px_4px]"
        : "bg-auxiliary-info-background text-auxiliary-info-default border border-auxiliary-info-border p-[2px_8px_2px_4px]"),

      variant === "warning" &&
      (disabled
        ? "bg-secondary-200 grayscale opacity-60 border border-secondary-100 p-[2px_8px_2px_4px]"
        : "bg-auxiliary-warning-background text-accent-default border border-auxiliary-warning-border p-[2px_8px_2px_4px]"),

      variant === "danger" &&
      (disabled
        ? "bg-secondary-200 grayscale opacity-60 border border-secondary-100 p-[2px_8px]"
        : "bg-accent-light text-accent-default border border-primary-50 p-[1px_8px]"),

      variant === "number" &&
      (disabled
        ? "w-[24px] h-[24px] px-[2px] rounded-full bg-secondary-100 text-[10px] text-secondary-800 border border-secondary-100 grayscale opacity-60"
        : "w-[24px] h-[24px] px-[2px] rounded-full bg-secondary-25 text-[10px] text-secondary-800 border border-secondary-100"),
    ),
  );

  return <span className={classes} {...props} />;
}