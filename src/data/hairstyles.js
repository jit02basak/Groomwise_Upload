// Hairstyle catalog data — 90-style dataset (60 base + 19 modernized + 5 merged + 6 gap-fill variants)
// Each entry maps to the Hairstyle data model.
//
// Tier derivation rule (for reference when adding new styles):
//   Tier 3 if classification contains "Non-Trendy", "Non-Popular", "Retro", or "Niche"
//   Tier 1 if classification contains "Modern", "Trendy", or "Popular"
//   Tier 2 otherwise (contains only "Classic", "Famous", "Basic")

export const FACE_SHAPES = [
  { id: 'oval',    label: 'Oval',    description: 'Balanced proportions, wider at cheeks, narrowing gently at forehead and jaw.' },
  { id: 'round',   label: 'Round',   description: 'Width and length are roughly equal, with soft curved edges.' },
  { id: 'square',  label: 'Square',  description: 'Strong jawline, roughly equal width at forehead, cheeks, and jaw.' },
  { id: 'heart',   label: 'Heart',   description: 'Wider forehead tapering down to a pointed or narrow chin.' },
  { id: 'diamond', label: 'Diamond', description: 'Narrow forehead and jaw, with wide prominent cheekbones.' },
  { id: 'oblong',  label: 'Oblong',  description: 'Face is notably longer than it is wide, with similar widths throughout.' },
]

export const HAIR_TYPES = [
  { id: 'Straight', label: 'Straight' },
  { id: 'Wavy',     label: 'Wavy' },
  { id: 'Curly',    label: 'Curly' },
  { id: 'Coily',    label: 'Coily' },
]

export const THICKNESS_OPTIONS = [
  { id: 'Fine',   label: 'Fine' },
  { id: 'Medium', label: 'Medium' },
  { id: 'Coarse', label: 'Coarse' },
]

// User-facing tier labels — tier numbers (1/2/3) are internal only
export const TIER_LABELS = {
  1: 'Trending Now',
  2: 'Timeless Classic',
  3: 'Retro / Archive',
}

export const hairstyles = [
  { id: "coily-fine-360-waves", name: "360 Waves", hairTypes: ["Coily", "Curly"], thicknesses: ["Fine"], classification: "Famous/Basic", tier: 2, compatibleFaceShapes: ["Oval", "Square", "Round", "Heart", "Oblong", "Diamond"], description: "Training short, fine coily hair to lay flat in continuous, oceanic ripple patterns using brushing and durags." },
  { id: "curly-fine-angled-curly-crop", name: "Angled Curly Crop", hairTypes: ["Curly"], thicknesses: ["Fine"], classification: "Trendy", tier: 1, compatibleFaceShapes: ["Round", "Square"], description: "Asymmetrical top lengths let fine curls bunch up over each other, creating the illusion of a much thicker mane." },
  { id: "wavy-fine-bedhead-messy-shag", name: "Bedhead / Messy Shag", hairTypes: ["Wavy"], thicknesses: ["Fine"], classification: "Trendy", tier: 1, compatibleFaceShapes: ["Heart", "Square", "Oval"], description: "Casual, tousled layers that maximize the natural bounce and lightweight volume of fine, wavy hair." },
  { id: "straight-fine-bowl-cut", name: "Bowl Cut", hairTypes: ["Straight", "Wavy"], thicknesses: ["Fine"], classification: "Non-Trendy/Retro", tier: 3, compatibleFaceShapes: ["Oval"], description: "A blunt, uniform perimeter cut; highly niche today but historical." },
  { id: "coily-coarse-box-faded-afro", name: "Box Faded Afro", hairTypes: ["Coily"], thicknesses: ["Coarse"], classification: "Niche/Retro", tier: 3, compatibleFaceShapes: ["Square"], description: "Sculpting extremely dense, coarse coils into sharp, geometric squares, angles, and flat planes." },
  { id: "straight-coarse-bro-flow", name: "Bro Flow", hairTypes: ["Straight", "Wavy"], thicknesses: ["Medium", "Coarse"], classification: "Modern/Trendy", tier: 1, compatibleFaceShapes: ["Oval", "Square"], description: "Grown out to medium-long lengths so the pure weight of the thick hair forces it to lay down and sweep back." },
  { id: "curly-coarse-burst-fade-frohawk-2026", name: "Burst Fade Frohawk", hairTypes: ["Curly"], thicknesses: ["Coarse"], classification: "Modern/Trendy", tier: 1, compatibleFaceShapes: ["Round", "Diamond"], description: "A sharp, circular fade around the ears that makes a thick, dense strip of coarse curls stand out dramatically down the center.", modernizedFrom: "curly-coarse-burst-fade-mohawk-frohawk" },
  { id: "curly-coarse-burst-fade-mohawk-frohawk", name: "Burst Fade Mohawk / Frohawk", hairTypes: ["Curly", "Wavy"], thicknesses: ["Coarse", "Fine"], classification: "Popular/Trendy", tier: 1, compatibleFaceShapes: ["Round", "Diamond", "Oval"], description: "Fading a circular pattern around the ears while leaving a wide, thick strip of coarse curls down the center." },
  { id: "straight-fine-butch-cut", name: "Butch Cut", hairTypes: ["Straight", "Wavy", "Curly", "Coily"], thicknesses: ["Fine", "Medium", "Coarse"], classification: "Basic/Ultra-Short", tier: 2, compatibleFaceShapes: ["Oval", "Square", "Heart", "Oblong", "Round", "Diamond"], description: "Shaved to one uniform short length; completely removes the weight that makes fine hair separate." },
  { id: "straight-coarse-buzz-cut", name: "Buzz Cut", hairTypes: ["Straight", "Wavy", "Curly", "Coily"], thicknesses: ["Fine", "Medium", "Coarse"], classification: "Basic/Famous", tier: 2, compatibleFaceShapes: ["Oval", "Square", "Heart", "Oblong", "Round", "Diamond"], description: "Simple, clean, and completely tames stubborn, stiff, coarse hair." },
  { id: "straight-fine-caesar-cut", name: "Caesar Cut", hairTypes: ["Straight"], thicknesses: ["Fine"], classification: "Classic/Famous", tier: 2, compatibleFaceShapes: ["Heart", "Oblong", "Diamond"], description: "Short horizontally cut bangs and uniform length that hides thinning spots or fine textures." },
  { id: "wavy-coarse-chunky-crop-fade", name: "Chunky Crop Fade", hairTypes: ["Wavy"], thicknesses: ["Coarse"], classification: "Modern/Trendy", tier: 1, compatibleFaceShapes: ["Round", "Square"], description: "A high skin fade paired with thick, heavy, blocky waves on top.", modernizedFrom: "wavy-coarse-textured-crop-fade" },
  { id: "wavy-coarse-chunky-undercut", name: "Chunky Undercut", hairTypes: ["Wavy"], thicknesses: ["Coarse"], classification: "Modern", tier: 1, compatibleFaceShapes: ["Round", "Square"], description: "Shaving the sides entirely to remove 70% of the bulk, leaving a thick, heavy wavy mass on top." },
  { id: "curly-medium-classic-afro-curly-taper", name: "Classic Afro-Curly Taper", hairTypes: ["Curly"], thicknesses: ["Medium"], classification: "Famous", tier: 2, compatibleFaceShapes: ["Heart", "Diamond"], description: "Clean edges with perfectly defined, medium-sized ringlets all over the crown." },
  { id: "straight-fine-classic-crew-cut", name: "Classic Crew Cut", hairTypes: ["Straight"], thicknesses: ["Fine"], classification: "Basic", tier: 2, compatibleFaceShapes: ["Oval", "Square", "Round", "Heart", "Oblong", "Diamond"], description: "Tapered sides with a short top; highly practical and easy to make look full." },
  { id: "straight-medium-classic-side-part", name: "Classic Side Part", hairTypes: ["Straight", "Wavy"], thicknesses: ["Fine", "Medium", "Coarse"], classification: "Famous/Basic", tier: 2, compatibleFaceShapes: ["Oval", "Square", "Round", "Heart", "Oblong", "Diamond"], description: "The quintessential gentleman's cut with a defined part and combed sides." },
  { id: "wavy-fine-classic-taper-waves", name: "Classic Taper with Waves", hairTypes: ["Wavy"], thicknesses: ["Fine"], classification: "Basic", tier: 2, compatibleFaceShapes: ["Round", "Square", "Oval", "Diamond"], description: "Scissor-cut sides with short, natural waves on top that create effortless volume." },
  { id: "coily-fine-clean-micro-locs", name: "Clean Micro-Locs", hairTypes: ["Coily"], thicknesses: ["Fine"], classification: "Modern/Trendy", tier: 1, compatibleFaceShapes: ["Oval", "Square"], description: "Thin, highly precise protective locs that look incredibly neat, intentional, and modern.", modernizedFrom: "coily-fine-micro-locs" },
  { id: "straight-fine-comb-over-fade", name: "Comb Over Fade", hairTypes: ["Straight"], thicknesses: ["Fine"], classification: "Popular/Modern", tier: 1, compatibleFaceShapes: ["Round", "Square"], description: "Fading the sides shifts the visual volume to the top, making fine hair look denser." },
  { id: "curly-coarse-curly-edgar-cut", name: "Curly Edgar Cut", hairTypes: ["Curly"], thicknesses: ["Coarse"], classification: "Trendy", tier: 1, compatibleFaceShapes: ["Heart", "Oblong"], description: "A straight-across blunt fringe cut into coarse curls, blending seamlessly into a high fade for a dense, curly crown." },
  { id: "curly-fine-curly-fringe-drop-fade", name: "Curly Fringe with Drop Fade", hairTypes: ["Curly"], thicknesses: ["Fine"], classification: "Trendy", tier: 1, compatibleFaceShapes: ["Heart", "Oblong", "Diamond"], description: "Faded back and sides, with fine curls cascading forward over the forehead to create density." },
  { id: "curly-fine-curly-fringe-high-drop-fade", name: "Curly Fringe with High Drop Fade", hairTypes: ["Curly"], thicknesses: ["Fine"], classification: "Modern/Trendy", tier: 1, compatibleFaceShapes: ["Heart", "Oblong"], description: "The back and sides are completely faded out, pushing all fine curls forward onto the forehead to build visual density and volume.", modernizedFrom: "curly-fine-curly-fringe-drop-fade" },
  { id: "curly-medium-curly-undercut", name: "Curly Undercut", hairTypes: ["Curly"], thicknesses: ["Medium"], classification: "Popular/Famous", tier: 1, compatibleFaceShapes: ["Round", "Square", "Oval"], description: "Completely shaved or faded sides with a bouncy, defined waterfall of curls on top." },
  { id: "curly-medium-curly-undercut-waterfall", name: "Curly Undercut Waterfall", hairTypes: ["Curly"], thicknesses: ["Medium"], classification: "Modern/Trendy", tier: 1, compatibleFaceShapes: ["Round", "Square"], description: "Shaved sides with defined, highly moisturized medium curls that cascade over the forehead and sides like a waterfall.", modernizedFrom: "curly-medium-curly-undercut" },
  { id: "straight-medium-curtain-bangs", name: "Curtain Bangs / EBoy Cut", hairTypes: ["Straight", "Wavy"], thicknesses: ["Medium"], classification: "Trendy", tier: 1, compatibleFaceShapes: ["Heart", "Oblong", "Oval", "Square"], description: "Center or off-center part allowing straight hair to frame the face symmetrically." },
  { id: "straight-medium-disconnected-texturized-undercut", name: "Disconnected Texturized Undercut", hairTypes: ["Straight"], thicknesses: ["Medium"], classification: "Modern/Trendy", tier: 1, compatibleFaceShapes: ["Round", "Square"], description: "High-contrast style where the long top falls loosely over completely shaved sides, emphasizing clean, sleek straight lines.", modernizedFrom: "straight-medium-disconnected-undercut" },
  { id: "straight-medium-disconnected-undercut", name: "Disconnected Undercut", hairTypes: ["Straight"], thicknesses: ["Medium"], classification: "Modern/Popular", tier: 1, compatibleFaceShapes: ["Round", "Square"], description: "Sharp contrast between shaved sides and a long, free-flowing straight top." },
  { id: "coily-medium-drop-fade-coils", name: "Drop Fade with Coils", hairTypes: ["Coily"], thicknesses: ["Medium"], classification: "Trendy", tier: 1, compatibleFaceShapes: ["Round", "Diamond"], description: "A modern fade that drops low behind the ear, leaving a dense, textured coily crown." },
  { id: "wavy-coarse-elephant-trunk", name: "Elephant Trunk", hairTypes: ["Wavy"], thicknesses: ["Coarse"], classification: "Non-Popular/Niche", tier: 3, compatibleFaceShapes: ["Heart", "Oblong"], description: "A 1950s rockabilly look where a massive, thick wavy lock hangs down over the forehead." },
  { id: "wavy-medium-executive-contour", name: "Executive Contour", hairTypes: ["Straight", "Wavy"], thicknesses: ["Medium"], classification: "Classic", tier: 2, compatibleFaceShapes: ["Heart", "Oblong", "Oval", "Square"], description: "A traditional side-part style where the top is kept long enough to let a soft wave show." },
  { id: "wavy-coarse-faux-hawk", name: "Faux Hawk", hairTypes: ["Wavy"], thicknesses: ["Coarse"], classification: "Famous", tier: 2, compatibleFaceShapes: ["Round", "Diamond", "Heart"], description: "The thick waves are pushed toward the center ridge, creating a textured, less rigid mohawk look." },
  { id: "straight-coarse-flat-top", name: "Flat Top", hairTypes: ["Straight"], thicknesses: ["Coarse"], classification: "Classic/Niche", tier: 3, compatibleFaceShapes: ["Round", "Square"], description: "Perfectly leveled, boxy top cut that relies entirely on the rigid stiffness of coarse straight hair to stay upright." },
  { id: "coily-coarse-freeform-locs", name: "Freeform Locs", hairTypes: ["Coily"], thicknesses: ["Coarse"], classification: "Trendy/Popular", tier: 1, compatibleFaceShapes: ["Heart", "Diamond", "Round", "Oval"], description: "Allowing coarse coils to grow out completely naturally into unique, organic, self-forming locks." },
  { id: "coily-coarse-freeform-locs-mid-fade", name: "Freeform Locs Mid-Fade", hairTypes: ["Coily"], thicknesses: ["Coarse"], classification: "Modern/Trendy", tier: 1, compatibleFaceShapes: ["Heart", "Diamond"], description: "Letting coarse coils naturally mat and form organic, unique locs on top, contrasted against a crisp, clean skin fade on the sides.", modernizedFrom: "coily-coarse-freeform-locs" },
  { id: "coily-medium-geometric-twist-out", name: "Geometric Twist Out", hairTypes: ["Coily"], thicknesses: ["Medium"], classification: "Modern/Trendy", tier: 1, compatibleFaceShapes: ["Heart", "Diamond"], description: "Coils are twisted wet and unraveled to create a highly defined, springy, textured silhouette with sharp, boxy line-ups.", modernizedFrom: "coily-medium-twist-outs" },
  { id: "straight-coarse-high-and-tight", name: "High and Tight", hairTypes: ["Straight"], thicknesses: ["Coarse"], classification: "Basic", tier: 2, compatibleFaceShapes: ["Oval", "Diamond", "Heart", "Oblong"], description: "Military style with shaved sides and a very small, short patch of coarse hair on top." },
  { id: "curly-coarse-high-top-curly-fade", name: "High-Top Curly Fade", hairTypes: ["Curly"], thicknesses: ["Coarse"], classification: "Classic/Retro", tier: 3, compatibleFaceShapes: ["Round", "Square"], description: "90s-inspired boxy shape where coarse curls are grown upward and sculpted flat on top." },
  { id: "coily-medium-high-top-fade", name: "High-Top Fade", hairTypes: ["Coily"], thicknesses: ["Medium"], classification: "Famous/Retro", tier: 3, compatibleFaceShapes: ["Round", "Square"], description: "The definitive retro flat-top look, sculpted mathematically straight using the natural strength of medium coils." },
  { id: "straight-fine-ivy-league", name: "Ivy League", hairTypes: ["Straight"], thicknesses: ["Fine"], classification: "Classic", tier: 2, compatibleFaceShapes: ["Oval", "Square"], description: "A slightly longer crew cut that can be parted; neat, professional, and excellent for fine, neat hair." },
  { id: "curly-coarse-juju-bowl", name: "JuJu Bowl", hairTypes: ["Curly"], thicknesses: ["Coarse"], classification: "Non-Popular/Niche", tier: 3, compatibleFaceShapes: ["Oblong"], description: "An avant-garde style where coarse curls are grown into an extremely exaggerated, rounded dome shape." },
  { id: "wavy-medium-long-bro-flow", name: "Long Bro Flow", hairTypes: ["Wavy"], thicknesses: ["Medium"], classification: "Popular/Famous", tier: 1, compatibleFaceShapes: ["Heart", "Oblong"], description: "Sweeping, collar-length waves that move naturally when brushed back.", disclaimer: "⚠️ Requires medium-to-long length (4–6+ inches) for optimal flow." },
  { id: "curly-coarse-long-curly-dreadlocks", name: "Long Curly Dreadlocks", hairTypes: ["Curly"], thicknesses: ["Coarse"], classification: "Famous", tier: 2, compatibleFaceShapes: ["Square", "Heart", "Oval"], description: "Allowing coarse curls to naturally mat and twist into structured locs over time.", disclaimer: "⚠️ Requires significant length and commitment to mature properly." },
  { id: "coily-fine-low-taper-fade", name: "Low Taper Fade", hairTypes: ["Coily"], thicknesses: ["Fine"], classification: "Popular/Famous", tier: 1, compatibleFaceShapes: ["Oval", "Square", "Round", "Heart", "Oblong", "Diamond"], description: "A very clean, safe cut that fades only the lowest edges of the hairline, leaving a neat, short coily top." },
  { id: "coily-fine-low-taper-fade-defined-coils", name: "Low Taper Fade with Defined Coils", hairTypes: ["Coily"], thicknesses: ["Fine"], classification: "Modern/Trendy", tier: 1, compatibleFaceShapes: ["Oval", "Square"], description: "Extremely clean edges around the ears and neck, leaving a short, protected, tightly coiled top that preserves hair health.", modernizedFrom: "coily-fine-low-taper-fade" },
  { id: "man-braids-boxer-braids", name: "Man Braids / Boxer Braids", hairTypes: ["Straight", "Wavy"], thicknesses: ["Medium", "Coarse"], classification: "Trendy", tier: 1, compatibleFaceShapes: ["Round", "Diamond"], description: "Hair braided close to the scalp in one or two rows running back, often paired with faded sides. Works on both straight and wavy hair." },
  { id: "man-bun", name: "Man Bun", hairTypes: ["Straight", "Wavy"], thicknesses: ["Medium"], classification: "Trendy", tier: 1, compatibleFaceShapes: ["Round", "Oval", "Oblong", "Square"], description: "Hair gathered into a bun at the crown or back, often paired with an undercut or fade at the sides. Works on both straight and wavy medium-length hair.", disclaimer: "⚠️ Requires 6+ inches of hair growth to tie back properly." },
  { id: "curly-medium-messy-curly-bowl-cut", name: "Messy Curly Bowl Cut", hairTypes: ["Curly"], thicknesses: ["Medium"], classification: "Trendy", tier: 1, compatibleFaceShapes: ["Heart", "Oblong"], description: "A modern, highly textured reinterpretation of the bowl cut, trading the flat look of the past for a rounded, voluminous dome of natural ringlets." },
  { id: "straight-medium-messy-curtain-quiff", name: "Messy Curtain Quiff", hairTypes: ["Straight", "Wavy"], thicknesses: ["Medium", "Coarse"], classification: "Modern/Trendy", tier: 1, compatibleFaceShapes: ["Round", "Square", "Oval"], description: "Features a soft center part at the root, but the fringe is styled upward and outward with a matte clay.", modernizedFrom: "straight-medium-quiff" },
  { id: "coily-fine-micro-locs", name: "Micro-Locs", hairTypes: ["Coily"], thicknesses: ["Fine"], classification: "Modern", tier: 1, compatibleFaceShapes: ["Oval", "Square"], description: "Compressing fine coily hair into hundreds of ultra-thin, pencil-sized protective locs." },
  { id: "wavy-medium-mod-cut", name: "Mod Cut", hairTypes: ["Straight", "Wavy"], thicknesses: ["Medium"], classification: "Non-Popular/Retro", tier: 3, compatibleFaceShapes: ["Heart", "Oblong", "Oval"], description: "1960s British-inspired layered cut with heavy, wavy side fringes." },
  { id: "straight-coarse-modern-bro-flow", name: "Modern Bro Flow", hairTypes: ["Straight", "Wavy"], thicknesses: ["Medium", "Coarse"], classification: "Modern/Trendy", tier: 1, compatibleFaceShapes: ["Oval", "Square"], description: "Lets thick, stiff hair grow to mid-length, utilizing its natural weight and volume to swoop back naturally behind the ears.", modernizedFrom: "straight-coarse-bro-flow" },
  { id: "straight-fine-modern-comb-over-low-drop-fade", name: "Modern Comb-Over with Low Drop Fade", hairTypes: ["Straight"], thicknesses: ["Fine"], classification: "Modern/Trendy", tier: 1, compatibleFaceShapes: ["Round", "Square"], description: "A sharp, clean side-part variant. The low drop fade leaves weight around the crown so fine hair doesn't look overly sparse.", modernizedFrom: "straight-fine-comb-over-fade" },
  { id: "wavy-medium-modern-mullet", name: "Modern Mullet", hairTypes: ["Wavy"], thicknesses: ["Medium"], classification: "Trendy", tier: 1, compatibleFaceShapes: ["Square", "Heart"], description: "Short on the sides, messy on top, and flowing out long and wavy at the back." },
  { id: "straight-coarse-mohican", name: "Mohican / True Mohawk", hairTypes: ["Straight"], thicknesses: ["Coarse"], classification: "Non-Trendy", tier: 3, compatibleFaceShapes: ["Round"], description: "Narrow strip of hair running down the center, spiked up high." },
  { id: "natural-untapered-afro", name: "Natural Untapered Afro", hairTypes: ["Coily"], thicknesses: ["Medium", "Coarse"], classification: "Trendy", tier: 1, compatibleFaceShapes: ["Oblong", "Diamond"], description: "Coily hair grown to its full natural volume without cutting or tapering the sides, celebrating its true texture." },
  { id: "straight-medium-pompadour", name: "Pompadour", hairTypes: ["Straight"], thicknesses: ["Medium", "Coarse"], classification: "Classic/Famous", tier: 2, compatibleFaceShapes: ["Round", "Square", "Oval"], description: "High volume at the front that sweeps back; requires the natural structural integrity of medium straight hair." },
  { id: "wavy-medium-pompadour-texture", name: "Pompadour with Texture", hairTypes: ["Wavy"], thicknesses: ["Medium", "Coarse"], classification: "Modern", tier: 1, compatibleFaceShapes: ["Round", "Square", "Oval"], description: "A classic pompadour shape but left wavy and loose rather than perfectly combed." },
  { id: "ponytail-half-up", name: "Ponytail / Half-Up", hairTypes: ["Straight", "Wavy"], thicknesses: ["Coarse"], classification: "Trendy", tier: 1, compatibleFaceShapes: ["Round", "Oval"], description: "Hair gathered fully or partially (half-up) while the rest is left down. Suits coarse straight or wavy hair with enough length to tie back.", disclaimer: "⚠️ Requires 8+ inches of length for a secure tie." },
  { id: "straight-medium-quiff", name: "Quiff", hairTypes: ["Straight"], thicknesses: ["Medium", "Coarse"], classification: "Popular/Modern", tier: 1, compatibleFaceShapes: ["Round", "Square", "Oval"], description: "Hair is styled upward and forward; medium thickness provides the perfect structural support." },
  { id: "straight-coarse-relaxed-samurai-top-knot", name: "Relaxed Samurai Top Knot", hairTypes: ["Straight"], thicknesses: ["Coarse"], classification: "Modern/Trendy", tier: 1, compatibleFaceShapes: ["Round", "Square"], description: "Shaved or tightly faded sides with a textured, messy knot at the crown — functional, futuristic, and highly popular.", modernizedFrom: "straight-coarse-samurai-top-knot" },
  { id: "straight-coarse-samurai-top-knot", name: "Samurai Top Knot", hairTypes: ["Straight"], thicknesses: ["Coarse"], classification: "Popular", tier: 1, compatibleFaceShapes: ["Round", "Square"], description: "Shaved sides with long, coarse top hair tied into a rigid, neat bun." },
  { id: "curly-fine-short-curly-crew", name: "Short Curly Crew", hairTypes: ["Curly"], thicknesses: ["Fine"], classification: "Basic", tier: 2, compatibleFaceShapes: ["Oval", "Square", "Diamond"], description: "Keeps curls cropped close to the head to maintain a neat, uniform look without thinning out." },
  { id: "wavy-fine-short-textured-quiff", name: "Short Textured Quiff", hairTypes: ["Wavy"], thicknesses: ["Fine", "Coarse"], classification: "Modern", tier: 1, compatibleFaceShapes: ["Oval", "Square", "Round", "Heart", "Oblong", "Diamond"], description: "A quiff that embraces the natural bend of the hair rather than forcing it straight." },
  { id: "wavy-fine-short-wavy-quiff-taper-fade", name: "Short Wavy Quiff with Taper Fade", hairTypes: ["Wavy"], thicknesses: ["Fine", "Coarse"], classification: "Modern/Trendy", tier: 1, compatibleFaceShapes: ["Round", "Square", "Oval"], description: "A relaxed quiff that leans into the natural bend of the hair at the hairline rather than forcing it straight.", modernizedFrom: "wavy-fine-short-textured-quiff" },
  { id: "wavy-coarse-shoulder-length-mane", name: "Shoulder-Length Mane", hairTypes: ["Wavy"], thicknesses: ["Coarse"], classification: "Classic", tier: 2, compatibleFaceShapes: ["Oblong", "Square"], description: "Letting heavy, coarse waves grow past the shoulders so gravity pulls the bulk downward.", disclaimer: "⚠️ Requires medium-to-long length (4–6+ inches) for optimal flow." },
  { id: "straight-medium-skater-snipped-cut", name: "Skater Snipped Cut", hairTypes: ["Straight"], thicknesses: ["Medium"], classification: "Non-Popular/Niche", tier: 3, compatibleFaceShapes: ["Oval"], description: "A messy, medium-length casual cut common in 90s skate culture." },
  { id: "skin-fade-bald-fade", name: "Skin Fade / Bald Fade", hairTypes: ["Straight", "Wavy", "Curly", "Coily"], thicknesses: ["Fine", "Medium", "Coarse"], classification: "Trendy", tier: 1, compatibleFaceShapes: ["Round", "Square", "Oval"], description: "Sides and back faded completely to the skin, shifting all visual weight to a short, textured top. Works across straight, wavy, and curly hair." },
  { id: "straight-medium-slick-back", name: "Slick Back", hairTypes: ["Straight", "Wavy"], thicknesses: ["Medium"], classification: "Famous", tier: 2, compatibleFaceShapes: ["Round", "Diamond", "Oval", "Square"], description: "Hair is grown out and combed straight back using pomade; relies on medium density to lie flat without looking sparse." },
  { id: "wavy-fine-slicked-back-undercut-waves", name: "Slicked Back Undercut with Waves", hairTypes: ["Wavy"], thicknesses: ["Fine", "Medium"], classification: "Niche", tier: 3, compatibleFaceShapes: ["Round", "Diamond", "Oval"], description: "Sleek sides with a wavy top pulled back, offering a textured alternative to the traditional straight slick back." },
  { id: "curly-fine-soft-curly-shag", name: "Soft Curly Shag", hairTypes: ["Curly"], thicknesses: ["Fine"], classification: "Non-Trendy", tier: 3, compatibleFaceShapes: ["Heart", "Square"], description: "Loose, light layers that allow fine curls to bounce freely without looking heavy." },
  { id: "coily-coarse-southside-fade", name: "Southside Fade", hairTypes: ["Coily"], thicknesses: ["Coarse"], classification: "Non-Popular/Niche", tier: 3, compatibleFaceShapes: ["Oval"], description: "Shaving the entire top of the head completely bald, leaving a thick band of coarse coils only around the bottom back and sides." },
  { id: "straight-coarse-spiky-cut", name: "Spiky Cut", hairTypes: ["Straight"], thicknesses: ["Coarse"], classification: "Famous/Retro", tier: 3, compatibleFaceShapes: ["Round", "Square"], description: "Capitalizes on coarse hair's natural tendency to stand straight up; textured with gel or wax." },
  { id: "coily-medium-sponge-twist-drop-fade", name: "Sponge Twist Drop Fade", hairTypes: ["Coily"], thicknesses: ["Medium"], classification: "Modern/Trendy", tier: 1, compatibleFaceShapes: ["Round", "Square"], description: "A modern fade that drops low behind the ear, while the top is quickly styled with a curl sponge for effortless, distinct mini-coils.", modernizedFrom: "coily-medium-sponge-twists" },
  { id: "coily-medium-sponge-twists", name: "Sponge Twists", hairTypes: ["Coily"], thicknesses: ["Medium"], classification: "Modern/Popular", tier: 1, compatibleFaceShapes: ["Round", "Square"], description: "Using a specialized curl sponge to quickly twist the top layer of coily hair into neat, defined mini-coils." },
  { id: "wavy-fine-surf-cut", name: "Surf Cut", hairTypes: ["Wavy"], thicknesses: ["Fine"], classification: "Famous", tier: 2, compatibleFaceShapes: ["Heart", "Oblong"], description: "Casual, chin-length fine waves that look effortlessly windblown." },
  { id: "coily-medium-tapered-afro", name: "Tapered Afro", hairTypes: ["Coily"], thicknesses: ["Medium"], classification: "Classic/Famous", tier: 2, compatibleFaceShapes: ["Round", "Square", "Oval"], description: "The iconic, beautifully rounded shape that showcases the natural volume of coily hair with clean, tapered edges." },
  { id: "curly-medium-tapered-curly-quiff", name: "Tapered Curly Quiff", hairTypes: ["Curly"], thicknesses: ["Medium", "Coarse"], classification: "Modern", tier: 1, compatibleFaceShapes: ["Round", "Square", "Oval"], description: "Clean tapers around the ears, with the medium curls styled upward and forward at the hairline." },
  { id: "wavy-medium-tapered-modern-mullet", name: "Tapered Modern Mullet", hairTypes: ["Wavy"], thicknesses: ["Medium"], classification: "Modern/Trendy", tier: 1, compatibleFaceShapes: ["Square", "Heart"], description: "A refined, less aggressive mullet with tight temple tapers blending into a messy, wavy top and collar-length back.", modernizedFrom: "wavy-medium-modern-mullet" },
  { id: "coily-fine-temp-fade", name: "Temp Fade", hairTypes: ["Coily"], thicknesses: ["Fine"], classification: "Classic", tier: 2, compatibleFaceShapes: ["Oval", "Square"], description: "Fading only the temples and neck, keeping a uniform, short, protected coily length on top." },
  { id: "wavy-coarse-textured-crop-fade", name: "Textured Crop Fade", hairTypes: ["Wavy"], thicknesses: ["Coarse"], classification: "Popular", tier: 1, compatibleFaceShapes: ["Round", "Square", "Heart"], description: "High skin fade on the sides with short, thick, chunky waves on top." },
  { id: "wavy-coarse-textured-faux-hawk-fohawk", name: "Textured Faux Hawk (FoHawk)", hairTypes: ["Wavy"], thicknesses: ["Coarse"], classification: "Modern/Trendy", tier: 1, compatibleFaceShapes: ["Round", "Diamond"], description: "Uses dense waves pushed toward a soft central ridge, creating texture without the stiffness of straight hair.", modernizedFrom: "wavy-coarse-faux-hawk" },
  { id: "straight-fine-textured-french-crop", name: "Textured French Crop", hairTypes: ["Straight", "Wavy"], thicknesses: ["Fine", "Medium"], classification: "Trendy", tier: 1, compatibleFaceShapes: ["Oval", "Square", "Round", "Heart", "Oblong", "Diamond"], description: "High skin fade on the sides with heavily point-cut, choppy layers on top — the forward-sweeping texture completely hides thinning or fine hair." },
  {
    id: "textured-middle-part",
    name: "Textured Middle Part",
    hairTypes: ["Straight", "Wavy"],
    thicknesses: ["Fine", "Medium", "Coarse"],
    classification: "Trending Now",
    tier: 1,
    compatibleFaceShapes: ["Oval", "Oblong", "Heart", "Diamond", "Square"],
    description: "A modern center part featuring soft, texturized layers that frame the face symmetrically. Offers a relaxed, natural flow without the heavy crown volume of a wolf cut."
  },
  { id: "textured-perm-korean-perm", name: "Textured Perm (\"Korean Perm\")", hairTypes: ["Straight"], thicknesses: ["Fine", "Medium"], classification: "Trendy", tier: 1, compatibleFaceShapes: ["Round", "Heart"], description: "A light perm adds soft waves, lift, and texture to naturally straight hair, often styled into a soft fringe or curtain shape." },
  { id: "wavy-medium-texturized-wolf-cut", name: "Texturized Wolf Cut", hairTypes: ["Straight", "Wavy"], thicknesses: ["Fine", "Medium"], classification: "Modern/Trendy", tier: 1, compatibleFaceShapes: ["Heart", "Square", "Oval", "Oblong"], description: "A heavily layered, futuristic hybrid of the shag and the mullet with lots of movement on top, short sides, and a wispy, wavy back.", modernizedFrom: "wavy-medium-wolf-cut" },
  { id: "coily-coarse-traditional-locs", name: "Traditional Locs", hairTypes: ["Coily"], thicknesses: ["Coarse"], classification: "Famous/Classic", tier: 2, compatibleFaceShapes: ["Square", "Heart", "Round", "Oval"], description: "Long, matured, beautifully structured locks that thrive on the density of coarse coily hair.", disclaimer: "⚠️ Requires significant length and commitment to mature properly." },
  { id: "coily-medium-twist-outs", name: "Twist Outs", hairTypes: ["Coily"], thicknesses: ["Medium"], classification: "Popular/Trendy", tier: 1, compatibleFaceShapes: ["Heart", "Diamond", "Oval"], description: "Coils are twisted together while wet and then unraveled once dry to create defined, springy, crimped patterns." },
  { id: "coily-coarse-two-strand-braids-cornrows", name: "Two-Strand Braids / Cornrows", hairTypes: ["Coily"], thicknesses: ["Coarse"], classification: "Famous/Basic", tier: 2, compatibleFaceShapes: ["Diamond", "Heart"], description: "Braiding thick, coarse coils flat against the scalp in neat, linear, or complex geometric patterns." },
  { id: "coily-coarse-two-strand-braids-temple-fade", name: "Two-Strand Braids with Temple Fade", hairTypes: ["Coily"], thicknesses: ["Coarse"], classification: "Modern/Trendy", tier: 1, compatibleFaceShapes: ["Diamond", "Heart"], description: "Intricate geometric braid patterns running backward or hanging loose, paired with a sharp temple fade to keep the face shape clean.", modernizedFrom: "coily-coarse-two-strand-braids-cornrows" },
  { id: "curly-medium-wet-look-shag", name: "Wet Look Shag", hairTypes: ["Curly"], thicknesses: ["Medium"], classification: "Niche", tier: 3, compatibleFaceShapes: ["Heart", "Square"], description: "Medium curls styled with high-shine gels or activators to mimic a perpetual poolside look." },
  { id: "wavy-medium-wolf-cut", name: "Wolf Cut", hairTypes: ["Straight", "Wavy"], thicknesses: ["Fine", "Medium"], classification: "Trendy/Modern", tier: 1, compatibleFaceShapes: ["Heart", "Square", "Oval", "Oblong"], description: "A highly layered, shaggy hybrid of a mullet and a shag cut that highlights wavy texture." },
]

// ─── Recommendation engine ──────────────────────────────────────────────

/**
 * Normalize face-shape string from the scanner (lowercase, e.g. "oval")
 * to the capitalized form used in the dataset ("Oval").
 */
export function normalizeFaceShape(shape) {
  if (!shape) return shape
  return shape.charAt(0).toUpperCase() + shape.slice(1).toLowerCase()
}

/**
 * Helper: Apply tie-break ranking where a modernized style sorts immediately
 * above the original style it was modernized from when both qualify.
 */
function applyModernizationTieBreak(list) {
  return [...list].sort((a, b) => {
    if (a.modernizedFrom === b.id) return -1
    if (b.modernizedFrom === a.id) return 1
    return 0
  })
}

/**
 * Get hairstyle recommendations for the scan results screen.
 *
 * Filters by hairType + thickness, excludes Tier 3 (library-only),
 * ranks primary face-shape matches with modernized-over-original tie-break,
 * and backfills up to 4 total slots with matching texture styles if primary is short.
 *
 * @param {string} faceShape   — capitalized, e.g. "Oval"
 * @param {string} hairType    — e.g. "Straight"
 * @param {string} thickness   — e.g. "Fine"
 * @param {Array}  allStyles   — the full hairstyles array
 * @returns {{ primary: Array, backfill: Array }}
 */
export function getHairstyleRecommendations(faceShape, hairType, thickness, allStyles = hairstyles) {
  const RECOMMENDATION_TARGET = 4

  // 1. Filter to the user's hair type + thickness, excluding Tier 3 (library-only)
  const texturePool = allStyles.filter(
    s => s.hairTypes.includes(hairType) && s.thicknesses.includes(thickness) && s.tier !== 3
  )

  // 2. Primary matches: styles whose compatibleFaceShapes includes the detected face shape
  const primaryMatches = texturePool.filter(s => s.compatibleFaceShapes.includes(faceShape))

  const universalMatches = primaryMatches.filter(s => s.compatibleFaceShapes.length >= 6)
  const specificMatches = primaryMatches.filter(s => s.compatibleFaceShapes.length < 6)

  const slots1And2 = applyModernizationTieBreak(universalMatches).slice(0, 2)
  const slots3And4 = applyModernizationTieBreak(specificMatches).slice(0, 2)

  let primary = [...slots1And2, ...slots3And4]

  if (primary.length < RECOMMENDATION_TARGET) {
    const usedIds = new Set(primary.map(s => s.id))
    const remainingPrimary = applyModernizationTieBreak(primaryMatches).filter(s => !usedIds.has(s.id))
    primary = [...primary, ...remainingPrimary.slice(0, RECOMMENDATION_TARGET - primary.length)]
  }

  // 3. Backfill: remaining slots filled from texturePool excluding already shown primary styles
  const remainingSlots = RECOMMENDATION_TARGET - primary.length
  let backfill = []

  if (remainingSlots > 0) {
    const primaryIds = new Set(primary.map(s => s.id))
    const backfillCandidates = texturePool.filter(s => !primaryIds.has(s.id))
    backfill = applyModernizationTieBreak(backfillCandidates).slice(0, remainingSlots)
  }

  return { primary, backfill }
}

// ─── Library helpers ────────────────────────────────────────────────────

/**
 * Filter the full catalog for the Library view.
 * Shows all tiers. Supports free-text search + hairType/thickness AND filters.
 */
export function filterLibrary({ search, hairType, thickness }) {
  return hairstyles.filter(h => {
    const matchesSearch    = !search    || h.name.toLowerCase().includes(search.toLowerCase())
    const matchesHairType  = !hairType  || h.hairTypes.includes(hairType)
    const matchesThickness = !thickness || h.thicknesses.includes(thickness)
    return matchesSearch && matchesHairType && matchesThickness
  })
}
