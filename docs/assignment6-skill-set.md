# Assignment 6 — a set of focused, fact-emitting skills

A small set of **single-purpose** skills (not one Nina-style monolith), each
obeying three rules:

1. **Named for what it does.**
2. **AI does AI work; refuses human work.** It generates, structures, drafts, and
   ranks. It refuses to *verify firsthand*, *select/attest*, or *judge
   subjectively* — emitting those as typed slots for the human.
3. **Facts as JSON.** Each skill writes a structured artifact (the durable,
   attestable thing). Prose is generated *from* the JSON, never instead of it.

This makes Assignment 6 a Madison recipe: JSON files are the `data/verified`
layer, human attestations are the gates, the PDF is the report.

## The dividing line (per assignment part)

| Part | AI-appropriate (generate / structure) | Human-only (AI must refuse) |
|---|---|---|
| 1A Foundation | draft mission/purpose/vision/values; iterate UVP | calling the UVP "final" |
| 1B Positioning | structure competitor facts (labeled); draw white space | asserting unverified competitor facts |
| 2A Names | generate 10 names + rationale + score | claiming any name is "safe"/"available" |
| 2B Trademark | build the search *plan* per name | the Justia search + the legal risk verdict |
| 2C URLs | list domains to check; assess memorability | asserting live availability |
| 2 final | rank finalists, show tradeoffs, recommend | **selecting** the name (attestation) |
| 3 Portfolios | structure each portfolio's elements | "what I admire / would change" (subjective) |

## The skills

| Skill | AI does | Refuses → JSON slot | Emits | Backs |
|---|---|---|---|---|
| **brand-foundation** | drafts mission/purpose/vision/values; 3–5 UVP iterations w/ rationale | declaring UVP validated | `brand.json` | 1A |
| **competitor-map** | structures competitor facts as `[Observed]`/`[Inferred]`/`[Unverifiable]`; drafts positioning + white-space claim | asserting unverified facts; final positioning | `competitors.json`, `positioning.json` | 1B |
| **name-generate** | 10 names (5 descriptive / 5 creative): rationale, category, score | any availability/safety claim | `names.json` | 2A |
| **trademark-plan** | per-name search plan: exact marks, Nice classes, query terms, what a conflict looks like | the search + risk verdict → `[Unverifiable — human searches Justia]` | `trademark.json` | 2B |
| **domain-plan** | per-name domains to check (.com/.ai/.io/.app), alt spellings, memorability | live availability → `[Unverifiable — check registrar]` | `domains.json` | 2C |
| **name-decide** | ranks the finalists against verified trademark + domain JSON; recommends with tradeoffs | the **selection** → `selected_by: "human"` + attested rationale | `final-name.json` | 2 final |
| **portfolio-analyze** | structures each portfolio (presentation, showcasing, storytelling, technical); drafts best-practices synthesis | the subjective admire/improve cells → `[human]` | `portfolios.json` | 3 |
| **pdf-build** | assembles the verified JSON + prose into the submission PDF + a Figma competitive-chart slice | **compiling while any required slot is `[Unverifiable]`** | `assignment6.pdf` | submission |

`pdf-build`'s refusal is the keystone: the document cannot be produced until the
human has done the human work. That's the forcing function — the grade can't be
gamed by skipping verification.

## What it reuses (from the suite consolidation)

- `competitor-map` ← `_shared/competitive-method.md` + the `[Observed]/[Inferred]` labels (BRANDY's spine).
- `brand-foundation`, `positioning` ← `_shared/archetypes.md`, `_shared/destination-language.md`.
- everything → `_shared/jargon-audit.md` + `_shared/cleanup-standard.md` before `pdf-build`.

So this set isn't new disciplines — it's the shared knowledge files, pointed at
Assignment 6, with the human-gate discipline made explicit.

## The JSON contract is the real work

The skills are easy; the **schemas** are the substance — they encode where the
human gate sits. Sketch:

```json
// trademark.json — one record per finalist name
{
  "name": "Aligna",
  "nice_classes": [9, 42],
  "search_url": "https://trademarks.justia.com/search?q=Aligna",
  "status": "[Unverifiable — human searches Justia]",
  "conflicts": null,
  "risk": null,                 // high | medium | low — HUMAN fills
  "verified_by": null,          // becomes the student's name on attest
  "screenshot": null            // path the human attaches
}
```

The AI fills everything it legitimately can and leaves the judgment fields `null`
with an `[Unverifiable]` status. `name-decide` and `pdf-build` read those fields
and **refuse to proceed** while they're null. No fabricated facts can enter.

## Caveats (push-back)

- **Don't over-fragment.** Eight skills is the ceiling. `trademark-plan` +
  `domain-plan` + `name-decide` could be one `name-validate` skill with three
  modes — keep them separate only if the focus genuinely helps students.
- **`brand-foundation` already exists** as Nina's `/n1`–`/n5`. Reuse, don't rewrite.
- **The refusal must be real.** If a skill ever emits `"risk": "low"` it didn't
  verify, the whole discipline collapses — and it's a legal-exposure risk for the
  student, not just a pedagogical one. The gate has to hard-fail, not warn.
- **Live checks are tempting but wrong here.** A skill *could* web-fetch a domain
  registrar — but the assignment wants the student's firsthand, screenshotted
  verification. Keep the AI on planning, the human on proof.

## Recommendation

Scaffold `prompts/assignment6/` as a small focused set (or fold into a
`prompts/branding/` namespace), with the JSON schemas as the contract and
`pdf-build` enforcing the verification gate. Build the schemas first — they are
the assignment's real intellectual content.
