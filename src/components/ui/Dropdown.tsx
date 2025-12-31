import { Icon } from "@/script/Icon";
import type { DropdownMenuProps, MenuItem } from "@/types/ui/dropdown.types";
import { useDropdownMenu } from "@/hooks/hooks-dash/hooks-UI-UX/useDropdownMenu.hook";

export function DropdownMenu({ items }: DropdownMenuProps) {
  const { isOpen, setIsOpen, dropdownRef } = useDropdownMenu();

  const handleItemClick = (item: MenuItem) => {
    if (item.onClick) {
      item.onClick();
    }
  };

  return (
    <div className="w-max bg-white p-[4px] flex flex-col gap-[4px] rounded-lg border border-gray100 shadow-[0_1px_2px_0_rgba(0,0,0,0.08),0_1px_2px_0_rgba(25,25,25,0.08)]" role="menu">
      {items.map((item, index) => (
        <div
          key={index}
          onClick={() => handleItemClick(item)}
          role="menuitem"
          tabIndex={3}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault()
              handleItemClick(item)
            }
          }}
          className="w-full flex items-center gap-[8px] p-[6px_8px] transition-colors TypographyPinter16w500g900 hover:text-redSTD hover:bg-red25 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 cursor-pointer"
        >
          {item.icon && <Icon name={item.icon} />}
          {item.label}
        </div>
      ))}
    </div>
  );
}
