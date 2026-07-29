'use client'
import { useEffect } from 'react'
import { useGroomStore } from '../../store/useGroomStore'

// Client-side wrapper to sync Zustand theme state with the html document element.
// Adding the 'dark' class allows Tailwind v4 dark: variants to apply correctly.
export default function ThemeProvider({ children }) {
  const theme = useGroomStore((state) => state.theme)

  useEffect(() => {
    const root = document.documentElement
    if (theme === 'dark') {
      root.classList.add('dark')
    } else {
      root.classList.remove('dark')
    }
  }, [theme])

  return <>{children}</>
}
