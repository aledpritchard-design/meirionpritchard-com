# meirionpritchard-com

Production build of the Work section for Meirion Pritchard's portfolio.
Next.js (App Router) · TypeScript · Tailwind v4 · Framer Motion · Sanity CMS ·
Vercel. Tracked in Linear: team A1, project a1.MeirionPritchard. Canon lives in
`spec.meirion-work-architecture` and `log.meirion-decisions`; build discipline
in `CLAUDE.md`.

## Local development

```sh
npm install
cp .env.example .env.local   # project ID + dataset are filled in already
npm run dev                  # http://localhost:3000  ·  Studio at /studio
```

The home page is a foundation smoke test — it fetches `workProject` documents
from Sanity and lists them, proving the stack talks end to end. The real Work
index is built in A1-10 → A1-12.

| Script | Does |
| -- | -- |
| `npm run dev` | Next dev server |
| `npm run build` | Production build |
| `npm run lint` | ESLint (next config) |
| `npm run typegen` | Extract the Sanity schema and regenerate `src/sanity/types.gen.ts` |

## Sanity

- Project: **Meirion Pritchard** (`3h85v8ma`), dataset `production` (public).
- Manage: https://www.sanity.io/manage/project/3h85v8ma
- Studio is embedded at `/studio` (no separate deploy).
- Seed the smoke-test document: `npx sanity dataset import seed/seed.ndjson production`

## Environment variables

Set these in `.env.local` for development and in every Vercel scope
(Production, Preview, Development) for hosting:

| Var | Required | Notes |
| -- | -- | -- |
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | yes | `3h85v8ma` (public) |
| `NEXT_PUBLIC_SANITY_DATASET` | yes | `production` (public) |
| `NEXT_PUBLIC_SANITY_API_VERSION` | no | defaults to `2024-10-01` |
| `SANITY_API_READ_TOKEN` | no | only for draft/preview reads |
| `SANITY_REVALIDATE_SECRET` | no | reserved for the future revalidate webhook |

## Hosting — operator steps (Aled)

The code is deploy-ready; these steps need your Vercel + DNS access and finish
the A1-9 acceptance criteria.

1. **Connect to Vercel** — New Project → import `aledpritchard-design/meirionpritchard-com`.
   Framework preset: Next.js (auto-detected). Deploy.
2. **Env vars** — in Vercel → Settings → Environment Variables, add the two
   `NEXT_PUBLIC_SANITY_*` vars (and `NEXT_PUBLIC_SANITY_API_VERSION` if you want
   it explicit) to **Production, Preview and Development**. Redeploy.
3. **Preview URL** — confirm the auto-assigned `*.vercel.app` deployment loads
   and the home page lists the smoke-test document.
4. **Staging domain** — Vercel → Settings → Domains → add
   `meirionpritchard.assoc.one`. At the `assoc.one` DNS host add a **CNAME**
   record: `meirionpritchard` → `cname.vercel-dns.com`.
5. **Confirm noindex** — once live, `curl -sI https://meirionpritchard.assoc.one`
   should show `x-robots-tag: noindex, nofollow` (set in `next.config.ts`), and
   `/robots.txt` disallows all. This keeps staging out of search until launch.

At launch, add `meirionpritchard.com` to the same Vercel project, set it
primary, and relax the noindex (see notes in `next.config.ts` and `robots.ts`).
