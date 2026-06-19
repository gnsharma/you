# You.

> An interactive love letter — a quiet, cinematic scroll experience built as a
> living digital keepsake for a family to revisit for years.

It is deliberately not a greeting card, a landing page, or a portfolio. It is
closer to a short documentary: black screen, a sentence at a time, large
typography, generous silence. Reading time is about four to six minutes.

---

## Tech

- **Vite + React 19 + TypeScript** — a static single-page app (no server)
- **Tailwind CSS v4** — CSS-first design tokens in `app/styles/globals.css`
- **Framer Motion** — all motion, with `prefers-reduced-motion` honored
- **Lenis** — smooth scrolling
- **Lucide** — icons
- Self-hosted **Geist** + **Inter** (Fontsource, weight axis only)

Verified with Lighthouse (mobile, throttled): **Performance 98 · Accessibility
100 · Best Practices 100**. (SEO is intentionally capped — the site ships with
`noindex` and a disallow-all `robots.txt` because it's private.)

---

## Run it

```bash
npm install
npm run dev        # local dev at http://localhost:5173
npm run build      # production build to dist/ (also writes 404.html)
npm run preview    # preview the production build
npm run typecheck  # tsc --noEmit
```

---

## How it's organized

```
app/
  animations/   motion variants + easings (variants.ts)
  components/    chrome and shared UI — StoryRenderer, Reveal, AmbientBackground,
                 CursorGlow, ProgressBar, SmoothScroll, LoadingSequence,
                 PhotoReveal, Confetti, MusicToggle, …
  content/       ALL words and data live here (see below)
  hooks/         usePrefersReducedMotion, useMediaQuery, useTypewriter
  routes/        Story.tsx (/) and Vrishti.tsx (/vrishti)
  sections/      one component per section type + the type-safe registry
  styles/        globals.css — the design tokens
public/
  photos/        placeholder art — replace with real photos
  audio/         optional ambient track (off by default)
```

The experience is **entirely data-driven**. Components hold almost no copy;
everything comes from `app/content`. A `StoryRenderer` maps each section's
`type` to a component via an exhaustive registry, so the renderer supports any
section in the configuration with no `switch` statements.

---

## Make it yours

**Edit the words.** Everything is in `app/content`:

- `story.ts` — the main story, chapter by chapter
- `timeline.ts` — the milestones
- `letter.ts` — the letter to Anika
- `letterToVrishti.ts` — the second experience (the letter to Vrishti)

**Add real photos.** Drop a file into `public/photos/`, then point the matching
entry in `app/content/photos.ts` at it and set the correct `aspect`
(`portrait` | `landscape` | `square`). Sections reference photos by `id`, never
by path — so this is the only file you touch. The frame reserves the aspect
ratio, so swapping art causes no layout shift.

**Turn on ambient audio.** Drop a track into `public/audio/` and set its path in
`app/content/audio.ts`. A tiny corner control appears; it never autoplays.

**Add a future chapter** (first birthday, first steps, an anniversary):

- If an existing layout fits, add one object to `storySections` in `story.ts`
  using a type like `text`, `photo`, `cards`, `timeline`, or `letter`. Done.
- If you need a brand-new layout, add a variant to `StorySection` in
  `content/types.ts`, write a component in `sections/`, and register it in
  `sections/registry.tsx`. TypeScript will refuse to build until the new type
  is handled — so nothing silently renders blank.

---

## Deploy

It's a static SPA — `npm run build` and host the `dist/` folder anywhere.

Client-side routing is pre-configured for direct loads of `/vrishti`:

- **Netlify / Cloudflare Pages** — `public/_redirects`
- **Vercel** — `vercel.json`
- **GitHub Pages / any host** — `dist/404.html` (a copy of `index.html`)

---

## Accessibility & motion

Reduced motion is respected everywhere (the typewriter settles instantly, drift
and dust and confetti are disabled, scrolling falls back to native). Keyboard
focus is visible, the markup is semantic, the opening is announced in full to
screen readers, and contrast meets AA.

---

For Anika, and for Vrishti. ❤️
