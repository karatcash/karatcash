# Design System: KaratCash — Compra de Oro en Phoenix

## 1. Visual Theme & Atmosphere

**Mood:** Authoritative trust meets warm accessibility. A gold dealer that feels like a private wealth advisor, not a pawn shop. The visual language communicates "we handle valuable things seriously" while the tone says "we're real people who speak your language."

**Density:** 4/10 — Art Gallery Balanced. Generous whitespace, each section breathes. Content is scannable, never overwhelming. Mobile users (primary audience) get focused, linear experiences.

**Variance:** 6/10 — Offset Asymmetric. Hero sections use asymmetric layouts (split-screen or left-aligned with offset elements). Content sections alternate between dark navy and warm white backgrounds with clean, hard-cut transitions (no gradient fades between sections).

**Motion:** 6/10 — Fluid CSS meets GSAP Choreography. Scroll-triggered reveals with staggered delays on card grids. Gold shimmer accents on key CTAs. Number counter animations on the calculator. Everything feels weighty and intentional, never bouncy or playful.

**Core Visual Identity:** Dark-to-light rhythm. Hero sections open in deep navy with gold typography accents, then transition to warm off-white informational sections. This creates a visual "entering a vault → stepping into daylight" narrative. Section transitions are hard cuts — no gradient blending between dark and light zones.

## 2. Color Palette & Roles

- **Vault Navy** (#1A1F2B) — Deepest background. Hero sections, calculator widget, CTA blocks, footer. The "serious" surface.
- **Navy Mid** (#2D3442) — Secondary dark surface. Nav background, card backgrounds on dark sections, subtle depth layering.
- **Warm White** (#FAFAF8) — Primary light background. Informational sections, card surfaces. Not stark white — has warmth.
- **Mist Gray** (#F0EFED) — Secondary light surface. Input backgrounds on light sections, subtle card fills, tag backgrounds.
- **Border Gray** (#E2E1DE) — Borders and dividers on light sections. Subtle, never harsh.
- **Text Secondary** (#6E6D69) — Body text on light backgrounds. Warm gray, readable.
- **Text Muted** (#9E9D99) — Captions, disclaimers, metadata. Recedes but remains legible.
- **Refined Gold** (#C5A55A) — THE accent. CTAs, active states, badges, highlights, gold gradient text on dark backgrounds. Single accent color. Saturation intentionally restrained — not a flashy gold but a matte, sophisticated gold like aged brass.
- **Gold Light** (#D4B96A) — Gradient pair for Refined Gold. Used in linear-gradient text effects and hover states only.
- **Confirmation Green** (#2D8F5E) — Success states, checkmarks, trust badges. Used sparingly.
- **Info Blue** (#2B6CB0) — Links on light backgrounds, secondary badges. Minimal usage.

**Gradient Rules:**
- Gold gradient (`#C5A55A → #D4B96A`) permitted ONLY on headline text via `-webkit-background-clip: text` on dark backgrounds
- No background gradients between sections — hard color cuts only
- No radial gradient backgrounds — only subtle radial glows as decorative overlays at very low opacity (< 8%)

## 3. Typography Rules

- **Display/Headlines:** `Outfit` — Weight 700-800, track-tight (`letter-spacing: -0.02em`). Hierarchy through weight and color contrast, not extreme size jumps. Headlines on dark backgrounds in white with key phrase in gold gradient. Headlines on light backgrounds in Vault Navy.
- **Body:** `Outfit` — Weight 400-500, relaxed leading (`line-height: 1.7`), max 65 characters per line. Body on dark: #C8C7C3. Body on light: #6E6D69.
- **Mono:** `JetBrains Mono` — For the gold calculator numbers, price displays, and formula breakdowns. Weight 500.
- **Scale:** `clamp()` for responsive sizing. H1: `clamp(2rem, 5vw, 3.2rem)`. H2: `clamp(1.5rem, 3.5vw, 2.2rem)`. Body: `1rem` minimum.
- **Labels:** Uppercase, letter-spacing `2px`, weight 600, size `0.7rem`, color Refined Gold. Used for section markers (e.g., "Compra de oro en todo Phoenix").

## 4. Component Stylings

### Buttons
- **Primary:** Background Refined Gold, text Vault Navy, weight 700. Border-radius `10px`. Padding `0.75rem 1.5rem`. On hover: subtle `translateY(-1px)` lift + gold box-shadow at 30% opacity. On active: `translateY(0)` press. No outer glow.
- **Outline:** 1.5px border in Refined Gold, text Refined Gold, transparent background. On hover: background fills with `rgba(197,165,90,0.08)`.
- **Dark:** Background Navy Mid, text white. Used on light sections as secondary action.

### Cards (Light Background Sections)
- Background Warm White, 1px Border Gray border, border-radius `16px`, padding `2rem`. Shadow: `0 1px 2px rgba(0,0,0,0.06)`. On hover: shadow deepens to `0 4px 12px rgba(0,0,0,0.08)` + `translateY(-2px)`.
- On dark sections: cards are replaced with bordered containers using `rgba(197,165,90,0.12)` borders and `rgba(255,255,255,0.03)` background.

### Number Step Indicators
- Square with rounded corners (`10px`), `40px × 40px`. Background Vault Navy, text Refined Gold, weight 700. These mark process steps (1, 2, 3).

### Karat Selection Buttons (Calculator)
- Horizontal button group. Inactive: `rgba(197,165,90,0.1)` fill, gold border, gold text. Active: solid Refined Gold fill, Vault Navy text. Smooth transition between states.

### Inputs
- Light sections: white background, Border Gray border, border-radius `10px`. On focus: border becomes Refined Gold.
- Dark sections: `rgba(255,255,255,0.05)` background, `rgba(197,165,90,0.2)` border. On focus: border becomes Refined Gold. Placeholder text in Text Muted.
- Label above input in uppercase label style.

### Trust Badges
- Inline flex with checkmark icon in Confirmation Green + text in Text Muted. Arranged horizontally on desktop, vertically on mobile. Used in hero section.

### FAQ Accordion
- Native `<details>` element. Border Gray border, border-radius `10px`. Open state: border becomes Refined Gold. Summary has `+` indicator in gold that rotates 45deg to `×` on open.

### Tags/Badges
- Small pill shapes, border-radius `4px`. Three variants:
  - Green: `#E8F5EE` background, `#2D8F5E` text
  - Blue: `#EBF4FF` background, `#2B6CB0` text  
  - Gold: `#F5EFD8` background, `#9E8444` text

### WhatsApp Floating Button
- Fixed bottom-right, `56px` circle, WhatsApp green (`#25D366`), white icon. Shadow: `0 4px 16px rgba(37,211,102,0.35)`. On hover: `scale(1.08)`.

## 5. Layout Principles

### Section Rhythm
Sections alternate between dark (Vault Navy) and light (Warm White) backgrounds. The pattern creates a visual pulse:
- Hero: DARK
- Cómo Funciona: LIGHT
- Calculadora preview: DARK
- Por Qué KaratCash: DARK (consecutive dark is OK for emphasis blocks)
- Cobertura: LIGHT
- CTA Final: DARK
- Footer: DARK

**Section transitions are HARD CUTS.** No gradient blending, no diagonal dividers, no SVG wave shapes. One background color ends, the next begins. Clean and authoritative.

### Grid System
- Max-width: `1100px`, centered with `padding: 0 2rem`
- CSS Grid for card layouts: `repeat(3, 1fr)` on desktop → `1fr` on mobile
- Two-column layouts for split content (e.g., calculator info + widget): `1fr 1fr` → stacked on mobile
- Contact page: `1fr 1.2fr` grid (options + form)

### Spacing
- Section padding: `clamp(3rem, 8vw, 6rem) 0`
- Card gap: `1.5rem`
- Component internal padding: `2rem`

### Hero Layout
- Centered text layout (variance 6 allows centered for this specific brand — the gold buying audience expects centered authority)
- Label → H1 → Subtitle → CTA buttons → Trust badges
- Subtle radial gold glow overlay behind headline at 7% opacity

### Navigation
- Fixed top, `64px` height, Navy Mid at 95% opacity with `backdrop-filter: blur(20px)`
- Gold accent border-bottom at 12% opacity
- Logo (KC monogram) + brand name left, links center-right, primary CTA button far right
- Mobile: hamburger → full-screen overlay slide-in from right

## 6. Motion & Interaction

### Scroll Reveals (GSAP + ScrollTrigger)
- `.gs-reveal`: `opacity: 0 → 1`, `translateY(30px) → 0`. Duration `0.8s`, ease `power2.out`. Trigger at `top 85%`, once.
- Staggered cards: CSS custom property `--delay` per card (0.1s increments). Creates waterfall effect.
- Section headers reveal first, then content cards cascade.

### Calculator Interactions
- Number result uses animated counter (GSAP `onUpdate` tweening displayed value)
- Karat button selection: smooth background-color transition
- Result section slides in (`display: none → block` with opacity fade)

### Navigation
- Mobile menu: `translateX(100%) → translateX(0)` slide-in. Duration `0.25s`.
- Nav background: slight opacity increase on scroll past 80px.

### Hover States
- Buttons: `translateY(-1px)` lift + shadow expansion. Duration `150ms`.
- Cards: `translateY(-2px)` lift + shadow deepening. Duration `250ms`.
- Links: color transition to Refined Gold. Duration `150ms`.

### Reduced Motion
- `@media (prefers-reduced-motion: reduce)`: all animations disabled, elements render at final state immediately.

### Performance
- All animations use `transform` and `opacity` only — never animate `width`, `height`, `margin`, `padding`, `top`, `left`
- GSAP loaded via CDN, ScrollTrigger registered once

## 7. Anti-Patterns (Banned)

### Visual
- No gradient transitions between dark/light sections — hard cuts only
- No SVG wave dividers or diagonal section separators
- No neon outer glows on buttons or cards
- No pure black (#000000) — use Vault Navy (#1A1F2B)
- No oversaturated gold — keep it matte and restrained
- No purple/blue neon accents
- No generic 3-column equal card layouts without visual differentiation
- No overlapping elements — every element in its own spatial zone
- No broken image links — use generated gold textures, close-up objects, never AI-generated faces
- No photos of an office, storefront, or physical location that doesn't exist
- No AI-generated human faces

### Typography
- No `Inter` font — use `Outfit`
- No generic serif fonts (Times, Georgia, Garamond)
- No gradient text on body copy (only headlines on dark backgrounds)
- No text larger than `clamp(2rem, 5vw, 3.2rem)` for H1

### Content
- No English — everything in Spanish
- No "visítanos en nuestra oficina" or any reference to a physical office/storefront
- No fake testimonials — use placeholder or omit until real ones exist
- No generic names ("John Doe", "Acme")
- No AI copywriting cliches ("Elevate", "Seamless", "Unleash", "Next-Gen", "Revolucionario")
- No "Scroll to explore", scroll arrows, bouncing chevrons
- No mention of the address (1341 E Fremont Rd) as a meeting point
- No fake round numbers ("99.99%", "1000+ clientes")

### Layout
- No horizontal scroll on mobile
- No custom mouse cursors
- No sticky elements besides nav and WhatsApp button
- No modal popups on page load
- No autoplay video or audio

## 8. Screen List

These are the screens to generate in Stitch:

1. **Homepage** — Dark hero (headline with gold gradient text, 2 CTAs, trust badges) → Light "Cómo Funciona" (3 step cards) → Dark calculator preview widget → Dark "Por Qué KaratCash" (6 differentiator cards) → Light "Cobertura" (city tags) → Dark CTA final (multi-channel contact)

2. **Cómo Funciona** — Dark hero → Light step 1 detail → Dark step 2 detail → Light step 3 detail → Dark "tipos de oro" (4 karat cards) → Light FAQ accordion → Dark CTA

3. **Calculadora de Oro** — Dark hero → Dark full calculator widget (weight input, karat selector, live result) → Light educational section (spot price explanation, karat guide, formula) → Dark CTA

4. **Sobre Nosotros** — Dark hero → Light story/narrative → Dark values (3 cards: transparencia, respeto, seguridad) → Light "hablamos tu idioma" callout → CTA

5. **Contacto** — Dark hero → Light two-column layout (contact options cards on left: WhatsApp, phone, hours, coverage + form on right in elevated card)

6. **Navigation (global)** — Fixed dark nav with logo, links, gold CTA button. Mobile hamburger menu.

7. **Footer (global)** — Dark navy, 4-column grid: brand/tagline, navigation links, contact channels, service area cities. Bottom bar with copyright and disclaimer.
