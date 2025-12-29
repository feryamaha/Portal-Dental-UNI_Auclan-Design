import clsx from "clsx";
import Link from "next/link";
import { Icon } from "@/script/Icon";
import type { BreadcrumbItem, BreadcrumbsProps } from "@/types/ui/breadcrumbs.types";

export type { BreadcrumbItem } from "@/types/ui/breadcrumbs.types";

export function Breadcrumbs({
  items,
  isMobile = false,
  lengthWordLimit = 5,
}: BreadcrumbsProps) {
  return (
    <nav aria-label="breadcrumb">
      <ul className="flex items-center space-x-1">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;

          return (
            <li
              key={index}
              className="flex items-center"
              aria-current={isLast ? "page" : undefined}
            >
              <Link
                className={clsx(
                  "font-inter text-sm flex items-center no-underline",
                  "hover:font-medium hover:text-secondary-900 hover:underline hover:underline-offset-[3px] cursor-pointer",
                  isLast
                    ? "text-secondary-500 font-normal"
                    : "text-secondary-700 font-medium",
                  item.icon && "gap-[8px]",
                  isMobile &&
                  item.label.length >= lengthWordLimit &&
                  "truncate inline-block align-bottom",
                )}
                href={item.href}
                onClick={isLast ? (e) => e.preventDefault() : undefined}
                title={item.label}
                style={
                  isMobile && item.label.length >= lengthWordLimit
                    ? { maxWidth: `${lengthWordLimit}ch` }
                    : undefined
                }
              >
                {item.icon && <Icon name={item.icon} className="text-current" />}
                {item.label}
              </Link>
              {index < items.length - 1 && (
                <span className="mx-1 text-secondary-400">/</span>
              )}
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
