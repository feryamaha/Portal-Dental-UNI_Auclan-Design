"use client";
import clsx from "clsx";
import React, { ComponentProps, useState } from "react";
import { twMerge } from "tailwind-merge";
import Link from "next/link";
import { Icon, IconProps } from "@/script/Icon";

interface ButtonProps extends ComponentProps<"button"> {
  href?: string;
  variant: "primary" | "primary-icon" | "secondary" | "tertiary" | "link";
  size: "sm" | "md" | "lg" | "default";
  background?:
  | "bg-primary"
  | "bg-secondary"
  | "dangerPrimary"
  | "dangerSecondary"
  | "dangerTertiary";
  icon?: "none" | "icon";
  positionIcon?: "left" | "md" | "right";
}

export function Button({
  variant,
  size,
  disabled,
  background,
  icon = "none",
  positionIcon = "left",
  href,
  ...props
}: ButtonProps) {
  const [isHovered, setIsHovered] = useState(false);
  const classes = twMerge(
    clsx(
      "font-inter leading-[150%] text-base font-semibold rounded-md flex  items-center duration-200 ease-linear transition-colors cursor-pointer w-full",
      variant === "primary" &&
      (disabled
        ? "bg-secondary-200 text-secondary-400 gap-[8px] cursor-not-allowed justify-center"
        : "bg-primary-600 text-white hover:bg-primary-700 gap-[8px] justify-center"),
      variant === "primary-icon" &&
      (disabled
        ? "bg-secondary-200 text-secondary-400 gap-[8px] cursor-not-allowed justify-between"
        : "bg-primary-600 text-white hover:bg-primary-700 gap-[8px] justify-between"),
      variant === "secondary" &&
      (disabled
        ? "font-medium border border-secondary-100 text-secondary-200 justify-between rounded-lg cursor-not-allowed justify-between"
        : "font-medium border border-secondary-100 text-secondary-950 justify-between rounded-lg bg-secondary-25 hover:border-secondary-200 justify-between"),
      variant === "tertiary" &&
      (disabled
        ? "text-secondary-200 gap-[12px] cursor-not-allowed justify-center"
        : "text-primary-500 hover:text-primary-700 gap-[12px] shadow-none justify-center"),
      variant === "link" &&
      (disabled
        ? "text-secondary-200 font-normal gap-[12px] cursor-not-allowed"
        : "text-primary-500 font-medium leading-[140%] hover:underline underline-offset-4  gap-[8px] shadow-none"),
      size === "lg" && "p-[12px_24px]",
      size === "md" && "p-[8px_16px]",
      size === "sm" && "p-[7px_16px]",
      size === "default" && "p-0",
      background === "dangerPrimary" &&
      (disabled
        ? "bg-secondary-200 text-secondary-400 cursor-not-allowed"
        : "bg-white text-redSTD border border-redSTD hover:text-primary-700 hover:border-primary-700"),
      background === "dangerSecondary" &&
      (disabled
        ? "border border-secondary-100 bg-white text-secondary-200 gap-[8px] cursor-not-allowed"
        : "bg-danger-secondary-bg text-danger-secondary-text border border-danger-secondary-border hover:bg-danger-secondary-hover-bg hover:border-danger-secondary-hover-border hover:text-danger-secondary-hover-text gap-[8px]"),
      background === "dangerTertiary" &&
      (disabled
        ? "text-secondary-200 gap-[12px] cursor-not-allowed"
        : "text-danger-tertiary-text hover:text-danger-tertiary-hover-text underline-offset-4 gap-[8px]")
    )
  );

  const isDangerSecondaryCombo =
    variant === "secondary" && background === "dangerSecondary";
  let hasManualIcon = false;
  const processedChildren = React.Children.map(props.children, (child) => {
    if (!React.isValidElement(child)) return child;
    const isIcon = child.type === Icon;
    if (isIcon) hasManualIcon = true;
    const isDangerIcon =
      isIcon && (child.props as IconProps).name === "iconHome";
    const shouldSwap =
      isIcon &&
      isDangerIcon &&
      isDangerSecondaryCombo &&
      isHovered &&
      !disabled;
    return shouldSwap
      ? (React.cloneElement(child, {
        name: "iconToAdd",
      } as IconProps) as typeof child)
      : child;
  });

  const resolveAutoIconName = (): IconProps["name"] | null => {
    if (icon !== "icon" || hasManualIcon) return null;

    let autoIconName: IconProps["name"] = "iconToAdd";

    if (!disabled) {
      if (
        (variant === "tertiary" && isHovered) ||
        (background === "dangerTertiary" && isHovered) ||
        (variant === "secondary" && isDangerSecondaryCombo && isHovered)
      ) {
        autoIconName = "iconToAdd";
      } else if (variant === "primary" || variant === "secondary") {
        autoIconName = "iconToAdd";
      }
    }
    return autoIconName;
  };

  const autoIconName = resolveAutoIconName();
  const autoIcon = autoIconName ? <Icon name={autoIconName} /> : null;

  const buttonContent = (
    <>
      {positionIcon === "left" && autoIcon}
      {processedChildren}
      {positionIcon === "right" && autoIcon}
    </>
  );

  const { className, ...restProps } = props;

  const commonButtonProps = {
    className: twMerge(
      classes,
      className // Classes adicionais do usuário
    ),
    onMouseEnter: () => !disabled && setIsHovered(true),
    onMouseLeave: () => setIsHovered(false),
    ...restProps,
  };

  if (href) {
    const isExternal =
      href.startsWith("http://") || href.startsWith("https://");
    const linkProps = isExternal ? { target: "_blank", rel: "noopener" } : {};
    return (
      <Link href={href} className="flex" {...linkProps}>
        <button
          {...commonButtonProps}
          onClick={disabled ? (e) => e.preventDefault() : undefined}
        >
          {buttonContent}
        </button>
      </Link>
    );
  }

  return (
    <button {...commonButtonProps} disabled={disabled}>
      {buttonContent}
    </button>
  );
}
