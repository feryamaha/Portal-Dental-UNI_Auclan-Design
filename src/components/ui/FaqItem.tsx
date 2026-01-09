'use client'

import { Icon } from "@/script/Icon";

interface FAQItemProps {
  question: string
  answer: string
  isOpen: boolean
  onToggle: () => void
}

export function FAQItem({ question, answer, isOpen, onToggle }: FAQItemProps) {

  return (
    <div className="border-b border-stroke-100">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between py-4 text-left hover:text-accent-default transition-colors cursor-pointer"
      >
        <span className="font-medium pr-4">{question}</span>
        <Icon
          name="iconArrow2Down"
          className={`transition-transform duration-200 ${isOpen ? 'rotate-180' : ''
            }`}
        />
      </button>

      <div
        className={`overflow-hidden transition-all duration-300 ease-out ${isOpen
          ? 'max-h-full opacity-100 translate-y-0 pb-4'
          : 'max-h-0 opacity-0 -translate-y-1'
          }`}
      >
        <p className="text-neutral-600">{answer}</p>
      </div>
    </div>
  )
}
