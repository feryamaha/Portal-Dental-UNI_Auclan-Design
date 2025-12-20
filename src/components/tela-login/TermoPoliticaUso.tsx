import { Button } from '@/components/ui/Button'

export default function TermoPoliticaUso() {
    return (
        <div className="flex flex-col">
            <span className='font-inter text-sm font-normal'>Ao acessar, eu li, entendi e concordo, com os
            </span>
            <div className='flex gap-1 items-end'>
                <Button href="#" variant="link" size="default" className="text-[#AF0F2A]">
                    Termos de uso, Políticas de privacidade
                </Button>
                <span className='font-inter text-sm font-normal'>
                    Dental Uni.
                </span>
            </div>

        </div>
    )
}
