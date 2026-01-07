"use client"
import { useState } from 'react'
import Link from 'next/link'
import { clsx } from 'clsx'
import { Icon } from '@/script/Icon'
import { Button } from '@/components/ui/Button'
import { Breadcrumbs } from '@/components/ui/Breadcrumbs'
import { useDashboardTopbar } from '@/hooks/hooks-dash/hooks-shared/useDashboardTopbar.hook'
import { ModalUserMenu } from '@/components/dashboard-layout/ModalUserMenu'
import type { TopbarProps } from '@/types/dashboard/topbar.types'

export type { TopbarProps } from '@/types/dashboard/topbar.types'

export default function Topbar({ portal, containerClassName }: TopbarProps) {
    const [isUserMenuOpen, setIsUserMenuOpen] = useState(false)
    const { quickLinks, actions, user, breadcrumbItems } = useDashboardTopbar({ portal })

    const innerClasses = clsx(
        'flex items-center justify-between py-6',
        containerClassName ?? 'px-[32px]'
    )

    return (
        <header className="w-full bg-white">
            <div className={innerClasses}>
                <Breadcrumbs items={breadcrumbItems} />

                <div className="flex items-center gap-6">
                    <nav className="flex items-center gap-4 text-sm font-medium text-neutral-900">
                        {quickLinks.map((link) => (
                            <Link key={link.id} href={link.href} className="inline-flex items-center gap-2 hover:text-[#AF0F2A] rounded">
                                {link.icon && <Icon name={link.icon} size={16} className="text-current" />}
                                {link.label}
                            </Link>
                        ))}
                    </nav>
                    <div className="flex items-center gap-[16px]">
                        <div className="flex items-center gap-[16px]">
                            {actions.map((action) => (
                                <Button
                                    variant="tertiary"
                                    size="sm"
                                    className='px-0 text-neutral-900'
                                    key={action.id}
                                    type="button"
                                >
                                    <Icon name={action.icon} className="text-current" />
                                </Button>
                            ))}
                        </div>

                        <div className="w-max flex items-center gap-3">
                            <div className='flex items-center gap-[16px]'>
                                <div className="w-max flex items-center justify-center">
                                    <Icon name="iconAvatar" />
                                </div>
                                <div className="w-max flex flex-col">
                                    <span className="w-max text-sm font-semibold text-neutral-900 pb-[2px]">{user.name}</span>
                                    <span className="w-max text-sm text-neutral-600">{user.role}</span>
                                </div>
                                <div>
                                    <Button
                                        variant="tertiary"
                                        size="sm"
                                        className='px-0'
                                        onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                                        type="button"
                                    >
                                        <Icon name='iconFlechaDupla' className='text-neutral-900' />
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <ModalUserMenu
                portal={portal}
                isOpen={isUserMenuOpen}
                onClose={() => setIsUserMenuOpen(false)}
            />
        </header>
    )
}
