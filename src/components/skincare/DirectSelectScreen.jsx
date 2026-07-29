'use client'
import { useState } from 'react'
import { SKIN_PROBLEMS } from '../../data/skincare'
import TypeSelectScreen from './TypeSelectScreen'

/**
 * DirectSelectScreen — the "I already know my issue" path
 * First, the user selects their skin type. Then, they are presented with a flattened
 * concern card grid of exactly 14 concerns.
 *
 * Props:
 *   onSelect — callback(quizResult)
 *   onBack   — callback() to return to entry
 */
export default function DirectSelectScreen({ onSelect, onBack }) {
  const [selectedType, setSelectedType] = useState(null)

  // Build a minimal quizResult from a direct selection.
  // The confidence is always 'high' since the user is explicitly stating their concern.
  const makeResult = ({ concernId = null, medicalReferral = false }) => ({
    skinType: {
      primary: selectedType?.primary ?? 'normal',
      modifier: null,
      confidence: 'high',
    },
    concerns: concernId
      ? [{ id: concernId, confidence: 'high', medicalReferral }]
      : [],
    lowSignalConcern: concernId === null,
  })

  // Step 1: Skin type self-selection
  if (selectedType === null) {
    return (
      <TypeSelectScreen
        onSelect={(typeResult) => setSelectedType(typeResult)}
        onBack={onBack}
      />
    )
  }

  // Step 2: 14 flattened concern cards
  const topLevelCards = [
    {
      key: 'comedonal_acne',
      icon: '⚫',
      name: 'Blackheads & Whiteheads',
      description: 'Small blackheads or closed whiteheads on the surface — no pain, no depth.',
      action: () => onSelect(makeResult({ concernId: 'comedonal_acne', medicalReferral: false })),
      medicalReferral: false,
    },
    {
      key: 'pustular_acne',
      icon: '🔴',
      name: 'Acne',
      description: 'Red bumps with a visible white or yellow center — usually not very painful.',
      action: () => onSelect(makeResult({ concernId: 'pustular_acne', medicalReferral: false })),
      medicalReferral: false,
    },
    {
      key: 'cystic_acne',
      icon: '🔴',
      name: 'Deep, Painful Breakouts',
      description: 'Deep, painful lumps under the skin that ache and take weeks to resolve.',
      action: () => onSelect(makeResult({ concernId: 'cystic_acne', medicalReferral: true })),
      medicalReferral: true,
    },
    {
      key: 'razor_bumps',
      icon: '🪒',
      name: 'Razor Bumps',
      description: 'Red, irritated bumps or ingrown hairs that appear mostly where you shave.',
      action: () => onSelect(makeResult({ concernId: 'razor_bumps', medicalReferral: false })),
      medicalReferral: false,
    },
    {
      key: 'pie',
      icon: '🌸',
      name: 'Red/Pink Marks After Pimples',
      description: 'Flat, red or pink marks left behind after pimples heal — not a raised scar.',
      action: () => onSelect(makeResult({ concernId: 'pie', medicalReferral: false })),
      medicalReferral: false,
    },
    {
      key: 'pih',
      icon: '🌑',
      name: 'Dark Spots / Hyperpigmentation',
      description: 'Flat, dark brown or grayish marks left after pimples — more visible on deeper skin tones.',
      action: () => onSelect(makeResult({ concernId: 'pih', medicalReferral: false })),
      medicalReferral: false,
    },
    {
      key: 'atrophic_scarring',
      icon: '🕳️',
      name: 'Acne Scars',
      description: 'Physical dents, pits, or small craters in the skin from previous breakouts.',
      action: () => onSelect(makeResult({ concernId: 'atrophic_scarring', medicalReferral: false })),
      medicalReferral: false,
    },
    {
      key: 'seborrheic_dermatitis',
      icon: '🍂',
      name: 'Flaky, Greasy Patches',
      description: 'Greasy or yellowish flakes around the nose, eyebrows, or in the beard — often with redness.',
      action: () => onSelect(makeResult({ concernId: 'seborrheic_dermatitis', medicalReferral: true })),
      medicalReferral: true,
    },
    {
      key: 'sensitive_reactive',
      icon: '🌿',
      name: 'Sensitive Skin',
      description: 'Skin stings, burns, or turns red easily — even from basic face washes or sweat.',
      action: () => onSelect(makeResult({ concernId: 'sensitive_reactive', medicalReferral: false })),
      medicalReferral: false,
    },
    {
      key: 'shaving_irritation',
      icon: '🔥',
      name: 'Razor Burn',
      description: 'Redness, stinging, or tightness on the neck and jaw right after shaving.',
      action: () => onSelect(makeResult({ concernId: 'shaving_irritation', medicalReferral: false })),
      medicalReferral: false,
    },
    {
      key: 'congestion_prone',
      icon: '🚧',
      name: 'Clogged Pores',
      description: 'Face lotions and sunscreens feel immediately greasy and seem to block pores.',
      action: () => onSelect(makeResult({ concernId: 'congestion_prone', medicalReferral: false })),
      medicalReferral: false,
    },
    {
      key: 'dark_circles',
      icon: '👁️',
      name: 'Dark Circles',
      description: 'The skin under your eyes looks darker than the rest of your face, often more noticeable when tired.',
      action: () => onSelect(makeResult({ concernId: 'dark_circles', medicalReferral: false })),
      medicalReferral: false,
    },
    {
      key: 'large_pores',
      icon: '🔬',
      name: 'Large Pores',
      description: 'Pores that are more visible than average, especially on the nose and cheeks — usually genetic and tied to oil production.',
      action: () => onSelect(makeResult({ concernId: 'large_pores', medicalReferral: false })),
      medicalReferral: false,
    },
    {
      key: 'dullness',
      icon: '🌫️',
      name: 'Dullness',
      description: 'Skin that looks flat, tired, or lacking its natural glow, even without a specific breakout or mark.',
      action: () => onSelect(makeResult({ concernId: 'dullness', medicalReferral: false })),
      medicalReferral: false,
    },
  ]

  return (
    <div className="w-full flex flex-col gap-8">

      {/* Header */}
      <div>
        <button
          onClick={() => setSelectedType(null)}
          className="text-sm text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors cursor-pointer mb-3"
        >
          ← Back to skin type
        </button>
        <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">What's your main skin concern?</h2>
        <p className="text-zinc-500 dark:text-zinc-400 mt-1.5 text-sm">
          Pick the one that describes your skin best right now. Not sure? The quiz is more accurate.
        </p>
      </div>

      {/* Problem grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {topLevelCards.map(card => (
          <button
            key={card.key}
            onClick={card.action}
            className="group flex flex-col gap-3 p-6 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl text-left hover:border-zinc-900 dark:hover:border-zinc-500 hover:shadow-md transition-all duration-200 cursor-pointer"
          >
            <span className="text-3xl">{card.icon}</span>
            <div className="flex-1">
              <div className="flex items-start gap-2 flex-wrap mb-1">
                <h3 className="font-bold text-zinc-900 dark:text-zinc-100">{card.name}</h3>
                {card.medicalReferral && (
                  <span className="inline-flex items-center px-1.5 py-0.5 rounded-full text-xs font-medium bg-amber-100 dark:bg-amber-950/40 text-amber-700 dark:text-amber-400 border border-amber-200 dark:border-amber-900/40 flex-shrink-0">
                    👨‍⚕️
                  </span>
                )}
              </div>
              <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">{card.description}</p>
            </div>
            <span className="text-sm text-zinc-400 dark:text-zinc-500 group-hover:text-zinc-900 dark:group-hover:text-white transition-colors font-medium">
              Get recommendations →
            </span>
          </button>
        ))}
      </div>
    </div>
  )
}
