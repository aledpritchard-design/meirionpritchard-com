# Meirion Pritchard — Work section

Production build of the Work section for Meirion Pritchard's portfolio.
Tracked in Linear: team A1, project a1.MeirionPritchard.

## Canon — read before building
- Architecture: `spec.meirion-work-architecture` (Linear doc) — stack, Sanity
  content model, routes, motion approach.
- Interactions: `log.meirion-decisions` (Linear doc, D001–D022) — every locked
  behaviour and exact value.
- Reference: the prototype at `/reference/mdp-work-prototype.html` in this repo. Build to match it, reviewed side-by-side.

## Stack
Next.js (App Router) + React + TypeScript · Tailwind v4 with CSS-variable
tokens · Framer Motion · Sanity CMS · Vercel. Same setup as aledpritchard.com.

## Motion — hybrid (important)
Framer Motion for the declarative layer (accordion height, FLIP reorder,
backdrop crossfades). Port the prototype's tuned vanilla JS into React effects
for the scroll/pointer-coupled pieces — the JS hover hand-off, the
viewport-pinned switch, the bottom-anchor on a downward switch. Do not
reimplement those in Framer; match the prototype's feel.

## Working discipline (Pattern A)
- One ticket at a time. Branch `claude/<ticket-id>`. Open a PR; never merge.
  Stop at In Review and hand back — Aled is the gate.
- Build to the acceptance checklist embedded in each ticket. Match the
  prototype side-by-side.
- Don't touch anything outside the ticket's scope.
