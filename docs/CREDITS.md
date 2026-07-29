# GroomWise — Data Credits

## Face Shape Training Datasets

The offline classifier bootstrapping (Part 4 of the face shape accuracy work)
uses the following publicly available datasets for feature extraction and training.
No images from these datasets are included in the shipped application — only the
resulting numeric weights (derived ratios, not pixels) are used.

---

### Primary Dataset — `niten19/face-shape-dataset`

- **Source:** https://www.kaggle.com/datasets/niten19/face-shape-dataset
- **License:** CC BY 4.0 (Creative Commons Attribution 4.0 International)
- **Contents:** ~5,000 images across 5 categories (Heart, Oblong, Oval, Round, Square), sourced from female celebrity photos.
- **Attribution required by license:** Yes — attribution to the dataset author (niten19 on Kaggle) is required for any derived work.
- **Use:** Feature extraction (landmark ratios) and logistic regression training. Images are processed on a dev machine only and not shipped.

**CC BY 4.0 attribution:**
> Face Shape Dataset by niten19, available at https://www.kaggle.com/datasets/niten19/face-shape-dataset, licensed under CC BY 4.0 (https://creativecommons.org/licenses/by/4.0/).

---

### Supplementary Dataset — `hanakb/men-face-shape`

- **Source:** https://www.kaggle.com/datasets/hanakb/men-face-shape
- **License:** _(confirm before use — see Part 0 step 0.2 in the implementation plan)_
- **Contents:** Male-specific face-shape images. Used to correct the gender skew of the primary dataset, since GroomWise's target users are teen boys/young men.
- **Use:** Feature extraction only (same pipeline as primary dataset). Subject to license confirmation.

> ⚠️ **Note:** The license for this dataset must be explicitly confirmed before any use. See `implementation_plan.md` Part 0 Step 0.2.

---

## Notes on Diamond Category

The primary dataset has no Diamond category. The male dataset may partially
address this gap. If Diamond remains severely underrepresented after combining
both datasets, Diamond classification accuracy may be lower than for other
shapes. This is flagged by `extract-features.mjs` at runtime.
