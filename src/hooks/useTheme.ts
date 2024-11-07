'use client'

import { useEffect, useState } from "react";
import { useTheme as useThemeNext } from 'next-themes'

export const useTheme = () => {
    const { theme: themeContext } = useThemeNext();
    const [theme, setTheme] = useState<string | undefined>();

    useEffect(() => {
        if (typeof themeContext !== 'undefined') {
            setTheme(themeContext)
        }
    }, [themeContext]);
    
    return { theme }
} 