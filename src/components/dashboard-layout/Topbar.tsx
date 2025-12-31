"use client"
import Link from 'next/link'
import { clsx } from 'clsx'
import { Icon } from '@/script/Icon'
import { Button } from '@/components/ui/Button'
import { Breadcrumbs } from '@/components/ui/Breadcrumbs'
import { useDashboardTopbar } from '@/hooks/hooks-dash/hooks-shared/useDashboardTopbar.hook'
import type { TopbarProps } from '@/types/dashboard/topbar.types'

export type { TopbarProps } from '@/types/dashboard/topbar.types'

export default function Topbar({ portal, containerClassName }: TopbarProps) {
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
                    <nav className="flex items-center gap-4 text-sm font-medium text-secondary-900">
                        {quickLinks.map((link) => (
                            <Link key={link.id} href={link.href} className="inline-flex items-center gap-2 hover:text-[#AF0F2A] focus-visible:outline-2 focus-visible:outline-primary-500 focus-visible:outline-offset-2 rounded" tabIndex={2}>
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
                                    className='px-0 text-secondary-900'
                                    key={action.id}
                                    type="button"
                                    aria-label={`Ação ${action.id}`}
                                    tabIndex={2}
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
                                    <span className="w-max text-sm font-semibold text-secondary-900 pb-[2px]">{user.name}</span>
                                    <span className="w-max text-sm text-secondary-600">{user.role}</span>
                                </div>
                                <div>
                                    <Button variant="tertiary" size="sm" className='px-0' aria-label="Menu de perfil" tabIndex={2}>
                                        <Icon name='iconFlechaDupla' className='text-secondary-900' />
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    )
}
