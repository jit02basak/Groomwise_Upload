'use client'
// HairStyle.jsx — Phase 2 + Part 3 orchestrator
// Manages the step-by-step flow: Upload → Scanning → HairProfile → Results → Library
// Part 3: uploadedImages is now an array (1–3 photos); all are passed to classifyFaceShape()
// for multi-shot ratio averaging. failedFrameIndex identifies which specific shot failed
// a quality gate so UploadStep can surface a targeted retake prompt.

import { useState, useEffect } from 'react'
import Link from 'next/link'
import UploadStep       from './hairstyle/UploadStep'
import ScanningStep     from './hairstyle/ScanningStep'
import HairProfileStep  from './hairstyle/HairProfileStep'
import ResultsStep      from './hairstyle/ResultsStep'
import LibraryView      from './hairstyle/LibraryView'
import CrossSuggest     from './common/CrossSuggest'
import { classifyFaceShape } from '../utils/faceClassifier'
import { useGroomStore } from '../store/useGroomStore'

const STEPS = {
  UPLOAD:       'upload',
  SCANNING:     'scanning',
  HAIR_PROFILE: 'hair-profile',
  RESULTS:      'results',
  LIBRARY:      'library',
}

export default function HairStyle() {
  const setLastFaceShape= useGroomStore((s) => s.setLastFaceShape)
  const clearFaceShape= useGroomStore((s) => s.clearFaceShape)

  const [step, setStep]= useState(STEPS.UPLOAD)

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [step])
  // Part 3: array of 1–3 data URL strings (previously a single string)
  const [uploadedImages, setUploadedImages] = useState([])
  const [faceShape, setFaceShape]     = useState(null)
  const [confidence, setConfidence]   = useState('good')
  const [hairType, setHairType]       = useState(null)
  const [thickness, setThickness]     = useState(null)
  // Scan measurement data — passed to ResultsStep for correction payload
  const [scanRatios, setScanRatios]       = useState(null)
  const [scanJawAngle, setScanJawAngle]   = useState(null)
  const [devJawAngle, setDevJawAngle]     = useState(false)
  // 'pose' | 'extreme-angle' | 'blurry' | 'lighting' | 'occluded' | 'technical' | null
  const [scanError, setScanError]     = useState(null)
  // Zero-based index of the shot that failed quality gating (null for non-per-shot failures)
  const [failedFrameIndex, setFailedFrameIndex] = useState(null)

  // Clear the face-shape result whenever the user leaves the hairstyle section.
  // This fires on any navigation away (back button, link to another page, etc.)
  // so the next visit always starts on the UPLOAD step — exactly like a first-time visit.
  useEffect(() => {
    return () => {
      clearFaceShape()
    }
  // clearFaceShape is a stable store action reference — safe to include
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Called when the user confirms their photo(s) and clicks "Analyze"
  const handleScanStart = async () => {
    setScanError(null)
    setFailedFrameIndex(null)
    setStep(STEPS.SCANNING)
    try {
      // Performance timing — verifies no regression from Parts 2/3 changes
      const t0 = performance.now()
      // Part 3: pass the full array (or single-element array) to classifyFaceShape
      const result = await classifyFaceShape(uploadedImages)
      const t1 = performance.now()
      console.log(`[Perf] classifyFaceShape (${uploadedImages.length} frame(s)): ${(t1 - t0).toFixed(0)}ms`)

      if (!result || result.shape === null) {
        // Go back to upload and tell the user why.
        // Part 3: if failedFrameIndex is present, surface it so UploadStep can
        // highlight the specific failing thumbnail.
        setScanError(result?.reason || 'pose')
        setFailedFrameIndex(result?.failedFrameIndex ?? null)
        setStep(STEPS.UPLOAD)
        return
      }
      setFaceShape(result.shape)
      setConfidence(result.confidence)
      setScanRatios(result.ratios ?? null)
      setScanJawAngle(result.jawAngle ?? null)
      setDevJawAngle(result.devJawAngle ?? false)
      setLastFaceShape(result.shape, result.confidence)   // share in-memory (not persisted to storage)
      setStep(STEPS.HAIR_PROFILE)
    } catch (err) {
      console.error('Face classification technical error:', err)
      setScanError('technical')
      setFailedFrameIndex(null)
      setStep(STEPS.UPLOAD)
    }
  }

  // Called from HairProfileStep when user selects hair type + thickness
  const handleHairProfileComplete = ({ hairType: ht, thickness: th }) => {
    setHairType(ht)
    setThickness(th)
    setStep(STEPS.RESULTS)
  }

  // Called from ResultsStep when user confirms the rescan prompt
  const handleRescanConfirmed = () => {
    clearFaceShape()
    setUploadedImages([])
    setFaceShape(null)
    setConfidence('good')
    setHairType(null)
    setThickness(null)
    setScanRatios(null)
    setScanJawAngle(null)
    setDevJawAngle(false)
    setScanError(null)
    setFailedFrameIndex(null)
    setStep(STEPS.UPLOAD)
  }

  return (
    <div className="w-[80vw] mx-auto py-10" style={{ minHeight: '85vh' }}>

      {/* --- Top navigation bar (Back + Step indicator) --- */}
      <div className="flex justify-between items-center mb-8">
        <Link href="/" className="text-sm text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200 transition-colors duration-200 flex items-center gap-1.5">
          ← Home
        </Link>

        {/* Step indicator pills */}
        <div className="flex items-center gap-2">
          {[STEPS.UPLOAD, STEPS.SCANNING, STEPS.HAIR_PROFILE, STEPS.RESULTS, STEPS.LIBRARY].map((s, i) => (
            <div
              key={s}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                step === s          ? 'w-6 bg-zinc-900 dark:bg-zinc-100' :
                i < Object.values(STEPS).indexOf(step) ? 'w-4 bg-zinc-400 dark:bg-zinc-500' :
                'w-4 bg-zinc-200 dark:bg-zinc-800'
              }`}
            />
          ))}
        </div>
      </div>

      {/* --- Step content --- */}
      {step === STEPS.UPLOAD && (
        <div className="flex flex-col gap-16">
          <UploadStep
            images={uploadedImages}
            onImagesChange={(imgs) => { setUploadedImages(imgs); setScanError(null); setFailedFrameIndex(null) }}
            onScan={handleScanStart}
            scanError={scanError}
            failedFrameIndex={failedFrameIndex}
          />
          <div className="border-t border-zinc-200 dark:border-zinc-800 pt-16">
            <LibraryView />
          </div>
        </div>
      )}
      {step === STEPS.SCANNING && <ScanningStep />}
      {step === STEPS.HAIR_PROFILE && (
        <HairProfileStep
          faceShape={faceShape}
          onComplete={handleHairProfileComplete}
          onBack={handleRescanConfirmed}
        />
      )}
      {step === STEPS.RESULTS  && (
        <>
          <ResultsStep
            faceShape={faceShape}
            hairType={hairType}
            thickness={thickness}
            image={uploadedImages[0] ?? null}
            confidence={confidence}
            ratios={scanRatios}
            jawAngle={scanJawAngle}
            devJawAngle={devJawAngle}
            scannedAt={null}
            isStoredResult={false}
            onBrowseLibrary={() => setStep(STEPS.LIBRARY)}
            onRescan={handleRescanConfirmed}
          />
          {/* Cross-suggest to skincare — shown after results */}
          <div className="mt-10">
            <CrossSuggest
              fromModule="hairstyle"
              message="Your hair's sorted — want to find a skincare routine that works for your skin?"
              linkHref="/skin-care"
              linkLabel="Check my skin →"
            />
          </div>
        </>
      )}
      {step === STEPS.LIBRARY  && (
        <LibraryView onBack={() => setStep(STEPS.RESULTS)} />
      )}
    </div>
  )
}
