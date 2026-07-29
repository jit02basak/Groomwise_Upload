'use client'

/**
 * SubChoiceScreen — "Help me figure it out" sub-branch
 * Shown after the user chooses the quiz path on EntryScreen.
 *
 * Props:
 *   onKnowType — callback() — user already knows their skin type
 *   onFullFlow — callback() — user wants the full type + concern quiz
 *   onBack     — callback() — back to entry
 */
export default function SubChoiceScreen({ onKnowType, onFullFlow, onBack }) {
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
        <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">Do you know your skin type?</h2>
        <p className="text-zinc-500 dark:text-zinc-400 mt-1.5 text-sm leading-relaxed">
          Knowing your type (oily, dry, etc.) helps us skip straight to figuring out what's actually bothering your skin.
          If you're not sure, the full quiz will work it out first.
        </p>
      </div>

      {/* Choices */}
      <div className="flex flex-col gap-4">

        {/* Know type */}
        <button
          onClick={onKnowType}
          className="group flex gap-5 p-6 bg-white dark:bg-zinc-900 border-2 border-zinc-200 dark:border-zinc-800 rounded-2xl text-left hover:border-zinc-900 dark:hover:border-zinc-400 hover:shadow-md transition-all duration-200 cursor-pointer"
        >
          <span className="text-3xl flex-shrink-0 mt-0.5">🎯</span>
          <div className="flex flex-col gap-1.5">
            <h3 className="font-bold text-zinc-900 dark:text-zinc-100 text-base">Yes — I know my skin type</h3>
            <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">
              Pick your type (Oily, Dry, Combination, or Normal) and we'll go straight to a short concern quiz
              tailored specifically to that type. Faster, and more relevant to your actual situation.
            </p>
            <span className="text-sm text-zinc-400 dark:text-zinc-500 group-hover:text-zinc-900 dark:group-hover:text-white transition-colors font-medium mt-1">
              Choose my type →
            </span>
          </div>
        </button>

        {/* Full flow */}
        <button
          onClick={onFullFlow}
          className="group flex gap-5 p-6 bg-white dark:bg-zinc-900 border-2 border-zinc-200 dark:border-zinc-800 rounded-2xl text-left hover:border-zinc-900 dark:hover:border-zinc-400 hover:shadow-md transition-all duration-200 cursor-pointer"
        >
          <span className="text-3xl flex-shrink-0 mt-0.5">🔍</span>
          <div className="flex flex-col gap-1.5">
            <h3 className="font-bold text-zinc-900 dark:text-zinc-100 text-base">I'm not sure — figure it out for me</h3>
            <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">
              A short 6-question type quiz first, then a concern quiz matched to whatever type your answers suggest.
              Takes about 2 minutes total — more accurate if you're genuinely uncertain.
            </p>
            <span className="text-sm text-zinc-400 dark:text-zinc-500 group-hover:text-zinc-900 dark:group-hover:text-white transition-colors font-medium mt-1">
              Take the full quiz →
            </span>
          </div>
        </button>
      </div>
    </div>
  )
}
