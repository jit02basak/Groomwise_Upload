// Real client-side face landmark classification using @mediapipe/tasks-vision.
// Runs entirely client-side — no photo ever leaves the device.
//
// Improvements:
//   1. Roll correction - computes eye-tilt angle and rotates all landmarks negative-roll
//   2. Three-zone yaw/pitch - Good (<15°), Usable (15°-25° / low confidence), Reject (>25°)
//   3. Graduated shape gap - Close shape scores return confidence: 'low' rather than null
//   4. Updated return shape - returns { shape, confidence, reason, ratios, jawAngle }
//   5. [Phase 1] Oval/Oblong lengthToWidth weights equalized (both −1.75) → crossover at 1.375
//   6. [Phase 2] jawAngle computed from existing landmarks; returned for correction payload
//              (NOT a scoring term yet — awaiting calibration data from Phase 3)
//   7. [Part 2] Quality gating: lighting check (brightness 30–240) and lenient occlusion check.
//              Blur check was removed — Laplacian variance varies too much with camera
//              resolution/compression and over-rejects sharp-enough real photos. MediaPipe's
//              own detection failure handles truly unusable frames already.
//              Occlusion check uses a very lenient threshold (0.15) and requires a majority
//              of critical landmarks to fail simultaneously — not any single one.
//   8. [Part 3] Multi-shot averaging: accepts a single URL or an array of URLs.
//
// Dev debug overlay: set localStorage.setItem('devJawAngle', '1') in the browser console
// to enable jawAngle logging and the on-screen debug value.

let faceLandmarkerInstance = null

async function getFaceLandmarker() {
  if (faceLandmarkerInstance) return faceLandmarkerInstance
  const { FilesetResolver, FaceLandmarker } = await import('@mediapipe/tasks-vision')
  const vision = await FilesetResolver.forVisionTasks(
    'https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.8/wasm'
  )
  faceLandmarkerInstance = await FaceLandmarker.createFromOptions(vision, {
    baseOptions: {
      modelAssetPath:
        'https://storage.googleapis.com/mediapipe-models/face_landmarker/face_landmarker/float16/1/face_landmarker.task',
      delegate: 'GPU',
    },
    runningMode: 'IMAGE',
    numFaces: 1,
  })
  return faceLandmarkerInstance
}

function dist(p1, p2) {
  return Math.sqrt(Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2))
}

function estimatePose(lm) {
  const midX = (lm[234].x + lm[454].x) / 2
  const noseX = lm[1].x
  const halfSpan = Math.abs(lm[454].x - lm[234].x) / 2
  const yaw = halfSpan > 0 ? (noseX - midX) / halfSpan : 0
  const faceH = Math.abs(lm[152].y - lm[10].y)
  const noseFracFromTop = faceH > 0 ? (lm[1].y - lm[10].y) / faceH : 0.5
  const pitch = noseFracFromTop - 0.50
  return { yaw, pitch }
}

// Phase 2 — Jaw corner angle helper
// Computes the angle (degrees) at `vertex` formed by the vectors to `pointA` and `pointB`.
// Scale-invariant: no IOD normalization needed.
function angleBetween(vertex, pointA, pointB) {
  const v1 = { x: pointA.x - vertex.x, y: pointA.y - vertex.y }
  const v2 = { x: pointB.x - vertex.x, y: pointB.y - vertex.y }
  const dot  = v1.x * v2.x + v1.y * v2.y
  const mag1 = Math.sqrt(v1.x ** 2 + v1.y ** 2)
  const mag2 = Math.sqrt(v2.x ** 2 + v2.y ** 2)
  if (mag1 === 0 || mag2 === 0) return 0
  const cos = dot / (mag1 * mag2)
  return Math.acos(Math.min(1, Math.max(-1, cos))) * (180 / Math.PI)
}

// Part 2 — Lighting check. Computes mean brightness of pixel data.
// Too dark (<30) or blown out (>240) → bad frame.
function computeMeanBrightness(ctx, width, height) {
  const imageData = ctx.getImageData(0, 0, width, height)
  const data = imageData.data
  let total = 0
  const pixels = width * height
  for (let i = 0; i < pixels; i++) {
    total += 0.299 * data[i * 4] + 0.587 * data[i * 4 + 1] + 0.114 * data[i * 4 + 2]
  }
  return total / pixels
}

// Part 2 — Lenient occlusion check using MediaPipe per-landmark visibility scores.
// Checks the critical landmarks used in scoring: jawline (#58, #288),
// cheekbones (#234, #454), and brow anchors (#70, #300).
//
// Why lenient: MediaPipe's visibility score is not well-calibrated for Face Landmarker
// (it's more reliable for Pose Landmarker) and can read low even on clear, visible faces.
// A strict threshold (e.g. 0.5) causes over-rejection of good photos.
//
// Current policy: threshold 0.15, MAJORITY of critical landmarks must fail simultaneously.
// A single low-visibility reading is treated as noise, not a genuine occlusion.
const CRITICAL_LANDMARK_INDICES = [58, 288, 234, 454, 70, 300]
const VISIBILITY_THRESHOLD = 0.15
const OCCLUSION_MAJORITY = Math.ceil(CRITICAL_LANDMARK_INDICES.length / 2) // 3 of 6

function checkOcclusion(rawLandmarks) {
  let failCount = 0
  for (const idx of CRITICAL_LANDMARK_INDICES) {
    const lm = rawLandmarks[idx]
    if (lm && lm.visibility !== undefined && lm.visibility < VISIBILITY_THRESHOLD) {
      failCount++
    }
  }
  // Only reject if a majority of critical landmarks are simultaneously low-visibility
  return failCount < OCCLUSION_MAJORITY
}

// Phase 1 fix — Oval/Oblong weight equalization
// Before: oval −2.0, oblong −1.5 → artificial crossover at ~1.35 (Oval bias)
// After:  both −1.75               → true midpoint crossover at 1.375
// Round, Square, Heart, Diamond weights are untouched.
function scoreShapes({ lengthToWidth, jawToCheek, browToCheek }) {
  const clamp = (v) => Math.max(0, v)
  return {
    oval:    clamp(1 - 1.75 * Math.pow(lengthToWidth - 1.25, 2) - 1.5 * Math.pow(jawToCheek - 0.80, 2) - 1.0 * Math.pow(browToCheek - 0.90, 2)),
    round:   clamp(1 - 2.5  * Math.pow(lengthToWidth - 1.05, 2) - 1.0 * Math.pow(jawToCheek - 0.90, 2) - 1.0 * Math.pow(browToCheek - 0.88, 2)),
    square:  clamp(1 - 2.0  * Math.pow(lengthToWidth - 1.05, 2) - 0.5 * Math.pow(jawToCheek - 0.95, 2) - 1.5 * Math.pow(browToCheek - 0.92, 2)),
    heart:   clamp(1 - 1.5  * Math.pow(lengthToWidth - 1.20, 2) - 2.0 * Math.pow(jawToCheek - 0.65, 2) - 0.5 * Math.pow(browToCheek - 1.00, 2)),
    diamond: clamp(1 - 1.5  * Math.pow(lengthToWidth - 1.20, 2) - 2.0 * Math.pow(jawToCheek - 0.70, 2) - 2.0 * Math.pow(browToCheek - 0.75, 2)),
    oblong:  clamp(1 - 1.75 * Math.pow(lengthToWidth - 1.50, 2) - 1.0 * Math.pow(jawToCheek - 0.80, 2) - 1.0 * Math.pow(browToCheek - 0.88, 2)),
  }
}

// ─── Quality thresholds (Part 2) ─────────────────────────────────────────────
// Blur check: removed. Laplacian variance varies too much with camera resolution
// and compression — it over-rejects sharp-enough real photos. MediaPipe's own
// detection failure already handles truly unusable frames.
// Lighting check: kept. Mean luma is a reliable, resolution-independent measure.
const BRIGHTNESS_MIN = 30   // Mean luma — below this is too dark
const BRIGHTNESS_MAX = 240  // Mean luma — above this is blown out

// ─── Single-frame extraction ─────────────────────────────────────────────────
// Shared logic for loading one image, running quality gates, extracting landmarks,
// and computing ratios + jawAngle. Used by both the single-image and multi-image paths.
//
// Returns either:
//   { ok: true, ratios, jawAngle, leftJawAngle, rightJawAngle, isLowConfidencePose }
//   { ok: false, reason } — a specific quality gate or detection failure
async function extractFrameData(imageDataUrl, landmarker, devJawAngle) {
  const img = new window.Image()
  await new Promise((resolve, reject) => {
    img.onload  = resolve
    img.onerror = () => reject(new Error('Image failed to load'))
    img.src = imageDataUrl
  })

  // Draw onto an offscreen canvas before passing to MediaPipe.
  // Passing an HTMLImageElement directly can fail in the WASM runtime due to
  // browser security restrictions on reading raw pixel data from img elements.
  // A canvas element is always readable by the WASM module without CORS issues.
  const canvas = document.createElement('canvas')
  canvas.width  = img.naturalWidth  || img.width
  canvas.height = img.naturalHeight || img.height
  if (canvas.width === 0 || canvas.height === 0) {
    throw new Error('Image has zero dimensions — may not have loaded correctly.')
  }
  const ctx = canvas.getContext('2d')
  ctx.drawImage(img, 0, 0)

  // ── Part 2: Lighting check ─────────────────────────────────────────────────
  const brightness = computeMeanBrightness(ctx, canvas.width, canvas.height)
  if (devJawAngle) {
    console.log(`%c[DEV] Mean brightness: ${brightness.toFixed(1)} (min: ${BRIGHTNESS_MIN}, max: ${BRIGHTNESS_MAX})`, 'color: #60a5fa')
  }
  if (brightness < BRIGHTNESS_MIN || brightness > BRIGHTNESS_MAX) {
    console.warn(`FaceClassifier: Frame rejected — lighting (brightness=${brightness.toFixed(1)})`)
    return { ok: false, reason: 'lighting' }
  }

  // ── Landmark detection ─────────────────────────────────────────────────────
  const result = landmarker.detect(canvas)

  if (!result.faceLandmarks || result.faceLandmarks.length === 0) {
    console.warn('FaceClassifier: No face detected.')
    return { ok: false, reason: 'no-face' }
  }

  const lmRaw = result.faceLandmarks[0]

  // ── Part 2: Occlusion check ────────────────────────────────────────────────
  // Commented out pending decision on whether to restore or drop entirely.
  // Real visibility values were inconclusive — occlusion check disabled to avoid
  // over-rejection. Re-evaluate after Part 1B (jawAngle wiring) is complete.
  // if (!checkOcclusion(lmRaw)) {
  //   console.warn('FaceClassifier: Frame rejected — critical landmark occluded.')
  //   return { ok: false, reason: 'occluded' }
  // }

  // Compute eye center and roll angle using inner eye corners (33 and 263)
  const eyeCenter = {
    x: (lmRaw[33].x + lmRaw[263].x) / 2,
    y: (lmRaw[33].y + lmRaw[263].y) / 2
  }
  const rollAngle = Math.atan2(lmRaw[263].y - lmRaw[33].y, lmRaw[263].x - lmRaw[33].x)

  // Rotate all landmarks by -rollAngle around eyeCenter to correct for head tilt
  const lm = lmRaw.map(p => {
    const cos = Math.cos(-rollAngle)
    const sin = Math.sin(-rollAngle)
    const dx = p.x - eyeCenter.x
    const dy = p.y - eyeCenter.y
    return {
      x: eyeCenter.x + dx * cos - dy * sin,
      y: eyeCenter.y + dx * sin + dy * cos,
      z: p.z,
      visibility: p.visibility,
    }
  })

  // 1. Pose guard (yaw and pitch only, as roll is corrected)
  const { yaw, pitch } = estimatePose(lm)
  const YAW_GOOD     = 0.26 // ~15 degrees
  const YAW_LIMIT    = 0.44 // ~25 degrees
  const PITCH_GOOD   = 0.20 // ~11.5 degrees
  const PITCH_LIMIT  = 0.35 // ~20 degrees

  if (Math.abs(yaw) > YAW_LIMIT || Math.abs(pitch) > PITCH_LIMIT) {
    console.warn('FaceClassifier: Non-frontal photo rejected — yaw=' + yaw.toFixed(3) + ' pitch=' + pitch.toFixed(3))
    return { ok: false, reason: 'extreme-angle' }
  }

  const isLowConfidencePose = Math.abs(yaw) > YAW_GOOD || Math.abs(pitch) > PITCH_GOOD

  // 2. Normalize by interocular distance (inner eye corners 33 / 263)
  const iod = dist(lm[33], lm[263])
  if (iod < 0.01) {
    console.warn('FaceClassifier: IOD too small — detection failure.')
    return { ok: false, reason: 'no-face' }
  }

  // 3. Bone-anchored measurements
  const browWidth      = dist(lm[70],  lm[300]) / iod
  const cheekboneWidth = dist(lm[234], lm[454]) / iod
  const jawWidth       = dist(lm[58],  lm[288]) / iod
  const faceHeight     = dist(lm[10],  lm[152]) / iod

  const ratios = {
    lengthToWidth: faceHeight / cheekboneWidth,
    jawToCheek:    jawWidth   / cheekboneWidth,
    browToCheek:   browWidth  / cheekboneWidth,
  }

  // Phase 2 — Jaw corner angle (scale-invariant; uses already-extracted landmarks)
  // Left jaw corner (#58): angle between cheekbone (#234) and chin (#152)
  // Right jaw corner (#288): angle between cheekbone (#454) and chin (#152)
  // Sharp/angular (Square) → smaller angle; Soft/rounded (Round) → larger angle
  // NOTE: NOT a scoring term yet — awaiting calibration from Phase 3 correction data.
  const leftJawAngle  = angleBetween(lm[58],  lm[234], lm[152])
  const rightJawAngle = angleBetween(lm[288], lm[454], lm[152])
  const jawAngle = (leftJawAngle + rightJawAngle) / 2

  return { ok: true, ratios, jawAngle, leftJawAngle, rightJawAngle, isLowConfidencePose }
}

// ─── Public API ───────────────────────────────────────────────────────────────
//
// classifyFaceShape(imageDataUrlOrArray)
//
// Accepts either:
//   - A single data URL string (legacy path — behaves exactly as before)
//   - An array of data URL strings (Part 3 multi-shot path)
//
// Multi-shot behaviour:
//   Each frame is individually quality-gated. If ANY single frame fails a quality
//   gate, the function immediately returns that frame's specific failure reason
//   (e.g. { shape: null, confidence: 'low', reason: 'blurry', failedFrameIndex: 1 })
//   so the caller can surface a targeted retake prompt for that exact shot.
//   Only when ALL frames pass do we average their ratios and run scoreShapes().
//
export async function classifyFaceShape(imageDataUrlOrArray) {
  try {
    const landmarker = await getFaceLandmarker()

    // Dev-only jaw angle logging flag
    const devJawAngle = typeof window !== 'undefined' && window.localStorage?.getItem('devJawAngle') === '1'

    // Normalise to array regardless of input shape
    const images = Array.isArray(imageDataUrlOrArray)
      ? imageDataUrlOrArray
      : [imageDataUrlOrArray]

    if (images.length === 0) {
      console.warn('FaceClassifier: No images provided.')
      return { shape: null, confidence: 'low', reason: 'no-face' }
    }

    // ── Multi-shot: process each frame individually ──────────────────────────
    const frameResults = []
    for (let i = 0; i < images.length; i++) {
      const frameResult = await extractFrameData(images[i], landmarker, devJawAngle)
      if (!frameResult.ok) {
        // Return immediately with the specific failure reason + which frame failed.
        // This lets UploadStep show a targeted retake prompt for that exact shot.
        console.warn(`FaceClassifier: Frame ${i + 1}/${images.length} failed: ${frameResult.reason}`)
        return {
          shape: null,
          confidence: 'low',
          reason: frameResult.reason,
          failedFrameIndex: i, // zero-based index of the failing shot
        }
      }
      frameResults.push(frameResult)
    }

    // ── Average ratios across all passing frames ─────────────────────────────
    const n = frameResults.length
    const avgRatios = {
      lengthToWidth: frameResults.reduce((s, f) => s + f.ratios.lengthToWidth, 0) / n,
      jawToCheek:    frameResults.reduce((s, f) => s + f.ratios.jawToCheek,    0) / n,
      browToCheek:   frameResults.reduce((s, f) => s + f.ratios.browToCheek,   0) / n,
    }
    const avgJawAngle        = frameResults.reduce((s, f) => s + f.jawAngle, 0) / n
    const avgLeftJawAngle    = frameResults.reduce((s, f) => s + f.leftJawAngle, 0) / n
    const avgRightJawAngle   = frameResults.reduce((s, f) => s + f.rightJawAngle, 0) / n
    // Any frame with a low-confidence pose flag → overall confidence lowered
    const anyLowConfidencePose = frameResults.some(f => f.isLowConfidencePose)

    if (devJawAngle && n > 1) {
      console.log(`%c[DEV] Multi-shot: averaged ${n} frames`, 'color: #34d399; font-weight: bold')
      console.log('%c[DEV] Per-frame ratios:', 'color: #34d399', frameResults.map(f => f.ratios))
    }

    // ── Scoring ─────────────────────────────────────────────────────────────
    const ratios = avgRatios
    const scores = scoreShapes(ratios)
    const sorted = Object.entries(scores).sort((a, b) => b[1] - a[1])
    const [topShape, topScore] = sorted[0]
    const secondScore = sorted[1][1]
    const gap = topScore - secondScore

    console.log('FaceClassifier ratios:', ratios)
    console.log('FaceClassifier scores:', scores)
    console.log('FaceClassifier result:', topShape, '(gap=' + gap.toFixed(3) + ')')

    // Dev-only jaw angle logging — only active when localStorage flag is set.
    // To enable: localStorage.setItem('devJawAngle', '1') in browser console.
    // To disable: localStorage.removeItem('devJawAngle')
    if (devJawAngle) {
      console.log('%c[DEV] jawAngle (left=' + avgLeftJawAngle.toFixed(1) + '° right=' + avgRightJawAngle.toFixed(1) + '° avg=' + avgJawAngle.toFixed(1) + '°)', 'color: #f59e0b; font-weight: bold')
    }

    // Determine overall confidence
    const confidence = (anyLowConfidencePose || gap < 0.08) ? 'low' : 'good'

    return {
      shape: topShape,
      confidence,
      reason: null,
      ratios,
      // jawAngle: dev overlay value included only when flag is active;
      // always included in the return for correction payload use.
      jawAngle: avgJawAngle,
      devJawAngle, // flag forwarded so ResultsStep can render the overlay
    }

  } catch (err) {
    console.error('FaceClassifier: Failed:', err)
    throw err
  }
}
