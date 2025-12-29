import { ReactNode } from 'react'
import type { MainContentShellProps } from '@/types/main-content/main-content-shell.types'

export type { MainContentShellProps } from '@/types/main-content/main-content-shell.types'

export default function MainContentShell({ title = 'Home', children }: MainContentShellProps) {
    return (
        <section className="w-full mx-auto p-[24px_32px_0px_32px]">
            <div>{children}</div>
        </section>
    )
}
