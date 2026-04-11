# Design Philosophy for DJ Portfolio & Booking Website

## Visual direction and color system

### Base look

- **Background:** Very dark gray/near‑black (for example, `#050608` or `#08090C`) to reduce eye strain and show subtle detail.
- **Matrix influence:** Use thin grid lines, subtle noise texture, or faint "code columns" in the background (blurred and low contrast).
- **Glow usage:** Reserve glow effects for key elements only (CTAs, section labels), not everywhere.
- **Text color:** White or off‑white for readability (for example, `#F5F5F7`) with high contrast on the dark background.

### Accent colors (gold + orange)

- **Primary accent (CTAs):** Vibrant orange, for example `#FF7A1A` or `#FF8C32`, for buttons, primary links, and key icons.
- **Secondary accent (details):** Desaturated "digital gold," for example `#C9A667`, for borders, thin lines, and small typographic details.
- **Hover states:** Use slightly brighter or more saturated versions of orange (for example `#FFA142`) and subtle glow/underline for interactive elements.

---

## Typography: dot‑matrix / tech‑y but readable

Use a tech display font for headings and labels, and a neutral sans‑serif for body text.

### Heading/display fonts (tech/matrix vibe)

Examples (Google‑fonts friendly):

- **Zen Dots** – Circular, dot/tech aesthetic; ideal for section labels, small caps, and UI labels.
- **Orbitron** – Geometric, sci‑fi feel; good for major headings.
- **Rajdhani** – Square, condensed, cyberpunk‑ish; still very readable for big headings.
- **Audiowide** – Retro‑futuristic, suitable for logo/brand wordmark.

Dot‑matrix flavor for micro‑details:

- Use **Zen Dots** in all caps for tiny tags like "UPCOMING GIGS / 2025".
- Optionally use a pixel/terminal font such as **VT323** only for tiny, decorative text (never for paragraphs).

### Body and UI text fonts

Pair the display font with a clean sans‑serif such as:

- **Inter** or **Manrope** – Highly readable and neutral.
- **IBM Plex Sans** – Slightly more technical feel.
- **Space Grotesk** – Modern, subtly futuristic.

**Suggested combo:**

- Headings (H1–H3): **Orbitron** or **Rajdhani** (uppercase with slight letter‑spacing).
- Labels & small UI text: **Zen Dots** (all caps, small size).
- Body text: **Inter** (weights 400–500).

---

## Hero layout with Spline 3D object

You will embed a Spline 3D object in the hero section; design around that centerpiece.

### Desktop layout

- **Two‑column layout:**
  - Left column: text stack (label, H1, subtext, CTAs).
  - Right column: Spline canvas (3D object) in a 4:3 or 16:10 frame.
- **Content order (left):**
  - Small label in Zen Dots, orange pill: "AVAILABLE FOR BOOKINGS".
  - H1 in Orbitron/Rajdhani, e.g.: "DJ [NAME] / CLUBS · WEDDINGS · EVENTS".
  - Short descriptive line about style and location.
  - Primary CTA (solid orange button): "CHECK AVAILABILITY".
  - Secondary CTA (ghost / gold outline): "LISTEN TO A LIVE MIX".
- **Background behind Spline:** Subtle grid or radial gradient to ground the 3D object.

### Mobile layout

- Stack vertically:
  - Text block first (label, H1, copy).
  - CTAs.
  - Spline 3D object below, full‑width with reduced height.
- Ensure CTAs remain above the fold on typical phone screens.

---

## GSAP animation philosophy

GSAP should reinforce the Matrix vibe without overwhelming usability.

### Principles

- Use **GSAP ScrollTrigger** or basic timelines to:
  - Animate hero copy and 3D object entrance on page load.
  - Reveal sections on scroll (fade in with slight vertical/transform motion).
- Keep animations **short (0.6–1s)** and focused on performant properties:
  - `opacity`
  - `transform` (`translate`, `scale`, `rotate`)
- Avoid animating heavy properties like `box-shadow` and `filter` on large elements.

### Concrete animation ideas

- **Hero intro:**
  - On load: background grid or code‑like lines fade in.
  - Heading slides in from bottom with slight delay.
  - Spline object performs a gentle rotation or glow pulse.

- **Section reveals on scroll:**
  - Section headings slide in from left/right with a stagger on child elements.
  - Content blocks fade in and rise slightly (e.g. `y: 30 → 0`).

- **Matrix touches:**
  - Very subtle, slow background "scan" on the grid (a gradient moving diagonally).
  - On the calendar, event cards can glow slightly or scale up a bit on hover.

### Responsiveness for animations

- Use `ScrollTrigger.matchMedia` or similar patterns to:
  - Simplify or disable some animations on mobile.
  - Adjust start/end triggers based on viewport height.

---

## Placeholders for images and media

Until real assets are available, use placeholders that communicate layout and content.

### Image placeholders

- Maintain consistent aspect ratios:
  - Hero background: 16:9 or 21:9.
  - Gallery images: 3:2 or 1:1.
  - Video thumbnails: 16:9.
- Implement placeholders as:
  - Dark shapes with gradient overlays.
  - Labels using Zen Dots, e.g. "EVENT PHOTO PLACEHOLDER" or "LIVE VIDEO PLACEHOLDER".

### Media embeds

- Use generic SoundCloud/YouTube-style placeholders with overlay text like "LIVE MIX PLACEHOLDER".
- Keep the player frame and controls visible so layout and hierarchy are clear to the client.

---

## Token set summary (for CSS/Tailwind)

**Colors**

- `--bg`: `#050608`
- `--bg-surface`: `#101218`
- `--text-primary`: `#F5F5F7`
- `--text-muted`: `#A3A7B4`
- `--accent-primary`: `#FF7A1A`
- `--accent-primary-hover`: `#FFA142`
- `--accent-secondary`: `#C9A667`
- `--border-subtle`: `#1C1E26`

**Fonts**

- `--font-heading`: Orbitron or Rajdhani
- `--font-label`: Zen Dots
- `--font-body`: Inter or Manrope

This philosophy should give you a coherent dark Matrix‑inspired style that still reads as clean and professional for bookings, while leaving plenty of room for you to plug in the Spline 3D hero and GSAP animations.
