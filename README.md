# The Architecture Reference

A visual software architecture reference — spanning the full stack of modern system design,
from architectural foundations and styles to domain-driven design, microservices, event-driven
systems, distributed systems, APIs, cloud & SaaS, process automation, and the architect's
craft. Built with [Astro](https://astro.build) + MDX.

Clear diagrams, explicit trade-offs, quizzes, progress tracking, and Arabic (عربي) i18n —
distilled from 20+ landmark architecture books.

Ten tracks today:

- **`/foundations/`** — what architecture really is: architect mindset, architecture characteristics, components & modularity, fitness functions, and evolutionary architecture.
- **`/styles/`** — the named shapes a system can take: layered, pipeline, microkernel, service-based, event-driven, space-based, and microservices — scored against the characteristics they optimize.
- **`/ddd/`** — domain-driven design: ubiquitous language, bounded contexts, context maps, aggregates, value objects, domain events, event sourcing, and CQRS.
- **`/microservices/`** — independently deployable services: trade-offs, decomposing a monolith safely, communication and sagas, progressive delivery, and team topologies.
- **`/event-driven/`** — systems that react to events: event-first design, event sourcing, streams and logs, and events as the integration fabric of a data mesh.
- **`/distributed-systems/`** — building across many machines: fallacies of distributed computing, consistency and CAP, caching, replication, partitioning, and reusable system patterns.
- **`/apis/`** — contracts between systems: REST, gRPC, and GraphQL; hypermedia; gateways and security; API evolution; and async messaging.
- **`/cloud/`** — architecting on the cloud and selling software as a service: serverless-first design, multi-tenant SaaS isolation, control planes, tiering, and metering.
- **`/automation/`** — long-running business processes: why they're hard, BPMN and executable workflows, orchestration vs choreography, and operating them with full visibility.
- **`/strategy/`** — the architect as a person and strategist: the architect elevator, technology strategy patterns, and systems thinking for complex organizations.

## Develop

```bash
pnpm install
pnpm dev      # http://localhost:4321
pnpm build    # build (output → dist/, including the SSR Worker)
pnpm preview  # serve the production build
```

## How it's organized

| Path | What |
|---|---|
| `src/content/<track>/*.mdx` | Track pages — one file per topic, one folder per track. |
| `src/content.config.ts` | Shared front-matter schema; one content collection per track. |
| `src/pages/index.astro` | The hub home (track picker + overall progress). |
| `src/pages/<track>/` | Each track's landing (`index.astro`) + page route (`[...slug].astro`). |
| `src/layouts/` | `BaseLayout` (site chrome) and `PageLayout` (per-page anatomy). |
| `src/components/` | UI pieces: `Card`, `CategorySection`, `SkillTree`, `Callout`, `Mermaid`, `QuizBlock`, … |
| `src/lib/consts.ts` | Site metadata + the category lists for each track. |
| `src/scripts/` | `progress.js` (localStorage progress, quiz, review) and `ui.js` (i18n, theme). |
| `src/i18n/ar.json` | Arabic UI dictionary (300+ keys). |
| `src/i18n/content/<track>/*.json` | Arabic content translations (one JSON array per page). |
| `scripts/` | Authoring helpers: `extract-i18n-all.mjs`, `install-ar.mjs`, `build-ar.mjs`. |
| `astro.config.mjs` | Astro config — Cloudflare adapter for SSR on Workers. |
| `wrangler.jsonc` | Cloudflare Worker config. |

## Authoring a page

A page is a single `.mdx` file in the relevant collection (`src/content/<track>/`). Front matter
(`title`, `category`, `order`, `intent`, `related`, `when_use`/`when_avoid`, `quiz`, …) drives
the header, badges, related cards, trade-offs table, and quiz block. Write the body with
`<Callout>`, `<Mermaid code={…} />` and standard MDX. See any existing page as a template.

Adding a whole new **track** = a new collection in `content.config.ts`, a `src/content/<track>/`
folder, a landing + `[...slug].astro` under `src/pages/<track>/`, and a category list in
`consts.ts`. The shared components already accept `collection` / `base` props.

## Arabic translation pipeline

The site ships with a full Arabic translation (UI strings + all content pages).

```bash
# 1. Build the site so the extractor has HTML to parse
pnpm build

# 2. Extract English blocks from the built HTML
node scripts/extract-i18n-all.mjs

# 3. Write / update a translation file (one JSON array per page)
#    File must match the block count extracted in step 2.

# 4. Validate and install
node scripts/install-ar.mjs <collection> <slug>
```

UI strings live in `src/i18n/ar.json`. Content translations live in
`src/i18n/content/<track>/<slug>.json` as ordered arrays mirroring the
English HTML block structure.

## Deploy to Cloudflare Workers

```bash
pnpm build
pnpm wrangler deploy
```

The Worker entry, static-assets binding, and compatibility settings live in `wrangler.jsonc`.
Connecting the GitHub repo to Cloudflare Pages/Workers CI (build command `pnpm build`) deploys
automatically on push.

## Content status

Ten tracks, 126 pages in total:

| Track | Pages |
|---|---|
| Microservices (`/microservices/`) | 17 |
| Foundations (`/foundations/`) | 15 |
| APIs & Communication (`/apis/`) | 14 |
| Architecture Styles (`/styles/`) | 12 |
| The Architect's Path (`/strategy/`) | 12 |
| Event-Driven (`/event-driven/`) | 12 |
| Distributed Systems (`/distributed-systems/`) | 12 |
| Domain-Driven Design (`/ddd/`) | 12 |
| Cloud & SaaS (`/cloud/`) | 11 |
| Process Automation (`/automation/`) | 9 |

## Contributing

Contributions are welcome — from a typo fix to a whole new track. See
[CONTRIBUTING.md](./CONTRIBUTING.md) for the workflow, project layout, and a
page-authoring checklist.

## License

Licensed under the [Apache License 2.0](./LICENSE) — see [LICENSE](./LICENSE) and
[NOTICE](./NOTICE). This covers both the code and the written content.
