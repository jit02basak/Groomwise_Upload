'use client'
import { useState } from 'react'
import { INGREDIENTS, SKIN_PROBLEMS } from '../../data/skincare'
import { useGroomStore } from '../../store/useGroomStore'

// RETAKE_NUDGE_DAYS: how many days after the last quiz before we suggest a retake
const RETAKE_NUDGE_DAYS = 60
// NEXT_STEP_UNLOCK_WEEKS: weeks of saved routine before next-step ingredients are "ready"
const NEXT_STEP_UNLOCK_WEEKS = 5
const getRepresentativeForm = (name) => {
  const normalized = name.toLowerCase()
  if (normalized.includes('cleanser')) return ''
  if (normalized.includes('moisturizer')) return ''
  if (normalized.includes('sunscreen')) return ''
  
  if (normalized.includes('niacinamide')) return 'Serum'
  if (normalized.includes('zinc pca')) return 'Serum'
  if (normalized.includes('hyaluronic')) return 'Serum'
  if (normalized.includes('ceramides')) return 'Cream'
  if (normalized.includes('glycerin')) return 'Serum'
  if (normalized.includes('zinc pyrithione')) return 'Wash'
  if (normalized.includes('ketoconazole')) return 'Cream'
  if (normalized.includes('benzoyl peroxide')) return 'Spot Treatment'
  if (normalized.includes('caffeine')) return 'Eye Gel/Cream'
  if (normalized.includes('vitamin k')) return 'Eye Cream'
  if (normalized.includes('clay')) return 'Mask'
  if (normalized.includes('glycolic')) return 'Toner'
  if (normalized.includes('vitamin c')) return 'Serum'
  if (normalized.includes('azelaic')) return 'Serum'
  if (normalized.includes('retinoid')) return 'Product'
  if (normalized.includes('dermatologist')) return 'Treatments'
  if (normalized.includes('squalane')) return 'Oil'
  if (normalized.includes('aloe vera') || normalized.includes('aloe')) return 'Pure Gel'
  if (normalized.includes('centella') || normalized.includes('cica')) return 'Gel/Cream'
  if (normalized.includes('gentle, fragrance-free')) return 'Cleanser'
  if (normalized.includes('simple, fragrance-free')) return 'Moisturizer'
  if (normalized.includes('gentle exfoliating')) return 'Cleanser'
  return ''
}

/**
 * RecommendationScreen — result + tiered ingredient recommendations
 *
 * Props:
 *   quizResult     — { skinType, concerns, lowSignalConcern }
 *   onBuildRoutine — callback()
 *   onReset        — callback()
 */
export default function RecommendationScreen({ quizResult, onBuildRoutine, onReset }) {
  const [nextStepExpanded, setNextStepExpanded] = useState(false)

  const safetyNoteDismissedAt = useGroomStore(s => s.safetyNoteDismissedAt)
  const dismissSafetyNote     = useGroomStore(s => s.dismissSafetyNote)
  const activeRoutine         = useGroomStore(s => s.activeRoutine)
  const retakeNudgeDismissedAt = useGroomStore(s => s.retakeNudgeDismissedAt)
  const dismissRetakeNudge     = useGroomStore(s => s.dismissRetakeNudge)
  const lastQuizCompletedAt    = useGroomStore(s => s.lastQuizCompletedAt)

  if (!quizResult) return null

  const { skinType, concerns, lowSignalConcern } = quizResult
  const { primary, modifier, confidence: typeConfidence } = skinType

  // ── Metadata ───────────────────────────────────────────────────────────────
  const typeDef = SKIN_PROBLEMS.find(p => p.id === primary)
  const modDef  = modifier ? SKIN_PROBLEMS.find(p => p.id === modifier) : null

  const typeLabel = [typeDef?.everydayLabel ?? typeDef?.name ?? primary, modDef ? '+ Dehydrated' : null]
    .filter(Boolean).join(' ')

  const needsMedicalReferral = concerns.some(c => c.medicalReferral)
  const referralConcernNames = concerns
    .filter(c => c.medicalReferral)
    .map(c => {
      const p = SKIN_PROBLEMS.find(prob => prob.id === c.id)
      return p?.everydayLabel ?? p?.name ?? c.id
    })

  // ── Build tiered ingredient lists ──────────────────────────────────────────
  const isMultiConcern = !lowSignalConcern && concerns.length >= 2
  const groupedSources = []
  const starterIngredients  = []
  const nextStepIngredients = []

  const getLabel = (key) => {
    if (key === 'dehydrated') return 'Dehydrated Skin'
    const def = SKIN_PROBLEMS.find(p => p.id === key)
    return def?.everydayLabel ?? def?.name ?? key
  }

  if (isMultiConcern) {
    const addGroup = (key) => {
      const list = INGREDIENTS[key] || []
      if (list.length === 0) return
      const starters = list.filter(ing => ing.tier !== 'next-step')
      const nextSteps = list.filter(ing => ing.tier === 'next-step')
      groupedSources.push({
        id: key,
        label: getLabel(key),
        starters,
        nextSteps
      })
    }

    addGroup(primary)
    if (modifier) addGroup(modifier)
    concerns.forEach(c => addGroup(c.id))
  } else {
    const seenNames = new Set()
    const addIngredients = (key) => {
      ;(INGREDIENTS[key] || []).forEach(ing => {
        if (seenNames.has(ing.name)) return
        seenNames.add(ing.name)
        if (ing.tier === 'next-step') nextStepIngredients.push(ing)
        else starterIngredients.push(ing)
      })
    }

    addIngredients(primary)
    if (modifier) addIngredients(modifier)
    if (!lowSignalConcern) concerns.forEach(c => addIngredients(c.id))
  }

  const hasNextStep = isMultiConcern
    ? groupedSources.some(g => g.nextSteps.length > 0)
    : nextStepIngredients.length > 0


  // ── Next-step unlock logic ─────────────────────────────────────────────────
  // Unlock if savedAt is old enough (≥ NEXT_STEP_UNLOCK_WEEKS weeks ago)
  let nextStepUnlocked = false
  let weeksOnRoutine   = 0
  if (activeRoutine?.savedAt) {
    const savedMs = Date.now() - new Date(activeRoutine.savedAt).getTime()
    weeksOnRoutine = savedMs / (1000 * 60 * 60 * 24 * 7)
    nextStepUnlocked = weeksOnRoutine >= NEXT_STEP_UNLOCK_WEEKS
  }

  // ── Retake nudge ───────────────────────────────────────────────────────────
  let showRetakeNudge = false
  if (lastQuizCompletedAt && !retakeNudgeDismissedAt) {
    const daysSince = (Date.now() - new Date(lastQuizCompletedAt).getTime()) / (1000 * 60 * 60 * 24)
    showRetakeNudge = daysSince >= RETAKE_NUDGE_DAYS
  }

  // ── Helpers ────────────────────────────────────────────────────────────────
  const ConfidenceBadge = ({ level }) => {
    const styles = {
      high:     'bg-emerald-100 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-900/50',
      moderate: 'bg-amber-100 dark:bg-amber-950/40 text-amber-700 dark:text-amber-400 border border-amber-200 dark:border-amber-900/50',
      low:      'bg-zinc-100 dark:bg-zinc-800 text-zinc-500 dark:text-zinc-400 border border-zinc-200 dark:border-zinc-700',
    }
    const labels = { high: 'High match', moderate: 'Moderate match', low: 'Low signal' }
    return (
      <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${styles[level]}`}>
        {labels[level]}
      </span>
    )
  }

  const IngredientCard = ({ ingredient, index }) => (
    <div className="p-5 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl flex flex-col gap-3">
      <div className="flex items-start justify-between gap-4">
        <div className="flex flex-col gap-0.5">
          <h3 className="font-bold text-zinc-900 dark:text-zinc-100">
            {ingredient.name}{getRepresentativeForm(ingredient.name) ? ` ${getRepresentativeForm(ingredient.name)}` : ''}
          </h3>
          {/* Plain-language description */}
          <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed italic">
            {ingredient.plainDescription}
          </p>
        </div>
        <span className="text-xs text-zinc-400 dark:text-zinc-500 flex-shrink-0 mt-1">#{index + 1}</span>
      </div>

      {/* Full about blurb */}
      <p className="text-sm text-zinc-600 dark:text-zinc-350 leading-relaxed">{ingredient.about}</p>

      {/* Concentration */}
      <div className="flex items-start gap-2 p-3 bg-zinc-50 dark:bg-zinc-800 rounded-xl border border-zinc-100 dark:border-zinc-750">
        <span className="text-base flex-shrink-0">📊</span>
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          <strong>Concentration to look for:</strong> {ingredient.concentration}
        </p>
      </div>

      {/* Patch-test callout */}
      {ingredient.patchTestRequired && (
        <div className="flex items-start gap-2 p-3 bg-blue-50 dark:bg-blue-950/20 rounded-xl border border-blue-200 dark:border-blue-900/30">
          <span className="text-base flex-shrink-0">🧪</span>
          <p className="text-sm text-blue-700 dark:text-blue-400">
            <strong>Patch test first:</strong> Test on a small area of skin (e.g. inner arm or jaw) for 24–48 hours before applying to your full face.
          </p>
        </div>
      )}

      {/* Sun-sensitizing callout */}
      {ingredient.sunSensitizing && (
        <div className="flex items-start gap-2 p-3 bg-amber-50 dark:bg-amber-950/20 rounded-xl border border-amber-200 dark:border-amber-900/30">
          <span className="text-base flex-shrink-0">☀️</span>
          <p className="text-sm text-amber-700 dark:text-amber-400">
            <strong>Use SPF the next morning:</strong> This ingredient may increase sun sensitivity. Don't skip SPF while using it.
          </p>
        </div>
      )}

      {/* Caution note */}
      {ingredient.cautionNote && (
        <div className="flex items-start gap-2 p-3 bg-zinc-50 dark:bg-zinc-800/60 rounded-xl border border-zinc-200 dark:border-zinc-700">
          <span className="text-base flex-shrink-0">💡</span>
          <p className="text-sm text-zinc-600 dark:text-zinc-400">{ingredient.cautionNote}</p>
        </div>
      )}

      {/* Warning */}
      {ingredient.warning && (
        <div className="flex items-start gap-2 p-3 bg-amber-50 dark:bg-amber-950/20 rounded-xl border border-amber-200 dark:border-amber-900/30">
          <span className="text-base flex-shrink-0">⚠️</span>
          <p className="text-sm text-amber-700 dark:text-amber-400">{ingredient.warning}</p>
        </div>
      )}
    </div>
  )

  return (
    <div className="w-full flex flex-col gap-8">

      {/* ── Standing safety rule (shown once, dismissible) ─────────────────── */}
      {!safetyNoteDismissedAt && (
        <div className="flex gap-3 p-4 bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-900/40 rounded-2xl">
          <span className="text-xl flex-shrink-0">🛑</span>
          <div className="flex flex-col gap-1 flex-1">
            <p className="font-semibold text-red-800 dark:text-red-300 text-sm">General safety rule — read once</p>
            <p className="text-sm text-red-700 dark:text-red-400 leading-relaxed">
              If any product causes burning, persistent redness, swelling, or your skin visibly gets worse,
              stop using it immediately and see a dermatologist. This applies regardless of which concern you were shown.
            </p>
          </div>
          <button
            onClick={dismissSafetyNote}
            className="text-red-400 hover:text-red-700 dark:hover:text-red-300 text-sm flex-shrink-0 cursor-pointer transition-colors self-start"
            aria-label="Dismiss safety note"
          >
            ✕
          </button>
        </div>
      )}

      {/* ── Retake nudge ────────────────────────────────────────────────────── */}
      {showRetakeNudge && (
        <div className="flex gap-3 p-4 bg-zinc-50 dark:bg-zinc-800/60 border border-zinc-200 dark:border-zinc-700 rounded-2xl">
          <span className="text-xl flex-shrink-0">🔄</span>
          <div className="flex flex-col gap-1 flex-1">
            <p className="font-semibold text-zinc-800 dark:text-zinc-200 text-sm">Time to retake the quiz?</p>
            <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
              Skin changes over time — seasons, routines, and age all shift what it needs. Your quiz results are from over 2 months ago.
              A quick retake may surface a more accurate routine for where your skin is now.
            </p>
          </div>
          <button
            onClick={dismissRetakeNudge}
            className="text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-300 text-sm flex-shrink-0 cursor-pointer transition-colors self-start"
            aria-label="Dismiss retake nudge"
          >
            ✕
          </button>
        </div>
      )}

      {/* ── Result header card ─────────────────────────────────────────────── */}
      <div className="p-6 bg-zinc-900 dark:bg-zinc-900 border border-transparent dark:border-zinc-800 text-white rounded-2xl flex flex-col gap-5">
        <p className="text-zinc-400 text-xs uppercase tracking-widest">Based on your answers, your skin looks like:</p>

        {/* Skin type */}
        <div className="flex items-start gap-3">
          <span className="text-4xl mt-0.5">{typeDef?.icon ?? '🧴'}</span>
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2 flex-wrap">
              <h1 className="text-2xl font-bold leading-tight">{typeLabel}</h1>
              <ConfidenceBadge level={typeConfidence} />
            </div>
            <p className="text-zinc-400 text-sm">{typeDef?.tagline}</p>
            {/* Plain description */}
            {typeDef?.plainDescription && (
              <p className="text-zinc-500 text-xs leading-relaxed mt-0.5 italic">{typeDef.plainDescription}</p>
            )}
            {modDef && (
              <p className="text-zinc-400 text-sm mt-0.5">
                <span className="text-zinc-300 font-medium">+ Dehydrated</span> —{' '}
                <span className="text-zinc-500 text-xs italic">{modDef.plainDescription}</span>
              </p>
            )}
          </div>
        </div>

        {/* Concerns */}
        {!lowSignalConcern && concerns.length > 0 && (
          <div className="flex flex-col gap-2 pt-4 border-t border-zinc-800">
            <p className="text-zinc-400 text-xs uppercase tracking-wider">
              {concerns.length > 1 ? 'Skin concerns identified' : 'Skin concern identified'}
            </p>
            {concerns.map((concern, i) => {
              const def = SKIN_PROBLEMS.find(p => p.id === concern.id)
              return (
                <div key={concern.id} className="flex items-start gap-3">
                  <span className="text-xl flex-shrink-0 mt-0.5">{def?.icon ?? '•'}</span>
                  <div className="flex flex-col gap-0.5">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-semibold text-sm text-white">{def?.everydayLabel ?? def?.name ?? concern.id}</span>
                      {i === 0 && <span className="text-xs text-zinc-500">Primary</span>}
                      {i === 1 && <span className="text-xs text-zinc-500">Secondary</span>}
                      <ConfidenceBadge level={concern.confidence} />
                      {concern.medicalReferral && (
                        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-amber-500/20 text-amber-400 border border-amber-500/30">
                          👨‍⚕️ Derm check recommended
                        </span>
                      )}
                    </div>
                    {/* Plain description for concern */}
                    {def?.plainDescription && (
                      <span className="text-zinc-500 text-xs leading-relaxed italic">{def.plainDescription}</span>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        )}

        <button
          onClick={onReset}
          className="mt-1 text-xs text-zinc-500 hover:text-white underline underline-offset-2 cursor-pointer transition-colors w-fit"
        >
          ↩ Start over
        </button>
      </div>

      {/* ── Medical referral banner ────────────────────────────────────────── */}
      {needsMedicalReferral && (
        <div className="flex gap-3 p-4 bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900/40 rounded-2xl">
          <span className="text-xl flex-shrink-0">👨‍⚕️</span>
          <div className="flex flex-col gap-1">
            <p className="font-semibold text-amber-800 dark:text-amber-300 text-sm">
              Consider getting this confirmed by a dermatologist
            </p>
            <p className="text-sm text-amber-700 dark:text-amber-400 leading-relaxed">
              Based on your answers, {referralConcernNames.join(' and ')} {referralConcernNames.length > 1 ? 'are' : 'is'} a possibility.{' '}
              {referralConcernNames.length > 1 ? 'These conditions' : 'This condition'} can look similar to other skin issues,
              and {referralConcernNames.length > 1 ? 'they may respond' : 'it may respond'} better to prescription treatment than OTC products alone.
              We've included a general OTC routine below that shouldn't cause harm while you wait for an appointment.
            </p>
          </div>
        </div>
      )}

      {/* ── Low-signal info banner ─────────────────────────────────────────── */}
      {lowSignalConcern && (
        <div className="flex gap-3 p-4 bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-900/40 rounded-2xl">
          <span className="text-xl flex-shrink-0">ℹ️</span>
          <div className="flex flex-col gap-1">
            <p className="font-semibold text-blue-800 dark:text-blue-300 text-sm">
              No specific concern detected — here's a general routine
            </p>
            <p className="text-sm text-blue-700 dark:text-blue-400 leading-relaxed">
              Your answers didn't point strongly to one specific concern, which may actually be a good sign —
              your skin sounds relatively balanced right now. We've put together a general maintenance routine
              based on your skin type.
            </p>
          </div>
        </div>
      )}

      {/* ── Starter ingredients ─────────────────────────────────────────────── */}
      <div>
        <div className="flex items-center gap-3 mb-4">
          <h2 className="text-lg font-bold text-zinc-900 dark:text-zinc-100">Start here</h2>
          <span className="px-2.5 py-1 bg-emerald-100 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400 text-xs font-semibold rounded-full border border-emerald-200 dark:border-emerald-900/50">
            Starter ingredients
          </span>
        </div>
        <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-4 leading-relaxed">
          These are gentle, well-tolerated ingredients that many people find effective as a foundation.
          Introduce them one at a time, roughly a week apart, so you can identify the cause if your skin reacts to anything.
        </p>
        {isMultiConcern ? (
          <div className="flex flex-col gap-6">
            {groupedSources
              .filter(g => g.starters.length > 0)
              .map((group, idx) => (
                <div key={group.id} className={`flex flex-col gap-3 ${idx > 0 ? 'pt-6 border-t border-zinc-150 dark:border-zinc-800' : ''}`}>
                  <div className="flex items-center gap-2">
                    <span className="text-sm">🎯</span>
                    <h3 className="font-bold text-zinc-800 dark:text-zinc-200 text-sm tracking-wide">
                      {group.label}
                    </h3>
                  </div>
                  <div className="flex flex-col gap-4">
                    {group.starters.map((ingredient, i) => (
                      <IngredientCard key={`${group.id}-${ingredient.name}`} ingredient={ingredient} index={i} />
                    ))}
                  </div>
                </div>
              ))}
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            {starterIngredients.map((ingredient, i) => (
              <IngredientCard key={ingredient.name} ingredient={ingredient} index={i} />
            ))}
          </div>
        )}
      </div>

      {/* ── Next-step ingredients ─────────────────────────────────────────────── */}
      {hasNextStep && (
        <div>
          <button
            onClick={() => setNextStepExpanded(prev => !prev)}
            className="w-full flex items-center justify-between p-4 bg-zinc-50 dark:bg-zinc-800/60 border border-zinc-200 dark:border-zinc-700 rounded-2xl hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
          >
            <div className="flex items-center gap-3">
              <span className="text-lg">⏭️</span>
              <div className="text-left">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="font-semibold text-zinc-900 dark:text-zinc-100 text-sm">
                    {nextStepUnlocked ? 'Next-step ingredients — ready to explore' : 'Next-step ingredients'}
                  </span>
                  {nextStepUnlocked
                    ? <span className="px-2 py-0.5 bg-emerald-100 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400 text-xs font-medium rounded-full border border-emerald-200 dark:border-emerald-900/40">Unlocked</span>
                    : <span className="px-2 py-0.5 bg-zinc-200 dark:bg-zinc-700 text-zinc-600 dark:text-zinc-400 text-xs font-medium rounded-full">
                        {activeRoutine?.savedAt
                          ? `Available in ~${Math.max(0, Math.round(NEXT_STEP_UNLOCK_WEEKS - weeksOnRoutine))} more week${Math.max(0, Math.round(NEXT_STEP_UNLOCK_WEEKS - weeksOnRoutine)) !== 1 ? 's' : ''}`
                          : 'Add after 4–6 weeks on starter routine'}
                      </span>
                  }
                </div>
                <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
                  {nextStepUnlocked
                    ? 'Higher-strength actives to consider once you\'re comfortable with the starter routine.'
                    : 'Higher-strength actives to consider if starter ingredients haven\'t given you the results you\'re looking for.'}
                </p>
              </div>
            </div>
            <span className="text-zinc-400 text-lg flex-shrink-0 ml-2">{nextStepExpanded ? '▲' : '▼'}</span>
          </button>

          {nextStepExpanded && (
            <div className="flex flex-col gap-4 mt-4">
              {!nextStepUnlocked && (
                <div className="flex gap-2 p-3 bg-zinc-50 dark:bg-zinc-800/40 rounded-xl border border-zinc-200 dark:border-zinc-700">
                  <span className="text-base flex-shrink-0">⏳</span>
                  <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                    <strong>Wait until you're consistent:</strong> These ingredients are more potent and more likely to cause irritation.
                    Adding them before your skin has adjusted to the starter routine makes it harder to identify the cause of any reaction.
                    Most people find 4–6 weeks on the starter routine is the right time to consider adding these.
                  </p>
                </div>
              )}
              {isMultiConcern ? (
                <div className="flex flex-col gap-6">
                  {groupedSources
                    .filter(g => g.nextSteps.length > 0)
                    .map((group, idx) => (
                      <div key={group.id} className={`flex flex-col gap-3 ${idx > 0 ? 'pt-6 border-t border-zinc-150 dark:border-zinc-800' : ''}`}>
                        <div className="flex items-center gap-2">
                          <span className="text-sm">🎯</span>
                          <h3 className="font-bold text-zinc-800 dark:text-zinc-200 text-sm tracking-wide">
                            {group.label}
                          </h3>
                        </div>
                        <div className="flex flex-col gap-4">
                          {group.nextSteps.map((ingredient, i) => (
                            <IngredientCard key={`${group.id}-${ingredient.name}`} ingredient={ingredient} index={i} />
                          ))}
                        </div>
                      </div>
                    ))}
                </div>
              ) : (
                <div className="flex flex-col gap-4">
                  {nextStepIngredients.map((ingredient, i) => (
                    <IngredientCard key={ingredient.name} ingredient={ingredient} index={i} />
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* ── CTA: Build routine ─────────────────────────────────────────────── */}
      <div className="flex flex-col items-center gap-3 py-4">
        <button
          onClick={onBuildRoutine}
          className="w-full max-w-sm py-4 bg-zinc-900 dark:bg-zinc-100 hover:bg-zinc-700 dark:hover:bg-zinc-200 text-white dark:text-zinc-900 font-bold rounded-2xl transition-colors duration-200 cursor-pointer text-base"
        >
          Build my AM/PM routine →
        </button>
        <p className="text-xs text-zinc-400 dark:text-zinc-550">Generates an ordered routine for your skin type and concerns</p>
      </div>
    </div>
  )
}
