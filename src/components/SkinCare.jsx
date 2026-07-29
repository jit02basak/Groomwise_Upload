'use client'
// SkinCare.jsx — orchestrator
// Flow:
//   ENTRY
//   ├── "I already know my issue"  → DIRECT (DirectSelectScreen, unchanged)
//   └── "Help me figure it out"   → SUB_CHOICE
//         ├── "I know my skin type" → TYPE_SELECT → CONCERN_QUIZ → RESULTS → ROUTINE
//         └── "Not sure"           → TYPE_QUIZ (A) → CONCERN_QUIZ (B/C/D/E) → RESULTS → ROUTINE

import { useState, useEffect } from 'react'
import Link from 'next/link'
import EntryScreen          from './skincare/EntryScreen'
import SubChoiceScreen      from './skincare/SubChoiceScreen'
import TypeSelectScreen     from './skincare/TypeSelectScreen'
import TypeQuizScreen       from './skincare/TypeQuizScreen'
import ConcernQuizScreen    from './skincare/ConcernQuizScreen'
import DirectSelectScreen   from './skincare/DirectSelectScreen'
import RecommendationScreen from './skincare/RecommendationScreen'
import RoutineBuilder       from './skincare/RoutineBuilder'
import CrossSuggest         from './common/CrossSuggest'

const STEPS = {
  ENTRY:        'entry',
  SUB_CHOICE:   'sub_choice',   // "know type?" branch
  TYPE_SELECT:  'type_select',  // self-pick one of 4 types
  TYPE_QUIZ:    'type_quiz',    // Quiz A (6 questions)
  CONCERN_QUIZ: 'concern_quiz', // Quiz B/C/D/E (type-specific)
  DIRECT:       'direct',       // direct-select path (unchanged)
  RESULTS:      'results',
  ROUTINE:      'routine',
}

// Step order for the progress pill indicator (excludes DIRECT which has its own flow)
const PROGRESS_STEPS = [STEPS.ENTRY, STEPS.CONCERN_QUIZ, STEPS.RESULTS, STEPS.ROUTINE]

export default function SkinCare() {
  const [step, setStep]         = useState(STEPS.ENTRY)

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [step])
  // pendingType: resolved from TypeSelectScreen or TypeQuizScreen
  // { primary: string, confidence: 'high'|'moderate'|'low' }
  const [pendingType, setPendingType] = useState(null)
  // quizResult: final merged object passed to RecommendationScreen + RoutineBuilder
  const [quizResult, setQuizResult]   = useState(null)

  // ── Handlers ────────────────────────────────────────────────────────────────

  // Type known (self-selected, confidence = 'high') → go to concern quiz
  const handleTypeSelected = (typeResult) => {
    setPendingType(typeResult)
    setStep(STEPS.CONCERN_QUIZ)
  }

  // Quiz A complete → type determined internally → go to concern quiz (no intermediate screen)
  const handleTypeQuizComplete = (typeResult) => {
    setPendingType(typeResult)
    setStep(STEPS.CONCERN_QUIZ)
  }

  // Concern quiz complete → merge type + concern results → show results
  const handleConcernQuizComplete = (concernResult) => {
    const merged = {
      skinType: {
        primary:    pendingType.primary,
        modifier:   null,
        confidence: pendingType.confidence,
      },
      concerns:         concernResult.concerns,
      lowSignalConcern: concernResult.lowSignalConcern,
    }
    setQuizResult(merged)
    setStep(STEPS.RESULTS)
  }

  // DirectSelect produces a full quizResult-shaped object directly
  const handleDirectSelect = (result) => {
    setQuizResult(result)
    setStep(STEPS.RESULTS)
  }

  const handleReset = () => {
    setPendingType(null)
    setQuizResult(null)
    setStep(STEPS.ENTRY)
  }

  // ── Progress indicator ───────────────────────────────────────────────────────
  const progressIndex = PROGRESS_STEPS.indexOf(
    [STEPS.TYPE_SELECT, STEPS.TYPE_QUIZ, STEPS.SUB_CHOICE].includes(step) ? STEPS.CONCERN_QUIZ : step
  )

  return (
    <div className="w-[80vw] mx-auto py-10" style={{ minHeight: '85vh' }}>

      {/* Top bar */}
      <div className="flex justify-between items-center mb-8">
        <Link href="/" className="text-sm text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors flex items-center gap-1.5">
          ← Home
        </Link>

        {/* Step indicator — only shown for the main quiz path */}
        {step !== STEPS.DIRECT && (
          <div className="flex items-center gap-2">
            {PROGRESS_STEPS.map((s, i) => (
              <div
                key={s}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  i === progressIndex  ? 'w-6 bg-zinc-900 dark:bg-zinc-100' :
                  i < progressIndex    ? 'w-4 bg-zinc-400 dark:bg-zinc-500' :
                                         'w-4 bg-zinc-200 dark:bg-zinc-800'
                }`}
              />
            ))}
          </div>
        )}
      </div>

      {/* ── Step rendering ────────────────────────────────────────────────────── */}

      {step === STEPS.ENTRY && (
        <EntryScreen
          onStartQuiz={() => setStep(STEPS.SUB_CHOICE)}
          onDirectPick={() => setStep(STEPS.DIRECT)}
        />
      )}

      {step === STEPS.SUB_CHOICE && (
        <SubChoiceScreen
          onKnowType={() => setStep(STEPS.TYPE_SELECT)}
          onFullFlow={() => setStep(STEPS.TYPE_QUIZ)}
          onBack={() => setStep(STEPS.ENTRY)}
        />
      )}

      {step === STEPS.TYPE_SELECT && (
        <TypeSelectScreen
          onSelect={handleTypeSelected}
          onBack={() => setStep(STEPS.SUB_CHOICE)}
        />
      )}

      {step === STEPS.TYPE_QUIZ && (
        <TypeQuizScreen
          onComplete={handleTypeQuizComplete}
          onBack={() => setStep(STEPS.SUB_CHOICE)}
        />
      )}

      {step === STEPS.CONCERN_QUIZ && (
        <ConcernQuizScreen
          skinType={pendingType}
          onComplete={handleConcernQuizComplete}
          onBack={() => {
            // Back from concern quiz goes to wherever the type came from
            if (pendingType?.confidence === 'high') {
              setStep(STEPS.TYPE_SELECT)
            } else {
              setStep(STEPS.TYPE_QUIZ)
            }
          }}
        />
      )}

      {step === STEPS.DIRECT && (
        <DirectSelectScreen
          onSelect={handleDirectSelect}
          onBack={() => setStep(STEPS.ENTRY)}
        />
      )}

      {step === STEPS.RESULTS && (
        <>
          <RecommendationScreen
            quizResult={quizResult}
            onBuildRoutine={() => setStep(STEPS.ROUTINE)}
            onReset={handleReset}
          />
          <div className="mt-10">
            <CrossSuggest
              fromModule="skincare"
              message="Skin sorted — want to find a hairstyle that suits your face shape too?"
              linkHref="/hair-style"
              linkLabel="Find my hairstyle →"
            />
          </div>
        </>
      )}

      {step === STEPS.ROUTINE && (
        <>
          <RoutineBuilder
            quizResult={quizResult}
            onBack={() => setStep(STEPS.RESULTS)}
            onReset={handleReset}
          />
          <div className="mt-10">
            <CrossSuggest
              fromModule="skincare"
              message="Routine set — want to find a hairstyle that suits your face shape too?"
              linkHref="/hair-style"
              linkLabel="Find my hairstyle →"
            />
          </div>
        </>
      )}
    </div>
  )
}
