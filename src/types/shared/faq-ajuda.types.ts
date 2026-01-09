export interface FaqItemData {
    id: string
    question: string
    answer: string
}

export interface FaqCategory {
    id: string
    label: string
    value: string
    items: FaqItemData[]
}

export interface FaqAjudaContent {
    portal: string
    categories: FaqCategory[]
}

export interface UseFaqAjudaDataReturn {
    data: FaqAjudaContent | null
    loading: boolean
    error: string | null
}

export interface FaqAjudaProps {
    portal: string
    onClose?: () => void
}
