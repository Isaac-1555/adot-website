# Tech Stack for DJ Portfolio & Booking Website

## Overview

This document outlines a suggested tech stack and integration approach for a Matrix‑inspired DJ portfolio and booking website using TypeScript, Tailwind CSS, GSAP, Spline, `itshover` icons, and `math-curve-loaders` for loading animations.

---

## Core framework and languages

- **Framework:** Next.js (App Router) with React for routing, SSR/ISR, and SEO‑friendly pages.
- **Language:** TypeScript for type safety across components, hooks, and animation code.
- **Styling:** Tailwind CSS for utility‑first styling, dark‑mode friendly theming, and rapid layout iteration.

Advantages:

- Good developer experience with file‑based routing and API routes.
- Strong SEO for marketing pages (Home, About, Gigs, Music, Services, Contact).
- Built‑in support for dynamic routes (e.g., for gig details) and loading states.

---

## Animation and interaction stack

### Tailwind CSS

Used for:

- Layout, spacing, and responsive design.
- Micro‑interactions such as hover states, focus states, and small transitions.
- Implementing the dark Matrix theme via CSS variables and utility classes.

Example tokens in `globals.css`:

```css
:root {
  --bg: #050608;
  --bg-surface: #101218;
  --text-primary: #f5f5f7;
  --text-muted: #a3a7b4;
  --accent-primary: #ff7a1a;
  --accent-primary-hover: #ffa142;
  --accent-secondary: #c9a667;
  --border-subtle: #1c1e26;
}
```

In components, use utilities such as `bg-[var(--bg)]`, `text-[var(--text-primary)]`, etc.

### GSAP (GreenSock)

Used for macro animations and scroll‑based interactions.

Recommended usage:

- **Hero entrance animation:** Fade/slide in heading, subtext, CTAs, and synchronize with the Spline 3D object.
- **Scroll reveals:** Use `ScrollTrigger` for section headers and content blocks to fade/slide into view.
- **Performance‑friendly properties:** Animate `opacity` and `transform` (`translate`, `scale`, `rotate`) rather than heavy properties.

Basic pattern inside a React client component:

```tsx
"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function HeroSection() {
  const ref = useRef<HTMLDivElement | null>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".hero-heading", { y: 30, opacity: 0, duration: 0.8 });
      gsap.from(".hero-cta", { y: 20, opacity: 0, delay: 0.3 });
    }, ref);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} className="relative">
      <h1 className="hero-heading">DJ [NAME]</h1>
      <button className="hero-cta">Check Availability</button>
    </section>
  );
}
```

Use `ScrollTrigger.matchMedia` or equivalent to simplify or disable certain animations on mobile for performance.

### Spline 3D

Used for the hero section 3D object.

- Embed Spline via its iframe embed or React component.
- Arrange layout as a two‑column hero on desktop (text on left, Spline canvas on right), stacked on mobile.
- Let the Spline object handle its internal animation; use GSAP to animate the surrounding UI, not the Spline DOM directly.

---

## Icons with `itshover`

`itshover` is an animated icon library designed for React/Next.js with built‑in motion.

### Integration steps

1. Install dependencies (per README):

```bash
npm install motion
```

2. Add icons via their registry integration (similar to shadcn UI):

```bash
npx shadcn@latest add https://itshover.com/r/github-icon.json
```

3. Wrap icons in your own component to centralize sizing and theming:

```tsx
import GithubIcon from "@/icons/github-icon";

export function SocialGithubIcon() {
  return (
    <GithubIcon className="h-6 w-6 text-[var(--accent-secondary)] hover:text-[var(--accent-primary)]" />
  );
}
```

4. Use these wrappers for social links, nav, and CTAs that benefit from animated icons.

`itshover` handles micro‑animations (hover, click) internally, so you keep GSAP focused on larger‑scale motion.

---

## Loading screens with `math-curve-loaders`

`math-curve-loaders` is a collection of math‑driven loaders implemented with HTML/CSS/JS.

### Option 1: Direct embed in a React component

- Copy the HTML structure and CSS for a chosen loader into a React component.
- Wrap any JS animation logic inside a `useEffect` or custom hook, targeting a ref instead of `document.querySelector`.

Example skeleton:

```tsx
"use client";

import { useEffect, useRef } from "react";
import "./math-curve.css"; // Adapted from the repo's CSS

export function MathCurveLoader() {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    // Insert minimal JS from selected loader here,
    // adapted to use `el` instead of global document selectors.
  }, []);

  return (
    <div ref={containerRef} className="relative h-24 w-24">
      {/* Inner elements from the original loader HTML */}
    </div>
  );
}
```

Use cases:

- Full‑page route loader via Next.js `loading.tsx`.
- Inline loader for data‑heavy sections or booking form submission state.

### Option 2: Re‑implement as TypeScript canvas/SVG

For more control:

- Extract the parametric formulas from the `math-curve-loaders` examples.
- Implement the drawing logic with `requestAnimationFrame` on a `<canvas>` or SVG component.
- Wrap it in a typed React component and expose props for color, size, and speed.

This approach is more work up front but yields a cleaner TS API and easier theming.

---

## Routing, loading, and layout (Next.js App Router)

Suggested structure:

```txt
app/
  layout.tsx
  page.tsx          // Home
  about/page.tsx
  gigs/page.tsx
  music/page.tsx
  services/page.tsx
  contact/page.tsx
  loading.tsx       // Global loader using MathCurveLoader
components/
  hero/
  gigs/
  music/
  ui/
    Icon.tsx        // wrappers for itshover icons
    Button.tsx
    SectionHeading.tsx
    MathCurveLoader.tsx
lib/
  gsap/
    heroAnimations.ts
styles/
  globals.css
  math-curve.css
```

- `layout.tsx` sets up fonts, base colors, and shared nav/footer.
- `loading.tsx` shows a full‑screen `MathCurveLoader` while routes are resolving.
- Individual pages compose hero, content sections, and GSAP‑animated blocks.

---

## Summary

- **Next.js + TypeScript + Tailwind** forms the core web stack.
- **GSAP** handles macro animations; **Spline** provides the hero 3D element.
- **`itshover`** supplies animated icons for UI with minimal setup.
- **`math-curve-loaders`** powers distinctive loading states, embedded either directly or via a TypeScript reimplementation.

This combination gives you a high‑polish, Matrix‑inspired, dark‑theme site with strong motion design while preserving maintainability and type safety.