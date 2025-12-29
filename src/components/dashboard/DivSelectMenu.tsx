"use client"
import type { DivSelectMenuProps } from '@/types/dashboard/div-select-menu.types'

export function DivSelectMenu({ className = "" }: DivSelectMenuProps) {
    const baseClasses =
        "pointer-events-none absolute left-0 top-1/2 -translate-y-1/2 h-[20px] w-[3.5px] rounded-tr-[6px] rounded-br-[6px] bg-accent-default shadow-[0_1px_2px_rgba(0,0,0,0.12)]"

    const classes = className ? `${baseClasses} ${className}` : baseClasses

    return <span aria-hidden className={classes} />
}
