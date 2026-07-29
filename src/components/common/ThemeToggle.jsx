'use client'
import { useGroomStore } from '../../store/useGroomStore'

// Premium ThemeToggle button using Zustand state to trigger light/dark modes
export default function ThemeToggle() {
  const theme = useGroomStore((state) => state.theme)
  const toggleTheme = useGroomStore((state) => state.toggleTheme)

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-lg bg-zinc-100 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors duration-200 cursor-pointer text-sm font-medium flex items-center gap-1.5 shadow-sm border border-zinc-200 dark:border-zinc-700"
      aria-label="Toggle Theme"
    >
      <span>{theme === 'light' ? '🌙 Dark Mode' : '☀️ Light Mode'}</span>
    </button>
  )
}
