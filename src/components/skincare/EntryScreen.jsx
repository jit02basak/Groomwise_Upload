'use client'
import { SKIN_PROBLEMS } from '../../data/skincare'

/**
 * EntryScreen — first screen of the Skincare module
 * Gives the user two paths: take the quiz, or pick their issue directly.
 *
 * Props:
 *   onStartQuiz   — callback() to launch the quiz flow
 *   onDirectPick  — callback() to go to the direct selection grid
 */
export default function EntryScreen({ onStartQuiz, onDirectPick }) {
  return (
    <div className="w-full flex flex-col gap-10">
      {/* Header */}
      <div className="text-center max-w-xl mx-auto">
        <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">Skin Care</h1>
        <p className="text-zinc-500 dark:text-zinc-400 mt-3 text-base leading-relaxed">
          Find the right ingredients and routine for your skin — no login, no guesswork, no harsh actives.
        </p>
      </div>

      {/* Two-path cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto w-full">

        {/* Path 1: Quiz */}
        <button
          onClick={onStartQuiz}
          className="group flex flex-col gap-4 p-8 bg-[#0F131F] dark:bg-zinc-900 text-white rounded-2xl text-left hover:bg-zinc-800 dark:hover:bg-zinc-800/80 transition-colors duration-200 cursor-pointer shadow-sm border border-transparent dark:border-zinc-850"
        >
          <span className="text-4xl">🧪</span>
          <div>
            <h3 className="font-bold text-xl mb-1.5">Help me figure it out</h3>
            <p className="text-zinc-400 dark:text-zinc-400 text-sm leading-relaxed">
              Answer a few quick questions about your skin. Takes about 1 minute.
            </p>
          </div>
          <span className="text-sm text-zinc-400 group-hover:text-white transition-colors mt-auto">
            Start quiz →
          </span>
        </button>

        {/* Path 2: Direct pick */}
        <button
          onClick={onDirectPick}
          className="group flex flex-col gap-4 p-8 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl text-left hover:border-zinc-400 dark:hover:border-zinc-600 transition-colors duration-200 cursor-pointer shadow-sm"
        >
          <span className="text-4xl">🎯</span>
          <div>
            <h3 className="font-bold text-xl text-zinc-900 dark:text-zinc-100 mb-1.5">I already know my issue</h3>
            <p className="text-zinc-500 dark:text-zinc-400 text-sm leading-relaxed">
              Skip the quiz and go straight to recommendations for your specific skin concern.
            </p>
          </div>
          <span className="text-sm text-zinc-500 dark:text-zinc-450 group-hover:text-zinc-900 dark:group-hover:text-white transition-colors mt-auto">
            Pick my issue →
          </span>
        </button>
      </div>

      {/* Supported problems list */}
      <div className="max-w-2xl mx-auto w-full">
        <p className="text-xs text-zinc-400 dark:text-zinc-500 text-center mb-4 uppercase tracking-wider">We can identify these skin concerns</p>
        <div className="flex flex-wrap gap-2 justify-center">
          {SKIN_PROBLEMS.map(p => (
            <span key={p.id} className={`px-3 py-1.5 text-sm rounded-full flex items-center gap-1.5 border ${
              p.medicalReferral
                ? 'bg-amber-50 dark:bg-amber-950/30 text-amber-700 dark:text-amber-400 border-amber-200 dark:border-amber-900/40'
                : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 border-zinc-150 dark:border-zinc-750'
            }`}>
              <span>{p.icon}</span> {p.name}
              {p.medicalReferral && <span className="text-xs opacity-70">👨‍⚕️</span>}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}
