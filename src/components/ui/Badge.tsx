import clsx from "clsx";
import { ComponentProps } from "react";
import { twMerge } from "tailwind-merge";

interface BadgeProps extends ComponentProps<"span"> {
  variant: "default" | "light" | "success" | "info" | "number";
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
          ? "bg-gray-100 grayscale opacity-60 p-[2px_8px]"
          : "bg-gray-25 text-gray-800 border border-gray-100 p-[2px_8px]"),

      variant === "light" &&
        (disabled
          ? "bg-gray-200 grayscale opacity-60 border border-gray-100 p-[2px_8px]"
          : "bg-white text-gray-800 border border-gray-100 p-[2px_8px]"),

      variant === "success" &&
        (disabled
          ? "bg-gray-200 grayscale opacity-60 border border-gray-100 p-[2px_8px]"
          : "bg-successBg text-successDefault border border-successBorder p-[2px_8px]"),
      variant === "info" &&
        (disabled
          ? "bg-gray-200 grayscale opacity-60 border border-gray-100 p-[2px_8px]"
          : "bg-infoBg text-infoDefault border border-infoBorder p-[2px_8px]"),

      variant === "number" &&
        (disabled
          ? "w-[24px] h-[24px] px-[2px] rounded-full bg-gray-100 text-[10px] text-gray-800 border border-gray-100 grayscale opacity-60"
          : "w-[24px] h-[24px] px-[2px] rounded-full bg-gray-25 text-[10px] text-gray-800 border border-gray-100")
    )
  );

  return <span className={classes} {...props} />;
}
