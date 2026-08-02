# Laiba Idrees — Portfolio (React + Tailwind)

A fresh, production-ready rebuild of the portfolio in **Vite + React + Tailwind CSS**,
preserving the original editorial, light-themed design language (cream background,
Instrument Serif display, forest-green accent, IBM Plex Mono labels).

## Run it

```bash
npm install
npm run dev      # local dev server
npm run build    # production build to /dist
npm run preview  # preview the production build
```

Requires Node 18+.

## Where the content lives (one source of truth)

- **`src/data/content.js`** — hero, about/bio, skills, the "Field Notes"
  community note, and contact links. Copy marked **LOCKED** is approved; items
  marked **TODO** are placeholders (email, GitHub, LinkedIn, résumé) — fill these
  before publishing.
- **`src/data/projects.js`** — case studies. **HealthMate** is fully written.
  Cognara / Verdara / HistoryQuest are `status: 'draft'` stubs using the same
  schema; they do **not** show on the site until you fill them in and flip to
  `status: 'published'`. This keeps the live portfolio free of invented content.

## Reusable components

`Navbar`, `Hero`, `About`, `Skills`, `Projects` + `ProjectCard`, `FieldNotes`,
`Contact`, `Footer`, `Reveal` (scroll animation), `ImageSlot` (image placeholder),
`SectionLabel`, `ModelsBlock` (the segmentation-results grid).

Every case study renders through one template — **`src/layouts/CaseStudyLayout.jsx`** —
so all project pages stay consistent: Question → My Role → labelled sections
(with optional figure / stack / models block) → Lesson → links.

## Adding images

Drop assets into `src/assets/` and pass them to `<ImageSlot src={...} alt="..." />`
(hero portrait, project screenshots, hospital/award photos, architecture diagrams).
Without a `src`, `ImageSlot` shows a labelled placeholder so nothing breaks.

## Still open (tracked from the decisions log)

- Fill contact + demo/GitHub/report URLs (search for `TODO` in `src/`).
- Hero headline is provisional pending the planned "hero-headline pass".
- Write Cognara, Verdara, HistoryQuest case studies (interview → fill → publish).
- Add the hero portrait, HealthMate hospital-visit + award photos, and the
  architecture diagram as real images.

## Accessibility & motion

Semantic landmarks, keyboard-focusable links, labelled controls, and
`prefers-reduced-motion` respected (reveal animations disable automatically).
