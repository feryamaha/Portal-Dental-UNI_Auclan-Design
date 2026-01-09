export interface CronogramaEvent {
    id: string
    title: string
    date: string
    dayOfWeek: string
    day: number
    month: string
    type: 'PROD' | 'GERAL'
}

export interface CronogramaMonth {
    month: string
    events: CronogramaEvent[]
}

export interface CronogramaData {
    producao: CronogramaMonth[]
    calendario: CronogramaMonth[]
}

export interface CardCronogramaProps {
    data?: CronogramaData | null
}
