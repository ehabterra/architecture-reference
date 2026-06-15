# Authoring spec — The Architecture Reference (read this fully before writing)

You are authoring **comprehensive, concept-first MDX lesson pages** for one track of an
interactive software-architecture learning website. Pages are distilled from book
summaries in `/Users/ehab/Documents/architecture-reference/books/summaries/`.

## Source of truth
- Your content comes from the book summary file(s) named in your task. Read them fully first.
- Be faithful and specific: capture the book's **named** patterns, models, formulas, acronyms,
  and concrete examples — not vague generalities. This is a reference; depth matters.

## Where files go
- Write each page as a `.mdx` file into: `/Users/ehab/Documents/architecture-reference/src/content/<TRACK_DIR>/<slug>.mdx`
- `<slug>` is kebab-case (e.g. `bounded-contexts.mdx`).

## Frontmatter (YAML) — REQUIRED on every page
```yaml
---
title: "Human Title"
category: <ONE of your track's allowed category keys — see your task>
kind: topic            # use "guide" only for the track's first/intro page; otherwise "topic"
order: <int>           # unique within the track, increasing in reading order across categories
difficulty: "Beginner" # one of: "Start here" | "Beginner" | "Intermediate" | "Advanced"
status: ready          # always "ready"
intent: "One-sentence summary shown in the header and on cards."
book: "Book Title(s) this page draws from"
related:               # 1–4 slugs of OTHER pages in THIS track (no path, just the slug)
  - some-other-slug
when_use:              # 2–4 bullet strings — when to reach for this idea
  - "..."
when_avoid:           # 2–4 bullet strings — when NOT to
  - "..."
quiz:                  # 3–5 questions; EXACTLY one option per question has correct: true
  - q: "Question text?"
    options:
      - text: "right answer"
        correct: true
      - text: "distractor"
        correct: false
      - text: "distractor"
        correct: false
      - text: "distractor"
        correct: false
    explain: "1–3 sentences explaining why."
takeaway: "One flashcard-worthy sentence (<=160 chars). Imperative or crisp fact. No hedging."
---
```

## Body — after the frontmatter
- Import only these components (NO code playground exists on this site):
  ```mdx
  import Callout from '../../components/Callout.astro';
  import Mermaid from '../../components/Mermaid.astro';
  ```
- Open with a `<Callout type="analogy" title="🧭 Analogy">…</Callout>` (an everyday analogy).
  Available Callout `type` values: `analogy`, `problem`, `tip`, `gotcha`, `go` (use `go` as a
  generic "key insight" highlight), `intent`. Use 2–4 callouts total per page; at least one
  `gotcha` (a pitfall/anti-pattern) is encouraged.
- Include **at least one** `<Mermaid code={String.raw`graph TD …`} />` diagram that makes the
  structure or flow obvious. Use `graph TD`, `graph LR`, `sequenceDiagram`, or `flowchart`.
  Keep diagram labels in plain text; wrap multi-word labels in quotes.
- Use `##` section headings. Write dense, clear prose with **bold** key terms and bulleted lists.
- This is CONCEPT-FIRST and language-agnostic: do NOT write Go/Java code or runnable snippets.
  Small pseudo-config or message/JSON examples in fenced blocks are fine but keep them minimal.
- Cross-link related pages inline as `/<TRACK_DIR>/<slug>/` (trailing slash).
- End the body with a short "## See also" list linking 2–4 related pages.

## Coverage & volume (comprehensive)
- Cover EVERY allowed category for your track with multiple pages each.
- Hit the page-count target in your task. Each page should be substantial (roughly 350–800
  words of prose plus diagram + callouts + quiz).
- Give the reading order a sensible progression: foundational concepts first (low `order`),
  advanced/applied last. Keep `order` unique and contiguous starting at the number in your task.

## Quality bar (match this existing page's depth & tone)
Read `/Users/ehab/Documents/architecture-reference/src/content/architecture/domain-driven-design.mdx`
for tone/structure (ignore its `<Playground>` — we don't use it). Also read
`/Users/ehab/Documents/architecture-reference/src/content/foundations/what-is-software-architecture.mdx`
for the exact concept-first shape to follow.

## Don't
- Don't invent a category key — use only the ones listed in your task.
- Don't reference Playground/Challenge/run.
- Don't duplicate a slug that another page in your track already uses.
- Don't leave any required frontmatter field empty.
