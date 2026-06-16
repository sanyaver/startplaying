@AGENTS.md

# StartPlaying Clone — Agent Coordination

60-minute timed build. **Optimize for interviewer-perceived progress: visible, demoable functionality over architecture or completeness.** A smaller fully-wired product beats a larger partially-working one.

## ⚠️ Next.js 16 gotchas (READ — differs from older Next)
This project runs **Next.js 16.2.9 + React 19.2**. Breaking changes vs. what you may know:
- **`params` and `searchParams` are async Promises.** In a dynamic route you MUST await them:
  ```tsx
  // app/gm/[id]/page.tsx
  export default async function Page({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
  }
  ```
  In a **Client Component** page, use React's `use()`: `const { id } = use(params)`.
- `cookies()`, `headers()`, `draftMode()` are async — `await` them.
- **Turbopack is the default** for `next dev` and `next build` (no flag needed). Don't add a webpack config.
- **`middleware.ts` is renamed to `proxy.ts`** (proxy convention). Orchestrator handles auth; don't create middleware.
- `sitemap.ts` / `robots.ts` file conventions work as before (Agent D). Per-page `export const metadata` works as before.
- When unsure about an API, read `node_modules/next/dist/docs/01-app/...` before guessing.

## Tech Stack
- Next.js 16 (App Router) + TypeScript + React 19.2
- Tailwind CSS + shadcn/ui (`npx shadcn@latest add <component>`)
- Auth: **Clerk** (real) — owned by orchestrator. Until wired, use `lib/auth-stub.ts`.
- Payments: **mock only** (no Stripe, no webhooks)
- Data: **no database** — all data in `lib/data.ts` (seed). Read it directly in Server Components.
- Deploy: Vercel (live from minute one)

## Shared Contract — DO NOT MODIFY
- `types/index.ts` — ALL shared interfaces (`GameMaster`, `Session`, `Booking`, `User`, `QuizAnswers`, `Review`, `ApiResponse`). Import from `@/types`. Never redefine locally, never edit in a feature branch.
- `lib/data.ts` — seed GMs + sessions + helpers: `gameMasters`, `allSessions`, `getGameMaster(id)`, `getSession(id)`, `ALL_SYSTEMS`, `ALL_STYLES`. Read from it; do not edit.
- `lib/auth-stub.ts` — `getCurrentUser()` returns a demo user. Booking agent builds against this.

## File Structure & Ownership

| Agent | Branch | OWNS (create/edit) |
|-------|--------|--------------------|
| Orchestrator | `main` | scaffold, `types/index.ts`, `lib/data.ts`, `app/layout.tsx`, `components/Nav.tsx`, theme, Clerk auth + `proxy.ts`, integration, deploys |
| A — Browse | `feat/listings` | `app/page.tsx`, `components/GMCard.tsx`, `components/FilterBar.tsx` |
| B — Booking | `feat/booking` | `app/gm/[id]/page.tsx`, `app/book/[sessionId]/page.tsx`, `app/book/[sessionId]/success/page.tsx`, mock checkout UI |
| C — Quiz+Events | `feat/quiz-events` | `app/quiz/page.tsx`, `app/events/page.tsx` |
| D — Content+SEO | `feat/content-seo` | `app/faq/page.tsx`, `app/privacy/page.tsx`, `app/terms/page.tsx`, `app/sitemap.ts`, `app/robots.ts`, per-page `metadata`, JSON-LD |

## Files each agent MUST NOT touch
- **Everyone:** `types/index.ts`, `lib/data.ts`, `app/layout.tsx`, `app/globals.css`, `components/Nav.tsx` (orchestrator owns)
- **A:** anything under `app/gm`, `app/book`, `app/quiz`, `app/events`, content/SEO files
- **B:** `app/page.tsx`, `components/GMCard.tsx`, `components/FilterBar.tsx`, `app/quiz`, `app/events`, content/SEO files
- **C:** `app/page.tsx`, `components/GMCard.tsx`, `components/FilterBar.tsx`, `app/gm`, `app/book`, content/SEO files
- **D:** everything except your own pages + `sitemap.ts`/`robots.ts`
> Need something another agent owns? **Hardcode a stub and move on.** Never edit their files.

## Do NOT duplicate
Types (use `@/types`), seed data (use `@/lib/data`), nav/layout (orchestrator). Build a local lightweight card only if importing `GMCard.tsx` would force a conflict.

## Workflow per agent
1. Clone, read this file, `git checkout -b <your-branch>`.
2. Run `/plan` on your task, self-approve, proceed. Don't wait for the human.
3. Build ONLY your owned files. Stub anything blocked. Mind the Next 16 async-`params` rule.
4. `npm run build` must pass before you push.
5. Before committing, summarize: built / unfinished / stubs & integration points.
6. Atomic commits, push your branch.

## Routes (target sitemap)
`/` (A) · `/gm/[id]` (B) · `/book/[sessionId]` + `/success` (B) · `/quiz` (C) · `/events` (C) · `/faq` `/privacy` `/terms` (D)
