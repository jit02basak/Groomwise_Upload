'use client'
import { SKIN_PROBLEMS } from '../../data/skincare'

// Only the 4 primary type entries
const TYPE_OPTIONS = SKIN_PROBLEMS.filter(p => p.axis === 'type')

/**
 * TypeSelectScreen — "I know my skin type" self-select path
 * Produces { primary, confidence: 'high' } (self-reported, no quiz needed).
 *
 * Props:
 *   onSelect — callback({ primary: string, confidence: 'high' })
 *   onBack   — callback()
 */
export default function TypeSelectScreen({ onSelect, onBack }) {
  return (
    <div className="w-full max-w-xl mx-auto flex flex-col gap-8">

      {/* Header */}
      <div>
        <button
          onClick={onBack}
          className="text-sm text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors cursor-pointer mb-4"
        >
          ← Back
        </button>
        <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">What's your skin type?</h2>
        <p className="text-zinc-500 dark:text-zinc-400 mt-1.5 text-sm leading-relaxed">
          Pick the one that best describes how your skin usually behaves. After this, you'll get a short
          concern quiz tailored to your type.
        </p>
      </div>

      {/* Type cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {TYPE_OPTIONS.map(type => (
          <button
            key={type.id}
            onClick={() => onSelect({ primary: type.id, confidence: 'high' })}
            className="group flex flex-col gap-3 p-6 bg-white dark:bg-zinc-900 border-2 border-zinc-200 dark:border-zinc-800 rounded-2xl text-left hover:border-zinc-900 dark:hover:border-zinc-400 hover:shadow-md transition-all duration-200 cursor-pointer"
          >
            <span className="text-4xl">{type.icon}</span>
            <div className="flex flex-col gap-1.5 flex-1">
              <h3 className="font-bold text-zinc-900 dark:text-zinc-100 text-base">{type.name}</h3>
              {/* Plain-language description */}
              <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed italic">{type.plainDescription}</p>
              <p className="text-xs text-zinc-400 dark:text-zinc-500 mt-1">{type.description}</p>
            </div>
            <span className="text-sm text-zinc-400 dark:text-zinc-500 group-hover:text-zinc-900 dark:group-hover:text-white transition-colors font-medium">
              This is me →
            </span>
          </button>
        ))}
      </div>

      <p className="text-xs text-zinc-400 dark:text-zinc-500 text-center">
        Not 100% sure? <button onClick={onBack} className="underline underline-offset-2 cursor-pointer hover:text-zinc-700 dark:hover:text-zinc-300 transition-colors">Go back</button> and use the full quiz instead.
      </p>
    </div>
  )
}
