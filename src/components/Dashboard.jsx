'use client'
import { useState } from 'react'
import Link from 'next/link'
import { useGroomStore } from '../store/useGroomStore'
import { SKIN_PROBLEMS, ROUTINES } from '../data/skincare'

const STEP_ICONS = { Cleanse: '🧼', Treat: '💊', Moisturize: '🧴', SPF: '☀️' }

/**
 * Dashboard — shows the user's saved hairstyles and active skin routine.
 * All data is read reactively from the Zustand persistent store.
 */
export default function Dashboard() {
  const savedHairstyles = useGroomStore((state) => state.savedHairstyles)
  const removeHairstyle = useGroomStore((state) => state.removeHairstyle)
  const activeRoutine   = useGroomStore((state) => state.activeRoutine)
  const clearRoutine     = useGroomStore((state) => state.clearRoutine)

  const [routineTab, setRoutineTab] = useState('am')

  const handleRemoveHairstyle = (id) => {
    removeHairstyle(id)
  }

  const handleClearRoutine = () => {
    if (confirm('Clear your active routine?')) {
      clearRoutine()
    }
  }

  const routineSteps = activeRoutine
    ? (activeRoutine.routine?.[routineTab] || ROUTINES[activeRoutine.problemId]?.[routineTab] || [])
    : []
  const routineProblem = activeRoutine
    ? SKIN_PROBLEMS.find(p => p.id === activeRoutine.problemId)
    : null

  const isEmpty = savedHairstyles.length === 0 && !activeRoutine

  return (
    <div className="w-[80vw] mx-auto py-10" style={{ minHeight: '85vh' }}>

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-10">
        <div>
          <h1 className="text-3xl font-bold text-zinc-900 dark:text-zinc-100 tracking-tight">My Dashboard</h1>
          <p className="text-zinc-500 dark:text-zinc-400 mt-1 text-sm">Your saved hairstyles and active skincare routine.</p>
        </div>
        <div className="flex gap-3">
          <Link href="/hair-style" className="px-4 py-2 text-sm font-medium border border-zinc-200 dark:border-zinc-800 hover:border-zinc-400 dark:hover:border-zinc-600 text-zinc-700 dark:text-zinc-300 rounded-lg transition-colors cursor-pointer">
            ↩ Rescan face
          </Link>
          <Link href="/skin-care" className="px-4 py-2 text-sm font-medium border border-zinc-200 dark:border-zinc-800 hover:border-zinc-400 dark:hover:border-zinc-600 text-zinc-700 dark:text-zinc-300 rounded-lg transition-colors cursor-pointer">
            ↩ Retake quiz
          </Link>
        </div>
      </div>

      {/* Empty state */}
      {isEmpty && (
        <div className="flex flex-col items-center justify-center gap-6 py-20 text-center">
          <span className="text-6xl">✨</span>
          <div>
            <p className="text-xl font-semibold text-zinc-900 dark:text-zinc-100">Nothing saved yet</p>
            <p className="text-zinc-500 dark:text-zinc-400 mt-2 text-sm max-w-sm">
              Save hairstyles from the Hairstyle module or build a skin routine to see them here.
            </p>
          </div>
          <div className="flex gap-4">
            <Link href="/hair-style" className="px-5 py-2.5 bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 font-medium rounded-xl text-sm hover:bg-zinc-700 dark:hover:bg-zinc-200 transition-colors">
              Find my hairstyle →
            </Link>
            <Link href="/skin-care" className="px-5 py-2.5 border border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 font-medium rounded-xl text-sm hover:border-zinc-400 dark:hover:border-zinc-600 transition-colors">
              Fix my skin →
            </Link>
          </div>
        </div>
      )}

      <div className="flex flex-col gap-12">

        {/* --- Saved Hairstyles --- */}
        {savedHairstyles.length > 0 && (
          <section>
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">
                Saved Hairstyles <span className="text-zinc-400 dark:text-zinc-500 font-normal text-base ml-1">({savedHairstyles.length})</span>
              </h2>
              <Link href="/hair-style" className="text-sm text-zinc-500 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-white underline underline-offset-4 transition-colors">
                Scan again →
              </Link>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {savedHairstyles.map(style => (
                <div key={style.id} className="relative flex flex-col bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl overflow-hidden shadow-sm">
                  {/* Image area: real image if available, placeholder otherwise */}
                  <div className="bg-zinc-100 dark:bg-zinc-800" style={{ height: '160px' }}>
                    {style.imageUrl ? (
                      <img
                        src={style.imageUrl}
                        alt={style.name}
                        className="w-full h-full object-cover"
                        onError={(e) => { e.currentTarget.style.display = 'none' }}
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-zinc-100 to-zinc-200 dark:from-zinc-800 dark:to-zinc-900">
                        <span className="text-3xl opacity-50">✂️</span>
                      </div>
                    )}
                  </div>
                  <div className="p-3 flex flex-col gap-2">
                    <p className="font-semibold text-sm text-zinc-900 dark:text-zinc-100">{style.name}</p>
                    <div className="flex gap-1 flex-wrap">
                      {(style.compatibleFaceShapes || []).map(s => (
                        <span key={s} className="text-xs px-1.5 py-0.5 bg-zinc-100 dark:bg-zinc-800 text-zinc-500 dark:text-zinc-400 rounded-full">{s}</span>
                      ))}
                    </div>
                    <button
                      onClick={() => handleRemoveHairstyle(style.id)}
                      className="text-xs text-red-400 hover:text-red-600 cursor-pointer mt-1 text-left transition-colors"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* --- Active Routine --- */}
        {activeRoutine && routineProblem && (
          <section>
            <div className="flex items-center justify-between mb-5">
              <div>
                <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">Active Routine</h2>
                <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-0.5">
                  {routineProblem.icon} {activeRoutine.routineLabel ?? activeRoutine.problemName ?? routineProblem.name}
                  {activeRoutine.savedAt && (
                    <span className="ml-2 text-zinc-400 dark:text-zinc-500">· saved {new Date(activeRoutine.savedAt).toLocaleDateString()}</span>
                  )}
                </p>
              </div>
              <div className="flex gap-3 items-center">
                <Link href="/skin-care" className="text-sm text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white underline underline-offset-4 transition-colors">
                  Retake quiz →
                </Link>
                <button onClick={handleClearRoutine} className="text-sm text-red-400 hover:text-red-600 cursor-pointer transition-colors">
                  Clear
                </button>
              </div>
            </div>

            {/* AM/PM tabs */}
            <div className="flex gap-1 p-1 bg-zinc-100 dark:bg-zinc-800 rounded-xl w-fit mb-5">
              {['am', 'pm'].map(tab => (
                <button
                  key={tab}
                  onClick={() => setRoutineTab(tab)}
                  className={`px-5 py-2 rounded-lg text-sm font-semibold transition-all duration-200 cursor-pointer ${
                    routineTab === tab
                      ? 'bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 shadow-sm'
                      : 'text-zinc-500 dark:text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200'
                  }`}
                >
                  {tab === 'am' ? '🌅 Morning' : '🌙 Evening'}
                </button>
              ))}
            </div>

            {/* Routine steps */}
            <div className="flex flex-col gap-3 max-w-2xl">
              {routineSteps.map((step, i) => (
                <div key={i} className="flex gap-4 p-4 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl items-start">
                  <div className="w-7 h-7 bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0">{i + 1}</div>
                  <div>
                    <div className="flex items-center gap-1.5 mb-0.5">
                      <span>{STEP_ICONS[step.step] || '✦'}</span>
                      <span className="text-xs font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wide">{step.step}</span>
                    </div>
                    <p className="font-medium text-zinc-900 dark:text-zinc-100 text-sm">{step.product}</p>
                    <p className="text-xs text-zinc-400 dark:text-zinc-500 mt-0.5">{step.why}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  )
}

