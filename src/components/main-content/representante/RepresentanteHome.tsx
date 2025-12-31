"use client"

import { SliderBanner } from '@/components/shared-dashboard/SliderBanner'
import { ShortcutsSection } from '@/components/shared-dashboard/ShortcutsSection'

export function RepresentanteHome() {
    return (
        <section className="w-full mx-auto p-[24px_32px_0px_32px]">
            <div className="flex flex-col @Desktop:flex-row gap-6">
                <div className="w-full flex flex-col gap-6">
                    <div className='w-full'>
                        <SliderBanner items={[]} duration={5000} />
                    </div>

                    <div className="flex flex-col gap-6">
                        <ShortcutsSection
                            portal="representante"
                            shortcutIds={['protocols', 'guides', 'clients', 'sellers', 'dashboard', 'files']}
                        />
                    </div>
                </div>
            </div>
        </section>
    )
}
