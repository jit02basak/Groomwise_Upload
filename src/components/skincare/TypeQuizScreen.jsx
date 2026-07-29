'use client'
import { useState } from 'react'
import { TYPE_QUIZ_QUESTIONS, computeTypeQuizResult } from '../../data/skincare'

/**
 * TypeQuizScreen — Quiz A: Skin Type Identification (6 questions, no gate, no skip logic)
 *
 * Props:
 *   onComplete — callback({ primary, confidence }) with the resolved type
 *   onBack     — callback() to go back
 */
export default function TypeQuizScreen({ onComplete, onBack }) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [answers, setAnswers]           = useState([])
  const [selectedOption, setSelectedOption] = useState(null)

  const totalQuestions  = TYPE_QUIZ_QUESTIONS.length
  const currentQuestion = TYPE_QUIZ_QUESTIONS[currentIndex]
  const isLastQuestion  = currentIndex === totalQuestions - 1
  const progressPct     = (currentIndex / totalQuestions) * 100

  // Restore previous selection when navigating back
  const restoredAnswer    = answers[currentIndex] ?? null
  const effectiveSelected = selectedOption ?? restoredAnswer

  const handleNext = () => {
    if (!effectiveSelected) return
    const newAnswers = [...answers]
    newAnswers[currentIndex] = effectiveSelected

    if (isLastQuestion) {
      onComplete(computeTypeQuizResult(newAnswers))
    } else {
      setAnswers(newAnswers)
      setCurrentIndex(prev => prev + 1)
      setSelectedOption(null)
    }
  }

  const handleBack = () => {
    if (currentIndex === 0) {
      onBack()
    } else {
      setCurrentIndex(prev => prev - 1)
      setSelectedOption(null)
    }
  }

  if (!currentQuestion) return null

  return (
    <div className="w-full max-w-xl mx-auto flex flex-col gap-8">

      {/* Progress */}
      <div className="flex flex-col gap-2">
        <div className="flex justify-between text-xs text-zinc-400 dark:text-zinc-500">
          <span>
            <span className="text-zinc-600 dark:text-zinc-300 font-medium">Skin type quiz</span>
            {' '}— Question {currentIndex + 1} of {totalQuestions}
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
          Step 1 of 2 — Type
        </span>
        <span className="text-xs text-zinc-400 dark:text-zinc-500">Concern questions come next</span>
      </div>

      {/* Question */}
      <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100 leading-snug">
        {currentQuestion.question}
      </h2>

      {/* Options */}
      <div className="flex flex-col gap-3">
        {currentQuestion.options.map((option, i) => {
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
          ← {currentIndex === 0 ? 'Back' : 'Previous'}
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
          {isLastQuestion ? 'Continue →' : 'Next →'}
        </button>
      </div>
    </div>
  )
}
