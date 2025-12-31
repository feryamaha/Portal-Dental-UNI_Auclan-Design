import type { ReactNode } from 'react'
import Sidebar from '@/components/dashboard-layout/Sidebar'
import Topbar from '@/components/dashboard-layout/Topbar'

export default function DashboardLayout({ children }: { children: ReactNode }) {
    return (
        <div className="min-h-screen w-full flex">
            <Sidebar />
            <div className="flex-1 flex flex-col">
                <Topbar />
                <main className="flex-1 bg-white">{children}</main>
            </div>
        </div>
    )
}
