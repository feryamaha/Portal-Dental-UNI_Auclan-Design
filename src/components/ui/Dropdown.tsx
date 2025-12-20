import { useEffect, useRef, useState } from "react";
import { Icon } from "@/script/Icon";

interface MenuItem {
  label: string;
  icon?: string;
  onClick?: () => void;
}

interface DropdownMenuProps {
  items: MenuItem[];
  triggerText?: string;
}

export function DropdownMenu({ items }: DropdownMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  });

  const handleItemClick = (item: MenuItem) => {
    if (item.onClick) {
      item.onClick();
    }
  };

  return (
    <div className="w-max bg-white p-[4px] flex flex-col gap-[4px] rounded-lg border border-gray100 shadow-[0_1px_2px_0_rgba(0,0,0,0.08),0_1px_2px_0_rgba(25,25,25,0.08)]">
      {items.map((item, index) => (
        <div
          key={index}
          onClick={() => handleItemClick(item)}
          className="w-full flex items-center gap-[8px] p-[6px_8px] transition-colors TypographyPinter16w500g900 hover:text-redSTD hover:bg-red25 rounded-lg"
        >
          {item.icon && <Icon name={item.icon} />}
          {item.label}
        </div>
      ))}
    </div>
  );
}
