'use client'
import { useState } from 'react'
import { buildRoutine, SKIN_PROBLEMS, INGREDIENTS } from '../../data/skincare'
import { useGroomStore } from '../../store/useGroomStore'

const STEP_ICONS = { Cleanse: '🧼', Treat: '💊', Moisturize: '🧴', SPF: '☀️' }

/**
 * RoutineBuilder — generates, displays, and staggers the AM/PM routine.
 *
 * Staggered introduction: when the merged routine includes more than one active
 * ingredient (tier: 'next-step' or anything with activeTags), present them with
 * a week-by-week introduction schedule rather than "start everything today."
 *
 * Props:
 *   quizResult — { skinType, concerns, lowSignalConcern }
 *   onBack     — callback() to go back to recommendations
 *   onReset    — callback() to start over
 */
export default function RoutineBuilder({ quizResult, onBack, onReset }) {
  const [saved, setSaved]         = useState(false)
  const saveRoutine             = useGroomStore(s => s.saveRoutine)
  const setLastQuizCompletedAt  = useGroomStore(s => s.setLastQuizCompletedAt)

  if (!quizResult) return null

  const routine = buildRoutine(quizResult)
  const { skinType, concerns } = quizResult

  const typeDef = SKIN_PROBLEMS.find(p => p.id === skinType.primary)
  const typeLabel = [
    typeDef?.everydayLabel ?? typeDef?.name ?? skinType.primary,
    skinType.modifier ? '+ Dehydrated' : null,
  ].filter(Boolean).join(' ')

  const primaryConcernDef = concerns.length > 0
    ? SKIN_PROBLEMS.find(p => p.id === concerns[0].id)
    : null

  const routineLabel = routine.label ?? typeLabel

  // ── Staggered introduction schedule ──────────────────────────────────────
  // Collect all active-tagged steps from BOTH sessions in order.
  // Each unique new active gets assigned a "start in week X" label.
  const allSteps   = [...(routine.am || []), ...(routine.pm || [])]
  const activeSteps = allSteps.filter(s => (s.activeTags || []).length > 0)

  const seenTags = new Set()
  const introSchedule = []  // [{ product, session, weekLabel }]
  let weekCounter = 1

  activeSteps.forEach(step => {
    const newTags = (step.activeTags || []).filter(t => !seenTags.has(t))
    if (newTags.length === 0) return
    newTags.forEach(t => seenTags.add(t))

    const session = (routine.am || []).some(s => s.product === step.product) ? 'AM' : 'PM'
    introSchedule.push({
      product: step.product,
      session,
      weekLabel: weekCounter === 1 ? 'Start with this' : `Add in Week ${weekCounter * 2 - 1}–${weekCounter * 2}`,
    })
    weekCounter++
  })

  const hasMultipleActives = introSchedule.length > 1

  // ── Handlers ──────────────────────────────────────────────────────────────
  const handleSave = () => {
    saveRoutine(skinType.primary, routineLabel, routine, quizResult)
    // Record the quiz completion timestamp so the retake nudge can fire later
    setLastQuizCompletedAt()
    setSaved(true)
  }

  return (
    <div className="w-full flex flex-col gap-8">

      {/* Header */}
      <div className="flex flex-col gap-1">
        <button
          onClick={onBack}
          className="text-sm text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-200 cursor-pointer transition-colors text-left w-fit"
        >
          ← Back to ingredients
        </button>
        <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100 mt-2">
          Your {routineLabel} Routine
        </h2>
        <p className="text-zinc-500 dark:text-zinc-400 text-sm">
          A suggested, ordered routine — many people start seeing changes after 4–6 weeks of consistent use.
        </p>
      </div>

      {/* Before you start safety guidelines card */}
      <div className="p-5 bg-zinc-50 dark:bg-zinc-800/40 border border-zinc-200 dark:border-zinc-700 rounded-2xl flex flex-col gap-3">
        <div className="flex items-center gap-2">
          <span className="text-lg">🛡️</span>
          <h3 className="font-bold text-zinc-900 dark:text-zinc-100 text-sm uppercase tracking-wide">
            Before you start (applies to every routine)
          </h3>
        </div>
        <ul className="text-sm text-zinc-650 dark:text-zinc-350 list-disc pl-5 flex flex-col gap-2 leading-relaxed">
          <li><strong>Patch test</strong> any new product for 24–48 hours before full-face use.</li>
          <li><strong>Add only one</strong> new product at a time, about 1–2 weeks apart.</li>
          <li>If you get burning, persistent redness, swelling, or things get worse — <strong>stop and see a dermatologist</strong>.</li>
          <li><strong>"Next step" items</strong> are only for after 4–6 weeks of consistently following the starter routine with no visible improvement.</li>
        </ul>
      </div>

      {/* Custom Shaving Guidelines Callout */}
      {concerns.some(c => ['razor_bumps', 'shaving_irritation'].includes(c.id)) && (
        <div className="p-5 bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900/40 rounded-2xl flex flex-col gap-3">
          <div className="flex items-center gap-2">
            <span className="text-lg">🪒</span>
            <h3 className="font-bold text-amber-800 dark:text-amber-300 text-sm uppercase tracking-wide">
              Shaving Guidelines & Tips
            </h3>
          </div>
          <ul className="text-sm text-amber-700 dark:text-amber-400 list-disc pl-5 flex flex-col gap-2 leading-relaxed">
            {concerns.some(c => c.id === 'razor_bumps') && (
              <>
                <li><strong>Before shaving:</strong> Prep skin with warm water + shave gel, and always shave with the grain.</li>
                <li><strong>After shaving (PM):</strong> Cleanse, apply soothing gel (aloe vera or centella asiatica), then moisturize.</li>
                <li><strong>Next step:</strong> Introduce gentle exfoliation (salicylic acid) every other day to prevent ingrowns.</li>
              </>
            )}
            {concerns.some(c => c.id === 'shaving_irritation') && (
              <>
                <li><strong>Before shaving:</strong> Prep with warm water, shave gel, a sharp clean razor, and shave with the grain.</li>
                <li><strong>After shaving:</strong> Cool water rinse, soothing gel (aloe vera or centella asiatica), then fragrance-free moisturizer.</li>
                <li><strong>Pro tips:</strong> Skip alcohol-based aftershaves entirely. Consider taking a day off between shaves if active irritation is present.</li>
              </>
            )}
          </ul>
        </div>
      )}

      {/* Staggered introduction schedule (shown when there are multiple actives) */}
      {hasMultipleActives && (
        <div className="p-4 bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-900/40 rounded-2xl flex flex-col gap-3">
          <div className="flex items-center gap-2">
            <span className="text-base">📅</span>
            <p className="font-semibold text-blue-800 dark:text-blue-300 text-sm">
              Introduce new actives one at a time
            </p>
          </div>
          <p className="text-sm text-blue-700 dark:text-blue-400 leading-relaxed">
            This routine includes more than one active ingredient. Starting them all at once makes it hard to identify
            the cause if your skin reacts to something. Here's a suggested rollout:
          </p>
          <div className="flex flex-col gap-2 mt-1">
            {introSchedule.map((item, i) => (
              <div key={i} className="flex items-start gap-3">
                <span className={`flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold mt-0.5 ${
                  i === 0
                    ? 'bg-blue-600 text-white'
                    : 'bg-blue-200 dark:bg-blue-900/50 text-blue-700 dark:text-blue-400'
                }`}>
                  {i + 1}
                </span>
                <div>
                  <span className="text-sm font-medium text-blue-800 dark:text-blue-200">{item.weekLabel}</span>
                  <span className="text-xs text-blue-600 dark:text-blue-400 ml-2">({item.session})</span>
                  <p className="text-xs text-blue-600 dark:text-blue-500 leading-relaxed">{item.product}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Explanation Banner */}
      <div className="p-5 bg-indigo-50 dark:bg-indigo-950/20 border border-indigo-200 dark:border-indigo-900/40 rounded-2xl flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <span className="text-lg">💡</span>
          <h3 className="font-bold text-indigo-900 dark:text-indigo-300 text-sm uppercase tracking-wide">
            How your routines work
          </h3>
        </div>
        <p className="text-sm text-indigo-800 dark:text-indigo-300 leading-relaxed">
          Your skin absorbs and uses treatment ingredients more effectively at night, and some active ingredients increase sun sensitivity — so stronger treatment steps go at night, while your morning routine focuses on protecting your skin with antioxidants and sunscreen.
        </p>
      </div>

      {/* Day / Night Routines Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Day Routine */}
        <div className="flex flex-col gap-4">
          <h3 className="text-lg font-bold text-zinc-800 dark:text-zinc-200 flex items-center gap-2 pb-2 border-b border-zinc-250 dark:border-zinc-700">
            🌅 Day Routine
          </h3>
          <div className="flex flex-col gap-3">
            {routine.am.map((step, i) => {
              const scheduleEntry = introSchedule.find(s => s.product === step.product)

              return (
                <div key={i} className="flex gap-4 p-5 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl items-start shadow-sm">
                  <div className="flex-shrink-0 w-8 h-8 bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 rounded-full flex items-center justify-center text-sm font-bold">
                    {i + 1}
                  </div>
                  <div className="flex flex-col gap-1 flex-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-lg">{STEP_ICONS[step.step] || '✦'}</span>
                      <span className="font-semibold text-zinc-900 dark:text-zinc-100 text-xs uppercase tracking-wide">{step.step}</span>
                      {/* Week label badge for actives */}
                      {scheduleEntry && hasMultipleActives && (
                        <span className="px-2 py-0.5 bg-blue-100 dark:bg-blue-950/40 text-blue-700 dark:text-blue-400 text-xs rounded-full border border-blue-200 dark:border-blue-900/40 font-medium">
                          {scheduleEntry.weekLabel}
                        </span>
                      )}
                      {/* Flag for SPF added due to sun-sensitizing ingredient */}
                      {step.addedForSunSensitivity && (
                        <span className="px-2 py-0.5 bg-amber-100 dark:bg-amber-950/40 text-amber-700 dark:text-amber-400 text-xs rounded-full border border-amber-200 dark:border-amber-900/40">
                          Required for sun sensitivity
                        </span>
                      )}
                    </div>
                    <p className="font-medium text-zinc-800 dark:text-zinc-200">{step.product}</p>
                    <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">{step.why}</p>

                    {/* Conflict note */}
                    {step.conflictNote && (
                      <div className="mt-2 flex items-start gap-2 p-2.5 bg-amber-50 dark:bg-amber-950/20 rounded-lg border border-amber-200 dark:border-amber-900/30">
                        <span className="text-sm flex-shrink-0">⚠️</span>
                        <p className="text-xs text-amber-700 dark:text-amber-400 leading-relaxed">{step.conflictNote}</p>
                      </div>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Night Routine */}
        <div className="flex flex-col gap-4">
          <h3 className="text-lg font-bold text-zinc-800 dark:text-zinc-200 flex items-center gap-2 pb-2 border-b border-zinc-250 dark:border-zinc-700">
            🌙 Night Routine
          </h3>
          <div className="flex flex-col gap-3">
            {routine.pm.map((step, i) => {
              const scheduleEntry = introSchedule.find(s => s.product === step.product)

              return (
                <div key={i} className="flex gap-4 p-5 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl items-start shadow-sm">
                  <div className="flex-shrink-0 w-8 h-8 bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 rounded-full flex items-center justify-center text-sm font-bold">
                    {i + 1}
                  </div>
                  <div className="flex flex-col gap-1 flex-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-lg">{STEP_ICONS[step.step] || '✦'}</span>
                      <span className="font-semibold text-zinc-900 dark:text-zinc-100 text-xs uppercase tracking-wide">{step.step}</span>
                      {/* Week label badge for actives */}
                      {scheduleEntry && hasMultipleActives && (
                        <span className="px-2 py-0.5 bg-blue-100 dark:bg-blue-950/40 text-blue-700 dark:text-blue-400 text-xs rounded-full border border-blue-200 dark:border-blue-900/40 font-medium">
                          {scheduleEntry.weekLabel}
                        </span>
                      )}
                    </div>
                    <p className="font-medium text-zinc-800 dark:text-zinc-200">{step.product}</p>
                    <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">{step.why}</p>

                    {/* Conflict note */}
                    {step.conflictNote && (
                      <div className="mt-2 flex items-start gap-2 p-2.5 bg-amber-50 dark:bg-amber-950/20 rounded-lg border border-amber-200 dark:border-amber-900/30">
                        <span className="text-sm flex-shrink-0">⚠️</span>
                        <p className="text-xs text-amber-700 dark:text-amber-400 leading-relaxed">{step.conflictNote}</p>
                      </div>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* What to add next section */}
      {routine.whatToAddNext && routine.whatToAddNext.length > 0 && (
        <div className="p-6 bg-zinc-50 dark:bg-zinc-800/40 border border-zinc-200 dark:border-zinc-700 rounded-2xl flex flex-col gap-4">
          <div className="flex items-center gap-2">
            <span className="text-lg">⏳</span>
            <h3 className="font-bold text-zinc-900 dark:text-zinc-100 text-sm uppercase tracking-wide">
              What to add next
            </h3>
          </div>
          <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">
            To avoid overwhelming your skin barrier, introduce these additional treatment ingredients gradually:
          </p>
          <div className="flex flex-col gap-3 mt-1">
            {routine.whatToAddNext.map((item, i) => (
              <div key={i} className="flex gap-4 items-start p-4 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl shadow-sm">
                <span className="px-2.5 py-1 bg-blue-100 dark:bg-blue-950/40 text-blue-700 dark:text-blue-400 text-xs rounded-full border border-blue-200 dark:border-blue-900/40 font-semibold flex-shrink-0">
                  {item.weekLabel}
                </span>
                <div className="flex flex-col gap-1 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-zinc-800 dark:text-zinc-200">
                      Add {item.name} {item.form}
                    </span>
                    <span className="text-xs text-zinc-400 dark:text-zinc-500">
                      ({item.timeOfDay === 'either' ? 'Day or Night' : item.timeOfDay === 'AM' ? 'Day' : 'Night'})
                    </span>
                  </div>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
                    {item.why || item.plainDescription}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Save + Start Over */}
      <div className="flex flex-col gap-3 pb-4">
        <button
          onClick={handleSave}
          disabled={saved}
          className={`w-full py-3.5 rounded-xl font-semibold transition-all duration-200 cursor-pointer ${
            saved
              ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-900/60'
              : 'bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 hover:bg-zinc-700 dark:hover:bg-zinc-200'
          }`}
        >
          {saved ? '✓ Routine saved to Dashboard' : 'Save this routine to Dashboard'}
        </button>
        <button
          onClick={onReset}
          className="text-sm text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-200 cursor-pointer text-center"
        >
          Start over — retake the quiz
        </button>
      </div>
    </div>
  )
}
