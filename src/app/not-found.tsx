import { Button } from '@/components/ui/Button'
import { Container } from '@/components/ui/Container'

export default function NotFound() {
    return (
        <section className="min-h-screen bg-gradient-to-b from-white to-secondary-25">
            <Container>
                <div className="flex flex-col items-center pt-12 pb-36 text-secondary-900">
                    <p className="text-2xl font-medium">ERRO 404</p>
                    <h1 className="max-w-lg text-center text-4xl pt-4 pb-8">
                        Não encontramos a página que você procura!
                    </h1>
                    <Button href="/" className="mb-12" variant="primary" size="md">
                        Ir para a página inicial
                    </Button>
                    <div className="w-full max-w-md">
                        <p className="text-center @md:text-left">Aqui alguns links que podem ser úteis:</p>
                        <div className="flex flex-col gap-4 pt-4">
                            <Button href="/rede-credenciada" variant="tertiary" size="md">
                                Rede credenciada
                            </Button>
                            <Button href="https://desbloqueio.dentaluni.com.br/" target="_blank" variant="tertiary" size="md">
                                Desbloqueie o seu cartão
                            </Button>
                            <Button href="https://www.dentaluni.com.br/autoatendimento" target="_blank" variant="tertiary" size="md">
                                Autoatendimento
                            </Button>
                            <Button href="/ajuda" variant="tertiary" size="md">
                                Central de ajuda
                            </Button>
                        </div>
                    </div>
                </div>
            </Container>
        </section>
    )
}
