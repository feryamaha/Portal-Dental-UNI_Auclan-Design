import Link from 'next/link'
import Image from 'next/image'
import type { GooglePlayAppleStoreProps } from '@/types/ui/google-play-apple-store.types'

export function GooglePlayAppleStore({ className = '' }: GooglePlayAppleStoreProps) {
    return (
        <div className={`p-[8px_16px] bg-auxiliary-success-border bg-cover rounded-[4px] ${className}`}>
            <p className="subtitle mb-2">Aplicativo Dental Uni</p>
            <div className="flex items-center gap-3">
                <Link
                    href="https://play.google.com/store/apps/details?id=com.dentaluni.app&hl=pt_BR&pli=1"
                    target="_blank"
                    className="cursor-pointer"
                >
                    <Image
                        src={'/assets/images/play-store.webp'}
                        width={109}
                        height={32}
                        alt="play store"
                    />
                </Link>

                <Link
                    href="https://apps.apple.com/br/app/minha-dental-uni/id1064122530"
                    target="_blank"
                    className="cursor-pointer"
                >
                    <Image
                        src={'/assets/images/apple-store.webp'}
                        width={98}
                        height={32}
                        quality={100}
                        alt="apple store"
                    />
                </Link>
            </div>
        </div>
    )
}
