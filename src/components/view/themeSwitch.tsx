'use client'

import { useState, useEffect } from 'react'
import { useTheme as useThemeNext } from 'next-themes'

export const ThemeSwitch = () => {
    const [mounted, setMounted] = useState(false)
    const { setTheme, resolvedTheme } = useThemeNext()

    useEffect(() => setMounted(true), [])
    const toggleTheme = () => {
        if (resolvedTheme === 'light') {
            setTheme('dark')
        }

        if (resolvedTheme === 'dark') {
            setTheme('light')
        }
    }

    return (
        <label className="inline-flex items-center cursor-pointer">
            <input type="checkbox" checked={resolvedTheme !== 'dark' ? false : true} className="sr-only peer" onClick={toggleTheme} />
            <div className="relative w-11 h-4 bg-[#999] peer
                rounded-full dark:bg-gray-700 peer-checked:after:start-6
                after:content-[''] peer-checked:after:border-[#5288C1] peer-checked:after:bg-[#17212B]
                after:absolute after:top-1/2 after:start-0 after:-translate-y-1/2 after:bg-white after:border-[#999] after:border
                after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-[#5288C1] peer-checked:bg-[#5288C1]"
            />
        </label>
    )

}