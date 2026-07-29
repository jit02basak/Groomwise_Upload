'use client'
import { useState } from 'react'
import { SHAVING_GATE, CONCERN_QUIZZES, computeConcernQuizResult } from '../../data/skincare'
import { SKIN_PROBLEMS } from '../../data/skincare'

/**
 * ConcernQuizScreen — Quiz B/C/D/E (type-specific concern quiz, 5 questions)
 *
 * State model:
 *   gateAnswer        — 'yes' | 'no' | null; null = gate not yet answered
 *   questionSequence  — ordered list of question IDs actually shown
 *                       (cq2 removed when cq1 "rarely/never" chosen)
 *   currentSeqIndex   — position within sequence (0-based)
 *   answers           — map { questionId → selected option object }
 *   q2Skipped         — true when cq1 "rarely/never" was chosen
 *
 * Props:
 *   skinType   — { primary: string, confidence: string } — determines which quiz set to use
 *   onComplete — callback({ concerns, lowSignalConcern })
 *   onBack     — callback() — back to previous step (type select or type quiz result)
 */
export default function ConcernQuizScreen({ skinType, onComplete, onBack }) {
  // ── Shaving gate ──────────────────────────────────────────────────────────
  const [gateAnswer, setGateAnswer]     = useState(null)
  const [gateSelected, setGateSelected] = useState(null)

  // ── Quiz state ────────────────────────────────────────────────────────────
  const questions = CONCERN_QUIZZES[skinType?.primary] ?? CONCERN_QUIZZES['normal']
  const allIds    = questions.map(q => q.id)

  const [questionSequence, setQuestionSequence] = useState(allIds)
  const [currentSeqIndex, setCurrentSeqIndex]   = useState(0)
  const [answers, setAnswers]                   = useState({})
  const [q2Skipped, setQ2Skipped]               = useState(false)
  const [selectedOption, setSelectedOption]     = useState(null)

  // ── Gate confirmation ─────────────────────────────────────────────────────
  const handleGateConfirm = () => {
    if (!gateSelected) return
    setGateAnswer(gateSelected.value)
    setGateSelected(null)
  }

  // ── Option filtering ──────────────────────────────────────────────────────
  const getVisibleOptions = (question) => {
    if (question.id !== 'cq1') return question.options
    if (gateAnswer === 'no') return question.options.filter(o => !o.requiresShaving)
    return question.options
  }

  // ── Current question ──────────────────────────────────────────────────────
  const currentQuestionId = questionSequence[currentSeqIndex]
  const currentQuestion   = questions.find(q => q.id === currentQuestionId)
  const visibleOptions    = currentQuestion ? getVisibleOptions(currentQuestion) : []

  const totalQuestions  = questionSequence.length
  const isLastQuestion  = currentSeqIndex === totalQuestions - 1
  const progressPct     = (currentSeqIndex / totalQuestions) * 100

  const restoredAnswer    = answers[currentQuestionId] ?? null
  const effectiveSelected = selectedOption ?? restoredAnswer

  // ── Skin type label for header ────────────────────────────────────────────
  const typeDef = SKIN_PROBLEMS.find(p => p.id === skinType?.primary)

  // ── Handlers ──────────────────────────────────────────────────────────────
  const handleNext = () => {
    if (!effectiveSelected) return
    const newAnswers = { ...answers, [currentQuestionId]: effectiveSelected }
    setAnswers(newAnswers)

    // Q1 skip logic — identical to the old QuizScreen
    if (currentQuestionId === 'cq1') {
      const shouldSkip = effectiveSelected.skipNextQuestion === true
      setQ2Skipped(shouldSkip)
      if (shouldSkip) {
        setQuestionSequence(allIds.filter(id => id !== 'cq2'))
      } else {
        setQuestionSequence(allIds)
      }
    }

    if (isLastQuestion) {
      const orderedAnswers = questionSequence.map(id => newAnswers[id]).filter(Boolean)
      onComplete(computeConcernQuizResult(orderedAnswers, skinType?.primary, q2Skipped))
    } else {
      setCurrentSeqIndex(prev => prev + 1)
      setSelectedOption(null)
    }
  }

  const handleBack = () => {
    if (currentSeqIndex === 0) {
      // Back from first concern question goes to gate
      setGateAnswer(null)
      setGateSelected(null)
    } else {
      setCurrentSeqIndex(prev => prev - 1)
      setSelectedOption(null)
    }
  }

  // ── Render: shaving gate ──────────────────────────────────────────────────
  if (gateAnswer === null) {
    return (
      <div className="w-full max-w-xl mx-auto flex flex-col gap-8">

        <div className="flex flex-col gap-2">
          <div className="flex justify-between text-xs text-zinc-400 dark:text-zinc-500">
            <span>
              <span className="text-zinc-600 dark:text-zinc-300 font-medium">
                {typeDef?.name ?? 'Skin'} concern quiz
              </span>
              {' '}— Before we start
            </span>
            <button onClick={onBack} className="hover:text-zinc-700 dark:hover:text-zinc-300 cursor-pointer transition-colors">
              ✕ Exit
            </button>
          </div>
          <div className="w-full bg-zinc-100 dark:bg-zinc-800 rounded-full h-1.5 overflow-hidden">
            <div className="h-full bg-zinc-900 dark:bg-zinc-100 rounded-full w-0" />
          </div>
        </div>

        {/* Stage label */}
        <div className="flex items-center gap-2">
          <span className="px-2.5 py-1 bg-zinc-100 dark:bg-zinc-800 text-zinc-500 dark:text-zinc-400 text-xs font-semibold rounded-full border border-zinc-200 dark:border-zinc-700 uppercase tracking-wide">
            Step 2 of 2 — Concerns
          </span>
          <span className="text-xs text-zinc-400 dark:text-zinc-500">
            Tailored to {typeDef?.name ?? 'your skin type'}
          </span>
        </div>

        <div>
          <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100 leading-snug">
            {SHAVING_GATE.question}
          </h2>
          <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">
            This helps us show only relevant options.
          </p>
        </div>

        <div className="flex flex-col gap-3">
          {SHAVING_GATE.options.map((opt, i) => {
            const isSelected = gateSelected?.value === opt.value
            return (
              <button
                key={i}
                onClick={() => setGateSelected(opt)}
                className={`w-full text-left px-5 py-4 rounded-xl border-2 font-medium text-sm transition-all duration-150 cursor-pointer ${
                  isSelected
                    ? 'border-zinc-900 dark:border-zinc-100 bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900'
                    : 'border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-zinc-700 dark:text-zinc-300 hover:border-zinc-400 dark:hover:border-zinc-600'
                }`}
              >
                {opt.text}
              </button>
            )
          })}
        </div>

        <div className="flex justify-between items-center">
          <button
            onClick={onBack}
            className="text-sm text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors cursor-pointer"
          >
            ← Back
          </button>
          <button
            onClick={handleGateConfirm}
            disabled={!gateSelected}
            className={`px-7 py-2.5 rounded-xl font-semibold text-sm transition-all duration-200 cursor-pointer ${
              gateSelected
                ? 'bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 hover:bg-zinc-700 dark:hover:bg-zinc-200'
                : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-400 dark:text-zinc-600 cursor-not-allowed'
            }`}
          >
            Next →
          </button>
        </div>
      </div>
    )
  }

  // ── Render: concern question ──────────────────────────────────────────────
  if (!currentQuestion) return null

  return (
    <div className="w-full max-w-xl mx-auto flex flex-col gap-8">

      {/* Progress */}
      <div className="flex flex-col gap-2">
        <div className="flex justify-between text-xs text-zinc-400 dark:text-zinc-500">
          <span>
            <span className="text-zinc-600 dark:text-zinc-300 font-medium">
              {typeDef?.name ?? 'Skin'} concern quiz
            </span>
            {' '}— Question {currentSeqIndex + 1} of {totalQuestions}
          </span>
          <button onClick={onBack} className="hover:text-zinc-700 dark:hover:text-zinc-300 cursor-pointer transition-colors">
            ✕ Exit
          </button>
        </div>
        <div className="w-full bg-zinc-100 dark:bg-zinc-800 rounded-full h-1.5 overflow-hidden">
          <div
            className="h-full bg-zinc-900 dark:bg-zinc-100 rounded-full transition-all duration-500"
            style={{ width: `${progressPct}%` }}
          />
        </div>
      </div>

      {/* Stage label */}
      <div className="flex items-center gap-2">
        <span className="px-2.5 py-1 bg-zinc-100 dark:bg-zinc-800 text-zinc-500 dark:text-zinc-400 text-xs font-semibold rounded-full border border-zinc-200 dark:border-zinc-700 uppercase tracking-wide">
          Step 2 of 2 — Concerns
        </span>
        <span className="text-xs text-zinc-400 dark:text-zinc-500">
          Tailored to {typeDef?.name ?? 'your skin type'}
        </span>
      </div>

      {/* Question */}
      <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100 leading-snug">
        {currentQuestion.question}
      </h2>

      {/* Options */}
      <div className="flex flex-col gap-3">
        {visibleOptions.map((option, i) => {
          const isSelected = effectiveSelected === option
          return (
            <button
              key={i}
              onClick={() => setSelectedOption(option)}
              className={`w-full text-left px-5 py-4 rounded-xl border-2 font-medium text-sm transition-all duration-150 cursor-pointer ${
                isSelected
                  ? 'border-zinc-900 dark:border-zinc-100 bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900'
                  : 'border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-zinc-700 dark:text-zinc-300 hover:border-zinc-400 dark:hover:border-zinc-600'
              }`}
            >
              {option.text}
            </button>
          )
        })}
      </div>

      {/* Navigation */}
      <div className="flex justify-between items-center">
        <button
          onClick={handleBack}
          className="text-sm text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors cursor-pointer"
        >
          ← {currentSeqIndex === 0 ? 'Back' : 'Previous'}
        </button>
        <button
          onClick={handleNext}
          disabled={!effectiveSelected}
          className={`px-7 py-2.5 rounded-xl font-semibold text-sm transition-all duration-200 cursor-pointer ${
            effectiveSelected
              ? 'bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 hover:bg-zinc-700 dark:hover:bg-zinc-200'
              : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-400 dark:text-zinc-600 cursor-not-allowed'
          }`}
        >
          {isLastQuestion ? 'See my results →' : 'Next →'}
        </button>
      </div>
    </div>
  )
}
