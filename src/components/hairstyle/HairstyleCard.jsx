'use client'
import { useGroomStore } from '../../store/useGroomStore'
import { TIER_LABELS } from '../../data/hairstyles'

// Hair type → icon mapping for the placeholder image area
const HAIR_TYPE_ICONS = {
  Straight: '〰️',
  Wavy:     '🌊',
  Curly:    '🌀',
  Coily:    '💫',
}

// Tier → color accent classes for the tier badge
const TIER_BADGE_CLASSES = {
  1: 'bg-emerald-100 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800',
  2: 'bg-blue-100 dark:bg-blue-950/40 text-blue-700 dark:text-blue-400 border-blue-200 dark:border-blue-800',
  3: 'bg-zinc-100 dark:bg-zinc-800 text-zinc-500 dark:text-zinc-400 border-zinc-200 dark:border-zinc-700',
}

/**
 * HairstyleCard — used in both the Results screen and the Library.
 *
 * Designed to be flexible: when an imageUrl is present on the hairstyle
 * object (future pass), it renders the image. Otherwise, shows a styled
 * gradient placeholder with hair type icon.
 *
 * Props:
 *   hairstyle   — the hairstyle object from hairstyles.js
 *   compact     — if true, shows a smaller version (used in library grid)
 */
export default function HairstyleCard({ hairstyle, compact = false }) {
  const saveHairstyle = useGroomStore((state) => state.saveHairstyle)

  const handleSave = () => {
    saveHairstyle(hairstyle)
    // Simple visual feedback — could be upgraded to a toast notification later
    alert(`"${hairstyle.name}" saved to your Dashboard!`)
  }

  // Download: if an image URL exists, opens it; otherwise does nothing (button is disabled)
  const handleDownload = () => {
    if (hairstyle.imageUrl) {
      const link = document.createElement('a')
      link.href = hairstyle.imageUrl
      link.download = hairstyle.name
      link.target = '_blank'
      link.click()
    }
  }

  const hasImage = !!hairstyle.imageUrl
  const tierLabel = TIER_LABELS[hairstyle.tier]
  const tierClasses = TIER_BADGE_CLASSES[hairstyle.tier] || TIER_BADGE_CLASSES[2]

  return (
    <div className={`flex flex-col bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300`}>
      {/* Image area: real image if available, styled placeholder otherwise */}
      <div className="relative bg-zinc-100 dark:bg-zinc-800" style={{ height: compact ? '140px' : '180px' }}>
        {hasImage ? (
          <img
            src={hairstyle.imageUrl}
            alt={hairstyle.name}
            className="w-full h-full object-cover"
            onError={(e) => {
              // Fallback if image fails to load — hide it and show the bg
              e.currentTarget.style.display = 'none'
            }}
          />
        ) : (
          /* Gradient placeholder with hair type icon */
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-zinc-100 to-zinc-200 dark:from-zinc-800 dark:to-zinc-900">
            <span className="text-4xl opacity-60">{HAIR_TYPE_ICONS[hairstyle.hairTypes?.[0]] || '✂️'}</span>
          </div>
        )}

        {/* Hair type badge */}
        <span className="absolute top-3 left-3 px-2 py-1 bg-black/60 dark:bg-black/80 text-white text-xs font-medium rounded-full">
          {hairstyle.hairTypes?.join(' & ')}
        </span>

        {/* Tier badge */}
        {tierLabel && (
          <span className={`absolute top-3 right-3 px-2 py-1 text-xs font-medium rounded-full border ${tierClasses}`}>
            {tierLabel}
          </span>
        )}
      </div>

      {/* Card content */}
      <div className="flex flex-col flex-1 p-4 gap-2">
        <h3 className="font-bold text-zinc-900 dark:text-zinc-100 text-base">{hairstyle.name}</h3>

        {!compact && (
          <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">{hairstyle.description}</p>
        )}

        {/* Compatible face shapes */}
        <div className="flex flex-wrap gap-1 mt-1">
          <span className="text-xs text-zinc-400 dark:text-zinc-500 mr-0.5">Suits:</span>
          {hairstyle.compatibleFaceShapes.map(shape => (
            <span key={shape} className="px-2 py-0.5 bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 text-xs rounded-full">
              {shape}
            </span>
          ))}
        </div>

        {/* Thickness badge (compact only — gives context in library grid) */}
        {compact && (
          <span className="text-xs text-zinc-400 dark:text-zinc-500">{hairstyle.thicknesses?.join(' & ')} thickness</span>
        )}

        {/* Disclaimer */}
        {hairstyle.disclaimer && (
          <p className="text-xs text-amber-600 dark:text-amber-500/80 leading-snug mt-1">
            {hairstyle.disclaimer}
          </p>
        )}

        {/* Action buttons */}
        <div className="flex gap-2 mt-auto pt-3">
          <button
            onClick={handleSave}
            className="flex-1 py-2 text-sm font-medium bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-zinc-800 dark:text-zinc-200 rounded-lg transition-colors duration-200 cursor-pointer"
          >
            Save
          </button>
          <button
            onClick={handleDownload}
            disabled={!hairstyle.imageUrl}
            className={`flex-1 py-2 text-sm font-medium rounded-lg transition-colors duration-200 ${
              hairstyle.imageUrl 
                ? 'bg-[#0F131F] dark:bg-zinc-100 hover:bg-zinc-800 dark:hover:bg-zinc-200 text-white dark:text-zinc-900 cursor-pointer'
                : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-400 dark:text-zinc-600 cursor-not-allowed opacity-50'
            }`}
          >
            Download
          </button>
        </div>
      </div>
    </div>
  )
}
