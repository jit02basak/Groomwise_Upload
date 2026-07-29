'use client'
import { useRef, useState, useEffect } from 'react'

/**
 * UploadStep — Step 1 of the Hairstyle module
 *
 * Lets the user upload 1–3 photos or use their camera.
 * Shows a face-outline guide overlay and validation hint.
 * Supports multi-shot (Part 3): up to 3 images accumulated, thumbnailed,
 * and removable. A per-shot retake prompt highlights exactly which photo
 * failed the quality gate rather than showing a generic error.
 *
 * Device-aware camera button (Part 4):
 *   - Mobile: "Use camera" triggers native camera app via capture="user" input.
 *   - Desktop: "Use camera" renders visually disabled; clicking shows a small
 *     tooltip explaining it's mobile-only. No getUserMedia used.
 *
 * Props:
 *   images           — current selected image data URL array ([] if none)
 *   onImagesChange   — callback(dataUrls[]) when user adds or removes an image
 *   onScan           — callback() when user clicks "Analyze face"
 *   scanError        — string error code from last scan attempt, or null
 *   failedFrameIndex — zero-based index of the shot that failed quality gating,
 *                      or null if not a per-shot failure
 */
export default function UploadStep({ images = [], onImagesChange, onScan, scanError, failedFrameIndex }) {
  const fileInputRef   = useRef(null)
  const cameraInputRef = useRef(null)

  const [hasError,          setHasError]          = useState(false)
  // 'file' | 'camera' — whichever input method was last used this session
  const [lastInputMode,     setLastInputMode]     = useState('file')
  // Controls the desktop-only "camera unavailable" tooltip
  const [showCameraTooltip, setShowCameraTooltip] = useState(false)
  // Whether the current device is mobile (UA-based, set once on mount)
  const [isMobileDevice,    setIsMobileDevice]    = useState(false)

  const MAX_SHOTS = 3

  // ── Device detection ───────────────────────────────────────────────────────
  // Resolved once on mount via navigator.userAgentData (Chromium) or UA string
  // regex fallback. Does NOT use viewport/screen size — that's unreliable.
  useEffect(() => {
    let mobile = false
    try {
      if (navigator.userAgentData) {
        // Chromium-based browsers expose a reliable boolean
        mobile = navigator.userAgentData.mobile === true
      } else {
        // Safari, Firefox, older browsers: UA string regex for Android/iOS/iPadOS
        mobile = /android|iphone|ipad|ipod|mobile/i.test(navigator.userAgent)
      }
    } catch {
      // On any unexpected error, fall through to desktop behaviour
      mobile = false
    }
    setIsMobileDevice(mobile)
  }, [])

  // ── Tooltip auto-dismiss (desktop only) ───────────────────────────────────
  useEffect(() => {
    if (!showCameraTooltip) return
    const timer = setTimeout(() => setShowCameraTooltip(false), 4000)
    return () => clearTimeout(timer)
  }, [showCameraTooltip])

  // ── File → data URL conversion ─────────────────────────────────────────────
  // Converts the selected File(s) to data URL strings, then passes full array up.
  // Both the file-picker input and camera-capture input share this same handler,
  // so captured photos flow through the same quality gates and thumbnail strip.
  const handleFileChange = (e) => {
    const files = Array.from(e.target.files || [])
    if (!files.length) return
    setHasError(false)
    // Allow adding up to MAX_SHOTS total
    const remaining = MAX_SHOTS - images.length
    const filesToAdd = files.slice(0, remaining)
    const newUrls = []
    let loaded = 0
    filesToAdd.forEach((file, i) => {
      const reader = new FileReader()
      reader.onload = (evt) => {
        newUrls[i] = evt.target.result
        loaded++
        if (loaded === filesToAdd.length) {
          onImagesChange([...images, ...newUrls.filter(Boolean)])
        }
      }
      reader.readAsDataURL(file)
    })
    // Reset input so the same file can be re-selected after removal
    e.target.value = ''
  }

  const handleRemoveImage = (idx) => {
    const next = images.filter((_, i) => i !== idx)
    onImagesChange(next)
    setHasError(false)
  }

  const handleScanClick = () => {
    if (!images.length) {
      setHasError(true)
      return
    }
    onScan()
  }

  // ── Input triggers ─────────────────────────────────────────────────────────
  const triggerFileInput = () => {
    setLastInputMode('file')
    fileInputRef.current?.click()
  }

  const triggerCameraInput = () => {
    if (!isMobileDevice) {
      // Desktop: show informational tooltip instead of attempting any input
      setShowCameraTooltip(true)
      return
    }
    setLastInputMode('camera')
    cameraInputRef.current?.click()
  }

  /**
   * Reopens whichever input method the user last used, so shot 2/3 feels
   * consistent with how shot 1 was captured (camera stays camera, gallery stays gallery).
   */
  const triggerAddAnother = () => {
    if (isMobileDevice && lastInputMode === 'camera') {
      cameraInputRef.current?.click()
    } else {
      fileInputRef.current?.click()
    }
  }

  // Determine the human-readable message for a given quality-gate error code,
  // optionally scoped to a specific shot number (1-based) in multi-shot mode.
  function getErrorMessage(code, shotNumber = null) {
    const shotPrefix = shotNumber != null && images.length > 1 ? `Photo ${shotNumber + 1}: ` : ''
    switch (code) {
      case 'lighting':
        return `${shotPrefix}That photo's too dark or too bright — try somewhere with more even lighting.`
      case 'occluded':
        return `${shotPrefix}We couldn't see your jawline clearly — try pulling your hair back and ensuring your full face is visible.`
      case 'extreme-angle':
      case 'pose':
        return `${shotPrefix}We couldn't read your face shape clearly. Please use a front-facing, well-lit photo with no tilts or side angles.`
      case 'no-face':
        return `${shotPrefix}We couldn't detect a face in your photo. Please try a clearer, closer photo with good lighting.`
      case 'technical':
        return null // handled separately (red banner)
      default:
        return `${shotPrefix}We couldn't read your face shape clearly. Please try again with a clearer photo.`
    }
  }

  // Whether a given thumbnail index is the one that failed
  const isFailedShot = (idx) =>
    scanError && failedFrameIndex != null && failedFrameIndex === idx

  const canAddMore = images.length < MAX_SHOTS
  const mainPreviewImage = images[0] ?? null

  return (
    <div className="w-full flex flex-col gap-8">
      {/* Page header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">Find Your Face Shape</h1>
        <p className="text-zinc-500 dark:text-zinc-400 mt-2">Upload a front-facing photo and our AI will match you with the right hairstyles.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">

        {/* --- Left: Upload area --- */}
        <div className="flex flex-col gap-4">
          {/* Drop zone / preview */}
          <div
            className="relative border-2 border-dashed border-zinc-300 dark:border-zinc-800 hover:border-zinc-500 dark:hover:border-zinc-700 rounded-2xl overflow-hidden bg-zinc-50 dark:bg-zinc-900/40 transition-colors duration-200 flex items-center justify-center cursor-pointer"
            style={{ minHeight: '320px' }}
            onClick={() => !mainPreviewImage && triggerFileInput()}
          >
            {mainPreviewImage ? (
              <>
                {/* Main image preview */}
                <img
                  src={mainPreviewImage}
                  alt="Your uploaded photo"
                  className="w-full h-full object-cover"
                  style={{ maxHeight: '380px' }}
                />
                {/* Face-outline framing guide overlay */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <svg viewBox="0 0 200 260" className="w-32 h-44 opacity-60">
                    <ellipse
                      cx="100" cy="130" rx="80" ry="105"
                      fill="none"
                      stroke="white"
                      strokeWidth="3"
                      strokeDasharray="8 5"
                    />
                    {/* Alignment corners */}
                    <line x1="100" y1="25" x2="100" y2="38" stroke="white" strokeWidth="2" opacity="0.8"/>
                    <line x1="100" y1="222" x2="100" y2="235" stroke="white" strokeWidth="2" opacity="0.8"/>
                    <line x1="20" y1="130" x2="33" y2="130" stroke="white" strokeWidth="2" opacity="0.8"/>
                    <line x1="167" y1="130" x2="180" y2="130" stroke="white" strokeWidth="2" opacity="0.8"/>
                  </svg>
                </div>
              </>
            ) : (
              /* Upload prompt */
              <div className="flex flex-col items-center justify-center py-12 px-6 text-center gap-3">
                <div className="w-16 h-16 bg-zinc-200 dark:bg-zinc-800 rounded-full flex items-center justify-center text-3xl">📷</div>
                <p className="font-semibold text-zinc-700 dark:text-zinc-300">Click to upload a photo</p>
                <p className="text-sm text-zinc-400 dark:text-zinc-550">JPG, PNG or WEBP · front-facing, good lighting</p>
              </div>
            )}
          </div>

          {/* Multi-shot thumbnail strip (shown when 2+ images selected) */}
          {images.length > 1 && (
            <div className="flex flex-col gap-2">
              <p className="text-xs text-zinc-500 dark:text-zinc-400 font-medium">
                {images.length} photo{images.length > 1 ? 's' : ''} — results will be averaged for accuracy
              </p>
              <div className="flex gap-2 flex-wrap">
                {images.map((img, idx) => (
                  <div
                    key={idx}
                    className={`relative group rounded-xl overflow-hidden border-2 transition-colors ${
                      isFailedShot(idx)
                        ? 'border-red-500 dark:border-red-400'
                        : 'border-zinc-200 dark:border-zinc-700'
                    }`}
                    style={{ width: '72px', height: '72px', flexShrink: 0 }}
                  >
                    <img src={img} alt={`Photo ${idx + 1}`} className="w-full h-full object-cover" />
                    {/* Failed-shot indicator badge */}
                    {isFailedShot(idx) && (
                      <div className="absolute inset-0 bg-red-500/30 flex items-center justify-center">
                        <span className="text-white text-xl">⚠️</span>
                      </div>
                    )}
                    {/* Remove button (appears on hover) */}
                    <button
                      onClick={(e) => { e.stopPropagation(); handleRemoveImage(idx) }}
                      className="absolute top-0.5 right-0.5 w-5 h-5 bg-zinc-900/80 text-white rounded-full text-xs flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer leading-none"
                      title={`Remove photo ${idx + 1}`}
                    >
                      ×
                    </button>
                    {/* Shot number label */}
                    <div className="absolute bottom-0.5 left-0.5 text-xs font-mono bg-zinc-900/60 text-white px-1 rounded leading-4">
                      {idx + 1}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Quality-gate error banners — per-shot or generic */}
          {scanError === 'technical' ? (
            <div className="flex items-start gap-3 p-3 rounded-xl bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800 text-sm text-red-800 dark:text-red-300">
              <span className="text-base flex-shrink-0 mt-0.5">❌</span>
              <span>Something went wrong loading the face model. Check your internet connection and try again.</span>
            </div>
          ) : scanError ? (
            <div className="flex items-start gap-3 p-3 rounded-xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 text-sm text-amber-800 dark:text-amber-300">
              <span className="text-base flex-shrink-0 mt-0.5">⚠️</span>
              <span>{getErrorMessage(scanError, failedFrameIndex)}</span>
            </div>
          ) : null}

          {/* Validation error (no photo selected) */}
          {hasError && (
            <p className="text-sm text-red-500 dark:text-red-400">Please upload a photo before scanning.</p>
          )}

          {/* Action buttons */}
          <div className="flex flex-col gap-2">
            {/* Hidden file inputs */}
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              multiple
              className="hidden"
              onChange={handleFileChange}
            />
            {/*
              Camera capture input — capture="user" opens the device's front
              camera on mobile. On desktop this attribute is ignored; we never
              programmatically trigger this input on desktop anyway.
            */}
            <input
              ref={cameraInputRef}
              type="file"
              accept="image/*"
              capture="user"
              className="hidden"
              onChange={handleFileChange}
            />

            {images.length > 0 ? (
              <>
                <button
                  id="analyze-button"
                  onClick={handleScanClick}
                  className="w-full py-3.5 bg-[#0F131F] dark:bg-zinc-100 hover:bg-zinc-800 dark:hover:bg-zinc-200 text-white dark:text-zinc-900 font-semibold rounded-xl transition-colors duration-200 cursor-pointer text-base"
                >
                  {images.length > 1
                    ? `Analyze ${images.length} Photos →`
                    : 'Analyze My Face Shape →'}
                </button>
                {/* Add another photo (up to MAX_SHOTS) */}
                {canAddMore && (
                  <button
                    id="add-photo-button"
                    onClick={triggerAddAnother}
                    className="w-full py-2.5 border border-zinc-300 dark:border-zinc-700 hover:border-zinc-500 dark:hover:border-zinc-500 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white font-medium text-sm rounded-xl transition-colors duration-200 cursor-pointer"
                  >
                    + Add another photo for better accuracy ({images.length}/{MAX_SHOTS})
                  </button>
                )}
                <button
                  onClick={() => { onImagesChange([]); setHasError(false) }}
                  className="w-full py-2.5 text-zinc-500 dark:text-zinc-400 hover:text-red-500 dark:hover:text-red-400 font-medium text-sm transition-colors duration-200 cursor-pointer"
                >
                  Remove all photos
                </button>
              </>
            ) : (
              <div className="flex gap-3">
                {/* Upload photo — always enabled on all devices */}
                <button
                  id="upload-photo-button"
                  onClick={triggerFileInput}
                  className="flex-1 py-3 border border-zinc-300 dark:border-zinc-800 hover:border-zinc-500 dark:hover:border-zinc-750 text-zinc-700 dark:text-zinc-300 font-medium rounded-xl transition-colors duration-200 cursor-pointer"
                >
                  📁 Upload photo
                </button>

                {/*
                  Use camera — behaviour depends on device:
                    Mobile  : enabled, triggers native camera app via capture input
                    Desktop : visually disabled (greyed out, no hover ring);
                              clicking shows a dismissible tooltip explaining
                              it's mobile-only. No getUserMedia used.
                */}
                <div className="flex-1 relative">
                  <button
                    id="use-camera-button"
                    onClick={triggerCameraInput}
                    aria-disabled={!isMobileDevice}
                    title={!isMobileDevice ? 'Camera capture is only available on mobile devices' : undefined}
                    className={[
                      'w-full py-3 border font-medium rounded-xl transition-colors duration-200 text-base',
                      isMobileDevice
                        ? // Mobile: fully enabled, same visual weight as Upload photo
                          'border-zinc-300 dark:border-zinc-800 hover:border-zinc-500 dark:hover:border-zinc-750 text-zinc-700 dark:text-zinc-300 cursor-pointer'
                        : // Desktop: greyed out, no hover affordance, cursor signals non-interactive
                          'border-zinc-200 dark:border-zinc-800/50 text-zinc-400 dark:text-zinc-600 cursor-default select-none',
                    ].join(' ')}
                  >
                    📸 Use camera
                  </button>

                  {/* Desktop-only dismissible tooltip — auto-hides after 4 s */}
                  {showCameraTooltip && !isMobileDevice && (
                    <div
                      role="tooltip"
                      onClick={() => setShowCameraTooltip(false)}
                      className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-64 z-50
                                 bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900
                                 text-xs font-medium rounded-xl px-3 py-2.5 shadow-lg
                                 cursor-pointer"
                      style={{ animation: 'fadeInUp 0.15s ease' }}
                    >
                      Camera capture is only available on mobile devices — please use{' '}
                      <strong>Upload photo</strong> instead.
                      {/* Caret / arrow pointing down toward the button */}
                      <span
                        className="absolute top-full left-1/2 -translate-x-1/2"
                        style={{
                          width: 0, height: 0,
                          borderLeft: '6px solid transparent',
                          borderRight: '6px solid transparent',
                          borderTop: '6px solid',
                          borderTopColor: 'inherit',
                        }}
                        aria-hidden="true"
                      />
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* --- Right: Tips panel --- */}
        <div className="flex flex-col gap-4 p-6 bg-zinc-50 dark:bg-zinc-900/40 border border-zinc-200 dark:border-zinc-800 rounded-2xl">
          <h3 className="font-semibold text-zinc-800 dark:text-zinc-200 text-base">For the best result</h3>
          <ul className="flex flex-col gap-3">
            {[
              { icon: '💡', tip: 'Use good lighting — natural light or a bright room works well.' },
              { icon: '👤', tip: 'Face the camera straight on. No tilts or side angles.' },
              { icon: '🙂', tip: 'Keep a neutral expression and pull hair back if it\'s long.' },
              { icon: '📸', tip: 'Add 2–3 photos for a more accurate result — each shot is averaged together.' },
              { icon: '🔒', tip: 'Your photo never leaves your device. All analysis runs locally in the browser.' },
            ].map(({ icon, tip }) => (
              <li key={tip} className="flex items-start gap-3 text-sm text-zinc-600 dark:text-zinc-400">
                <span className="text-lg flex-shrink-0 mt-0.5">{icon}</span>
                <span>{tip}</span>
              </li>
            ))}
          </ul>

          <div className="mt-2 p-3 bg-white dark:bg-zinc-900/60 border border-zinc-100 dark:border-zinc-800 rounded-xl">
            <p className="text-xs text-zinc-400 dark:text-zinc-500 text-center italic">
              No face detected? Try a clearer, closer photo with good lighting.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
