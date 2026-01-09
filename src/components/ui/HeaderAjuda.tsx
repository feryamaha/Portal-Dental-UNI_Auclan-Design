import Link from 'next/link'
import { Icon } from "@/script/Icon";

interface HeaderAjudaProps {
  onClose: () => void
}

export function HeaderAjuda({ onClose }: HeaderAjudaProps) {
  return (
    <header className="w-full flex items-center justify-between rounded-bl-2xl rounded-br-2xl p-[20px] bg-white">
      <h2 className="font-inter text-2xl text-neutral-900 font-semibold">Me ajuda</h2>
      <div className="w-max flex items-center gap-[20px]">
        <Link
          href="https://dentaluni.com.br/ajuda"
          target="_blank"
          className="flex items-center gap-[8px] text-accent-default font-medium text-sm transition-colors hover:text-neutral-900 hover:underline underline-offset-4"
        >
          Acessar central de ajuda <Icon name="iconLinkCta" className='text-neutral-700' />
        </Link>
        <button
          onClick={onClose}
          className="border border-stroke-100 rounded-full p-1 cursor-pointer shadow-30 transition-colors ease-in duration-200 hover:bg-neutral-25"
        >
          <Icon name="iconClose" />

        </button>
      </div>
    </header>
  )
}
