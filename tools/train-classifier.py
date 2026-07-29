#!/usr/bin/env python3
"""
train-classifier.py — Part 4 dev-only script (never shipped)

Reads features.csv produced by extract-features.mjs, trains a logistic
regression classifier, reports per-class precision/recall/F1 + confusion
matrix, and exports the learned weights as a plain JavaScript scoring
function to tools/learned-scoring.js.

Run once on a dev machine after extract-features.mjs has been run:
  python tools/train-classifier.py

Requirements (install once on the dev machine):
  pip install scikit-learn pandas numpy

The output (learned-scoring.js) is plain JavaScript arithmetic with zero
external dependencies — it is the only artifact from this whole process
that may eventually be integrated into the shipped app.
"""

import json
import os
import sys
from pathlib import Path

try:
    import numpy as np
    import pandas as pd
    from sklearn.linear_model import LogisticRegression
    from sklearn.model_selection import train_test_split, StratifiedKFold, cross_val_score
    from sklearn.preprocessing import LabelEncoder, StandardScaler
    from sklearn.metrics import classification_report, confusion_matrix
except ImportError:
    print("Missing dependencies. Install with:")
    print("  pip install scikit-learn pandas numpy")
    sys.exit(1)

# ─── Paths ────────────────────────────────────────────────────────────────────

SCRIPT_DIR   = Path(__file__).parent
FEATURES_CSV = SCRIPT_DIR / "faceshape-training-data" / "features.csv"
OUTPUT_JS    = SCRIPT_DIR / "learned-scoring.js"
WEIGHTS_JSON = SCRIPT_DIR / "faceshape-training-data" / "weights.json"

FEATURE_COLS = ["lengthToWidth", "jawToCheek", "browToCheek", "jawAngle"]

# ─── Load data ────────────────────────────────────────────────────────────────

if not FEATURES_CSV.exists():
    print(f"ERROR: {FEATURES_CSV} not found.")
    print("Run extract-features.mjs first.")
    sys.exit(1)

df = pd.read_csv(FEATURES_CSV)
print(f"Loaded {len(df)} rows from {FEATURES_CSV}")
print("\nPer-class distribution:")
print(df["label"].value_counts().to_string())

# Drop rows with missing values (shouldn't happen, but defensive)
df = df.dropna()
print(f"\n{len(df)} rows after dropping NaN")

# ─── Encode labels ────────────────────────────────────────────────────────────

le = LabelEncoder()
y = le.fit_transform(df["label"])
X = df[FEATURE_COLS].values
class_names = le.classes_.tolist()  # e.g. ['diamond', 'heart', 'oblong', 'oval', 'round', 'square']

print(f"\nClasses: {class_names}")

# ─── Scale features ───────────────────────────────────────────────────────────

scaler = StandardScaler()
X_scaled = scaler.fit_transform(X)

# ─── Train/test split ─────────────────────────────────────────────────────────

X_train, X_test, y_train, y_test = train_test_split(
    X_scaled, y, test_size=0.2, random_state=42, stratify=y
)

print(f"\nTrain size: {len(X_train)}, Test size: {len(X_test)}")

# ─── Train logistic regression ────────────────────────────────────────────────

clf = LogisticRegression(
    max_iter=2000,
    C=1.0,
    multi_class="multinomial",
    solver="lbfgs",
    random_state=42,
)
clf.fit(X_train, y_train)

# ─── Evaluate ────────────────────────────────────────────────────────────────

y_pred = clf.predict(X_test)

print("\n=== Classification Report (held-out test set) ===")
print(classification_report(y_test, y_pred, target_names=class_names))

print("=== Confusion Matrix ===")
cm = confusion_matrix(y_test, y_pred)
cm_df = pd.DataFrame(cm, index=class_names, columns=class_names)
print(cm_df.to_string())

# Cross-validation for robustness estimate
cv = StratifiedKFold(n_splits=5, shuffle=True, random_state=42)
cv_scores = cross_val_score(clf, X_scaled, y, cv=cv, scoring="accuracy")
print(f"\n5-fold cross-val accuracy: {cv_scores.mean():.3f} ± {cv_scores.std():.3f}")

# ─── Export weights ───────────────────────────────────────────────────────────

# Combine scaler + classifier into a single set of parameters so the JS
# function can do: softmax( (X - mean) / std @ coef.T + intercept )
weights = {
    "classes": class_names,
    "featureCols": FEATURE_COLS,
    "scalerMean": scaler.mean_.tolist(),
    "scalerStd": scaler.scale_.tolist(),
    "coef": clf.coef_.tolist(),          # shape: [n_classes, n_features]
    "intercept": clf.intercept_.tolist(), # shape: [n_classes]
}

WEIGHTS_JSON.parent.mkdir(parents=True, exist_ok=True)
with open(WEIGHTS_JSON, "w") as f:
    json.dump(weights, f, indent=2)
print(f"\nWeights saved to {WEIGHTS_JSON}")

# ─── Generate plain-JS scoring function ──────────────────────────────────────
# No runtime, no imports — pure arithmetic that can be dropped into faceClassifier.js.
# Validation: check this file for any require() or import before integrating it.

classes_js   = json.dumps(class_names)
means_js     = json.dumps([round(v, 8) for v in scaler.mean_.tolist()])
stds_js      = json.dumps([round(v, 8) for v in scaler.scale_.tolist()])
coef_js      = json.dumps([[round(v, 8) for v in row] for row in clf.coef_.tolist()])
intercept_js = json.dumps([round(v, 8) for v in clf.intercept_.tolist()])

js_content = f"""// learned-scoring.js — Part 4 artifact (auto-generated by train-classifier.py)
//
// Replaces scoreShapes() in faceClassifier.js once validated against the rule-based
// system on a spot-check of known-shape test faces (see implementation plan Part 4
// verification checklist). Do NOT integrate until the side-by-side sanity check passes.
//
// This file contains ZERO external dependencies — no require(), no import, no fetch.
// It is plain JavaScript arithmetic: StandardScaler normalization + softmax regression.
//
// Attribution: trained on niten19/face-shape-dataset (CC BY 4.0) and hanakb/men-face-shape.
// See docs/CREDITS.md for full attribution.
//
// ⚠️  Do not edit by hand — regenerate by running train-classifier.py again.

const _CLASSES   = {classes_js}
const _MEANS     = {means_js}
const _STDS      = {stds_js}
const _COEF      = {coef_js}
const _INTERCEPT = {intercept_js}

/**
 * learnedScoreShapes — learned replacement for the rule-based scoreShapes() function.
 *
 * Takes the same features as scoreShapes(): {{ lengthToWidth, jawToCheek, browToCheek, jawAngle }}
 * Returns an object in the same format: {{ oval: 0.xx, round: 0.xx, square: 0.xx, ... }}
 *
 * Uses softmax so scores sum to 1. The rule-based version uses clamped Gaussian penalties
 * so they do not sum to 1 — this difference does not affect classification (only the ranking
 * matters) but is worth noting when reading the raw numbers.
 *
 * jawAngle is required (no longer nullable) once this function is in use.
 * If jaw angle is unavailable, pass 0 as a neutral placeholder.
 */
export function learnedScoreShapes({{ lengthToWidth, jawToCheek, browToCheek, jawAngle }}) {{
  const features = [lengthToWidth, jawToCheek, browToCheek, jawAngle]

  // StandardScaler normalization
  const scaled = features.map((v, i) => (v - _MEANS[i]) / _STDS[i])

  // Linear scores: coef @ scaled + intercept
  const logits = _COEF.map((row, c) =>
    row.reduce((sum, w, j) => sum + w * scaled[j], 0) + _INTERCEPT[c]
  )

  // Softmax
  const maxLogit = Math.max(...logits)
  const exps = logits.map(l => Math.exp(l - maxLogit))
  const sumExp = exps.reduce((s, e) => s + e, 0)
  const probs = exps.map(e => e / sumExp)

  // Return as {{ shapeName: probability }} object, same shape as scoreShapes()
  const result = {{}}
  _CLASSES.forEach((cls, i) => {{ result[cls] = probs[i] }})
  return result
}}
"""

with open(OUTPUT_JS, "w") as f:
    f.write(js_content)

print(f"JavaScript scoring function written to {OUTPUT_JS}")
print("\n=== IMPORTANT: Before integrating learned-scoring.js ===")
print("1. Run the side-by-side sanity check described in the implementation plan.")
print("2. Confirm learnedScoreShapes() output matches or beats scoreShapes() on known-shape test faces.")
print("3. Only then replace scoreShapes() in faceClassifier.js.")
print("4. Verify no new runtime dependencies crept into package.json.")
