'use client'
import { useState } from 'react'
import { SHAVING_GATE, QUIZ_QUESTIONS, computeQuizResult } from '../../data/skincare'

/**
 * QuizScreen — shaving gate + branching 7-question quiz (Q2 conditionally skipped)
 *
 * State model:
 *   gateAnswer        — 'yes' | 'no' | null; null = gate not yet answered
 *   questionSequence  — ordered list of question IDs the user will actually see
 *                       (Q2 removed if Q1 "rarely/never"; razor_bumps option removed if gate='no')
 *   currentSeqIndex   — position within questionSequence (0-based)
 *   answers           — map of { questionId → selected option object }
 *   q2Skipped         — true when Q1 "rarely/never" was chosen
 *
 * Props:
 *   onComplete — callback(quizResult)
 *   onBack     — callback() to return to entry screen
 */
export default function QuizScreen({ onComplete, onBack }) {
  // ── Shaving gate state ────────────────────────────────────────────────────
  const [gateAnswer, setGateAnswer]         = useState(null)  // null | 'yes' | 'no'
  const [gateSelected, setGateSelected]     = useState(null)  // highlighted option before confirm

  // ── Quiz state ────────────────────────────────────────────────────────────
  const [questionSequence, setQuestionSequence] = useState(
    QUIZ_QUESTIONS.map(q => q.id)
  )
  const [currentSeqIndex, setCurrentSeqIndex] = useState(0)
  const [answers, setAnswers]                  = useState({})
  const [q2Skipped, setQ2Skipped]              = useState(false)
  const [selectedOption, setSelectedOption]    = useState(null)

  // ── Gate confirmation ─────────────────────────────────────────────────────
  const handleGateConfirm = () => {
    if (!gateSelected) return
    setGateAnswer(gateSelected.value)
    setGateSelected(null)
  }

  // ── Compute visible options for Q1 (filter razor_bumps for non-shavers) ──
  const getVisibleOptions = (question) => {
    if (question.id !== 'q1') return question.options
    if (gateAnswer === 'no') return question.options.filter(o => !o.requiresShaving)
    return question.options
  }

  // ── Derive current question ───────────────────────────────────────────────
  const currentQuestionId = questionSequence[currentSeqIndex]
  const currentQuestion   = QUIZ_QUESTIONS.find(q => q.id === currentQuestionId)
  const visibleOptions    = currentQuestion ? getVisibleOptions(currentQuestion) : []

  const totalQuestions = questionSequence.length
  const isLastQuestion = currentSeqIndex === totalQuestions - 1
  const progressPct    = (currentSeqIndex / totalQuestions) * 100

  const restoredAnswer    = answers[currentQuestionId] ?? null
  const effectiveSelected = selectedOption ?? restoredAnswer

  // ── Handlers ──────────────────────────────────────────────────────────────
  const handleOptionClick = (option) => setSelectedOption(option)

  const handleNext = () => {
    if (!effectiveSelected) return

    const newAnswers = { ...answers, [currentQuestionId]: effectiveSelected }
    setAnswers(newAnswers)

    if (currentQuestionId === 'q1') {
      const shouldSkipQ2 = effectiveSelected.skipNextQuestion === true
      setQ2Skipped(shouldSkipQ2)
      if (shouldSkipQ2) {
        setQuestionSequence(QUIZ_QUESTIONS.map(q => q.id).filter(id => id !== 'q2'))
      } else {
        setQuestionSequence(QUIZ_QUESTIONS.map(q => q.id))
      }
    }

    if (isLastQuestion) {
      const orderedAnswers = questionSequence
        .map(id => newAnswers[id])
        .filter(Boolean)
      onComplete(computeQuizResult(orderedAnswers, q2Skipped))
    } else {
      setCurrentSeqIndex(prev => prev + 1)
      setSelectedOption(null)
    }
  }

  const handleBack = () => {
    if (currentSeqIndex === 0) {
      // Back from Q1 goes to gate
      setGateAnswer(null)
      setGateSelected(null)
    } else {
      setCurrentSeqIndex(prev => prev - 1)
      setSelectedOption(null)
    }
  }

  // ── Render: gate screen ───────────────────────────────────────────────────
  if (gateAnswer === null) {
    return (
      <div className="w-full max-w-xl mx-auto flex flex-col gap-8">
        {/* Gate progress (shown as step 0 of N, denominator shown once gate is done) */}
        <div className="flex flex-col gap-2">
          <div className="flex justify-between text-xs text-zinc-400 dark:text-zinc-500">
            <span>Before we start</span>
            <button onClick={onBack} className="hover:text-zinc-700 dark:hover:text-zinc-350 cursor-pointer transition-colors">✕ Exit quiz</button>
          </div>
          <div className="w-full bg-zinc-100 dark:bg-zinc-800 rounded-full h-1.5 overflow-hidden">
            <div className="h-full bg-zinc-900 dark:bg-zinc-100 rounded-full w-0" />
          </div>
        </div>

        <div>
          <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100 leading-snug">
            {SHAVING_GATE.question}
          </h2>
          <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">
            This helps us show only options that apply to you.
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

  // ── Render: quiz question ─────────────────────────────────────────────────
  if (!currentQuestion) return null

  return (
    <div className="w-full max-w-xl mx-auto flex flex-col gap-8">

      {/* Progress bar + step counter */}
      <div className="flex flex-col gap-2">
        <div className="flex justify-between text-xs text-zinc-400 dark:text-zinc-500">
          <span>Question {currentSeqIndex + 1} of {totalQuestions}</span>
          <button onClick={onBack} className="hover:text-zinc-700 dark:hover:text-zinc-350 cursor-pointer transition-colors">✕ Exit quiz</button>
        </div>
        <div className="w-full bg-zinc-100 dark:bg-zinc-800 rounded-full h-1.5 overflow-hidden">
          <div
            className="h-full bg-zinc-900 dark:bg-zinc-100 rounded-full transition-all duration-500"
            style={{ width: `${progressPct}%` }}
          />
        </div>
      </div>

      {/* Question */}
      <div>
        <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100 leading-snug">
          {currentQuestion.question}
        </h2>
      </div>

      {/* Answer options */}
      <div className="flex flex-col gap-3">
        {visibleOptions.map((option, i) => {
          const isSelected = effectiveSelected === option
          return (
            <button
              key={i}
              onClick={() => handleOptionClick(option)}
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
