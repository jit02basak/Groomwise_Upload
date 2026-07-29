// POST /api/faceshape-correction
//
// Stores a single face-shape correction signal from the ResultsStep UI.
// No PII, no photos — only numeric ratios, text labels, and a timestamp.
//
// Validation rules (return 400 if violated):
//  - predictedShape and correctedShape must be one of the 6 valid shapes
//  - correctedShape must differ from predictedShape (no-op submissions rejected)
//  - confidence must be 'good' | 'low'
//  - lengthToWidth, jawToCheek, browToCheek must be finite positive numbers
//  - jawAngle is optional (nullable until Phase 2 calibration is done)

import { NextResponse } from 'next/server'
import { getPrismaClient }  from '../../../lib/prisma'

const VALID_SHAPES = new Set(['oval', 'round', 'square', 'heart', 'diamond', 'oblong'])
const VALID_CONFIDENCE = new Set(['good', 'low'])

function isFinitePositive(v) {
  return typeof v === 'number' && isFinite(v) && v > 0
}

export async function POST(request) {
  let body
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 })
  }

  const { predictedShape, correctedShape, confidence, lengthToWidth, jawToCheek, browToCheek, jawAngle } = body

  // --- Input validation ---
  if (!VALID_SHAPES.has(predictedShape)) {
    return NextResponse.json({ error: 'Invalid predictedShape' }, { status: 400 })
  }
  if (!VALID_SHAPES.has(correctedShape)) {
    return NextResponse.json({ error: 'Invalid correctedShape' }, { status: 400 })
  }
  if (predictedShape === correctedShape) {
    return NextResponse.json({ error: 'correctedShape must differ from predictedShape' }, { status: 400 })
  }
  if (!VALID_CONFIDENCE.has(confidence)) {
    return NextResponse.json({ error: 'Invalid confidence value' }, { status: 400 })
  }
  if (!isFinitePositive(lengthToWidth) || !isFinitePositive(jawToCheek) || !isFinitePositive(browToCheek)) {
    return NextResponse.json({ error: 'Invalid ratio values' }, { status: 400 })
  }
  // jawAngle is optional (null until calibration); if provided, must be a finite positive number
  if (jawAngle !== null && jawAngle !== undefined && !isFinitePositive(jawAngle)) {
    return NextResponse.json({ error: 'Invalid jawAngle value' }, { status: 400 })
  }

  // --- Write to DB ---
  try {
    const prisma = getPrismaClient()
    await prisma.faceShapeCorrection.create({
      data: {
        predictedShape,
        correctedShape,
        confidence,
        lengthToWidth,
        jawToCheek,
        browToCheek,
        jawAngle: jawAngle ?? null,
      },
    })
    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('[faceshape-correction] DB write failed:', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
