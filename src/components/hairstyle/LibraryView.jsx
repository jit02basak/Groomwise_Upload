'use client'
import { useState } from 'react'
import { hairstyles, HAIR_TYPES, THICKNESS_OPTIONS, filterLibrary } from '../../data/hairstyles'
import HairstyleCard from './HairstyleCard'

/**
 * LibraryView — full browsable hairstyle catalog (all 89 styles, all tiers).
 * Supports free-text search + hairType + thickness filters (AND logic).
 *
 * Props:
 *   onBack — callback() to return to the results screen (optional)
 */
export default function LibraryView({ onBack }) {
  // Filter state
  const [search, setSearch]                   = useState('')
  const [selectedHairType, setSelectedHairType] = useState('')
  const [selectedThickness, setSelectedThickness] = useState('')

  // Apply active filters
  const filtered = filterLibrary({
    search:    search || null,
    hairType:  selectedHairType  || null,
    thickness: selectedThickness || null,
  })

  const clearFilters = () => {
    setSearch('')
    setSelectedHairType('')
    setSelectedThickness('')
  }

  const hasFilters = search || selectedHairType || selectedThickness

  return (
    <div className="w-full flex flex-col gap-6">

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center gap-4">
        <div className="flex-1">
          {onBack && (
            <button
              onClick={onBack}
              className="text-sm text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors duration-200 cursor-pointer mb-2 w-fit text-left"
            >
              ← Back to my results
            </button>
          )}
          <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">Hairstyle Library</h2>
          <p className="text-zinc-500 dark:text-zinc-400 text-sm mt-1">
            {filtered.length} of {hairstyles.length} styles shown
          </p>
        </div>

        {/* Filter controls */}
        <div className="flex flex-wrap gap-3 items-center">
          {/* Search box */}
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search styles..."
            className="px-3 py-2 text-sm border border-zinc-200 dark:border-zinc-800 rounded-lg bg-white dark:bg-zinc-900 text-zinc-700 dark:text-zinc-300 focus:outline-none focus:border-zinc-400 dark:focus:border-zinc-600 placeholder-zinc-400 dark:placeholder-zinc-600 w-44"
          />

          {/* Hair type filter */}
          <select
            value={selectedHairType}
            onChange={e => setSelectedHairType(e.target.value)}
            className="px-3 py-2 text-sm border border-zinc-200 dark:border-zinc-800 rounded-lg bg-white dark:bg-zinc-900 text-zinc-700 dark:text-zinc-300 focus:outline-none focus:border-zinc-400 dark:focus:border-zinc-600 cursor-pointer"
          >
            <option value="">All hair types</option>
            {HAIR_TYPES.map(t => (
              <option key={t.id} value={t.id}>{t.label}</option>
            ))}
          </select>

          {/* Thickness filter */}
          <select
            value={selectedThickness}
            onChange={e => setSelectedThickness(e.target.value)}
            className="px-3 py-2 text-sm border border-zinc-200 dark:border-zinc-800 rounded-lg bg-white dark:bg-zinc-900 text-zinc-700 dark:text-zinc-300 focus:outline-none focus:border-zinc-400 dark:focus:border-zinc-600 cursor-pointer"
          >
            <option value="">All thicknesses</option>
            {THICKNESS_OPTIONS.map(t => (
              <option key={t.id} value={t.id}>{t.label}</option>
            ))}
          </select>

          {/* Clear filters */}
          {hasFilters && (
            <button
              onClick={clearFilters}
              className="text-sm text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white underline underline-offset-4 cursor-pointer transition-colors"
            >
              Clear
            </button>
          )}
        </div>
      </div>

      {/* Catalog grid */}
      {filtered.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {filtered.map(style => (
            <HairstyleCard key={style.id} hairstyle={style} compact />
          ))}
        </div>
      ) : (
        <div className="py-16 flex flex-col items-center gap-3 text-zinc-400 dark:text-zinc-500">
          <span className="text-4xl">🔍</span>
          <p className="font-medium">No styles match these filters</p>
          <button onClick={clearFilters} className="text-sm underline underline-offset-4 cursor-pointer hover:text-zinc-700 dark:hover:text-zinc-300">
            Clear filters
          </button>
        </div>
      )}
    </div>
  )
}
