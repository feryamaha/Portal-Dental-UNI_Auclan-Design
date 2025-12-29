export interface BreadcrumbItem {
    label: string;
    href: string;
    icon?: string;
}

export interface BreadcrumbsProps {
    items: BreadcrumbItem[];
    lengthWordLimit?: number;
    isMobile?: boolean;
}
