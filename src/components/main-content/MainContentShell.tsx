import { ReactNode } from 'react'

export type MainContentShellProps = {
    title?: string
    children: ReactNode
}

export default function MainContentShell({ title = 'Home', children }: MainContentShellProps) {
    return (
        <section className="flex-1 bg-white px-10 py-8">
            <header className="mb-8">
                <h1 className="text-2xl font-semibold text-secondary-900">{title}</h1>
            </header>
            <div className="rounded-2xl border border-secondary-50 bg-white min-h-[400px] flex items-center justify-center text-secondary-400">
                {children}
            </div>
        </section>
    )
}
