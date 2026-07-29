#!/usr/bin/env node
/**
 * extract-features.mjs — Part 4 dev-only script (never shipped)
 *
 * Walks the two downloaded dataset directories, runs each image through
 * a headless MediaPipe Face Landmarker, computes the same ratio features
 * used in the live faceClassifier.js, and writes a CSV to:
 *   tools/faceshape-training-data/features.csv
 *
 * Run once on a dev machine after Part 0 datasets are downloaded:
 *   node tools/extract-features.mjs
 *
 * Requirements (install once on the dev machine, not in package.json):
 *   npm install -g @mediapipe/tasks-vision canvas
 *
 * Directory structure expected:
 *   tools/faceshape-training-data/
 *     primary/          (niten19/face-shape-dataset — subfolders: Heart, Oblong, Oval, Round, Square)
 *     male/             (hanakb/men-face-shape — whatever structure it uses)
 *
 * Attribution: niten19/face-shape-dataset is CC BY 4.0.
 * See docs/CREDITS.md for full attribution.
 */

import { createRequire } from 'module'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const require = createRequire(import.meta.url)
const __dirname = path.dirname(fileURLToPath(import.meta.url))

// ─── Config ──────────────────────────────────────────────────────────────────

const PRIMARY_DIR  = path.join(__dirname, 'faceshape-training-data', 'primary')
const MALE_DIR     = path.join(__dirname, 'faceshape-training-data', 'male')
const OUTPUT_CSV   = path.join(__dirname, 'faceshape-training-data', 'features.csv')

// Valid label names (case-insensitive folder matching)
const VALID_LABELS = ['heart', 'oblong', 'oval', 'round', 'square', 'diamond']

// MediaPipe visibility threshold for critical landmarks
const VISIBILITY_THRESHOLD = 0.5
const CRITICAL_INDICES = [58, 288, 234, 454, 70, 300]

// ─── Geometry helpers (same as faceClassifier.js) ────────────────────────────

function dist(p1, p2) {
  return Math.sqrt(Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2))
}

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

function computeFeatures(rawLandmarks) {
  // Roll correction (same as faceClassifier.js)
  const eyeCenter = {
    x: (rawLandmarks[33].x + rawLandmarks[263].x) / 2,
    y: (rawLandmarks[33].y + rawLandmarks[263].y) / 2
  }
  const rollAngle = Math.atan2(
    rawLandmarks[263].y - rawLandmarks[33].y,
    rawLandmarks[263].x - rawLandmarks[33].x
  )
  const lm = rawLandmarks.map(p => {
    const cos = Math.cos(-rollAngle)
    const sin = Math.sin(-rollAngle)
    const dx = p.x - eyeCenter.x
    const dy = p.y - eyeCenter.y
    return { x: eyeCenter.x + dx * cos - dy * sin, y: eyeCenter.y + dx * sin + dy * cos, visibility: p.visibility }
  })

  // IOD
  const iod = dist(lm[33], lm[263])
  if (iod < 0.01) return null

  // Ratios
  const browWidth      = dist(lm[70],  lm[300]) / iod
  const cheekboneWidth = dist(lm[234], lm[454]) / iod
  const jawWidth       = dist(lm[58],  lm[288]) / iod
  const faceHeight     = dist(lm[10],  lm[152]) / iod

  const lengthToWidth = faceHeight / cheekboneWidth
  const jawToCheek    = jawWidth   / cheekboneWidth
  const browToCheek   = browWidth  / cheekboneWidth

  // jawAngle
  const leftJawAngle  = angleBetween(lm[58],  lm[234], lm[152])
  const rightJawAngle = angleBetween(lm[288], lm[454], lm[152])
  const jawAngle = (leftJawAngle + rightJawAngle) / 2

  return { lengthToWidth, jawToCheek, browToCheek, jawAngle }
}

// ─── Dataset walker ───────────────────────────────────────────────────────────

function collectImagePaths(baseDir) {
  const entries = []
  if (!fs.existsSync(baseDir)) {
    console.warn(`[WARN] Directory not found, skipping: ${baseDir}`)
    return entries
  }
  const subfolders = fs.readdirSync(baseDir, { withFileTypes: true })
    .filter(d => d.isDirectory())
  for (const folder of subfolders) {
    const labelRaw = folder.name.toLowerCase()
    const label = VALID_LABELS.find(l => labelRaw === l || labelRaw.includes(l))
    if (!label) {
      console.warn(`[WARN] Skipping unrecognized folder: ${folder.name}`)
      continue
    }
    const folderPath = path.join(baseDir, folder.name)
    const files = fs.readdirSync(folderPath)
      .filter(f => /\.(jpg|jpeg|png|webp)$/i.test(f))
      .map(f => ({ imagePath: path.join(folderPath, f), label }))
    entries.push(...files)
  }
  return entries
}

// ─── Main ─────────────────────────────────────────────────────────────────────

async function main() {
  console.log('=== GroomWise Face Shape Feature Extractor ===')
  console.log('Loading MediaPipe Face Landmarker...')

  // Dynamic import — requires @mediapipe/tasks-vision and canvas installed
  let FaceLandmarker, FilesetResolver, createCanvas, loadImage
  try {
    ;({ FaceLandmarker, FilesetResolver } = await import('@mediapipe/tasks-vision'))
    ;({ createCanvas, loadImage } = await import('canvas'))
  } catch (e) {
    console.error('Missing dependencies. Install with:')
    console.error('  npm install @mediapipe/tasks-vision canvas')
    process.exit(1)
  }

  const vision = await FilesetResolver.forVisionTasks(
    'https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.8/wasm'
  )
  const landmarker = await FaceLandmarker.createFromOptions(vision, {
    baseOptions: {
      modelAssetPath: 'https://storage.googleapis.com/mediapipe-models/face_landmarker/face_landmarker/float16/1/face_landmarker.task',
      delegate: 'CPU', // headless — no GPU available
    },
    runningMode: 'IMAGE',
    numFaces: 1,
  })

  console.log('Collecting image paths...')
  const allImages = [
    ...collectImagePaths(PRIMARY_DIR),
    ...collectImagePaths(MALE_DIR),
  ]
  console.log(`Found ${allImages.length} images across both datasets.`)

  const rows = []
  const stats = { processed: 0, skipped_no_face: 0, skipped_low_confidence: 0, skipped_error: 0 }
  const labelCounts = {}

  for (let i = 0; i < allImages.length; i++) {
    const { imagePath, label } = allImages[i]
    if (i % 100 === 0) process.stdout.write(`\rProcessing ${i}/${allImages.length}...`)

    try {
      const img = await loadImage(imagePath)
      const canvas = createCanvas(img.width, img.height)
      const ctx = canvas.getContext('2d')
      ctx.drawImage(img, 0, 0)

      const result = landmarker.detect(canvas)
      if (!result.faceLandmarks || result.faceLandmarks.length === 0) {
        stats.skipped_no_face++
        continue
      }

      const rawLm = result.faceLandmarks[0]

      // Check critical landmark visibility
      const hasLowVisibility = CRITICAL_INDICES.some(idx => {
        const lm = rawLm[idx]
        return lm && lm.visibility !== undefined && lm.visibility < VISIBILITY_THRESHOLD
      })
      if (hasLowVisibility) {
        stats.skipped_low_confidence++
        continue
      }

      const features = computeFeatures(rawLm)
      if (!features) {
        stats.skipped_low_confidence++
        continue
      }

      rows.push({ ...features, label })
      labelCounts[label] = (labelCounts[label] || 0) + 1
      stats.processed++
    } catch (e) {
      stats.skipped_error++
    }
  }

  console.log(`\n\nDone. Writing ${rows.length} rows to ${OUTPUT_CSV}`)

  // Write CSV
  const header = 'lengthToWidth,jawToCheek,browToCheek,jawAngle,label'
  const csvLines = rows.map(r =>
    `${r.lengthToWidth.toFixed(6)},${r.jawToCheek.toFixed(6)},${r.browToCheek.toFixed(6)},${r.jawAngle.toFixed(6)},${r.label}`
  )
  fs.writeFileSync(OUTPUT_CSV, [header, ...csvLines].join('\n'))

  console.log('\n=== Summary ===')
  console.log(`Processed:              ${stats.processed}`)
  console.log(`Skipped (no face):      ${stats.skipped_no_face}`)
  console.log(`Skipped (low confidence):${stats.skipped_low_confidence}`)
  console.log(`Skipped (error):        ${stats.skipped_error}`)
  console.log('\nPer-class distribution:')
  for (const [label, count] of Object.entries(labelCounts).sort()) {
    console.log(`  ${label.padEnd(10)} ${count}`)
  }

  if (!labelCounts['diamond'] || labelCounts['diamond'] < 100) {
    console.warn('\n⚠️  WARNING: Diamond class is severely underrepresented or absent.')
    console.warn('   The primary dataset has no Diamond category.')
    console.warn('   Diamond classification may remain less accurate after training.')
  }
}

main().catch(e => { console.error(e); process.exit(1) })
