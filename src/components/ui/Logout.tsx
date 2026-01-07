import Link from 'next/link'
import type { LogoutProps } from '@/types/ui/logout.types'

export function Logout({ href = '/logout', onClick, className = '' }: LogoutProps) {
    return (
        <Link
            href={href}
            onClick={onClick}
            className={`flex items-center gap-[8px] text-sm text-red-600 px-3 py-2 rounded-md transition-colors ease-in duration-200 hover:bg-accent-light ${className}`}
        >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M2.50195 10.0042H11.6724" stroke="#DF554B" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M9.16992 7.50317L11.671 10.0042L9.16992 12.5053" stroke="#DF554B" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M5.00195 7.61736V6.16926C5.00243 5.37476 5.56343 4.69096 6.34251 4.53524L15.513 2.52941C16.0248 2.47028 16.5373 2.63467 16.9192 2.9805C17.3011 3.32632 17.5154 3.82001 17.5072 4.33516V15.84C17.5074 16.3317 17.2905 16.7985 16.9145 17.1155C16.5386 17.4325 16.0418 17.5673 15.5572 17.484L6.3867 15.9066C5.58634 15.769 5.00157 15.0747 5.00195 14.2626V12.4811" stroke="#DF554B" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span>Sair</span>
        </Link>
    )
}
