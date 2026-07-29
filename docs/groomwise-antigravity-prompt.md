# Build GroomWise — a PWA for hairstyle & skincare recommendations

## What we're building
GroomWise is a progressive web app for teenage boys and young men to find a hairstyle that suits their face shape and a skincare routine that suits their skin, plus general grooming guidance. The site has two core modules — Hairstyle and Skincare — reached from a scrollable homepage that doubles as the "about" page: as the user scrolls, it explains what the site does, with buttons throughout linking straight into each module. Prioritize a fast first-use "aha moment" once a user enters a module: they should get a real result (a face-shape scan or a quiz result) before any signup is required.

Before writing code: produce a task list and implementation plan and wait for my review/approval, then build in the phases below as vertical slices — each phase should be runnable and testable in the browser before you move to the next.

## Tech stack — do not substitute without asking me first
- Framework: Next.js (App Router), React
- Styling: Tailwind CSS, Framer Motion for micro-interactions
- State: Zustand
- Face landmark detection: `@mediapipe/tasks-vision` (Face Landmarker), running client-side in the browser — no server round-trip for face processing
- Database: PostgreSQL via Prisma
- Image hosting for catalog assets: Cloudinary (or local `/public` for early scaffolding — flag this as a placeholder if used)
- PWA: `next-pwa` (manifest, service worker, offline caching)
- Auth: optional/guest-first; use Clerk or Firebase Auth only when we get to account/sync features — don't gate core features behind login
- Hosting target: Vercel + a Postgres provider (Supabase/Neon) — not required for local dev

## Phase 1 — Scaffold + PWA shell
- Initialize Next.js + Tailwind + Zustand project
- Set up `next-pwa`: manifest.json, icons (placeholder), service worker with cache-first strategy for static/catalog assets
- Build the homepage (`/`) as a scrollable about/landing page — not a generic hub screen:
  - Hero section: value prop + a primary CTA that jumps straight into either module
  - Follow-on sections as the user scrolls: what the hairstyle finder does (with its own "Find my hairstyle" button), what the skincare helper does (with its own "Fix my skin" button), why face-shape/skin-type matching is useful, a short privacy note (face scan runs on-device)
  - Sticky header nav with direct links to `/hairstyle` and `/skincare` so returning users don't need to scroll again
- Dark mode support from the start (it's a daily-use grooming app, this matters for retention)

## Phase 2 — Hairstyle module
1. **Photo capture/upload screen**
   - Accepts upload or camera capture
   - Show a face-outline framing guide overlay and a one-line tip ("front-facing, good lighting")
   - Basic validation: warn if no face is detected before proceeding
2. **Client-side face-shape scan**
   - Load Face Landmarker, extract the 468 landmarks
   - Compute geometric ratios (jaw width, cheekbone width, forehead width, face length, jaw angle) and classify into: oval, round, square, heart, diamond, oblong
   - Do **not** upload the raw photo to any backend — process entirely in-browser. Only the resulting face-shape label (and, if the user opts in, the photo) should ever be persisted
   - Show a short animated loading state during processing rather than a blank spinner
3. **Recommendation results**
   - Show 3–4 hairstyles matched to the detected face shape, each as an image card
   - Let the user download any recommended hairstyle image to their device
4. **Hairstyle library (browsable beyond the recommendations)**
   - Full catalog list, filterable by face shape and by hair type/texture
   - Each hairstyle detail view shows: name, image, which face shapes it suits, and what hair type/texture is needed to pull it off

## Phase 3 — Skincare module
1. **Entry choice**: "Not sure what your skin issue is?" → quiz, vs. "I know my issue" → direct-selection grid
2. **Quiz**: a short branching questionnaire that scores toward one of the supported skin problems (start with: acne, oily skin, dry skin, dark spots/pigmentation, sensitive skin)
3. **Direct selection grid**: same problem list, selectable immediately, for users who already know their issue
4. **Recommendation screen**: once a problem is identified (via quiz or direct pick), show:
   - Matched active ingredients (e.g. salicylic acid for oil control, niacinamide for dark spots/pigmentation) — map ingredients to problems in a simple data table, not hardcoded per-screen
   - A short, plain-language "what is this and how does it work" blurb per ingredient, written for someone with no chemistry background
   - Keep concentrations/usage generic and conservative by default (this app's core audience includes teens — avoid recommending harsh/high-strength actives as a default suggestion)
5. **Routine builder**: a button from the recommendation screen that generates an ordered AM/PM routine (cleanse → treat → moisturize → SPF), building on the selected problem's ingredient matches

## Phase 4 — Cross-linking & retention
- After completing either module, show a soft cross-suggest prompt that links directly to the other module's page ("Your hair's sorted — want to check your skin too?") — straight to `/skincare` or `/hairstyle`, not back through the homepage
- Add a `/dashboard` route (linked from the sticky nav, separate from the public homepage): saved/downloaded hairstyles, active routine, option to retake the quiz or rescan
- Optional, opt-in routine reminders (local notifications or web push) — no streak-guilt mechanics, just a helpful nudge the user can turn off anytime

## Data model (starting point — adjust as needed, but keep it in Prisma/Postgres)
```
model Hairstyle {
  id            String   @id @default(cuid())
  name          String
  imageUrl      String
  description   String
  faceShapes    String[] // e.g. ["oval", "square"]
  hairType      String   // e.g. "straight", "wavy", "curly", "coily"
  textureNotes  String?
}

model SkinProblem {
  id           String   @id @default(cuid())
  name         String   // e.g. "oily skin"
  description  String
}

model Ingredient {
  id           String   @id @default(cuid())
  name         String   // e.g. "salicylic acid"
  aboutText    String
  problemIds   String[] // relation to SkinProblem
}

model QuizQuestion {
  id           String   @id @default(cuid())
  question     String
  options      Json     // options + which SkinProblem(s) each option scores toward
}
```

## Non-functional requirements
- Mobile-first responsive layout (this is primarily a phone-use app)
- Full offline access to a saved routine/checklist (core PWA offline requirement)
- No raw face photos leave the device unless the user explicitly opts to save one to a profile
- Accessible: proper alt text on all hairstyle/product images, sufficient contrast in both light and dark mode, keyboard-navigable quiz
- Test the face-shape classifier against a genuinely varied set of test photos (lighting, skin tone, angle) before treating it as done — flag this explicitly as a task, don't just assume the geometric heuristic works out of the box

## Working agreement
- Confirm the implementation plan with me before generating code for each phase
- If a phase requires a new dependency not listed above, ask before adding it
- After each phase, give me a way to verify it in the browser (dev server + a quick walkthrough of what to click)
