import LoginHero from '@/components/tela-login/LoginHero'
import LoginFormPanel from '@/components/tela-login/LoginFormPanel'

export default function TelaLoginPage() {
    return (
        <section className="min-h-screen bg-white">
            <div className="w-full min-h-screen flex items-stretch ">
                <LoginHero />
                <LoginFormPanel />
            </div>
        </section>
    )
}
