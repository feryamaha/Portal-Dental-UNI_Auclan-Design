'use client'

import Link from 'next/link'
import { Icon } from '@/script/Icon'
import { getUserMenuContent } from '@/data/portals/user-menu-config'
import { usePortalDetector as useDashboardSidebar } from '@/hooks/hooks-dash/hooks-shared/usePortalDetector.hook'
import { useDashboardTopbar } from '@/hooks/hooks-dash/hooks-shared/useDashboardTopbar.hook'
import type { ModalUserMenuProps } from '@/types/dashboard/modal-user-menu.types'
import { NotificationBadge } from '@/components/ui/NotificationBadge'
import { Logout } from '@/components/ui/Logout'
import { GooglePlayAppleStore } from '@/components/ui/GooglePlayAppleStore'

export function ModalUserMenu({ portal, isOpen, onClose }: ModalUserMenuProps) {
    if (!isOpen) return null

    const { resolvedPortal } = useDashboardSidebar({ portal })
    const { user } = useDashboardTopbar({ portal: resolvedPortal })
    const { sections } = getUserMenuContent(resolvedPortal)

    return (
        <>
            {/* Backdrop */}
            <div
                className="fixed bg-black bg-opacity-50 bg-[url('/assets/images/mask-image.webp')] bg-cover bg-center bg-no-repeat inset-0 z-40"
                onClick={onClose}
                aria-hidden="true"
            />

            {/* Modal */}
            <div className="absolute right-[32px] w-[324px] h-max p-[16px_12px_24px_12px] bg-white rounded-lg border border-neutral-100 shadow-[0_1px_3px_0_rgba(25, 25, 25, 0.12)] z-50">
                {/* Header */}
                <div>
                    <div className="flex items-center gap-3">
                        <Icon name='iconFaviconDental' />
                        <div className="flex-1">
                            <p className="text-sm font-semibold text-neutral-900">{user.name}</p>
                            <p className="text-xs text-neutral-600">{user.role}</p>
                        </div>
                    </div>
                </div>

                {/* Menu */}
                <div className='px-2' >
                    <nav className="w-full overflow-y-auto">
                        {/* GERAL Section */}
                        {sections[0] && (
                            <div key={sections[0].id}>
                                <p className="py-2 text-xs font-medium text-neutral-500">
                                    {sections[0].title}
                                </p>
                                <div className="space-y-1">
                                    {sections[0].items.map((item) => (
                                        <Link
                                            key={item.id}
                                            href={item.href}
                                            onClick={onClose}
                                            className="flex items-center gap-3 py-2 text-sm text-neutral-700 px-3 py-2 rounded-md transition-colors ease-in duration-200 hover:bg-accent-light"
                                        >
                                            <Icon name={item.icon} className="text-neutral-700" />
                                            <span className="flex-1 text-left">{item.label}</span>
                                            {item.badge && (
                                                <NotificationBadge>{item.badge}</NotificationBadge>
                                            )}
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Separator */}
                        {sections.length > 1 && <div className="border-t border-neutral-100 my-4" />}

                        {/* OUTROS Section */}
                        {sections[1] && (
                            <div key={sections[1].id}>
                                <p className="px-2.5 py-2 text-xs font-medium text-neutral-500">
                                    {sections[1].title}
                                </p>
                                <div className="space-y-1">
                                    {sections[1].items.map((item) => (
                                        <Link
                                            key={item.id}
                                            href={item.href}
                                            onClick={onClose}
                                            className="flex items-center gap-3 py-2 text-sm text-neutral-700 px-3 py-2 rounded-md transition-colors ease-in duration-200 hover:bg-accent-light"
                                        >
                                            <span className="flex-1 text-left">{item.label}</span>
                                            {item.badge && (
                                                <NotificationBadge>{item.badge}</NotificationBadge>
                                            )}

                                            <Icon name={item.icon} className="text-neutral-700" />
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        )}
                    </nav>
                    {/* Logout */}
                    <div className="py-2">
                        <Logout href={`/tela-login/${resolvedPortal}`} onClick={onClose} />
                    </div>
                    {/* App Badges */}
                    <GooglePlayAppleStore />
                </div>
            </div>
        </>
    )
}
