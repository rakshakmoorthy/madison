# Can BRANDY help with Assignment 6?

**Verdict:** BRANDY is the right tool for **one** section (Part 1B — competitive
positioning, +15 pts, plus the Figma competitive chart), a **method-level** help
for one more (Part 3 — portfolio analysis, 20 pts), and the **wrong tool** for
the rest (Parts 1A + 2 = 45 core pts). Don't force it onto the parts it can't do.

## What BRANDY actually is

An **audit** tool: it observes an *existing* brand's communications across ~30
touchpoints, labels every claim `[Observed]` / `[Inferred]` / `[Unverifiable]`,
and produces an evidence-traced competitive matrix + strategic memo. Commands:
`brandy`, `data`, `xls`, `memo`, `onepage`. It is **outward-facing competitive
analysis**, not brand creation.

Assignment 6's center of gravity is the opposite: **generative** — write your own
foundation, invent a name, validate it. Those two centers barely overlap.

## Fit map

| Assignment 6 part | Pts | BRANDY fit | Verdict |
|---|---|---|---|
| **1A** Brand Foundation (mission, purpose, vision, values, UVP ×3–5) | 15 | none — generative, not audit | **Wrong tool.** Use general AI. |
| **1B** Professional Positioning + competitive matrix (3–5 competitors) | 15 | **direct — this *is* BRANDY** | **Use it.** |
| **2A** Name generation (10 names) | 10 | none | **Wrong tool.** |
| **2B** Trademark search (Justia) | 10 | none | **Wrong tool.** |
| **2C** URL availability | 10 | none | **Wrong tool.** |
| **3** Portfolio analysis (5–8 portfolios) | 20 | **method only** — its observe→label→interpret→synthesize discipline transfers; its commands don't | **Adapt the method.** |
| **Quality** | 20 | indirect — evidence-grounded matrix lifts the competitive-analysis score | **Helps.** |

Net: ~15 pts BRANDY does directly, ~20 pts it helps by method, a real lift on the
20 quality pts — and ~45 core pts (foundation + naming/trademark/URL) it can't touch.

## Where it genuinely shines — Part 1B, especially Option B (Startup)

If you choose **Option B** (brand for your Madison tool), your "3–5 competitors"
are real brands with comms footprints — BRANDY's home turf. Workflow:

1. `data [competitor]` — get the prioritized data-collection plan per competitor.
2. `brandy [competitor]` — produce the observation matrix.
3. `xls [competitor]` — export the matrix; trim it for the **Figma competitive
   analysis chart** the assignment requires.
4. `memo [competitor] — competitor to [your Madison tool]` — frames each as
   *outmaneuver / neutralize / adopt-and-modify* → that becomes your "unique
   position & competitive advantage."

The forbidden-phrase / evidence-label discipline kills the rubric's named pitfall
("superficial competitive analysis") by construction.

**Caveat — Option A (Personal Brand) is a worse fit.** Analyzing 3–5
*professionals* means most of BRANDY's 30-platform matrix (OOH, POS, TV, retail)
returns `[Not Found]`. Use it lightly there (LinkedIn / portfolio / social rows
only), or skip it.

## Why BRANDY's *output* scores well

BRANDY's spine — observation first, label everything, every claim traces to
evidence, no vanity metrics — is literally the Madison thesis (*fluency ≠ trust;
provenance or it isn't evidence*). So its output is rubric-shaped: specific,
comparative, evidence-grounded. That's the quality signal the assignment rewards.

## What to use instead, for the parts BRANDY can't do

- **1A Foundation / UVP iterations** → general AI prompting (the assignment even
  says so). This is authoring, not auditing.
- **2A Name generation** → a naming prompt (descriptive + creative split). Note:
  the Madison stack already has a `prompts/` home for exactly this kind of suite.
- **2B Trademark** → Justia trademark search (manual, screenshot the results).
- **2C URLs** → a domain checker (.com/.ai/.io/.app); BRANDY has no view here.

## Tie-in to what we just built

BRANDY is itself a **prompt suite** — the same shape as the `courses` suite now in
`prompts/`. Two concrete moves available:

1. **Package it:** drop BRANDY into `prompts/brandy/` (body + `manifest.yml`) and
   compile with `scripts/build-prompts.mjs` → a skill / AGENTS block / Cursor rule,
   so `brandy` / `data` / `memo` / `onepage` become invokable like `slides`.
2. **Run it now:** point `brandy` at 3–5 real competitors to your Madison tool and
   draft the Part 1B matrix + the Figma competitive chart this week.
