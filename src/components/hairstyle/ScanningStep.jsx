'use client'
import { useEffect, useState } from 'react'

// Scanning messages cycle through to give the impression of real analysis
const SCAN_MESSAGES = [
  'Loading face landmark model...',
  'Detecting facial features...',
  'Measuring jaw width ratio...',
  'Measuring cheekbone width...',
  'Computing forehead proportions...',
  'Calculating face length...',
  'Classifying face shape...',
  'Matching to hairstyle database...',
]

/**
 * ScanningStep — shown between photo upload and results.
 * Displays an animated face scan visual + cycling status messages.
 * No props required — this is a pure visual loading state.
 */
export default function ScanningStep() {
  const [messageIndex, setMessageIndex] = useState(0)
  const [progress, setProgress] = useState(0)

  // Cycle through scan messages every 300ms
  useEffect(() => {
    const msgInterval = setInterval(() => {
      setMessageIndex(prev => (prev + 1) % SCAN_MESSAGES.length)
    }, 300)
    // Progress bar advances steadily over 2.4 seconds
    const progInterval = setInterval(() => {
      setProgress(prev => Math.min(prev + 4, 95))
    }, 95)
    return () => { clearInterval(msgInterval); clearInterval(progInterval) }
  }, [])

  return (
    <div className="w-full flex flex-col items-center justify-center gap-10 py-16">

      {/* --- Face scan animation --- */}
      <div className="relative flex items-center justify-center" style={{ width: '220px', height: '280px' }}>
        {/* Face outline */}
        <svg viewBox="0 0 200 260" className="absolute inset-0 w-full h-full" style={{ zIndex: 1 }}>
          {/* Outer glow ring */}
          <ellipse cx="100" cy="130" rx="88" ry="112" fill="none" stroke="#e4e4e7" className="stroke-zinc-200 dark:stroke-zinc-800" strokeWidth="1.5" />
          {/* Main face outline */}
          <ellipse cx="100" cy="130" rx="76" ry="100" fill="none" stroke="#0F131F" className="stroke-zinc-900 dark:stroke-zinc-300 animate-pulse" strokeWidth="2.5" strokeDasharray="6 3" />
          {/* Landmark dots */}
          {[
            [100, 30], [100, 230], [24, 130], [176, 130],  // outer
            [100, 95], [75, 108], [125, 108],               // forehead/brow
            [70, 140], [130, 140],                          // cheekbones
            [100, 170], [83, 192], [117, 192],              // jaw
          ].map(([cx, cy], i) => (
            <circle key={i} cx={cx} cy={cy} r="3" fill="#0F131F" className="fill-zinc-900 dark:fill-zinc-300 animate-pulse" opacity="0.7" style={{ animationDelay: `${i * 0.12}s` }} />
          ))}
        </svg>

        {/* Horizontal scan line animation */}
        <div
          className="absolute left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-[#0F131F] dark:via-zinc-300 to-transparent opacity-80"
          style={{
            top: '50%',
            animation: 'scanLine 1.4s ease-in-out infinite',
            zIndex: 2,
          }}
        />

        {/* CSS keyframe for the scan line */}
        <style>{`
          @keyframes scanLine {
            0%   { transform: translateY(-110px); opacity: 0; }
            15%  { opacity: 0.9; }
            85%  { opacity: 0.9; }
            100% { transform: translateY(110px); opacity: 0; }
          }
        `}</style>
      </div>

      {/* Progress bar */}
      <div className="w-full max-w-sm flex flex-col gap-2">
        <div className="w-full bg-zinc-100 dark:bg-zinc-800 rounded-full h-1.5 overflow-hidden">
          <div
            className="h-full bg-[#0F131F] dark:bg-zinc-100 rounded-full transition-all duration-100"
            style={{ width: `${progress}%` }}
          />
        </div>
        {/* Status message */}
        <p className="text-sm text-zinc-500 dark:text-zinc-400 text-center font-mono min-h-5">{SCAN_MESSAGES[messageIndex]}</p>
      </div>

      <div className="text-center">
        <p className="font-semibold text-zinc-900 dark:text-zinc-100">Analyzing your face shape</p>
        <p className="text-sm text-zinc-400 dark:text-zinc-500 mt-1">This takes about 2 seconds · runs on your device</p>
      </div>
    </div>
  )
}
