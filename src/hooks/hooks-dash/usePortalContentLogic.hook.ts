'use client'

import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'

export function usePortalContentLogic() {
    const pathname = usePathname()
    const [currentContent, setCurrentContent] = useState<string>('home')
    const [isReady, setIsReady] = useState(false)

    useEffect(() => {
        if (!pathname) return

        const segments = pathname.split('/').filter(Boolean)

        if (segments.length >= 2) {
            const contentSegment = segments[1]
            setCurrentContent(contentSegment)
        } else {
            setCurrentContent('home')
        }

        setIsReady(true)
    }, [pathname])

    return {
        currentContent,
        isReady,
    }
}
