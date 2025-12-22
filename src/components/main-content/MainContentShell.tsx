import { ReactNode } from 'react'

export type MainContentShellProps = {
    title?: string
    children: ReactNode
}

export default function MainContentShell({ title = 'Home', children }: MainContentShellProps) {
    return (
        <section className="w-full mx-auto p-[24px_32px_0px_32px]">
            <div>{children}</div>
        </section>
    )
}
