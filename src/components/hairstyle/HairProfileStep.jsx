'use client'
import { useState } from 'react'
import { HAIR_TYPES, THICKNESS_OPTIONS } from '../../data/hairstyles'

/**
 * HairProfileStep — self-select step shown after the face-shape scan.
 *
 * Two sequential button groups:
 *   1. Hair type:  Straight / Wavy / Curly / Coily
 *   2. Thickness:  Fine / Medium / Coarse
 *
 * Once both are selected, the user confirms and proceeds to recommendations.
 *
 * Props:
 *   faceShape    — the detected face shape string (for display context)
 *   onComplete   — callback({ hairType, thickness }) when user confirms
 *   onBack       — callback() to go back to the scan step
 */
export default function HairProfileStep({ faceShape, onComplete, onBack }) {
  const [hairType, setHairType]   = useState(null)
  const [thickness, setThickness] = useState(null)

  const canContinue = hairType && thickness

  const handleContinue = () => {
    if (canContinue) {
      onComplete({ hairType, thickness })
    }
  }

  return (
    <div className="w-full flex flex-col items-center gap-10 py-8">

      {/* Context header */}
      <div className="text-center max-w-lg">
        <p className="text-sm text-zinc-500 dark:text-zinc-400 uppercase tracking-widest font-medium mb-2">
          Face shape detected
        </p>
        <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100 capitalize mb-3">
          {faceShape}
        </h1>
        <p className="text-zinc-500 dark:text-zinc-400 text-sm">
          Now tell us about your hair so we can find the best styles for you.
        </p>
      </div>

      {/* Hair Type selection */}
      <div className="w-full max-w-md flex flex-col gap-4">
        <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100 text-center">
          What's your hair type?
        </h2>
        <div className="grid grid-cols-2 gap-3">
          {HAIR_TYPES.map(({ id, label }) => (
            <button
              key={id}
              onClick={() => setHairType(id)}
              className={`py-4 px-5 rounded-xl border-2 font-medium text-sm transition-all duration-200 cursor-pointer ${
                hairType === id
                  ? 'border-zinc-900 dark:border-zinc-100 bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 shadow-md'
                  : 'border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-zinc-700 dark:text-zinc-300 hover:border-zinc-400 dark:hover:border-zinc-600'
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Thickness selection */}
      <div className="w-full max-w-md flex flex-col gap-4">
        <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100 text-center">
          How thick is your hair?
        </h2>
        <div className="grid grid-cols-3 gap-3">
          {THICKNESS_OPTIONS.map(({ id, label }) => (
            <button
              key={id}
              onClick={() => setThickness(id)}
              className={`py-4 px-4 rounded-xl border-2 font-medium text-sm transition-all duration-200 cursor-pointer ${
                thickness === id
                  ? 'border-zinc-900 dark:border-zinc-100 bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 shadow-md'
                  : 'border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-zinc-700 dark:text-zinc-300 hover:border-zinc-400 dark:hover:border-zinc-600'
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Action buttons */}
      <div className="w-full max-w-md flex flex-col gap-3 mt-2">
        <button
          onClick={handleContinue}
          disabled={!canContinue}
          className={`w-full py-3.5 font-semibold rounded-xl text-base transition-all duration-200 ${
            canContinue
              ? 'bg-[#0F131F] dark:bg-zinc-100 hover:bg-zinc-800 dark:hover:bg-zinc-200 text-white dark:text-zinc-900 cursor-pointer'
              : 'bg-zinc-200 dark:bg-zinc-800 text-zinc-400 dark:text-zinc-600 cursor-not-allowed'
          }`}
        >
          Show My Recommendations →
        </button>
        <button
          onClick={onBack}
          className="w-full py-2.5 text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white font-medium text-sm transition-colors duration-200 cursor-pointer"
        >
          ← Back to scan
        </button>
      </div>
    </div>
  )
}
