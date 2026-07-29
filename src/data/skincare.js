// Skincare data — problems, ingredients, quiz questions, AM/PM routines
// Ingredients and concentrations are conservative and suitable for teen/young adult skin.

// ─── SKIN PROBLEM TAXONOMY ───────────────────────────────────────────────────
// Used by DirectSelectScreen. Each entry maps 1:1 to a quizResult shape.
// plainDescription: one jargon-free sentence for users with no skincare background.

export const SKIN_PROBLEMS = [
  // ── Type axis ──────────────────────────────────────────────────────────────
  {
    id: 'oily',
    axis: 'type',
    name: 'Oily Skin',
    clinicalName: 'Oily Skin',
    everydayLabel: 'Oily Skin',
    icon: '💧',
    description: 'Face looks shiny or greasy a few hours after washing, especially the T-zone.',
    plainDescription: 'Your skin produces more oil than it needs, leaving it shiny and sometimes causing clogged pores.',
    tagline: 'Balance oil without stripping',
    medicalReferral: false,
  },
  {
    id: 'dry',
    axis: 'type',
    name: 'Dry Skin',
    clinicalName: 'Dry Skin',
    everydayLabel: 'Dry Skin',
    icon: '🏜️',
    description: 'Skin feels tight, rough, or flaky — especially after washing.',
    plainDescription: 'Your skin doesn\'t hold moisture well, which makes it feel tight, look dull, or flake in places.',
    tagline: 'Restore moisture and repair the barrier',
    medicalReferral: false,
  },
  {
    id: 'combination',
    axis: 'type',
    name: 'Combination Skin',
    clinicalName: 'Combination Skin',
    everydayLabel: 'Combination Skin',
    icon: '⚖️',
    description: 'T-zone (forehead, nose) is oily while cheeks stay normal or dry.',
    plainDescription: 'Your forehead and nose tend to get oily while the rest of your face stays normal or feels dry.',
    tagline: 'Balance two skin zones at once',
    medicalReferral: false,
  },
  {
    id: 'normal',
    axis: 'type',
    name: 'Normal / Balanced Skin',
    clinicalName: 'Normal Skin',
    everydayLabel: 'Normal Skin',
    icon: '✨',
    description: 'Skin feels comfortable, neither greasy nor tight, with few concerns.',
    plainDescription: 'Your skin is pretty well-balanced — not too oily, not too dry, and not easily irritated.',
    tagline: 'Maintain and protect what\'s working',
    medicalReferral: false,
  },
  // ── Concern axis ────────────────────────────────────────────────────────────
  {
    id: 'comedonal_acne',
    axis: 'concern',
    name: 'Comedonal Acne',
    clinicalName: 'Comedonal Acne',
    everydayLabel: 'Blackheads & Whiteheads',
    icon: '⚫',
    description: 'Small blackheads or closed whiteheads on the surface — no pain, no depth.',
    plainDescription: 'Clogged pores that show up as blackheads or small white bumps, usually without much redness or pain.',
    tagline: 'Clear pores and prevent new blockages',
    medicalReferral: false,
  },
  {
    id: 'cystic_acne',
    axis: 'concern',
    name: 'Cystic / Nodular Acne',
    clinicalName: 'Cystic/Nodular Acne',
    everydayLabel: 'Deep, Painful Breakouts',
    icon: '🔴',
    description: 'Deep, painful lumps under the skin that ache and take weeks to resolve.',
    plainDescription: 'A type of acne where the breakouts sit deep under the skin, feel sore to touch, and can last weeks without ever coming to a head.',
    tagline: 'Calm inflammation and get professional support',
    medicalReferral: true,
  },
  {
    id: 'razor_bumps',
    axis: 'concern',
    name: 'Razor Bumps (PFB)',
    clinicalName: 'Razor Bumps / Ingrown Hairs',
    everydayLabel: 'Razor Bumps',
    icon: '🪒',
    description: 'Red, irritated bumps or ingrown hairs that appear mostly where you shave.',
    plainDescription: 'Hairs that curl back into the skin after shaving, causing red bumps and irritation in the shaved area.',
    tagline: 'Reduce inflammation and prevent ingrowns',
    medicalReferral: false,
  },
  {
    id: 'pie',
    axis: 'concern',
    name: 'Post-Inflammatory Erythema',
    clinicalName: 'PIE',
    everydayLabel: 'Red/Pink Marks After Pimples',
    icon: '🌸',
    description: 'Flat, red or pink marks left behind after pimples heal — not a raised scar.',
    plainDescription: 'Flat red or pink marks that stay behind after a pimple heals — they\'re not scars, just lingering redness that fades slowly.',
    tagline: 'Fade redness and speed up healing',
    medicalReferral: false,
  },
  {
    id: 'pih',
    axis: 'concern',
    name: 'Dark Spots & PIH',
    clinicalName: 'PIH',
    everydayLabel: 'Dark Spots / Hyperpigmentation',
    icon: '🌑',
    description: 'Flat, dark brown or grayish marks left after pimples — more visible on deeper skin tones.',
    plainDescription: 'Flat dark brown or grayish marks left after a breakout heals — caused by the skin producing extra pigment as it repairs itself.',
    tagline: 'Fade marks and even your tone',
    medicalReferral: false,
  },
  {
    id: 'atrophic_scarring',
    axis: 'concern',
    name: 'Atrophic (Pitted) Scarring',
    clinicalName: 'Atrophic Scarring',
    everydayLabel: 'Acne Scars',
    icon: '🕳️',
    description: 'Physical dents, pits, or small craters in the skin from previous breakouts.',
    plainDescription: 'Small dents or pits in the skin caused by severe breakouts — the skin didn\'t fully regenerate, leaving an indentation.',
    tagline: 'Improve texture and stimulate collagen',
    medicalReferral: false,
  },
  {
    id: 'seborrheic_dermatitis',
    axis: 'concern',
    name: 'Seborrheic Dermatitis',
    clinicalName: 'Seborrheic Dermatitis',
    everydayLabel: 'Flaky, Greasy Patches',
    icon: '🍂',
    description: 'Greasy or yellowish flakes around the nose, eyebrows, or in the beard — often with redness.',
    plainDescription: 'A condition where skin produces too much oil and a naturally-occurring yeast overgrows, causing greasy, yellowish flaking and redness — usually around the nose, eyebrows, and hairline.',
    tagline: 'Control flaking and reduce inflammation',
    medicalReferral: true,
  },
  {
    id: 'sensitive_reactive',
    axis: 'concern',
    name: 'Sensitive / Reactive Skin',
    clinicalName: 'Sensitive/Reactive Skin',
    everydayLabel: 'Sensitive Skin',
    icon: '🌿',
    description: 'Skin stings, burns, or turns red easily — even from basic face washes or sweat.',
    plainDescription: 'Skin that reacts strongly to products, weather changes, or sweat — stinging, burning, or turning red more easily than most people\'s skin.',
    tagline: 'Calm, protect, and rebuild your barrier',
    medicalReferral: false,
  },
  {
    id: 'shaving_irritation',
    axis: 'concern',
    name: 'Shaving Irritation',
    clinicalName: 'Shaving Irritation',
    everydayLabel: 'Razor Burn',
    icon: '🔥',
    description: 'Redness, stinging, or tightness on the neck and jaw right after shaving.',
    plainDescription: 'The redness, burning, or tightness that happens on the face and neck right after shaving — not ingrown hairs, just irritation from the blade.',
    tagline: 'Soothe and prep skin for a closer shave',
    medicalReferral: false,
  },
  {
    id: 'congestion_prone',
    axis: 'concern',
    name: 'Congestion-Prone / Clogged Pores',
    clinicalName: 'Congestion-Prone',
    everydayLabel: 'Clogged Pores',
    icon: '🚧',
    description: 'Face lotions and sunscreens feel immediately greasy and seem to block pores.',
    plainDescription: 'Skin that gets clogged easily when moisturisers or sunscreens are applied — leaving a heavy or greasy feeling that doesn\'t absorb properly.',
    tagline: 'Find non-comedogenic alternatives',
    medicalReferral: false,
  },
  {
    id: 'pustular_acne',
    axis: 'concern',
    name: 'Acne',
    clinicalName: 'Pustular Acne',
    everydayLabel: 'Acne',
    icon: '🔴',
    description: 'Red bumps with a visible white or yellow center — usually not very painful.',
    plainDescription: 'Red bumps with a visible white or yellow center — usually not very painful.',
    tagline: 'Target active breakouts and calm inflammation',
    medicalReferral: false,
  },
  {
    id: 'dark_circles',
    axis: 'concern',
    name: 'Dark Circles',
    clinicalName: 'Dark Circles',
    everydayLabel: 'Dark Circles',
    icon: '👁️',
    description: 'The skin under the eyes appears darker than the rest of the face, often more noticeable when tired.',
    plainDescription: 'The skin under your eyes looks darker than the rest of your face, often more noticeable when you\'re tired.',
    tagline: 'Brighten the under-eye area and support recovery',
    medicalReferral: false,
  },
  {
    id: 'large_pores',
    axis: 'concern',
    name: 'Large Pores',
    clinicalName: 'Large Pores',
    everydayLabel: 'Large Pores',
    icon: '🔬',
    description: 'Pores that are more visible than average, especially on the nose and cheeks.',
    plainDescription: 'Pores that are more visible than average, especially on the nose and cheeks — usually genetic and tied to oil production.',
    tagline: 'Minimise pore appearance through oil control',
    medicalReferral: false,
  },
  {
    id: 'dullness',
    axis: 'concern',
    name: 'Dullness',
    clinicalName: 'Dullness',
    everydayLabel: 'Dullness',
    icon: '🌫️',
    description: 'Skin that looks flat, tired, or lacking its natural glow, even without a specific breakout or mark.',
    plainDescription: 'Skin that looks flat, tired, or lacking its natural glow, even without a specific breakout or mark.',
    tagline: 'Restore radiance and even skin texture',
    medicalReferral: false,
  },
]

// ─── QUIZ QUESTIONS ───────────────────────────────────────────────────────────
// Architecture: two-stage flow.
//   TYPE_QUIZ_QUESTIONS  — Quiz A: identify skin type (oily/dry/combination/normal)
//   CONCERN_QUIZZES      — Quiz B–E: type-specific concern quiz (5 questions per type)
//   SHAVING_GATE         — shown before concern Q1 in all four concern quizzes
//
// Scoring flags on options:
//   skipNextQuestion: true   — skip concern Q2 (aftermath question)
//   requiresShaving: true    — option hidden when shaving gate = 'no'
//   medicalReferral: true    — surfaces dermatologist note in results
//   conditional: true        — on a question: can be skipped by Q1 answer

export const SHAVING_GATE = {
  id: 'gate_shaving',
  isGate: true,
  question: 'Do you shave your face regularly?',
  options: [
    { text: 'Yes', value: 'yes' },
    { text: 'No', value: 'no' },
  ],
}

// ── Quiz A — Skin Type Identification (6 questions) ──────────────────────────
export const TYPE_QUIZ_QUESTIONS = [
  {
    id: 'tq1',
    question: 'A few hours after washing your face with nothing on it, what do you notice?',
    options: [
      { text: 'Stays matte all day, no shine anywhere',                                          scores: [{ axis: 'type', id: 'normal',      weight: 3 }] },
      { text: 'Shine only in the forehead/nose area, after several hours',                       scores: [{ axis: 'type', id: 'combination', weight: 3 }] },
      { text: 'Shine across the whole face, but only after several hours',                       scores: [{ axis: 'type', id: 'oily',        weight: 2 }] },
      { text: 'Shine across the whole face fairly quickly (within an hour or two)',               scores: [{ axis: 'type', id: 'oily',        weight: 3 }] },
      { text: 'Stays tight or dull-looking, never shiny',                                        scores: [{ axis: 'type', id: 'dry',         weight: 3 }] },
    ],
  },
  {
    id: 'tq2',
    question: 'Looking closely in the mirror, how do your pores look?',
    options: [
      { text: 'Larger and more visible across most of the face',                                 scores: [{ axis: 'type', id: 'oily',        weight: 3 }] },
      { text: 'Larger and more visible mainly around the nose/center of the face',               scores: [{ axis: 'type', id: 'combination', weight: 3 }] },
      { text: 'Small and barely visible, skin also looks a bit flat or dull',                    scores: [{ axis: 'type', id: 'dry',         weight: 1 }] },
      { text: 'Small to normal-looking, skin looks smooth and balanced',                         scores: [{ axis: 'type', id: 'normal',      weight: 2 }] },
    ],
  },
  {
    id: 'tq3',
    question: 'Right after washing your face, before applying anything, how does your skin feel?',
    options: [
      { text: 'Tight or stretched until I moisturize',                                           scores: [{ axis: 'type', id: 'dry',         weight: 3 }] },
      { text: 'Tight in some spots (usually cheeks) but fine elsewhere',                         scores: [{ axis: 'type', id: 'combination', weight: 2 }] },
      { text: 'Comfortable almost immediately, no tightness',                                    scores: [{ axis: 'type', id: 'normal',      weight: 2 }] },
      { text: 'Comfortable, sometimes even a little oily already',                               scores: [{ axis: 'type', id: 'oily',        weight: 2 }] },
    ],
  },
  {
    id: 'tq4',
    question: 'Do you get dry, flaky patches on your face?',
    options: [
      { text: 'Never',                                                                           scores: [] },
      { text: 'Occasionally, mostly in cold or dry weather',                                     scores: [{ axis: 'type', id: 'normal',      weight: 1 }] },
      { text: 'Regularly, in specific spots like the cheeks or around the nose',                 scores: [{ axis: 'type', id: 'combination', weight: 2 }] },
      { text: 'Regularly, across most of the face',                                              scores: [{ axis: 'type', id: 'dry',         weight: 3 }] },
    ],
  },
  {
    id: 'tq5',
    question: 'If you skip moisturizer for a day, what happens?',
    options: [
      { text: 'Feels tight or uncomfortable within an hour or two',                              scores: [{ axis: 'type', id: 'dry',         weight: 3 }] },
      { text: 'Only certain areas (usually cheeks) feel tight, the rest is fine',                scores: [{ axis: 'type', id: 'combination', weight: 3 }] },
      { text: 'Don\'t really notice much difference',                                            scores: [{ axis: 'type', id: 'oily',        weight: 1 }] },
      { text: 'Nothing changes, feels fine either way',                                          scores: [{ axis: 'type', id: 'normal',      weight: 2 }] },
    ],
  },
  {
    id: 'tq6',
    question: 'By the end of the day, compared to the morning, your face looks:',
    options: [
      { text: 'Noticeably shinier all over',                                                     scores: [{ axis: 'type', id: 'oily',        weight: 3 }] },
      { text: 'Shinier, mainly in the center (forehead, nose, chin)',                            scores: [{ axis: 'type', id: 'combination', weight: 3 }] },
      { text: 'About the same as the morning',                                                   scores: [{ axis: 'type', id: 'normal',      weight: 2 }] },
      { text: 'Drier, or with visible flaky patches by evening',                                 scores: [{ axis: 'type', id: 'dry',         weight: 3 }] },
    ],
  },
]

// ── Shared concern Q1 / Q2 option sets (identical across all four type quizzes) ─
// Q1 options (breakout type)
const CONCERN_Q1_OPTIONS = [
  {
    text: 'Small black dots or tiny white bumps on the surface',
    scores: [{ axis: 'concern', id: 'comedonal_acne', weight: 2 }],
    skipNextQuestion: false, medicalReferral: false,
  },
  {
    text: 'Red bumps with a visible white or yellow center — usually not very painful',
    scores: [{ axis: 'concern', id: 'pustular_acne', weight: 3 }],
    skipNextQuestion: false, medicalReferral: false,
  },
  {
    text: 'Deep, painful lumps under the skin that ache and take a long time to go away',
    scores: [{ axis: 'concern', id: 'cystic_acne', weight: 3 }],
    skipNextQuestion: false, medicalReferral: true,
  },
  {
    text: 'Red, irritated bumps mostly where I shave',
    scores: [{ axis: 'concern', id: 'razor_bumps', weight: 3 }],
    skipNextQuestion: false, medicalReferral: false,
    requiresShaving: true,  // hidden when shaving gate = 'no'
  },
  {
    text: 'I rarely or never get pimples',
    scores: [],
    skipNextQuestion: true, medicalReferral: false,
  },
]

// Q2 options (pimple aftermath — conditional)
const CONCERN_Q2_OPTIONS = [
  {
    text: 'Flat, red or pink mark that takes weeks to fade',
    scores: [{ axis: 'concern', id: 'pie', weight: 2 }],
    skipNextQuestion: false, medicalReferral: false,
  },
  {
    text: 'Flat, dark brown or grayish mark',
    scores: [{ axis: 'concern', id: 'pih', weight: 2 }],
    skipNextQuestion: false, medicalReferral: false,
  },
  {
    text: 'A physical dent, pit, or small crater',
    scores: [{ axis: 'concern', id: 'atrophic_scarring', weight: 3 }],
    skipNextQuestion: false, medicalReferral: false,
  },
  {
    text: 'Nothing — skin heals completely clear',
    scores: [],
    skipNextQuestion: false, medicalReferral: false,
  },
]

// Helper: build the shared Q1 and Q2 question objects with a type-specific lead-in.
function makeConcernQ1(leadIn) {
  return { id: 'cq1', question: leadIn, options: CONCERN_Q1_OPTIONS }
}
function makeConcernQ2() {
  return {
    id: 'cq2',
    question: 'What happens after a pimple finally flattens out and goes away?',
    conditional: true,
    options: CONCERN_Q2_OPTIONS,
  }
}

// ── Shared concern Q6 / Q7 / Q8 option sets (identical across all four type quizzes) ─
// Q6 options (under-eye / dark circles)
const CONCERN_Q6_OPTIONS = [
  {
    text: 'Noticeably darker than the rest of my face, most of the time',
    scores: [{ axis: 'concern', id: 'dark_circles', weight: 3 }],
    medicalReferral: false,
  },
  {
    text: 'A little darker, especially when I\'m tired or up late',
    scores: [{ axis: 'concern', id: 'dark_circles', weight: 2 }],
    medicalReferral: false,
  },
  {
    text: 'About the same color as the rest of my face',
    scores: [],
    medicalReferral: false,
  },
]

// Q7 options (pore visibility / large pores)
const CONCERN_Q7_OPTIONS = [
  {
    text: 'Clearly visible, almost like small dots, across my nose and cheeks',
    scores: [{ axis: 'concern', id: 'large_pores', weight: 3 }],
    medicalReferral: false,
  },
  {
    text: 'Somewhat visible, mainly around my nose',
    scores: [{ axis: 'concern', id: 'large_pores', weight: 2 }],
    medicalReferral: false,
  },
  {
    text: 'Barely visible, skin looks fairly smooth',
    scores: [],
    medicalReferral: false,
  },
]

// Q8 options (overall glow / dullness)
const CONCERN_Q8_OPTIONS = [
  {
    text: 'Looks flat, tired, or lacks glow even when I\'m not breaking out',
    scores: [{ axis: 'concern', id: 'dullness', weight: 3 }],
    medicalReferral: false,
  },
  {
    text: 'Sometimes looks a bit dull, especially after poor sleep or not drinking enough water',
    scores: [{ axis: 'concern', id: 'dullness', weight: 2 }],
    medicalReferral: false,
  },
  {
    text: 'Still looks fairly bright/healthy most of the time',
    scores: [],
    medicalReferral: false,
  },
]

function makeConcernQ6() {
  return {
    id: 'cq6',
    question: 'How do the areas under your eyes usually look, regardless of how much sleep you got?',
    options: CONCERN_Q6_OPTIONS,
  }
}
function makeConcernQ7() {
  return {
    id: 'cq7',
    question: 'Look closely at your nose and cheeks in good lighting. How noticeable are your pores?',
    options: CONCERN_Q7_OPTIONS,
  }
}
function makeConcernQ8() {
  return {
    id: 'cq8',
    question: 'Compared to a few years ago, how would you describe your skin\'s overall look?',
    options: CONCERN_Q8_OPTIONS,
  }
}

// ── Quiz B – Oily (8 questions) ───────────────────────────────────────────────
// ── Quiz C – Dry  (8 questions) ───────────────────────────────────────────────
// ── Quiz D – Combination (8 questions) ───────────────────────────────────────
// ── Quiz E – Normal (8 questions) ────────────────────────────────────────────
export const CONCERN_QUIZZES = {
  oily: [
    makeConcernQ1('Oily skin often deals with clogged pores and breakouts. When you get a pimple, what\'s it usually like?'),
    makeConcernQ2(),
    {
      id: 'cq3',
      question: 'Do you notice blackheads or clogged-looking pores, especially around your nose and chin?',
      options: [
        { text: 'A lot — especially in the T-zone',                                              scores: [{ axis: 'concern', id: 'congestion_prone',        weight: 3 }], medicalReferral: false },
        { text: 'A few, nothing major',                                                          scores: [{ axis: 'concern', id: 'congestion_prone',        weight: 2 }], medicalReferral: false },
        { text: 'Rarely',                                                                        scores: [{ axis: 'concern', id: 'congestion_prone',        weight: 1 }], medicalReferral: false },
        { text: 'Pores look clear',                                                              scores: [],                                                              medicalReferral: false },
      ],
    },
    {
      id: 'cq4',
      question: 'Do you get greasy, slightly yellowish flakes around your nose, eyebrows, or beard — different from normal dry flaking?',
      options: [
        { text: 'Yes, fairly often',                                                             scores: [{ axis: 'concern', id: 'seborrheic_dermatitis',   weight: 3 }], medicalReferral: true  },
        { text: 'Occasionally',                                                                  scores: [{ axis: 'concern', id: 'seborrheic_dermatitis',   weight: 2 }], medicalReferral: true  },
        { text: 'No',                                                                            scores: [],                                                              medicalReferral: false },
      ],
    },
    {
      id: 'cq5',
      question: 'Does your skin sting, burn, or turn red easily, even though it\'s oily?',
      options: [
        { text: 'Yes — even basic products or sweat make it sting and turn red',                 scores: [{ axis: 'concern', id: 'sensitive_reactive',      weight: 3 }], medicalReferral: false },
        { text: 'Only with specific things like exfoliants or strong actives',                   scores: [{ axis: 'concern', id: 'sensitive_reactive',      weight: 2 }], medicalReferral: false },
        { text: 'No — it\'s resilient',                                                          scores: [],                                                              medicalReferral: false },
      ],
    },
    makeConcernQ6(),
    makeConcernQ7(),
    makeConcernQ8(),
  ],

  dry: [
    makeConcernQ1('Even dry skin can get occasional breakouts. When you get a pimple, what\'s it usually like?'),
    makeConcernQ2(),
    {
      id: 'cq3',
      question: 'Do your pores ever look clogged, or does your skin feel bumpy under moisturizer or thicker creams?',
      options: [
        { text: 'Yes, fairly often',                                                             scores: [{ axis: 'concern', id: 'congestion_prone',        weight: 2 }], medicalReferral: false },
        { text: 'Occasionally',                                                                  scores: [{ axis: 'concern', id: 'congestion_prone',        weight: 1 }], medicalReferral: false },
        { text: 'No',                                                                            scores: [],                                                              medicalReferral: false },
      ],
    },
    {
      id: 'cq4',
      question: 'When your skin flakes, is it usually:',
      options: [
        { text: 'Dry and powdery — normal-looking dry skin',                                     scores: [],                                                              medicalReferral: false },
        { text: 'Slightly greasy or yellowish, especially near my nose, eyebrows, or beard',     scores: [{ axis: 'concern', id: 'seborrheic_dermatitis',   weight: 3 }], medicalReferral: true  },
        { text: 'A mix — depends on the area',                                                   scores: [{ axis: 'concern', id: 'seborrheic_dermatitis',   weight: 2 }], medicalReferral: true  },
        { text: 'I don\'t really flake',                                                         scores: [],                                                              medicalReferral: false },
      ],
    },
    {
      id: 'cq5',
      question: 'Does your skin get red, itchy, or irritated easily — especially after washing or in cold weather?',
      options: [
        { text: 'Yes, frequently',                                                               scores: [{ axis: 'concern', id: 'sensitive_reactive',      weight: 3 }], medicalReferral: false },
        { text: 'Sometimes, mainly in harsh weather',                                            scores: [{ axis: 'concern', id: 'sensitive_reactive',      weight: 2 }], medicalReferral: false },
        { text: 'Rarely',                                                                        scores: [{ axis: 'concern', id: 'sensitive_reactive',      weight: 1 }], medicalReferral: false },
        { text: 'No',                                                                            scores: [],                                                              medicalReferral: false },
      ],
    },
    makeConcernQ6(),
    makeConcernQ7(),
    makeConcernQ8(),
  ],

  combination: [
    makeConcernQ1('Combination skin often breaks out mainly in the T-zone. When you get a pimple, what\'s it usually like?'),
    makeConcernQ2(),
    {
      id: 'cq3',
      question: 'How clogged or bumpy does your T-zone feel compared to your cheeks?',
      options: [
        { text: 'Noticeably more congested in the T-zone',                                       scores: [{ axis: 'concern', id: 'congestion_prone',        weight: 3 }], medicalReferral: false },
        { text: 'Slightly more congested in the T-zone',                                         scores: [{ axis: 'concern', id: 'congestion_prone',        weight: 2 }], medicalReferral: false },
        { text: 'About the same everywhere — some congestion in both zones',                     scores: [{ axis: 'concern', id: 'congestion_prone',        weight: 1 }], medicalReferral: false },
        { text: 'Not clogged anywhere',                                                          scores: [],                                                              medicalReferral: false },
      ],
    },
    {
      id: 'cq4',
      question: 'Do you get greasy, yellowish flakes around your nose or eyebrows, even while your cheeks stay normal or dry?',
      options: [
        { text: 'Yes, fairly often',                                                             scores: [{ axis: 'concern', id: 'seborrheic_dermatitis',   weight: 3 }], medicalReferral: true  },
        { text: 'Occasionally',                                                                  scores: [{ axis: 'concern', id: 'seborrheic_dermatitis',   weight: 2 }], medicalReferral: true  },
        { text: 'No',                                                                            scores: [],                                                              medicalReferral: false },
      ],
    },
    {
      id: 'cq5',
      question: 'Do your cheeks (the drier side of your face) get red, tight, or irritated more easily than your T-zone?',
      options: [
        { text: 'Yes, noticeably — cheeks react much more',                                      scores: [{ axis: 'concern', id: 'sensitive_reactive',      weight: 3 }], medicalReferral: false },
        { text: 'A little — cheeks are slightly more sensitive',                                 scores: [{ axis: 'concern', id: 'sensitive_reactive',      weight: 2 }], medicalReferral: false },
        { text: 'No — both zones react about the same',                                          scores: [],                                                              medicalReferral: false },
      ],
    },
    makeConcernQ6(),
    makeConcernQ7(),
    makeConcernQ8(),
  ],

  normal: [
    makeConcernQ1('Even balanced skin gets the occasional breakout. When you get a pimple, what\'s it usually like?'),
    makeConcernQ2(),
    {
      id: 'cq3',
      question: 'Do you ever notice clogged pores or blackheads, even occasionally?',
      options: [
        { text: 'Yes, sometimes',                                                                scores: [{ axis: 'concern', id: 'congestion_prone',        weight: 2 }], medicalReferral: false },
        { text: 'Rarely',                                                                        scores: [{ axis: 'concern', id: 'congestion_prone',        weight: 1 }], medicalReferral: false },
        { text: 'Never',                                                                         scores: [],                                                              medicalReferral: false },
      ],
    },
    {
      id: 'cq4',
      question: 'Do you get greasy, slightly yellowish flakes around your nose, eyebrows, or beard — different from normal dry flaking?',
      options: [
        { text: 'Yes, fairly often',                                                             scores: [{ axis: 'concern', id: 'seborrheic_dermatitis',   weight: 3 }], medicalReferral: true  },
        { text: 'Occasionally',                                                                  scores: [{ axis: 'concern', id: 'seborrheic_dermatitis',   weight: 2 }], medicalReferral: true  },
        { text: 'No',                                                                            scores: [],                                                              medicalReferral: false },
      ],
    },
    {
      id: 'cq5',
      question: 'Does your skin ever react to new products, weather changes, or stress with redness or irritation?',
      options: [
        { text: 'Yes, fairly easily',                                                            scores: [{ axis: 'concern', id: 'sensitive_reactive',      weight: 3 }], medicalReferral: false },
        { text: 'Occasionally',                                                                  scores: [{ axis: 'concern', id: 'sensitive_reactive',      weight: 2 }], medicalReferral: false },
        { text: 'No — it handles most things fine',                                              scores: [],                                                              medicalReferral: false },
      ],
    },
    makeConcernQ6(),
    makeConcernQ7(),
    makeConcernQ8(),
  ],
}

// Keep old QUIZ_QUESTIONS export as a deprecated alias so any future import doesn't hard-break.
// The new components import TYPE_QUIZ_QUESTIONS and CONCERN_QUIZZES instead.
export const QUIZ_QUESTIONS = [
  // ── Q1 — The Pimple Type ─────────────────────────────────────────────────
  {
    id: 'q1',
    question: 'When you get a pimple, what kind is it usually?',
    // The razor_bumps option is only shown when the shaving gate answered 'yes'
    options: [
      {
        text: 'Small black dots or tiny white bumps on the surface',
        scores: [{ axis: 'concern', id: 'comedonal_acne', weight: 2 }],
        skipNextQuestion: false,
        medicalReferral: false,
      },
      {
        text: 'Deep, painful lumps under the skin that ache and take a long time to go away',
        scores: [{ axis: 'concern', id: 'cystic_acne', weight: 3 }],
        skipNextQuestion: false,
        medicalReferral: true,
      },
      {
        text: 'Red, irritated bumps mostly where I shave',
        scores: [{ axis: 'concern', id: 'razor_bumps', weight: 3 }],
        skipNextQuestion: false,
        medicalReferral: false,
        requiresShaving: true,  // filtered out when shaving gate = 'no'
      },
      {
        text: 'I rarely or never get pimples',
        scores: [],
        skipNextQuestion: true,  // skip Q2 entirely
        medicalReferral: false,
      },
    ],
  },

  // ── Q2 — The Pimple Aftermath (conditional: only shown if Q1 ≠ "rarely/never") ──
  {
    id: 'q2',
    question: 'What happens after a pimple finally flattens out and goes away?',
    conditional: true,
    options: [
      {
        text: 'Flat, red or pink mark that takes weeks to fade',
        scores: [{ axis: 'concern', id: 'pie', weight: 2 }],
        skipNextQuestion: false,
        medicalReferral: false,
      },
      {
        text: 'Flat, dark brown or grayish mark',
        scores: [{ axis: 'concern', id: 'pih', weight: 2 }],
        skipNextQuestion: false,
        medicalReferral: false,
      },
      {
        text: 'A physical dent, pit, or small crater',
        scores: [{ axis: 'concern', id: 'atrophic_scarring', weight: 3 }],
        skipNextQuestion: false,
        medicalReferral: false,
      },
      {
        text: 'Nothing — skin heals completely clear',
        scores: [],
        skipNextQuestion: false,
        medicalReferral: false,
      },
    ],
  },

  // ── Q3 — Mid-Day Mirror Test (Look) ────────────────────────────────────────
  {
    id: 'q3',
    question: 'Wash your face, wait two hours, and look in the mirror. What do you see?',
    options: [
      {
        text: 'Whole face looks shiny and slick',
        scores: [{ axis: 'type', id: 'oily', weight: 3 }],
        skipNextQuestion: false,
        medicalReferral: false,
      },
      {
        text: 'Just forehead and nose are shiny, rest looks normal',
        scores: [{ axis: 'type', id: 'combination', weight: 3 }],
        skipNextQuestion: false,
        medicalReferral: false,
      },
      {
        text: 'Looks dull, flat, or has dry patches',
        scores: [{ axis: 'type', id: 'dry', weight: 2 }],
        skipNextQuestion: false,
        medicalReferral: false,
      },
      {
        text: 'Looks completely normal',
        scores: [{ axis: 'type', id: 'normal', weight: 2 }],
        skipNextQuestion: false,
        medicalReferral: false,
      },
    ],
  },

  // ── Q4 — Mid-Day Mirror Test (Feel) ────────────────────────────────────────
  // dehydrated is a modifier — stored separately, can co-exist with any primary type.
  {
    id: 'q4',
    question: 'At that same two-hour mark, how does your skin feel when you move your face?',
    options: [
      {
        text: 'Feels comfortable — no oil and no tightness',
        scores: [{ axis: 'type', id: 'normal', weight: 2 }],
        skipNextQuestion: false,
        medicalReferral: false,
      },
      {
        text: 'Feels comfortable but visibly slick or oily to the touch',
        scores: [{ axis: 'type', id: 'oily', weight: 3 }],
        skipNextQuestion: false,
        medicalReferral: false,
      },
      {
        text: 'Feels tight, like the skin is stretching when I smile',
        scores: [{ axis: 'modifier', id: 'dehydrated', weight: 3 }],
        skipNextQuestion: false,
        medicalReferral: false,
      },
      {
        text: 'Feels rough or sandpaper-like',
        scores: [{ axis: 'type', id: 'dry', weight: 3 }],
        skipNextQuestion: false,
        medicalReferral: false,
      },
    ],
  },

  // ── Q5 — The Flake Check ────────────────────────────────────────────────────
  // Added 5th option for seasonal/inconsistent flaking — a real "delayed / in-between" case.
  {
    id: 'q5',
    question: 'Do you ever get dry, flaky skin on your face?',
    options: [
      {
        text: 'Yes — white, powdery flakes, especially in cold weather',
        scores: [{ axis: 'type', id: 'dry', weight: 3 }],
        skipNextQuestion: false,
        medicalReferral: false,
      },
      {
        text: 'Yes — greasy or yellowish flakes, usually around my nose, eyebrows, or in the beard',
        scores: [{ axis: 'concern', id: 'seborrheic_dermatitis', weight: 3 }],
        skipNextQuestion: false,
        medicalReferral: true,
      },
      {
        text: 'Sometimes — only when the weather is particularly dry or cold, otherwise not really',
        scores: [
          { axis: 'type', id: 'dry', weight: 1 },
          { axis: 'modifier', id: 'dehydrated', weight: 1 },
        ],
        skipNextQuestion: false,
        medicalReferral: false,
      },
      {
        text: 'No flakes, but skin looks or feels oily',
        scores: [{ axis: 'type', id: 'oily', weight: 1 }],
        skipNextQuestion: false,
        medicalReferral: false,
      },
      {
        text: 'No flakes — skin looks and feels balanced',
        scores: [{ axis: 'type', id: 'normal', weight: 1 }],
        skipNextQuestion: false,
        medicalReferral: false,
      },
    ],
  },

  // ── Q6 — The Sensitivity Check ────────────────────────────────────────────
  // Added 4th option for mild/occasional reactivity (delayed, not immediate).
  {
    id: 'q6',
    question: 'Does your face easily get red, hot, or irritated?',
    options: [
      {
        text: 'Yes — even basic face washes or sweating makes it sting and turn red',
        scores: [{ axis: 'concern', id: 'sensitive_reactive', weight: 3 }],
        skipNextQuestion: false,
        medicalReferral: false,
      },
      {
        text: 'Sometimes — only with certain products or weather; not reliably',
        scores: [{ axis: 'concern', id: 'sensitive_reactive', weight: 1 }],
        skipNextQuestion: false,
        medicalReferral: false,
      },
      {
        text: 'Only on my neck or jaw right after I shave',
        scores: [{ axis: 'concern', id: 'shaving_irritation', weight: 2 }],
        skipNextQuestion: false,
        medicalReferral: false,
      },
      {
        text: 'No — my skin handles almost anything',
        scores: [],
        skipNextQuestion: false,
        medicalReferral: false,
      },
    ],
  },

  // ── Q7 — The Lotion Test ───────────────────────────────────────────────────
  // Added 5th option for delayed oiliness (timing-aware gap identified in user testing).
  {
    id: 'q7',
    question: 'What happens if you put on a standard drugstore face lotion or sunscreen?',
    options: [
      {
        text: 'Immediately feels greasy or sweaty and seems to clog pores',
        scores: [
          { axis: 'type', id: 'oily', weight: 2 },
          { axis: 'concern', id: 'congestion_prone', weight: 2 },
        ],
        skipNextQuestion: false,
        medicalReferral: false,
      },
      {
        text: 'Burns or turns red almost instantly',
        scores: [{ axis: 'concern', id: 'sensitive_reactive', weight: 3 }],
        skipNextQuestion: false,
        medicalReferral: false,
      },
      {
        text: 'Feels fine at first, but gets shiny or oily after an hour or two',
        scores: [{ axis: 'type', id: 'combination', weight: 2 }],
        skipNextQuestion: false,
        medicalReferral: false,
      },
      {
        text: 'Feels great — skin completely drinks it up',
        scores: [
          { axis: 'type', id: 'dry', weight: 2 },
          { axis: 'modifier', id: 'dehydrated', weight: 1 },
        ],
        skipNextQuestion: false,
        medicalReferral: false,
      },
      {
        text: 'Absorbs normally — no reaction, skin looks the same as before',
        scores: [{ axis: 'type', id: 'normal', weight: 2 }],
        skipNextQuestion: false,
        medicalReferral: false,
      },
    ],
  },
]

// ─── SCORING ENGINE ───────────────────────────────────────────────────────────
const LOW_SIGNAL_THRESHOLD = 0.35
const SECONDARY_THRESHOLD  = 0.75

/**
 * computeTypeQuizResult(answers)
 * Scores Quiz A (TYPE_QUIZ_QUESTIONS) and returns the resolved skin type.
 *
 * @param {Array} answers — answered option objects from the 6-question type quiz
 * @returns {{ primary: string, confidence: 'high'|'moderate'|'low' }}
 */
export function computeTypeQuizResult(answers) {
  const typeScores = {}
  answers.forEach(opt =>
    opt.scores.forEach(({ axis, id, weight }) => {
      if (axis === 'type') typeScores[id] = (typeScores[id] || 0) + weight
    })
  )

  // Max-possible per type across all questions
  const maxType = {}
  TYPE_QUIZ_QUESTIONS.forEach(q => {
    const best = {}
    q.options.forEach(opt =>
      opt.scores.forEach(({ axis, id, weight }) => {
        const k = `${axis}::${id}`
        if (!best[k] || weight > best[k].weight) best[k] = { axis, id, weight }
      })
    )
    Object.values(best).forEach(({ axis, id, weight }) => {
      if (axis === 'type') maxType[id] = (maxType[id] || 0) + weight
    })
  })

  // Normalize
  const normType = {}
  Object.entries(typeScores).forEach(([id, raw]) => {
    const max = maxType[id]
    if (max) normType[id] = raw / max
  })

  const sortedTypes = Object.entries(normType).sort((a, b) => b[1] - a[1])
  if (sortedTypes.length === 0) return { primary: 'normal', confidence: 'low' }

  const [topId, topScore] = sortedTypes[0]
  const tied = sortedTypes.filter(([, s]) => s === topScore)
  const primary = tied.length > 1
    ? tied.sort((a, b) => (typeScores[b[0]] || 0) - (typeScores[a[0]] || 0))[0][0]
    : topId

  const confidence = topScore >= 0.65 ? 'high' : topScore >= LOW_SIGNAL_THRESHOLD ? 'moderate' : 'low'
  return { primary, confidence }
}

/**
 * computeConcernQuizResult(answers, type, q2Skipped)
 * Scores one of the four type-specific concern quizzes (B–E).
 *
 * @param {Array}          answers    — answered option objects in question order
 * @param {string|Array}   type       — skin type string (or questions array for legacy fallback)
 * @param {boolean}        q2Skipped  — true when concern Q1 "rarely/never" was chosen
 * @returns {{ concerns: Array<{id, confidence, medicalReferral}>, lowSignalConcern: boolean }}
 */
export function computeConcernQuizResult(answers, type, q2Skipped = false) {
  const questions = Array.isArray(type) ? type : (CONCERN_QUIZZES[type] ?? CONCERN_QUIZZES['normal'])
  // 1. Accumulate raw concern scores
  const concernScores = {}
  answers.forEach(opt =>
    opt.scores.forEach(({ axis, id, weight }) => {
      if (axis === 'concern') concernScores[id] = (concernScores[id] || 0) + weight
    })
  )

  // 2. Max-possible per concern across questions actually shown (respecting q2 skip)
  const maxConcern = {}
  questions.forEach(q => {
    if (q.conditional && q2Skipped) return
    const best = {}
    q.options.forEach(opt =>
      opt.scores.forEach(({ axis, id, weight }) => {
        const k = `${axis}::${id}`
        if (!best[k] || weight > best[k].weight) best[k] = { axis, id, weight }
      })
    )
    Object.values(best).forEach(({ axis, id, weight }) => {
      if (axis === 'concern') maxConcern[id] = (maxConcern[id] || 0) + weight
    })
  })

  // 3. Normalize — exclude zero-max
  const normConcern = {}
  Object.entries(concernScores).forEach(([id, raw]) => {
    const max = maxConcern[id]
    if (max) normConcern[id] = raw / max
  })

  const sortedConcerns = Object.entries(normConcern).sort((a, b) => b[1] - a[1])
  const concerns = []
  let lowSignalConcern = false

  if (sortedConcerns.length === 0) {
    lowSignalConcern = true
  } else {
    const [topId, topScore] = sortedConcerns[0]
    if (topScore < LOW_SIGNAL_THRESHOLD) {
      lowSignalConcern = true
    } else {
      // Determine medicalReferral from option flags OR taxonomy definition
      const isMedical = (id) =>
        questions.some(q => q.options.some(o => o.medicalReferral && (o.scores || []).some(s => s.id === id))) ||
        (SKIN_PROBLEMS.find(p => p.id === id)?.medicalReferral ?? false)

      const mkEntry = (id, score) => ({
        id,
        confidence: score >= 0.65 ? 'high' : score >= LOW_SIGNAL_THRESHOLD ? 'moderate' : 'low',
        medicalReferral: isMedical(id),
      })

      concerns.push(mkEntry(topId, topScore))

      if (sortedConcerns.length > 1) {
        const [secId, secScore] = sortedConcerns[1]
        if (secScore >= topScore * SECONDARY_THRESHOLD) concerns.push(mkEntry(secId, secScore))
      }
    }
  }

  return { concerns, lowSignalConcern }
}

/** @deprecated use computeTypeQuizResult + computeConcernQuizResult instead */
export function computeQuizResult(answers, q2Skipped = false) {
  // Legacy shim — routes through new functions with the old combined question set
  const typeResult    = computeTypeQuizResult(answers)
  const concernResult = computeConcernQuizResult(answers, QUIZ_QUESTIONS, q2Skipped)
  return { skinType: { primary: typeResult.primary, modifier: null, confidence: typeResult.confidence }, ...concernResult }
}

// ─── BUILD ROUTINE ────────────────────────────────────────────────────────────

const INGREDIENT_CONFLICTS = [
  { group: ['salicylic_acid', 'glycolic_acid', 'lactic_acid', 'pha'],  strategy: 'split_ampm' },
  { group: ['vitamin_c', 'salicylic_acid'],                             strategy: 'split_ampm' },
  { group: ['vitamin_c', 'glycolic_acid'],                              strategy: 'split_ampm' },
  { group: ['retinol', 'salicylic_acid'],                               strategy: 'alternate_days' },
  { group: ['retinol', 'vitamin_c'],                                    strategy: 'split_ampm' },
  { group: ['retinol', 'benzoyl_peroxide'],                             strategy: 'alternate_days' },
  { group: ['benzoyl_peroxide', 'salicylic_acid'],                      strategy: 'alternate_days' },
]

function getConflict(tagA, tagB) {
  for (const rule of INGREDIENT_CONFLICTS) {
    if (rule.group.includes(tagA) && rule.group.includes(tagB)) return rule.strategy
  }
  return null
}

function mergeRoutines(primary, secondary) {
  if (!secondary) return primary
  if (!primary)   return secondary

  const result = { am: [...primary.am], pm: [...primary.pm] }
  const tagsIn = (steps) => steps.flatMap(s => s.activeTags || [])

  ;['am', 'pm'].forEach(session => {
    const other = session === 'am' ? 'pm' : 'am'
    ;(secondary[session] || []).forEach(step => {
      // For Cleanse, Moisturize, and SPF: replace existing step in result if present
      if (['Cleanse', 'Moisturize', 'SPF'].includes(step.step)) {
        const idx = result[session].findIndex(e => e.step === step.step)
        if (idx !== -1) {
          result[session][idx] = step
        } else {
          result[session].push(step)
        }
        return
      }

      if (result[session].some(e => e.product === step.product)) return

      const existingTags = tagsIn(result[session])
      const stepTags = step.activeTags || []
      let conflict = null

      for (const nt of stepTags) {
        for (const et of existingTags) {
          conflict = getConflict(nt, et)
          if (conflict) break
        }
        if (conflict) break
      }

      if (!conflict) {
        result[session].push(step)
      } else if (conflict === 'split_ampm') {
        if (!result[other].some(e => e.product === step.product)) {
          result[other].push({ ...step, conflictNote: `Moved to ${other.toUpperCase()} to avoid layering conflicting actives.` })
        }
      } else {
        result[session].push({ ...step, conflictNote: 'Use on alternate days — don\'t layer this with the other active in the same session.' })
      }
    })
  })

  const ORDER = ['Cleanse', 'Treat', 'Moisturize', 'SPF']
  const sort = (steps) => [
    ...ORDER.flatMap(n => steps.filter(s => s.step === n)),
    ...steps.filter(s => !ORDER.includes(s.step)),
  ]

  result.am = sort(result.am)
  result.pm = sort(result.pm)
  return result
}

/**
 * buildRoutine(quizResult)
 * Constructs a merged, conflict-aware AM/PM routine dynamically from the quiz result starter-tier ingredients.
 * Returns routine with a human-readable label.
 */
export function buildRoutine(quizResult) {
  const { skinType, concerns, lowSignalConcern } = quizResult
  const { primary, modifier } = skinType

  // Helper to normalize keys for deduplication
  const getNormalizedKey = (name) => {
    const lower = name.toLowerCase()
    if (lower.includes('niacinamide')) return 'niacinamide'
    if (lower.includes('hyaluronic')) return 'hyaluronic_acid'
    if (lower.includes('ceramide')) return 'ceramides'
    if (lower.includes('glycerin')) return 'glycerin'
    if (lower.includes('aloe vera') || lower.includes('centella') || lower.includes('cica') || lower.includes('soothing gel')) return 'soothing_gel'
    if (lower.includes('salicylic acid cleanser')) return 'salicylic_cleanse'
    if (lower.includes('salicylic acid')) return 'salicylic_acid'
    if (lower.includes('vitamin c')) return 'vitamin_c'
    if (lower.includes('zinc pca')) return 'zinc_pca'
    if (lower.includes('zinc pyrithione')) return 'zinc_pyrithione'
    if (lower.includes('squalane')) return 'squalane'
    if (lower.includes('caffeine')) return 'caffeine'
    if (lower.includes('clay mask')) return 'clay_mask'
    if (lower.includes('lactic acid')) return 'lactic_acid'
    return lower
  }

  // Helper to dynamically get the product form based on step and ingredient name
  const getProductForm = (ingredientName, step) => {
    if (step === 'Cleanse') return 'Cleanser'
    if (step === 'Moisturize') return 'Moisturizer'
    if (step === 'SPF') return 'Sunscreen'
    
    // For Treat steps:
    const normalized = ingredientName.toLowerCase()
    if (normalized.includes('niacinamide')) return 'Serum'
    if (normalized.includes('zinc pca')) return 'Serum'
    if (normalized.includes('hyaluronic')) return 'Serum'
    if (normalized.includes('ceramides')) return 'Cream'
    if (normalized.includes('glycerin')) return 'Serum'
    if (normalized.includes('zinc pyrithione')) return 'Wash'
    if (normalized.includes('ketoconazole')) return 'Cream'
    if (normalized.includes('benzoyl peroxide')) return 'Spot Treatment'
    if (normalized.includes('caffeine')) return 'Eye Gel/Cream'
    if (normalized.includes('vitamin k')) return 'Eye Cream'
    if (normalized.includes('clay')) return 'Mask (1–2x/week)'
    if (normalized.includes('glycolic')) return 'Toner'
    if (normalized.includes('vitamin c')) return 'Serum'
    if (normalized.includes('azelaic')) return 'Serum'
    if (normalized.includes('retinoid')) return 'Product'
    if (normalized.includes('dermatologist')) return 'Treatments'
    if (normalized.includes('squalane')) return 'Oil'
    if (normalized.includes('aloe vera') || normalized.includes('aloe')) return 'Pure Gel'
    if (normalized.includes('centella') || normalized.includes('cica')) return 'Gel'
    if (normalized.includes('salicylic acid')) {
      if (normalized.includes('bha')) return 'Toner'
      return 'Leave-on Treatment'
    }
    return 'Treatment' // Fallback
  }

  // --- 1. Gather other steps (Cleanse, Moisturize, SPF) ---
  const activeStarters = []
  const addStartersFromKey = (key) => {
    const list = INGREDIENTS[key] || []
    list.forEach(ing => {
      if (ing.tier !== 'next-step') {
        activeStarters.push(ing)
      }
    })
  }

  addStartersFromKey(primary)
  if (modifier) addStartersFromKey(modifier)
  if (!lowSignalConcern) {
    concerns.forEach(c => addStartersFromKey(c.id))
  }

  const deduplicateIngredients = (list) => {
    const seen = new Set()
    const unique = []
    list.forEach(ing => {
      const key = getNormalizedKey(ing.name)
      if (!seen.has(key)) {
        seen.add(key)
        unique.push(ing)
      }
    })
    return unique
  }

  const cleansers = activeStarters.filter(ing => ing.step === 'Cleanse')
  const moisturizers = activeStarters.filter(ing => ing.step === 'Moisturize')
  const sunscreens = activeStarters.filter(ing => ing.step === 'SPF')

  // --- 2. Gather TREAT candidates for AM and PM ---
  const getCandidatesForSession = (session) => {
    const candidates = []
    const addCandidates = (key, source, priority) => {
      const list = INGREDIENTS[key] || []
      list.forEach(ing => {
        if (ing.step === 'Treat') {
          const isEligible = (session === 'am')
            ? (ing.timeOfDay === 'AM' || ing.timeOfDay === 'either')
            : (ing.timeOfDay === 'PM' || ing.timeOfDay === 'either')
          if (isEligible) {
            candidates.push({
              ingredient: ing,
              source,
              priority
            })
          }
        }
      })
    }

    addCandidates(primary, 'baseline', 1)
    if (modifier) addCandidates(modifier, 'baseline', 1)
    if (!lowSignalConcern && concerns) {
      if (concerns.length > 0) addCandidates(concerns[0].id, 'primary_concern', 3)
      if (concerns.length > 1) addCandidates(concerns[1].id, 'secondary_concern', 2)
    }

    return candidates
  }

  const amCandidatesRaw = getCandidatesForSession('am')
  const pmCandidatesRaw = getCandidatesForSession('pm')

  // Deduplicate candidates by normalized key, keeping the one with higher priority
  const deduplicateCandidates = (candidates) => {
    const best = {}
    candidates.forEach(cand => {
      const key = getNormalizedKey(cand.ingredient.name)
      const existing = best[key]
      if (!existing || cand.priority > existing.priority) {
        best[key] = cand
      }
    })
    return Object.values(best)
  }

  const amCandidates = deduplicateCandidates(amCandidatesRaw)
  const pmCandidates = deduplicateCandidates(pmCandidatesRaw)

  // Sort candidates by priority descending
  const amSorted = [...amCandidates].sort((a, b) => b.priority - a.priority)
  const pmSorted = [...pmCandidates].sort((a, b) => b.priority - a.priority)

  const amWinner = amSorted.length > 0 ? amSorted[0] : null
  const pmWinner = pmSorted.length > 0 ? pmSorted[0] : null

  // --- 3. Determine Bumped/Staggered Ingredients ("what to add next") ---
  // Combine all candidates across AM & PM
  const allCandidatesMap = {}
  const collectForStaggered = (candidates) => {
    candidates.forEach(cand => {
      const key = getNormalizedKey(cand.ingredient.name)
      const existing = allCandidatesMap[key]
      if (!existing || cand.priority > existing.priority) {
        allCandidatesMap[key] = cand
      }
    })
  }
  collectForStaggered(amCandidates)
  collectForStaggered(pmCandidates)

  // Remove the winners that are used in Day-1 routines
  const amWinnerKey = amWinner ? getNormalizedKey(amWinner.ingredient.name) : null
  const pmWinnerKey = pmWinner ? getNormalizedKey(pmWinner.ingredient.name) : null
  if (amWinnerKey) delete allCandidatesMap[amWinnerKey]
  if (pmWinnerKey) delete allCandidatesMap[pmWinnerKey]

  // Sort bumped ingredients by priority descending
  const bumpedList = Object.values(allCandidatesMap).sort((a, b) => b.priority - a.priority)

  // Assign week intervals
  const whatToAddNext = bumpedList.map((cand, index) => {
    const weekStart = 2 + index * 2
    const weekEnd = weekStart + 1
    const form = getProductForm(cand.ingredient.name, 'Treat')
    return {
      name: cand.ingredient.name,
      form: form,
      timeOfDay: cand.ingredient.timeOfDay,
      plainDescription: cand.ingredient.plainDescription,
      why: cand.ingredient.plainDescription,
      weekLabel: `Week ${weekStart}–${weekEnd}`
    }
  })

  // --- 4. Build the AM/PM routines ---
  const getDefaultCleanser = (type) => {
    if (type === 'oily') return { name: 'Gel or foaming cleanser', plainDescription: 'Helps remove overnight oil build-up without stripping the skin barrier.' }
    if (type === 'dry') return { name: 'Cream or milk cleanser (no foaming agents)', plainDescription: 'Cleanses skin without stripping away natural oils.' }
    if (type === 'combination') return { name: 'Gentle gel cleanser (low-sulfate)', plainDescription: 'Cleanses the oily T-zone without over-drying the cheeks.' }
    return { name: 'Gentle gel or cream cleanser', plainDescription: 'Clean base — balanced skin doesn\'t need anything harsh.' }
  }

  const getDefaultMoisturizer = (type, session) => {
    if (type === 'oily') {
      return { name: 'Lightweight gel moisturizer (oil-free)', plainDescription: session === 'am' ? 'Hydrates without adding shine or clogging pores.' : 'Supports overnight barrier function and keeps skin balanced.' }
    }
    if (type === 'dry') {
      return session === 'am'
        ? { name: 'Rich cream moisturizer with ceramides', plainDescription: 'Locks in moisture and repairs the skin barrier.' }
        : { name: 'Thick overnight cream or sleeping mask', plainDescription: 'Rich overnight hydration to support barrier repair during sleep.' }
    }
    if (type === 'combination') {
      return { name: 'Lightweight gel moisturizer', plainDescription: session === 'am' ? 'Provides lightweight hydration balanced for both oily and dry zones.' : 'Keeps skin balanced and hydrated overnight.' }
    }
    return {
      name: session === 'am' ? 'Lightweight moisturizer' : 'Regular moisturizer',
      plainDescription: session === 'am' ? 'Maintains healthy hydration and barrier function.' : 'Supports skin\'s natural overnight repair process.'
    }
  }

  const defaultSpf = { name: 'Broad-spectrum SPF 30+ sunscreen', plainDescription: 'Protects from UV damage and premature ageing.' }

  // AM steps
  const amClean = cleansers.filter(c => c.timeOfDay === 'AM' || c.timeOfDay === 'either')
  const uniqueAmClean = deduplicateIngredients(amClean)
  const amCleanStep = uniqueAmClean.length > 0
    ? { step: 'Cleanse', product: `Gentle cleanser (look for: ${uniqueAmClean.map(c => `${c.name} ${getProductForm(c.name, 'Cleanse')}`).join(' or ')})`, form: 'Cleanser', why: uniqueAmClean[0].plainDescription, activeTags: uniqueAmClean[0].activeTags || [] }
    : { step: 'Cleanse', product: `Cleanse (look for: ${getDefaultCleanser(primary).name})`, form: 'Cleanser', why: getDefaultCleanser(primary).plainDescription, activeTags: [] }

  const amTreatSteps = amWinner ? [{
    step: 'Treat',
    product: `Targeted treatment (look for: ${amWinner.ingredient.name} ${getProductForm(amWinner.ingredient.name, 'Treat')})`,
    form: getProductForm(amWinner.ingredient.name, 'Treat'),
    why: amWinner.ingredient.plainDescription,
    activeTags: amWinner.ingredient.activeTags || []
  }] : []

  const amMoist = moisturizers.filter(m => m.timeOfDay === 'AM' || m.timeOfDay === 'either')
  const uniqueAmMoist = deduplicateIngredients(amMoist)
  const amMoistStep = uniqueAmMoist.length > 0
    ? { step: 'Moisturize', product: `Moisturizer (look for: ${uniqueAmMoist.map(m => `${m.name} ${getProductForm(m.name, 'Moisturize')}`).join(' or ')})`, form: 'Moisturizer', why: uniqueAmMoist[0].plainDescription, activeTags: uniqueAmMoist[0].activeTags || [] }
    : { step: 'Moisturize', product: `Moisturize (look for: ${getDefaultMoisturizer(primary, 'am').name})`, form: 'Moisturizer', why: getDefaultMoisturizer(primary, 'am').plainDescription, activeTags: [] }

  const amSpf = sunscreens.filter(s => s.timeOfDay === 'AM' || s.timeOfDay === 'either')
  const uniqueAmSpf = deduplicateIngredients(amSpf)
  const hasSunSensitizer = activeStarters.some(i => i.sunSensitizing) || (amWinner && amWinner.ingredient.sunSensitizing) || (pmWinner && pmWinner.ingredient.sunSensitizing)
  const amSpfStep = uniqueAmSpf.length > 0
    ? { step: 'SPF', product: `Apply sunscreen (look for: ${uniqueAmSpf.map(s => `${s.name} ${getProductForm(s.name, 'SPF')}`).join(' or ')})`, form: 'Sunscreen', why: uniqueAmSpf[0].plainDescription, activeTags: uniqueAmSpf[0].activeTags || [], addedForSunSensitivity: hasSunSensitizer }
    : { step: 'SPF', product: `Apply sunscreen (look for: ${defaultSpf.name})`, form: 'Sunscreen', why: defaultSpf.plainDescription, activeTags: [], addedForSunSensitivity: hasSunSensitizer }

  // PM steps
  const pmClean = cleansers.filter(c => c.timeOfDay === 'PM' || c.timeOfDay === 'either')
  const uniquePmClean = deduplicateIngredients(pmClean)
  const pmCleanStep = uniquePmClean.length > 0
    ? { step: 'Cleanse', product: `Gentle cleanser (look for: ${uniquePmClean.map(c => `${c.name} ${getProductForm(c.name, 'Cleanse')}`).join(' or ')})`, form: 'Cleanser', why: uniquePmClean[0].plainDescription, activeTags: uniquePmClean[0].activeTags || [] }
    : { step: 'Cleanse', product: `Cleanse (look for: ${getDefaultCleanser(primary).name})`, form: 'Cleanser', why: getDefaultCleanser(primary).plainDescription, activeTags: [] }

  const pmTreatSteps = pmWinner ? [{
    step: 'Treat',
    product: `Targeted treatment (look for: ${pmWinner.ingredient.name} ${getProductForm(pmWinner.ingredient.name, 'Treat')})`,
    form: getProductForm(pmWinner.ingredient.name, 'Treat'),
    why: pmWinner.ingredient.plainDescription,
    activeTags: pmWinner.ingredient.activeTags || []
  }] : []

  const pmMoist = moisturizers.filter(m => m.timeOfDay === 'PM' || m.timeOfDay === 'either')
  const uniquePmMoist = deduplicateIngredients(pmMoist)
  const pmMoistStep = uniquePmMoist.length > 0
    ? { step: 'Moisturize', product: `Moisturizer (look for: ${uniquePmMoist.map(m => `${m.name} ${getProductForm(m.name, 'Moisturize')}`).join(' or ')})`, form: 'Moisturizer', why: uniquePmMoist[0].plainDescription, activeTags: uniquePmMoist[0].activeTags || [] }
    : { step: 'Moisturize', product: `Moisturize (look for: ${getDefaultMoisturizer(primary, 'pm').name})`, form: 'Moisturizer', why: getDefaultMoisturizer(primary, 'pm').plainDescription, activeTags: [] }

  const typeParts = [
    primary.charAt(0).toUpperCase() + primary.slice(1).replace('_', ' '),
    modifier ? '+ Dehydrated' : null,
  ].filter(Boolean)

  const concernLabels = concerns.map(c => {
    const p = SKIN_PROBLEMS.find(prob => prob.id === c.id)
    return p?.everydayLabel ?? p?.name ?? c.id
  })
  const label = [typeParts.join(' '), ...concernLabels].join(' · ')

  return {
    am: [amCleanStep, ...amTreatSteps, amMoistStep, amSpfStep],
    pm: [pmCleanStep, ...pmTreatSteps, pmMoistStep],
    label,
    whatToAddNext
  }
}

// ─── INGREDIENTS ──────────────────────────────────────────────────────────────
// Each entry includes:
//   plainDescription   — one-sentence jargon-free description
//   patchTestRequired  — true if skin-test before full-face application is advisable
//   sunSensitizing     — true if this ingredient increases photosensitivity
//   cautionNote        — optional extra safety context
//   tier               — 'starter' (gentle, foundational) | 'next-step' (higher-strength active)
//   activeTags         — machine-readable tags for conflict detection
//   step               — 'Cleanse' | 'Treat' | 'Moisturize' | 'SPF'
//   timeOfDay          — 'AM' | 'PM' | 'either'

export const INGREDIENTS = {
  // ── Type axis ──────────────────────────────────────────────────────────────
  oily: [
    {
      name: 'Niacinamide',
      plainDescription: 'A vitamin that tells your oil glands to slow down, making your face stay less shiny over time.',
      about: 'Signals your skin to produce less oil over time. With regular use (4–6 weeks), most people notice their face stays less shiny throughout the day.',
      concentration: '10% is ideal for oil control.',
      warning: null,
      cautionNote: null,
      patchTestRequired: false,
      sunSensitizing: false,
      tier: 'starter',
      activeTags: [],
      step: 'Treat',
      timeOfDay: 'PM',
    },
    {
      name: 'Salicylic Acid (BHA)',
      plainDescription: 'An acid that works inside pores to dissolve the oil and dead skin that cause them to get blocked and look enlarged.',
      about: 'Dissolves excess sebum sitting inside pores. Using it regularly as a toner or cleanser ingredient keeps pores from clogging and reduces that heavy, congested feeling.',
      concentration: '0.5–2% in a toner or cleanser.',
      warning: null,
      cautionNote: null,
      patchTestRequired: false,
      sunSensitizing: false,
      tier: 'starter',
      activeTags: ['salicylic_acid'],
      step: 'Treat',
      timeOfDay: 'PM',
    },
    {
      name: 'Zinc PCA',
      plainDescription: 'A zinc compound that sits on the skin surface and directly dials down how active your oil glands are.',
      about: 'A form of zinc that sits on the skin surface and directly controls how active your oil glands are. Often found in toners and serums designed for oily skin.',
      concentration: 'Usually found at 0.5–1% in products.',
      warning: null,
      cautionNote: null,
      patchTestRequired: false,
      sunSensitizing: false,
      tier: 'starter',
      activeTags: [],
      step: 'Treat',
      timeOfDay: 'PM',
    },
  ],
  dry: [
    {
      name: 'Hyaluronic Acid',
      plainDescription: 'A molecule that pulls water from the air into your skin, keeping it plump and comfortable throughout the day.',
      about: 'Apply on slightly damp skin for maximum absorption. Draws water into the skin and holds it there.',
      concentration: '0.1–2%. Apply on slightly damp skin for best results.',
      warning: 'In very dry climates, it can pull moisture out of the skin instead. In that case, apply on damp skin and immediately seal with a moisturizer.',
      cautionNote: null,
      patchTestRequired: false,
      sunSensitizing: false,
      tier: 'starter',
      activeTags: [],
      step: 'Treat',
      timeOfDay: 'either',
    },
    {
      name: 'Ceramides',
      plainDescription: 'Natural fats that patch up your skin\'s outer barrier so moisture stops escaping and irritants stop getting in.',
      about: 'Natural fats that make up part of your skin\'s outer barrier. Dry skin often has a damaged barrier. Ceramides literally patch it back together, locking moisture in.',
      concentration: 'Look for "ceramide NP" or "ceramide AP" in the ingredients list.',
      warning: null,
      cautionNote: null,
      patchTestRequired: false,
      sunSensitizing: false,
      tier: 'starter',
      activeTags: [],
      step: 'Treat',
      timeOfDay: 'either',
    },
    {
      name: 'Glycerin',
      plainDescription: 'A simple, widely-available humectant that attracts water into your skin and keeps it there.',
      about: 'A simple, very effective humectant (moisture-attracting ingredient). Acts like hyaluronic acid but is even more stable.',
      concentration: 'Often found at 5–10% in moisturizers and cleansers.',
      warning: null,
      cautionNote: null,
      patchTestRequired: false,
      sunSensitizing: false,
      tier: 'starter',
      activeTags: [],
      step: 'Treat',
      timeOfDay: 'either',
    },
  ],
  combination: [
    {
      name: 'Niacinamide',
      plainDescription: 'Calms the oily T-zone without over-drying the normal or dry parts of your face.',
      about: 'Balances oil in the T-zone without over-drying the drier parts of your face — genuinely useful for combination skin.',
      concentration: '5–10%.',
      warning: null,
      cautionNote: null,
      patchTestRequired: false,
      sunSensitizing: false,
      tier: 'starter',
      activeTags: [],
      step: 'Treat',
      timeOfDay: 'PM',
    },
    {
      name: 'Hyaluronic Acid',
      plainDescription: 'Hydrates drier areas of your face without adding oiliness to the zones that are already shiny.',
      about: 'Hydrates drier areas without adding shine to oily zones. Apply on damp skin and it does its job precisely where skin is thirstiest.',
      concentration: '0.1–2%.',
      warning: null,
      cautionNote: null,
      patchTestRequired: false,
      sunSensitizing: false,
      tier: 'starter',
      activeTags: [],
      step: 'Treat',
      timeOfDay: 'either',
    },
    {
      name: 'Lightweight Gel',
      plainDescription: 'A water-based moisturizer that hydrates without adding heaviness or making the oily parts of your face worse.',
      about: 'A water-based gel formula moisturizes without adding heaviness that would worsen T-zone oiliness.',
      concentration: 'Look for "oil-free" or "non-comedogenic" on the label.',
      warning: null,
      cautionNote: null,
      patchTestRequired: false,
      sunSensitizing: false,
      tier: 'starter',
      activeTags: [],
      step: 'Moisturize',
      timeOfDay: 'either',
    },
  ],
  normal: [
    {
      name: 'Niacinamide',
      plainDescription: 'Keeps pores clear and the skin barrier strong — useful as a maintenance ingredient even when skin is behaving well.',
      about: 'Even balanced skin benefits — keeps pores clear, supports the barrier, and helps prevent future concerns from developing.',
      concentration: '5% is plenty for maintenance.',
      warning: null,
      cautionNote: null,
      patchTestRequired: false,
      sunSensitizing: false,
      tier: 'starter',
      activeTags: [],
      step: 'Treat',
      timeOfDay: 'PM',
    },
    {
      name: 'SPF 30+',
      plainDescription: 'The most important thing you can apply daily — stops UV damage that causes premature ageing, dark spots, and increases skin cancer risk.',
      about: 'The single most effective anti-ageing and skin-protection product available. Normal skin is easy to maintain — sunscreen is the main thing to be consistent about.',
      concentration: 'Broad spectrum SPF 30 minimum daily.',
      warning: null,
      cautionNote: null,
      patchTestRequired: false,
      sunSensitizing: false,
      tier: 'starter',
      activeTags: [],
      step: 'SPF',
      timeOfDay: 'AM',
    },
  ],
  dehydrated: [
    {
      name: 'Hyaluronic Acid',
      plainDescription: 'Replenishes the water your skin is missing — even oily skin can be dehydrated, and this directly addresses that.',
      about: 'Dehydrated skin lacks water, not oil — even oily skin can be dehydrated. Apply on damp skin before your moisturizer.',
      concentration: '0.1–2%. Apply on damp skin before your moisturizer.',
      warning: 'Seal with a moisturizer immediately after to prevent it pulling moisture back out of skin in dry environments.',
      cautionNote: null,
      patchTestRequired: false,
      sunSensitizing: false,
      tier: 'starter',
      activeTags: [],
      step: 'Treat',
      timeOfDay: 'either',
    },
    {
      name: 'Glycerin',
      plainDescription: 'Restores water content in the skin and helps relieve that tight, stretching feeling within a few days of consistent use.',
      about: 'Works like hyaluronic acid but is even more stable. Restores water content, softens feel, and helps that "tight stretching" sensation ease within days.',
      concentration: 'Found at 5–10% in most moisturizers.',
      warning: null,
      cautionNote: null,
      patchTestRequired: false,
      sunSensitizing: false,
      tier: 'starter',
      activeTags: [],
      step: 'Treat',
      timeOfDay: 'either',
    },
  ],

  // ── Concern axis ────────────────────────────────────────────────────────────
  comedonal_acne: [
    {
      name: 'Salicylic Acid',
      plainDescription: 'A cleanser that gets inside pores to wash away excess oil and surface build-up.',
      about: 'Washes away excess sebum inside pores. Using a salicylic acid cleanser daily keeps pores clear and prevents surface blockages.',
      concentration: '0.5–2% in a cleanser.',
      warning: null,
      cautionNote: null,
      patchTestRequired: false,
      sunSensitizing: false,
      tier: 'starter',
      activeTags: ['salicylic_acid'],
      step: 'Cleanse',
      timeOfDay: 'either',
    },
    {
      name: 'Niacinamide',
      plainDescription: 'Helps control oil production and strengthens the skin barrier to prevent new blockages.',
      about: 'Regulates sebum production, making it harder for pores to clog. Apply in the evening.',
      concentration: '5–10%.',
      warning: null,
      cautionNote: null,
      patchTestRequired: false,
      sunSensitizing: false,
      tier: 'starter',
      activeTags: [],
      step: 'Treat',
      timeOfDay: 'PM',
    },
    {
      name: 'Salicylic Acid',
      plainDescription: 'A leave-on exfoliant that clears dead skin and sebum deep inside pores overnight.',
      about: 'Swap your PM niacinamide for this treatment 2–3 nights a week to start. It penetrates deep inside pores to dissolve oil and prevent whiteheads/blackheads.',
      concentration: '1–2% salicylic acid toner or liquid exfoliant.',
      warning: null,
      cautionNote: 'Do not use on the same night as other exfoliating acids. Patch test first.',
      patchTestRequired: true,
      sunSensitizing: false,
      tier: 'next-step',
      activeTags: ['salicylic_acid'],
      step: 'Treat',
      timeOfDay: 'PM',
    },
  ],
  cystic_acne: [
    {
      name: 'Gentle, Fragrance-Free',
      plainDescription: 'A basic cleanser without perfumes or harsh chemicals — essential because cystic acne skin is inflamed and can\'t handle irritating ingredients.',
      about: 'Cystic acne skin is often inflamed and sensitive. Stripping it with a harsh cleanser makes things worse. A gentle, fragrance-free formula is the essential daily foundation.',
      concentration: 'Look for "fragrance-free" and "sulfate-free" on the label.',
      warning: null,
      cautionNote: null,
      patchTestRequired: false,
      sunSensitizing: false,
      tier: 'starter',
      activeTags: [],
      step: 'Cleanse',
      timeOfDay: 'either',
    },
    {
      name: 'Simple, Fragrance-Free',
      plainDescription: 'A plain moisturizer to support barrier repair without triggering irritation.',
      about: 'Maintains skin barrier health and hydration. Essential daily foundation to soothe skin while it heals.',
      concentration: 'Look for plain, basic moisturizers for sensitive skin.',
      warning: null,
      cautionNote: null,
      patchTestRequired: false,
      sunSensitizing: false,
      tier: 'starter',
      activeTags: [],
      step: 'Moisturize',
      timeOfDay: 'either',
    },
    {
      name: 'Dermatologist-Prescribed',
      plainDescription: 'Cystic acne sits deep under the skin and usually requires professional prescription treatments.',
      about: 'Because cystic acne is deep and inflammatory, OTC skincare alone is rarely a fix. A dermatologist can prescribe targeted topical or oral treatments.',
      concentration: 'Per professional prescription.',
      warning: 'Avoid picking, squeezing, or scrubbing cystic breakouts, as this causes scarring and worsens inflammation.',
      cautionNote: 'The general OTC routine serves as a gentle holding pattern while you wait for a dermatologist appointment.',
      patchTestRequired: false,
      sunSensitizing: false,
      tier: 'next-step',
      activeTags: [],
      step: 'Treat',
      timeOfDay: 'PM',
    },
  ],
  razor_bumps: [
    {
      name: 'Aloe Vera or Centella',
      plainDescription: 'Calms redness, reduces heat, and speeds up healing on shaved areas.',
      about: 'Reduces shaving-induced micro-inflammation and redness. Apply as a targeted gel post-cleansing.',
      concentration: 'Pure gel formula, fragrance-free.',
      warning: null,
      cautionNote: null,
      patchTestRequired: false,
      sunSensitizing: false,
      tier: 'starter',
      activeTags: [],
      step: 'Treat',
      timeOfDay: 'either',
    },
    {
      name: 'Salicylic Acid',
      plainDescription: 'Gentle chemical exfoliation to prevent ingrown hairs and clear trapped follicles.',
      about: 'Use every other day to prevent ingrown hairs by exfoliating the skin surface and keeping follicles open.',
      concentration: '1–2% salicylic acid toner.',
      warning: null,
      cautionNote: 'Apply after shaving, not before, and alternate days with other active products.',
      patchTestRequired: true,
      sunSensitizing: false,
      tier: 'next-step',
      activeTags: ['salicylic_acid'],
      step: 'Treat',
      timeOfDay: 'PM',
    },
  ],
  pie: [
    {
      name: 'Niacinamide',
      plainDescription: 'Directly reduces redness in flat pink marks by calming the skin.',
      about: 'Directly reduces redness by calming the blood-vessel response under flat red/pink marks. Regular use (4–6 weeks) helps fade PIE.',
      concentration: '5–10%.',
      warning: null,
      cautionNote: null,
      patchTestRequired: false,
      sunSensitizing: false,
      tier: 'starter',
      activeTags: [],
      step: 'Treat',
      timeOfDay: 'PM',
    },
    {
      name: 'SPF 50+',
      plainDescription: 'The single most important step for fading red marks — UV exposure significantly slows down how quickly they disappear.',
      about: 'UV exposure significantly slows the fading of PIE. Without SPF, those red marks may take months longer to clear.',
      concentration: 'Broad-spectrum SPF 50+.',
      warning: null,
      cautionNote: null,
      patchTestRequired: false,
      sunSensitizing: false,
      tier: 'starter',
      activeTags: [],
      step: 'SPF',
      timeOfDay: 'AM',
    },
    {
      name: 'Azelaic Acid or Gentle Vitamin C',
      plainDescription: 'Brightening active to support mark fading and soothe redness.',
      about: 'Helps fade red/pink marks left behind by pimples. Azelaic acid is also excellent for reducing redness and calming skin.',
      concentration: '10% azelaic acid or 10% Vitamin C serum.',
      warning: null,
      cautionNote: 'Introduce after 4–6 weeks on the starter routine. Use consistently to see gradual fading.',
      patchTestRequired: true,
      sunSensitizing: false,
      tier: 'next-step',
      activeTags: ['vitamin_c'],
      step: 'Treat',
      timeOfDay: 'AM',
    },
  ],
  pih: [
    {
      name: 'Niacinamide',
      plainDescription: 'Interferes with dark pigment transfer to the skin surface to help fade spots.',
      about: 'Interferes with the transfer of melanin to the skin surface, gradually fading dark marks over 4–8 weeks of regular use.',
      concentration: '5–10%.',
      warning: null,
      cautionNote: null,
      patchTestRequired: false,
      sunSensitizing: false,
      tier: 'starter',
      activeTags: [],
      step: 'Treat',
      timeOfDay: 'PM',
    },
    {
      name: 'Vitamin C',
      plainDescription: 'An antioxidant that brightens skin tone and targets melanin production. Use in the morning.',
      about: 'Brightens skin, neutralizes free radical damage, and blocks the pathway that creates dark spots.',
      concentration: '10–15% L-ascorbic acid.',
      warning: null,
      cautionNote: 'Store in a cool, dark place to avoid oxidation.',
      patchTestRequired: true,
      sunSensitizing: false,
      tier: 'starter',
      activeTags: ['vitamin_c'],
      step: 'Treat',
      timeOfDay: 'AM',
    },
    {
      name: 'Glycolic Acid (AHA)',
      plainDescription: 'An alpha hydroxy acid that resurfaces skin cells to fade stubborn dark marks faster.',
      about: 'Swap your PM niacinamide for this a few nights a week. Always use sunscreen the next morning, as this increases sun sensitivity.',
      concentration: '5–8% glycolic acid toner or serum.',
      warning: 'Always use SPF the next morning without fail — glycolic acid makes skin more sun-sensitive.',
      cautionNote: 'Introduce slowly — start 2 nights per week and build up only as your skin adjusts.',
      patchTestRequired: true,
      sunSensitizing: true,
      tier: 'next-step',
      activeTags: ['glycolic_acid'],
      step: 'Treat',
      timeOfDay: 'PM',
    },
  ],
  atrophic_scarring: [
    {
      name: 'Niacinamide',
      plainDescription: 'Supports skin barrier health and hydration to help texture look smoother.',
      about: 'Supports the skin barrier and reduces the appearance of pores around scars, lowering visual contrast.',
      concentration: '5–10%.',
      warning: null,
      cautionNote: null,
      patchTestRequired: false,
      sunSensitizing: false,
      tier: 'starter',
      activeTags: [],
      step: 'Treat',
      timeOfDay: 'PM',
    },
    {
      name: 'Gentle Retinoid-Adjacent',
      plainDescription: 'A gentle retinol or bakuchiol product to support collagen production and texture improvement.',
      about: 'Use a few nights a week to help improve skin texture and stimulate cell turnover. Texture improves slowly, and deeper scars may require professional treatment.',
      concentration: 'Start at 0.025–0.05% retinol or 0.5–1% bakuchiol.',
      warning: 'Always use SPF the next morning — retinoids make skin more sun-sensitive.',
      cautionNote: 'Use a few nights a week in the PM only. Do not layer with other exfoliating acids in the same session.',
      patchTestRequired: true,
      sunSensitizing: true,
      tier: 'next-step',
      activeTags: ['retinol'],
      step: 'Treat',
      timeOfDay: 'PM',
    },
  ],
  seborrheic_dermatitis: [
    {
      name: 'Zinc Pyrithione',
      plainDescription: 'An antifungal ingredient that directly targets the yeast responsible for seborrheic dermatitis, reducing flaking and redness.',
      about: 'Directly targets the Malassezia yeast that drives seborrheic dermatitis. Found in some facial cleansers and leave-on products.',
      concentration: '1–2% in a cleanser or leave-on product.',
      warning: null,
      cautionNote: null,
      patchTestRequired: false,
      sunSensitizing: false,
      tier: 'starter',
      activeTags: [],
      step: 'Treat',
      timeOfDay: 'either',
    },
    {
      name: 'Gentle, Fragrance-Free',
      plainDescription: 'Fragrances and harsh ingredients make seborrheic dermatitis significantly worse — a plain, gentle cleanser is the daily foundation.',
      about: 'Fragrances and irritants worsen seborrheic dermatitis. A plain, gentle cleanser is the daily foundation while treating the underlying cause.',
      concentration: 'Fragrance-free, sulfate-free.',
      warning: null,
      cautionNote: null,
      patchTestRequired: false,
      sunSensitizing: false,
      tier: 'starter',
      activeTags: [],
      step: 'Cleanse',
      timeOfDay: 'either',
    },
    {
      name: 'Ketoconazole',
      plainDescription: 'An antifungal that directly controls the yeast causing seborrheic dermatitis — available as a wash or cream, but a dermatologist can confirm the right form for you.',
      about: 'An antifungal that directly controls the Malassezia yeast. Available as a shampoo (usable on face) or cream. A dermatologist can confirm the diagnosis and appropriate form.',
      concentration: '1% OTC; 2% prescription.',
      warning: 'Get the diagnosis confirmed before starting antifungal treatment — other conditions can look similar.',
      cautionNote: 'Use the zinc pyrithione cleanser as your starting point. Only introduce ketoconazole after speaking with a dermatologist.',
      patchTestRequired: true,
      sunSensitizing: false,
      tier: 'next-step',
      activeTags: [],
      step: 'Treat',
      timeOfDay: 'PM',
    },
  ],
  sensitive_reactive: [
    {
      name: 'Centella Asiatica (Cica)',
      plainDescription: 'A plant extract that calms redness and irritation — one of the most reliably soothing ingredients available, even for very reactive skin.',
      about: 'Powerful anti-inflammatory plant extract. Calms redness, reduces irritation, and helps repair the skin barrier.',
      concentration: 'Look for it as a top-three ingredient in the list.',
      warning: null,
      cautionNote: null,
      patchTestRequired: false,
      sunSensitizing: false,
      tier: 'starter',
      activeTags: [],
      step: 'Treat',
      timeOfDay: 'either',
    },
    {
      name: 'Ceramides',
      plainDescription: 'Rebuilds the skin barrier so irritants can\'t get through as easily — consistent use over 4–6 weeks makes reactive skin meaningfully less reactive.',
      about: 'Ceramides rebuild the compromised barrier, making skin less reactive over time with consistent 4–6 week use.',
      concentration: 'Look for ceramide NP, AP, or EOP in the ingredients.',
      warning: null,
      cautionNote: null,
      patchTestRequired: false,
      sunSensitizing: false,
      tier: 'starter',
      activeTags: [],
      step: 'Treat',
      timeOfDay: 'either',
    },
    {
      name: 'Squalane',
      plainDescription: 'A lightweight oil nearly identical to the skin\'s own natural oil — extremely gentle, non-irritating, and won\'t clog pores.',
      about: 'Nearly identical to the natural oil your skin produces. Extremely gentle, non-irritating, and hydrates without clogging pores.',
      concentration: '100% squalane or found mixed into moisturizers.',
      warning: null,
      cautionNote: null,
      patchTestRequired: false,
      sunSensitizing: false,
      tier: 'starter',
      activeTags: [],
      step: 'Treat',
      timeOfDay: 'either',
    },
  ],
  shaving_irritation: [
    {
      name: 'Niacinamide',
      plainDescription: 'Reduces the redness and heat response right after shaving — apply in your post-shave routine as a serum or use a moisturizer that contains it.',
      about: 'Reduces redness and micro-inflammation left immediately after shaving. Apply as a post-shave serum.',
      concentration: '5–10%.',
      warning: null,
      cautionNote: null,
      patchTestRequired: false,
      sunSensitizing: false,
      tier: 'starter',
      activeTags: [],
      step: 'Treat',
      timeOfDay: 'PM',
    },
    {
      name: 'Aloe Vera',
      plainDescription: 'A simple post-shave soother that reduces heat and redness almost immediately — works best when it\'s 95%+ pure with no fragrance.',
      about: 'Reduces heat and redness almost immediately post-shave. Pure aloe (no added fragrance or alcohol) works best.',
      concentration: 'Look for ≥95% aloe vera content. Avoid gels with alcohol.',
      warning: null,
      cautionNote: null,
      patchTestRequired: false,
      sunSensitizing: false,
      tier: 'starter',
      activeTags: [],
      step: 'Treat',
      timeOfDay: 'either',
    },
    {
      name: 'Centella Asiatica (Cica)',
      plainDescription: 'Speeds up healing of micro-cuts and irritation from shaving — apply right after rinsing off the shaving product.',
      about: 'Speeds up healing of micro-cuts and irritation from shaving. Apply as a soothing gel or serum right after rinsing.',
      concentration: 'Look for it high up in the ingredients list.',
      warning: null,
      cautionNote: null,
      patchTestRequired: false,
      sunSensitizing: false,
      tier: 'starter',
      activeTags: [],
      step: 'Treat',
      timeOfDay: 'either',
    },
  ],
  congestion_prone: [
    {
      name: 'Salicylic Acid (BHA)',
      plainDescription: 'Dissolves the oily plugs inside pores that cause congestion — regular use stops the build-up from happening.',
      about: 'Dissolves oily plugs inside pores that cause congestion. Regular use prevents the backlog from building up.',
      concentration: '0.5–2% in a cleanser or toner.',
      warning: null,
      cautionNote: null,
      patchTestRequired: false,
      sunSensitizing: false,
      tier: 'starter',
      activeTags: ['salicylic_acid'],
      step: 'Treat',
      timeOfDay: 'PM',
    },
    {
      name: 'Non-Comedogenic',
      plainDescription: 'A moisturizer specifically tested not to block pores — this solves the "every lotion clogs my skin" problem.',
      about: 'Lightweight, water-based formulas that are tested not to block pores. Solves the clogging reaction to standard lotions.',
      concentration: 'Look for "non-comedogenic" and "oil-free" on the packaging.',
      warning: null,
      cautionNote: null,
      patchTestRequired: false,
      sunSensitizing: false,
      tier: 'starter',
      activeTags: [],
      step: 'Moisturize',
      timeOfDay: 'either',
    },
    {
      name: 'Niacinamide',
      plainDescription: 'Reduces the excess oil production that leads to congestion and helps tighten pores over time.',
      about: 'Reduces excess oil production that leads to congestion, and helps tighten enlarged pores over time.',
      concentration: '10%.',
      warning: null,
      cautionNote: null,
      patchTestRequired: false,
      sunSensitizing: false,
      tier: 'starter',
      activeTags: [],
      step: 'Treat',
      timeOfDay: 'PM',
    },
  ],
  pustular_acne: [
    {
      name: 'Salicylic Acid (BHA)',
      plainDescription: 'An acid that gets inside pores and dissolves the blocked material that causes blackheads and small white bumps.',
      about: 'Gets into pores and dissolves the oil and dead skin that cause surface blockages. This is the most direct treatment for blackheads and closed whiteheads.',
      concentration: '0.5–2%. Start at 0.5–1% if new to it.',
      warning: null,
      cautionNote: null,
      patchTestRequired: false,
      sunSensitizing: false,
      tier: 'starter',
      activeTags: ['salicylic_acid'],
      step: 'Treat',
      timeOfDay: 'PM',
    },
    {
      name: 'Niacinamide',
      plainDescription: 'Reduces pore size and controls oil production — both of which help stop new blackheads and whiteheads from forming.',
      about: 'Reduces pore visibility and controls oil production — both of which directly reduce new comedone formation.',
      concentration: '5–10%.',
      warning: null,
      cautionNote: null,
      patchTestRequired: false,
      sunSensitizing: false,
      tier: 'starter',
      activeTags: [],
      step: 'Treat',
      timeOfDay: 'PM',
    },
    {
      name: 'Benzoyl Peroxide',
      plainDescription: 'Kills bacteria living inside active pimples when applied directly to the spot — not meant for the whole face.',
      about: 'Kills the bacteria driving the infection inside active pimples. Use as a targeted spot treatment.',
      concentration: '2.5% is a gentle starter strength. Higher strengths cause more dryness without extra benefit.',
      warning: 'Can bleach pillowcases and towels. Use white linens when applying at night.',
      cautionNote: 'Apply only to individual spots — using it all over the face may cause excessive drying and irritation.',
      patchTestRequired: true,
      sunSensitizing: false,
      tier: 'next-step',
      activeTags: ['benzoyl_peroxide'],
      step: 'Treat',
      timeOfDay: 'PM',
    },
  ],
  dark_circles: [
    {
      name: 'Caffeine',
      plainDescription: 'Temporarily reduces puffiness and the look of darkness under the eyes by constricting blood vessels — the effect is real but wears off after several hours.',
      about: 'Caffeine constricts blood vessels under the delicate under-eye skin, temporarily reducing puffiness and the appearance of discolouration. Dark circles are largely driven by genetics, thin skin, and sleep — this helps manage their appearance but won\'t resolve the underlying cause.',
      concentration: 'Look for caffeine or guarana extract listed high up in the ingredients.',
      warning: null,
      cautionNote: 'The under-eye area is thinner and more sensitive than the rest of the face — apply sparingly with your ring finger and patch test before full use, even though this is a starter-tier product.',
      patchTestRequired: true,
      sunSensitizing: false,
      tier: 'starter',
      activeTags: [],
      step: 'Treat',
      timeOfDay: 'either',
    },
    {
      name: 'Vitamin K + Peptides',
      plainDescription: 'Vitamin K may reduce the blood pooling that causes shadows, while peptides support collagen and help the delicate skin look firmer over time — results require consistent use over weeks.',
      about: 'Vitamin K is thought to reduce the blood pooling that causes dark shadows under thin skin. Peptides support collagen and help the under-eye area look firmer. This is a next-step ingredient — introduce only after your skin has comfortably handled a caffeine product for 4–6 weeks.',
      concentration: 'Look for vitamin K (phytonadione) and palmitoyl peptides in the top half of the ingredients list.',
      warning: null,
      cautionNote: 'Apply sparingly with your ring finger. The under-eye skin is the thinnest on the face — less is more. Patch test before first full use.',
      patchTestRequired: true,
      sunSensitizing: false,
      tier: 'next-step',
      activeTags: [],
      step: 'Treat',
      timeOfDay: 'PM',
    },
  ],
  large_pores: [
    {
      name: 'Niacinamide',
      plainDescription: 'Regulates oil production and helps minimize the *appearance* of pores over time — pore size itself is mostly genetic and cannot be permanently changed by products.',
      about: 'Reduces excess oil production and helps pores look less visible. It\'s important to be realistic: pore size itself is largely genetic and cannot be permanently changed. What these products do is minimize the appearance of pores, not shrink them.',
      concentration: '5–10%.',
      warning: null,
      cautionNote: null,
      patchTestRequired: false,
      sunSensitizing: false,
      tier: 'starter',
      activeTags: [],
      step: 'Treat',
      timeOfDay: 'PM',
    },
    {
      name: 'Gentle Clay',
      plainDescription: 'Absorbs excess oil from pores, making them look temporarily less noticeable — not a permanent fix, but a weekly reset.',
      about: 'Clay absorbs excess sebum from inside pores, reducing their temporarily enlarged appearance. Use 1–2 times per week — more frequent use can over-dry skin.',
      concentration: 'Look for kaolin or bentonite clay as a primary ingredient.',
      warning: null,
      cautionNote: 'Don\'t leave on longer than directed — over-drying skin can actually cause it to produce more oil in compensation.',
      patchTestRequired: false,
      sunSensitizing: false,
      tier: 'starter',
      activeTags: [],
      step: 'Treat',
      timeOfDay: 'PM',
    },
    {
      name: 'Salicylic Acid (BHA)',
      plainDescription: 'Dissolves the oil and dead skin build-up inside pores that makes them look stretched and enlarged — the most direct ingredient for pore-appearance improvement.',
      about: 'Gets inside pores and dissolves the material that causes them to appear enlarged. Consistent use prevents the backlog from building up. This is a next-step ingredient — introduce after niacinamide has been in your routine for several weeks.',
      concentration: '0.5–2% in a toner or cleanser. Start at 0.5% if new to it.',
      warning: null,
      cautionNote: 'Introduce slowly — start 2–3 nights per week and build up only after your skin has adjusted with no irritation.',
      patchTestRequired: false,
      sunSensitizing: false,
      tier: 'next-step',
      activeTags: ['salicylic_acid'],
      step: 'Treat',
      timeOfDay: 'PM',
    },
  ],
  dullness: [
    {
      name: 'Gentle Exfoliating or Low-Strength Lactic Acid',
      plainDescription: 'Removes the layer of dead skin cells that makes skin look flat and lifeless — use 2–3 times a week, not daily, to avoid over-stripping.',
      about: 'Dead skin cell build-up is one of the main drivers of dullness. A gentle AHA like lactic acid at 5–10% removes this layer and immediately improves radiance. Hydration and sleep are first-line — this product is a supportive second step.',
      concentration: '5–10% lactic acid in a toner or cleanser. Use 2–3x per week, PM only.',
      warning: null,
      cautionNote: 'Don\'t use daily — over-exfoliation damages the barrier and worsens dullness in the long run. Start 2x per week and assess.',
      patchTestRequired: false,
      sunSensitizing: true,
      tier: 'starter',
      activeTags: ['lactic_acid'],
      step: 'Cleanse',
      timeOfDay: 'either',
    },
    {
      name: 'Vitamin C',
      plainDescription: 'An antioxidant that neutralizes dullness-causing free radicals and gradually brightens the complexion — most effective used consistently in the morning under SPF.',
      about: 'Vitamin C is a powerful antioxidant that neutralizes free radical damage and helps even out complexion over time. Use in the morning before SPF. Consistent daily use over 4–8 weeks produces visible brightening.',
      concentration: '10–15% L-ascorbic acid. If new to it, start with 10%. Store in a cool, dark place.',
      warning: 'If your serum turns orange or brown, it has oxidized — replace it. An oxidized product is largely ineffective.',
      cautionNote: 'Introduce after your skin has been comfortable on the lactic acid for several weeks. Some initial tingling is normal; stinging is not.',
      patchTestRequired: true,
      sunSensitizing: false,
      tier: 'starter',
      activeTags: ['vitamin_c'],
      step: 'Treat',
      timeOfDay: 'AM',
    },
    {
      name: 'Glycolic Acid (AHA)',
      plainDescription: 'A stronger resurfacing acid that visibly improves skin texture and radiance over several weeks — more effective than lactic acid for stubborn dullness, but requires more care.',
      about: 'Glycolic acid has a smaller molecular size than lactic acid, penetrating deeper and producing more visible resurfacing results. Use on nights you\'re not using lactic acid or vitamin C. This is a next-step ingredient — only introduce after lactic acid has been comfortable for 4+ weeks.',
      concentration: '5–10% in a toner or serum. PM only, alternate nights from other exfoliants.',
      warning: 'Don\'t use on the same night as retinol or lactic acid — alternate instead. Always use SPF the following morning.',
      cautionNote: 'Add this only after you\'ve been using lactic acid consistently for 4+ weeks and your skin has fully adjusted.',
      patchTestRequired: true,
      sunSensitizing: true,
      tier: 'next-step',
      activeTags: ['glycolic_acid'],
      step: 'Treat',
      timeOfDay: 'PM',
    },
  ],
}

// ─── AM/PM ROUTINES ───────────────────────────────────────────────────────────
// Steps ordered: Cleanse → Treat → Moisturize → SPF (AM only).
// Language is softened throughout — "may help," "many people find," not "will cure."

export const ROUTINES = {
  oily: {
    am: [
      { step: 'Cleanse',    product: 'Gel or foaming cleanser',                  why: 'Helps remove overnight oil build-up without stripping the skin barrier.', activeTags: [] },
      { step: 'Moisturize', product: 'Lightweight gel moisturizer (oil-free)',   why: 'Hydrates without adding shine or clogging pores.', activeTags: [] },
      { step: 'SPF',        product: 'Matte or gel-formula sunscreen SPF 30+',  why: 'Protects from UV without leaving a greasy residue.', activeTags: [] },
    ],
    pm: [
      { step: 'Cleanse',    product: 'Gel or foaming cleanser',                  why: 'Removes the day\'s sebum, sweat, and environmental grime.', activeTags: [] },
      { step: 'Moisturize', product: 'Lightweight gel moisturizer',              why: 'Supports overnight barrier function and keeps skin balanced.', activeTags: [] },
    ],
  },
  dry: {
    am: [
      { step: 'Cleanse',    product: 'Cream or milk cleanser (no foaming agents)', why: 'Cleanses skin without stripping away natural oils.', activeTags: [] },
      { step: 'Moisturize', product: 'Rich cream moisturizer with ceramides',      why: 'Locks in moisture and repairs the skin barrier.', activeTags: [] },
      { step: 'SPF',        product: 'Hydrating sunscreen SPF 30+',               why: 'Protects from UV while adding an extra layer of hydration.', activeTags: [] },
    ],
    pm: [
      { step: 'Cleanse',    product: 'Cream or oil cleanser',                     why: 'Gentle evening cleanse that preserves skin moisture.', activeTags: [] },
      { step: 'Moisturize', product: 'Thick overnight cream or sleeping mask',    why: 'Rich overnight hydration to support barrier repair during sleep.', activeTags: [] },
    ],
  },
  combination: {
    am: [
      { step: 'Cleanse',    product: 'Gentle gel cleanser (low-sulfate)',          why: 'Cleanses the oily T-zone without over-drying the cheeks.', activeTags: [] },
      { step: 'Moisturize', product: 'Lightweight gel moisturizer',                why: 'Provides lightweight hydration balanced for both oily and dry zones.', activeTags: [] },
      { step: 'SPF',        product: 'Lightweight SPF 30+ (non-comedogenic)',      why: 'Protects skin from UV without overloading the T-zone.', activeTags: [] },
    ],
    pm: [
      { step: 'Cleanse',    product: 'Gentle gel cleanser',                        why: 'Removes daytime build-up from all face zones.', activeTags: [] },
      { step: 'Moisturize', product: 'Lightweight gel moisturizer',                why: 'Keeps skin balanced and hydrated overnight.', activeTags: [] },
    ],
  },
  normal: {
    am: [
      { step: 'Cleanse',    product: 'Gentle gel or cream cleanser',               why: 'Clean base — balanced skin doesn\'t need anything harsh.', activeTags: [] },
      { step: 'Moisturize', product: 'Lightweight moisturizer',                    why: 'Maintains healthy hydration and barrier function.', activeTags: [] },
      { step: 'SPF',        product: 'Broad-spectrum SPF 30+',                     why: 'Protects balanced skin from UV rays.', activeTags: [] },
    ],
    pm: [
      { step: 'Cleanse',    product: 'Gentle cleanser',                            why: 'Removes SPF, dirt, and daily build-up.', activeTags: [] },
      { step: 'Moisturize', product: 'Regular moisturizer',                        why: 'Supports skin\'s natural overnight repair process.', activeTags: [] },
    ],
  },
  dehydrated: {
    am: [
      { step: 'Treat',      product: 'Hyaluronic acid serum (apply on damp skin)', why: 'Directly replenishes water content. Apply before moisturizer while skin is slightly damp.', activeTags: [] },
      { step: 'Moisturize', product: 'Moisturizer with glycerin or ceramides',     why: 'Sealing the hyaluronic acid layer in is critical — without it, the moisture may evaporate back out.', activeTags: [] },
    ],
    pm: [
      { step: 'Treat',      product: 'Hyaluronic acid serum',                      why: 'Overnight water replenishment. That tight-stretching feeling may ease within a week of consistent use.', activeTags: [] },
      { step: 'Moisturize', product: 'Barrier-supportive moisturizer with ceramides', why: 'Locks in hydration while the barrier works on overnight repair.', activeTags: [] },
    ],
  },
  comedonal_acne: {
    am: [
      { step: 'Cleanse',    product: 'Salicylic acid cleanser',                  why: 'Cleanser containing salicylic acid to help exfoliate inside pores and remove excess oil.', activeTags: ['salicylic_acid'] },
      { step: 'Moisturize', product: 'Non-comedogenic moisturizer',              why: 'Hydrates without adding pore-clogging ingredients.', activeTags: [] },
      { step: 'SPF',        product: 'Broad-spectrum sunscreen SPF 30+',         why: 'Essential daily protection to shield skin from UV rays.', activeTags: [] },
    ],
    pm: [
      { step: 'Cleanse',    product: 'Gentle cleanser',                          why: 'Removes daily grime, oil, and sunscreen.', activeTags: [] },
      { step: 'Treat',      product: 'Niacinamide serum',                        why: 'Helps regulate sebum production and calm skin.', activeTags: [] },
      { step: 'Moisturize', product: 'Non-comedogenic moisturizer',              why: 'Keeps skin hydrated overnight.', activeTags: [] },
    ],
  },
  pustular_acne: {
    am: [
      { step: 'Cleanse',    product: 'Salicylic acid cleanser',                  why: 'Cleanser containing salicylic acid to clear out pores and reduce oiliness.', activeTags: ['salicylic_acid'] },
      { step: 'Moisturize', product: 'Lightweight moisturizer',                   why: 'Hydrates skin to keep the barrier healthy.', activeTags: [] },
      { step: 'SPF',        product: 'Non-comedogenic sunscreen SPF 30+',          why: 'Daily sunscreen protection; breakouts can become more inflamed with UV exposure.', activeTags: [] },
    ],
    pm: [
      { step: 'Cleanse',    product: 'Gentle cleanser',                          why: 'Removes daytime grime and oil.', activeTags: [] },
      { step: 'Treat',      product: 'Benzoyl peroxide spot treatment (2.5%)',      why: 'Apply only on active red breakouts to target bacteria and active inflammation.', activeTags: ['benzoyl_peroxide'] },
      { step: 'Moisturize', product: 'Simple, fragrance-free moisturizer',          why: 'Moisturizes skin and buffers dryness from the spot treatment.', activeTags: [] },
    ],
  },
  cystic_acne: {
    am: [
      { step: 'Cleanse',    product: 'Gentle cleanser',                          why: 'Cleanses gently without scrubbing or irritating deep bumps.', activeTags: [] },
      { step: 'Moisturize', product: 'Simple, fragrance-free moisturizer',          why: 'Maintains barrier health even during deep breakouts.', activeTags: [] },
      { step: 'SPF',        product: 'Lightweight mineral sunscreen SPF 30+',      why: 'Mineral sunscreens are less likely to aggravate inflamed skin.', activeTags: [] },
    ],
    pm: [
      { step: 'Cleanse',    product: 'Gentle cleanser',                          why: 'Removes daily sweat, oil, and sunscreen.', activeTags: [] },
      { step: 'Moisturize', product: 'Simple, fragrance-free moisturizer',          why: 'Deep, painful breakouts usually need a dermatologist\'s prescription — this routine is a gentle holding pattern.', activeTags: [] },
    ],
  },
  razor_bumps: {
    am: [
      { step: 'Cleanse',    product: 'Gentle cleanser',                          why: 'Cleanses skin before the day starts.', activeTags: [] },
      { step: 'Moisturize', product: 'Lightweight, fragrance-free moisturizer',    why: 'Hydrated skin is more resilient and shaves better.', activeTags: [] },
      { step: 'SPF',        product: 'SPF 30+ (non-comedogenic)',                  why: 'Protects post-shave skin from UV rays.', activeTags: [] },
    ],
    pm: [
      { step: 'Cleanse',    product: 'Gentle cleanser',                          why: 'Removes daytime build-up around follicles.', activeTags: [] },
      { step: 'Treat',      product: 'Soothing gel (aloe vera or centella)',     why: 'Apply soothing gel right after PM cleansing to calm shaved areas.', activeTags: [] },
      { step: 'Moisturize', product: 'Lightweight, fragrance-free moisturizer',    why: 'Maintains the skin barrier around shaved areas.', activeTags: [] },
    ],
  },
  pie: {
    am: [
      { step: 'Cleanse',    product: 'Gentle cleanser',                          why: 'Clean base for your morning routine.', activeTags: [] },
      { step: 'Treat',      product: 'Niacinamide serum',                        why: 'Fades redness in flat pink marks by calming skin.', activeTags: [] },
      { step: 'Moisturize', product: 'Lightweight moisturizer',                   why: 'Hydrates skin to support cell recovery.', activeTags: [] },
      { step: 'SPF',        product: 'SPF 50+ sunscreen',                         why: 'Important — unprotected sun exposure makes red marks last significantly longer.', activeTags: [] },
    ],
    pm: [
      { step: 'Cleanse',    product: 'Gentle cleanser',                           why: 'Removes SPF and daily build-up.', activeTags: [] },
      { step: 'Moisturize', product: 'Regular moisturizer',                       why: 'Supports natural overnight recovery process.', activeTags: [] },
    ],
  },
  pih: {
    am: [
      { step: 'Cleanse',    product: 'Gentle cleanser',                          why: 'Clean base before active treatment.', activeTags: [] },
      { step: 'Treat',      product: 'Vitamin C serum',                          why: 'Brightens skin tone and targets melanin production. Use in the morning.', activeTags: ['vitamin_c'] },
      { step: 'Moisturize', product: 'Lightweight moisturizer',                   why: 'Locks in hydration and supports active ingredients.', activeTags: [] },
      { step: 'SPF',        product: 'SPF 50+ sunscreen',                         why: 'Critical — unprotected sun exposure triggers more pigment and makes dark spots worse.', activeTags: [] },
    ],
    pm: [
      { step: 'Cleanse',    product: 'Gentle cleanser',                           why: 'Removes SPF and daytime build-up.', activeTags: [] },
      { step: 'Treat',      product: 'Niacinamide serum',                        why: 'Helps fade dark marks by interfering with pigment transfer.', activeTags: [] },
      { step: 'Moisturize', product: 'Regular moisturizer',                       why: 'Supports skin cell turnover to help marks fade more quickly.', activeTags: [] },
    ],
  },
  atrophic_scarring: {
    am: [
      { step: 'Cleanse',    product: 'Gentle cleanser',                          why: 'Gentle morning cleanse.', activeTags: [] },
      { step: 'Moisturize', product: 'Hydrating moisturizer',                     why: 'Keeps skin barrier hydrated and smooth.', activeTags: [] },
      { step: 'SPF',        product: 'Broad-spectrum SPF 30+',                     why: 'Protects skin from UV damage.', activeTags: [] },
    ],
    pm: [
      { step: 'Cleanse',    product: 'Gentle cleanser',                           why: 'Removes daytime build-up.', activeTags: [] },
      { step: 'Moisturize', product: 'Regular moisturizer',                       why: 'Supports overnight recovery. Texture improves slowly, and deeper scars may need professional treatment.', activeTags: [] },
    ],
  },
  seborrheic_dermatitis: {
    am: [
      { step: 'Cleanse',    product: 'Gentle, fragrance-free cleanser',          why: 'Cleanses without aggravating flakes or redness.', activeTags: [] },
      { step: 'Moisturize', product: 'Fragrance-free moisturizer',                 why: 'Hydrates skin using a minimal, non-irritating formula.', activeTags: [] },
      { step: 'SPF',        product: 'Mineral SPF 30+ (fragrance-free)',              why: 'Mineral sunscreen is less likely to aggravate seborrheic dermatitis.', activeTags: [] },
    ],
    pm: [
      { step: 'Cleanse',    product: 'Gentle, fragrance-free cleanser',           why: 'Removes daytime residue and SPF gently.', activeTags: [] },
      { step: 'Moisturize', product: 'Fragrance-free moisturizer',                 why: 'Provides supportive overnight hydration. This condition usually needs prescription antifungal check.', activeTags: [] },
    ],
  },
  sensitive_reactive: {
    am: [
      { step: 'Cleanse',    product: 'Fragrance-free gentle cleanser',           why: 'Cleanses without irritation. Hold off on actives until skin is calm.', activeTags: [] },
      { step: 'Moisturize', product: 'Soothing moisturizer (ceramides/centella)',  why: 'Calms redness and strengthens the skin barrier.', activeTags: [] },
      { step: 'SPF',        product: 'Mineral sunscreen',                         why: 'Physical UV filters are gentler and less likely to sting sensitive skin.', activeTags: [] },
    ],
    pm: [
      { step: 'Cleanse',    product: 'Fragrance-free gentle cleanser',            why: 'Removes daily impurities gently. Patch test everything first.', activeTags: [] },
      { step: 'Moisturize', product: 'Soothing moisturizer (ceramides/centella)',  why: 'Soothes skin and rebuilds the barrier overnight.', activeTags: [] },
    ],
  },
  shaving_irritation: {
    am: [
      { step: 'Cleanse',    product: 'Cool water rinse',                          why: 'Rinse with cool water to soothe skin after shaving.', activeTags: [] },
      { step: 'Treat',      product: 'Soothing gel (aloe vera or centella)',     why: 'Calms redness and reduces shave-induced heat immediately.', activeTags: [] },
      { step: 'Moisturize', product: 'Fragrance-free moisturizer',                 why: 'Restores moisture. Skip alcohol-based aftershaves; consider a day off between shaves.', activeTags: [] },
    ],
    pm: [
      { step: 'Cleanse',    product: 'Gentle cleanser',                           why: 'Cleanses the shaved area without drying.', activeTags: [] },
      { step: 'Moisturize', product: 'Fragrance-free moisturizer',                 why: 'Supports barrier repair overnight.', activeTags: [] },
    ],
  },
  congestion_prone: {
    am: [
      { step: 'Cleanse',    product: 'Salicylic acid cleanser',                  why: 'Cleanser containing salicylic acid to help clear sebum from pores.', activeTags: ['salicylic_acid'] },
      { step: 'Moisturize', product: 'Non-comedogenic moisturizer',              why: 'Lightweight hydration that won\'t block pores.', activeTags: [] },
      { step: 'SPF',        product: 'Non-comedogenic sunscreen SPF 30+',         why: 'Essential daily sunscreen that won\'t clog pores.', activeTags: [] },
    ],
    pm: [
      { step: 'Cleanse',    product: 'Gentle cleanser',                           why: 'Removes daytime grime and products.', activeTags: [] },
      { step: 'Treat',      product: 'Niacinamide serum',                        why: 'Helps regulate sebum production and keep pores clear.', activeTags: [] },
      { step: 'Moisturize', product: 'Non-comedogenic moisturizer',              why: 'Provides non-clogging hydration overnight.', activeTags: [] },
    ],
  },
  dark_circles: {
    am: [
      { step: 'Cleanse',    product: 'Gentle cleanser',                          why: 'Clean base for eye products.', activeTags: [] },
      { step: 'Treat',      product: 'Caffeine eye cream (pat gently, don\'t rub)', why: 'Temporarily reduces puffiness and dark shadows under the eyes. Lifestyle first: consistent sleep.', activeTags: [] },
      { step: 'Moisturize', product: 'Moisturizer',                               why: 'Keeps under-eye area hydrated and plump.', activeTags: [] },
      { step: 'SPF',        product: 'Sunscreen (including under-eyes)',          why: 'UV exposure can worsen skin discolouration around the eyes.', activeTags: [] },
    ],
    pm: [
      { step: 'Cleanse',    product: 'Gentle cleanser',                           why: 'Removes dirt and environmental residue.', activeTags: [] },
      { step: 'Treat',      product: 'Caffeine eye cream (pat gently, don\'t rub)', why: 'Soothes and de-puffs the eye area overnight.', activeTags: [] },
      { step: 'Moisturize', product: 'Moisturizer',                               why: 'Locks in under-eye moisture.', activeTags: [] },
    ],
  },
  large_pores: {
    am: [
      { step: 'Cleanse',    product: 'Gentle cleanser',                          why: 'Clean base for pore management.', activeTags: [] },
      { step: 'Treat',      product: 'Niacinamide serum',                        why: 'Helps regulate oil and minimizes how visible pores look. Note: pore size won\'t shrink.', activeTags: [] },
      { step: 'Moisturize', product: 'Lightweight moisturizer',                   why: 'Provides oil-free hydration.', activeTags: [] },
      { step: 'SPF',        product: 'Sunscreen',                                 why: 'UV damage weakens collagen around pores, making them look larger.', activeTags: [] },
    ],
    pm: [
      { step: 'Cleanse',    product: 'Gentle cleanser',                           why: 'Removes daily impurities.', activeTags: [] },
      { step: 'Treat',      product: 'Clay mask (1–2x/week only)',                 why: 'Weekly treatment to absorb excess sebum and clarify pores.', activeTags: [] },
      { step: 'Moisturize', product: 'Regular moisturizer',                       why: 'Maintains skin hydration overnight.', activeTags: [] },
    ],
  },
  dullness: {
    am: [
      { step: 'Cleanse',    product: 'Gentle cleanser',                          why: 'A clean base to start your brightening routine.', activeTags: [] },
      { step: 'Treat',      product: 'Vitamin C serum',                          why: 'Antioxidant that brightens skin and combats dullness. Lifestyle first: stay hydrated.', activeTags: ['vitamin_c'] },
      { step: 'Moisturize', product: 'Moisturizer',                               why: 'Well-hydrated skin reflects light better and looks more radiant.', activeTags: [] },
      { step: 'SPF',        product: 'Sunscreen',                                 why: 'Protects skin from UV-induced dullness and texture damage.', activeTags: [] },
    ],
    pm: [
      { step: 'Cleanse',    product: 'Gentle cleanser',                           why: 'Clean base for PM treatments.', activeTags: [] },
      { step: 'Treat',      product: 'Gentle exfoliating cleanser or lactic acid (2-3x/week)', why: 'Removes dead skin cells that build up and make skin look flat.', activeTags: ['lactic_acid'] },
      { step: 'Moisturize', product: 'Regular moisturizer',                       why: 'Hydrates skin to support cell turnover.', activeTags: [] },
    ],
  },
}

