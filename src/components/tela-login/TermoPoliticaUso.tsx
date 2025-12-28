import { Button } from '@/components/ui/Button'

export default function TermoPoliticaUso() {
    return (
        <div className="w-full @laptop:w-[420px] flex flex-col">
            <span className='font-inter text-sm font-normal text-center @laptop:text-start flex-col @laptop:flex-row'>Ao acessar, eu li, entendi e concordo, com os
                <div className='flex flex-col @laptop:flex-row justify-center @laptop:justify-start'>
                    <div className='flex justify-center pr-1'>
                        <Button href="#" variant="link" size="default" className="text-[#AF0F2A]">
                            Termos de uso, Políticas de privacidade
                        </Button>
                    </div>

                    <span className='font-inter text-sm font-normal'>
                        Dental Uni.
                    </span>
                </div>

            </span>
        </div>
    )
}
