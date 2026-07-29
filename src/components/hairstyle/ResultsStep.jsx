'use client'
import { useState } from 'react'
import { FACE_SHAPES, hairstyles, normalizeFaceShape, getHairstyleRecommendations } from '../../data/hairstyles'
import HairstyleCard from './HairstyleCard'

/**
 * ResultsStep — Step 4 of the Hairstyle module
 *
 * Shows the detected face shape + matched hairstyle recommendations
 * using the new recommendation engine (primary + backfill).
 *
 * Part 5: Correction widget now does BOTH:
 *   1. Fires a fire-and-forget POST to log the correction (unchanged)
 *   2. Immediately re-renders recommendations using the corrected shape (new)
 * Both happen on the same button press. activeFaceShape tracks the live display
 * state; the original faceShape prop is kept for the POST payload.
 *
 * Props:
 *   faceShape       — string, e.g. 'oval' (lowercase from scanner)
 *   hairType        — string, e.g. 'Straight'
 *   thickness       — string, e.g. 'Fine'
 *   image           — data URL of the uploaded photo (null if showing a stored result)
 *   confidence      — 'good' | 'low'
 *   ratios          — { lengthToWidth, jawToCheek, browToCheek } from the scan (optional)
 *   jawAngle        — number (degrees) from the scan, nullable until calibrated
 *   devJawAngle     — boolean, true only when localStorage devJawAngle flag is active
 *   scannedAt       — ISO timestamp of when the result was stored (may be null)
 *   isStoredResult  — true when showing a persisted result rather than a fresh scan
 *   onBrowseLibrary — callback() to open the full library
 *   onRescan        — callback() confirmed rescan — go back to upload
 */
export default function ResultsStep({ faceShape, hairType, thickness, image, confidence, ratios, jawAngle, devJawAngle, scannedAt, isStoredResult, onBrowseLibrary, onRescan }) {
  const [confirmingRescan, setConfirmingRescan] = useState(false)
  // Correction feedback widget state
  const [correctionOpen, setCorrectionOpen]       = useState(false)
  const [correctionSubmitted, setCorrectionSubmitted] = useState(false)
  const [correctionPending, setCorrectionPending]   = useState(false)

  // Part 5: activeFaceShape tracks the live-displayed shape.
  // Initialized from the scanner's prediction; updated immediately when the user
  // selects a correction. Drives all derived state (banner, recommendations, shapeInfo).
  // The original faceShape prop is kept unchanged for the DB correction POST payload.
  const [activeFaceShape, setActiveFaceShape] = useState(faceShape)

  // Part 5: submitCorrection fires BOTH actions on the same button press:
  //   1. Fire-and-forget POST to log the correction signal (unchanged from prior spec).
  //   2. Immediately update activeFaceShape → re-renders recommendations + banner.
  // Neither action replaces the other. The POST is still best-effort / non-blocking.
  function submitCorrection(correctedShape) {
    if (!ratios || correctionSubmitted || correctionPending) return
    if (correctedShape === faceShape) return // already correct (original prediction)
    setCorrectionPending(true)
    // Action 2: immediate live re-render with the corrected shape
    setActiveFaceShape(correctedShape)
    // Action 1: fire-and-forget DB log
    fetch('/api/faceshape-correction', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        predictedShape: faceShape,
        correctedShape,
        confidence: confidence ?? 'low',
        lengthToWidth: ratios.lengthToWidth,
        jawToCheek:    ratios.jawToCheek,
        browToCheek:   ratios.browToCheek,
        jawAngle:      jawAngle ?? null,
      }),
    })
      .then(() => {
        setCorrectionSubmitted(true)
        setCorrectionOpen(false)
      })
      .catch(() => {
        // Silently swallow — correction is best-effort; never block the user
        setCorrectionSubmitted(true)
        setCorrectionOpen(false)
      })
      .finally(() => setCorrectionPending(false))
  }

  // Normalize face shape from scanner output (lowercase) to dataset format (capitalized)
  // Uses activeFaceShape so corrections immediately update recommendations.
  const normalizedShape = normalizeFaceShape(activeFaceShape)

  const { primary, backfill } = getHairstyleRecommendations(
    normalizedShape,
    hairType,
    thickness,
    hairstyles
  )

  // shapeInfo also tracks activeFaceShape so the description updates on correction
  const shapeInfo = FACE_SHAPES.find(s => s.id === activeFaceShape)

  // Whether the user has corrected the shape away from the original prediction
  const isCorrected = activeFaceShape !== faceShape

  const scanDate = scannedAt
    ? new Date(scannedAt).toLocaleDateString(undefined, { day: 'numeric', month: 'short', year: 'numeric' })
    : null

  return (
    <div className="w-full flex flex-col gap-8">

      {/* --- Face shape result banner --- */}
      <div className="flex flex-col md:flex-row gap-6 p-6 bg-zinc-900 dark:bg-zinc-900 border border-transparent dark:border-zinc-800 text-white rounded-2xl items-center">
        {/* Uploaded photo thumbnail (only when the user just scanned) */}
        {image && (
          <div className="flex-shrink-0 w-20 h-20 rounded-full overflow-hidden border-2 border-zinc-700">
            <img src={image} alt="Your face" className="w-full h-full object-cover" />
          </div>
        )}

        <div className="flex flex-col gap-1 text-center md:text-left flex-1">
          <p className="text-zinc-400 text-sm uppercase tracking-widest font-medium">
            {isStoredResult ? 'Your saved face shape' : 'Detected Face Shape'}
          </p>
          <h1 className="text-4xl font-bold capitalize tracking-tight">{activeFaceShape}</h1>
          {/* Part 5: show "Corrected to" indicator when user has selected a different shape */}
          {isCorrected && (
            <p className="text-xs font-medium text-emerald-400 mt-0.5">
              ✓ Corrected from {faceShape} to {activeFaceShape}
            </p>
          )}
          {shapeInfo && (
            <p className="text-zinc-400 text-sm max-w-lg">{shapeInfo.description}</p>
          )}
          {/* Hair profile summary */}
          <p className="text-zinc-500 text-xs mt-1">
            {hairType} · {thickness} hair
            {scanDate && <> · Scanned on {scanDate}</>}
          </p>

          {/* [DEV] Jaw angle overlay — only visible when localStorage.devJawAngle = '1' */}
          {devJawAngle && jawAngle != null && (
            <p className="mt-2 text-xs font-mono px-2 py-1 rounded bg-amber-400/10 border border-amber-400/30 text-amber-300 inline-block w-fit">
              🔧 jawAngle: {jawAngle.toFixed(1)}° (dev only — not scored yet)
            </p>
          )}
        </div>

        {/* Rescan button / confirmation inline panel */}
        <div className="md:ml-auto flex-shrink-0">
          {!confirmingRescan ? (
            <button
              onClick={() => setConfirmingRescan(true)}
              className="text-sm text-zinc-400 hover:text-white border border-zinc-700 hover:border-zinc-500 px-4 py-2 rounded-lg transition-colors duration-200 cursor-pointer"
            >
              ↩ Rescan
            </button>
          ) : (
            <div className="flex flex-col gap-2 p-4 bg-zinc-800 border border-zinc-700 rounded-xl max-w-xs text-sm">
              <p className="text-zinc-300 leading-snug">
                A new photo <strong>may give a different result</strong> than your saved one. Face shape is consistent, but lighting and angle affect the scan.
              </p>
              <div className="flex gap-2 mt-1">
                <button
                  onClick={() => setConfirmingRescan(false)}
                  className="flex-1 py-1.5 border border-zinc-600 hover:border-zinc-400 text-zinc-300 hover:text-white rounded-lg transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  onClick={onRescan}
                  className="flex-1 py-1.5 bg-white text-zinc-900 hover:bg-zinc-200 font-semibold rounded-lg transition-colors cursor-pointer"
                >
                  Yes, rescan
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* --- Correction feedback widget --- */}
      {/* Only shown when ratios are available (fresh scan, not a stored result without ratios) */}
      {ratios && !correctionSubmitted && (
        <div className="flex flex-col gap-2">
          {!correctionOpen ? (
            <button
              id="correction-trigger"
              onClick={() => setCorrectionOpen(true)}
              className="self-start text-xs text-zinc-500 dark:text-zinc-500 hover:text-zinc-400 dark:hover:text-zinc-400 underline underline-offset-2 transition-colors cursor-pointer"
            >
              Doesn&apos;t look right? Tell us your actual face shape
            </button>
          ) : (
            <div
              id="correction-widget"
              className="flex flex-col gap-3 p-4 bg-zinc-900/60 dark:bg-zinc-900 border border-zinc-800 rounded-xl"
            >
              <p className="text-sm text-zinc-300">What&apos;s your actual face shape?</p>
              <div className="flex flex-wrap gap-2">
                {['oval', 'round', 'square', 'heart', 'diamond', 'oblong'].map((shape) => {
                  // Disable the shape that is already actively displayed (post-correction or original)
                  const isActive = shape === activeFaceShape
                  return (
                    <button
                      key={shape}
                      id={`correction-shape-${shape}`}
                      disabled={correctionPending || isActive}
                      onClick={() => submitCorrection(shape)}
                      className={
                        'px-3 py-1.5 rounded-lg text-xs font-medium capitalize transition-colors cursor-pointer border ' +
                        (isActive
                          ? 'border-zinc-700 text-zinc-600 cursor-not-allowed'
                          : 'border-zinc-600 text-zinc-300 hover:border-zinc-400 hover:text-white')
                      }
                    >
                      {isActive ? `✓ ${shape}` : shape}
                    </button>
                  )
                })}
              </div>
              <button
                onClick={() => setCorrectionOpen(false)}
                className="self-start text-xs text-zinc-600 hover:text-zinc-400 transition-colors cursor-pointer"
              >
                Cancel
              </button>
            </div>
          )}
        </div>
      )}

      {/* Post-submission acknowledgment */}
      {correctionSubmitted && (
        <p id="correction-thanks" className="text-xs text-zinc-500 dark:text-zinc-500">
          📝 Thanks, noted! This helps us improve the scanner.
        </p>
      )}

      {/* Low confidence soft warning */}
      {confidence === 'low' && (
        <div className="flex items-start gap-3 p-4 rounded-2xl bg-amber-50/70 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900/50 text-sm text-amber-850 dark:text-amber-300">
          <span className="text-base flex-shrink-0 mt-0.5">⚠️</span>
          <span>This result may be slightly less precise — for a sharper match, try a clearer front-facing photo.</span>
        </div>
      )}

      {/* --- Primary matched hairstyles (only when primary has results) --- */}
      {primary.length > 0 && (
        <div>
          <div className="flex justify-between items-center mb-5">
            <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">
              {primary.length} {primary.length === 1 ? 'style' : 'styles'} for your {activeFaceShape} face
            </h2>
            <button
              onClick={onBrowseLibrary}
              className="text-sm font-medium text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white underline underline-offset-4 cursor-pointer transition-colors"
            >
              Browse all →
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {primary.map(style => (
              <HairstyleCard key={style.id} hairstyle={style} />
            ))}
          </div>
        </div>
      )}

      {/* --- Empty state (only when both primary and backfill are empty) --- */}
      {primary.length === 0 && backfill.length === 0 && (
        <div className="p-8 text-center text-zinc-400 dark:text-zinc-500 border border-dashed border-zinc-200 dark:border-zinc-800 rounded-2xl">
          No exact face-shape matches for this hair type — browse the full library to explore more options.
        </div>
      )}

      {/* --- Backfill hairstyles (only when backfill is non-empty) --- */}
      {backfill.length > 0 && (
        <div className="flex flex-col gap-4">
          <div>
            <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">
              More Styles For Your Hair Type
            </h2>
            <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">
              These match your hair type and thickness, though not your face shape as closely.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {backfill.map(style => (
              <HairstyleCard key={style.id} hairstyle={style} />
            ))}
          </div>
        </div>
      )}



      {/* Bottom link to full library */}
      <div className="text-center pb-4">
        <button
          onClick={onBrowseLibrary}
          className="px-8 py-3 border border-zinc-200 dark:border-zinc-800 hover:border-zinc-400 dark:hover:border-zinc-600 text-zinc-700 dark:text-zinc-300 font-medium rounded-xl transition-all duration-200 cursor-pointer bg-white dark:bg-zinc-900"
        >
          Browse the full hairstyle library →
        </button>
      </div>
    </div>
  )
}
