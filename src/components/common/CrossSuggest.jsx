// CrossSuggest — reusable soft cross-module prompt
// Shown at the end of each module to link to the other.
// This is a Server Component (no hooks, no browser APIs).

import Link from 'next/link'

/**
 * Props:
 *   fromModule — 'hairstyle' | 'skincare' (controls accent color)
 *   message    — the prompt text
 *   linkHref   — where the CTA links to
 *   linkLabel  — CTA button label
 */
export default function CrossSuggest({ fromModule, message, linkHref, linkLabel }) {
  const isHairModule = fromModule === 'hairstyle'

  return (
    <div className={`flex flex-col sm:flex-row items-center justify-between gap-5 p-6 rounded-2xl border ${
      isHairModule
        ? 'bg-zinc-50 dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800'
        : 'bg-zinc-50 dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800'
    }`}>
      <div className="flex items-center gap-4">
        <span className="text-3xl flex-shrink-0">{isHairModule ? '🧴' : '✂️'}</span>
        <p className="text-zinc-700 dark:text-zinc-350 font-medium text-sm leading-relaxed max-w-md">{message}</p>
      </div>
      <Link
        href={linkHref}
        className="flex-shrink-0 px-6 py-3 bg-zinc-900 dark:bg-zinc-100 hover:bg-zinc-700 dark:hover:bg-zinc-200 text-white dark:text-zinc-900 font-semibold text-sm rounded-xl transition-colors duration-200 whitespace-nowrap"
      >
        {linkLabel}
      </Link>
    </div>
  )
}
