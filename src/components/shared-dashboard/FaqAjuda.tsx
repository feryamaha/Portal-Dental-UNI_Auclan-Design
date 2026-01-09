'use client'

import { useState } from 'react'
import { HeaderAjuda } from '@/components/ui/HeaderAjuda'
import { InputPesquisaAjuda } from '@/components/ui/InputPesquisaAjuda'
import { SegmentedControl } from '@/components/ui/SegmentdControl'
import { FAQItem } from '@/components/ui/FaqItem'
import { useFaqAjudaLogic } from '@/hooks/hooks-dash/useFaqAjudaLogic.hook'
import type { FaqAjudaProps, FaqItemData } from '@/types/shared/faq-ajuda.types'

export function FaqAjuda({ portal, onClose }: FaqAjudaProps) {
    const {
        selectedCategory,
        setSelectedCategory,
        searchTerm,
        setSearchTerm,
        segmentedItems,
        filteredItems
    } = useFaqAjudaLogic(portal)

    const handleClose = onClose || (() => { })
    const [openItemId, setOpenItemId] = useState<string | null>(null)

    return (
        <div className="w-[752px] h-full bg-neutral-50 absolute top-0 right-0 shadow-2xl z-60 flex flex-col">
            <HeaderAjuda onClose={handleClose} />
            <div className='bg-white w-full h-full rounded-tl-2xl rounded-tr-2xl mt-[3px] flex flex-col overflow-hidden'>
                <div className="p-5 space-y-4">
                    <InputPesquisaAjuda
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />

                    <SegmentedControl
                        items={segmentedItems}
                        value={selectedCategory}
                        onChange={setSelectedCategory}
                        size="lg"
                    />
                </div>
                <div className="w-full flex-1 px-5 pb-5 overflow-y-auto">
                    {filteredItems.length > 0 ? (
                        <div className="space-y-0">
                            {filteredItems.map((item: FaqItemData) => (
                                <FAQItem
                                    key={item.id}
                                    question={item.question}
                                    answer={item.answer}
                                    isOpen={openItemId === item.id}
                                    onToggle={() =>
                                        setOpenItemId((prev) => (prev === item.id ? null : item.id))
                                    }
                                />
                            ))}
                        </div>
                    ) : (
                        <div className="py-8 text-center">
                            <p className="text-neutral-500">
                                {searchTerm
                                    ? 'Nenhuma dúvida encontrada com esse termo'
                                    : 'Nenhuma dúvida disponível'}
                            </p>
                        </div>
                    )}
                </div>
            </div>

        </div>
    )
}
