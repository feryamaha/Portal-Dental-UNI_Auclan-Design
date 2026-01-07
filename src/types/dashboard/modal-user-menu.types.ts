import type { PortalSlug } from '@/types/data/portal-config.types'

export interface UserMenuItemProps {
    id: string
    label: string
    href: string
    icon: string
    badge?: string
}

export interface UserMenuSectionProps {
    id: string
    title: string
    items: UserMenuItemProps[]
}

export interface UserMenuContent {
    sections: UserMenuSectionProps[]
}

export interface ModalUserMenuProps {
    portal?: PortalSlug
    isOpen: boolean
    onClose: () => void
}
