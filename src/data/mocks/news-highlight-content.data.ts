import type { NewsHighlightSectionProps } from '@/types/shared/news-highlight-section.types'

export const newsHighlight: NewsHighlightSectionProps = {
    feature: {
        imageSrc: '/assets/images/img-noticias-recentes-1.webp',
        imageAlt: 'Jantar dos cooperados aniversariantes do 3º Trimestre de 2025',
        title: 'Jantar dos cooperados aniversariantes do 3º Trimestre de 2025',
        date: '9 de jul, 2025',
    },
    articles: [
        { title: 'Confira como foi o nosso workshop Dental Uni 2023', date: '4 de jul, 2025' },
        { title: 'Nesse sábado dia 9, a Dental Uni participa do XV CIOPAR 2023', date: '4 de jul, 2025' },
        { title: 'Palestra especial em Projeto Cultivar - Cocamar em parceria com a APAE', date: '1 de jul, 2025' },
    ],
}
