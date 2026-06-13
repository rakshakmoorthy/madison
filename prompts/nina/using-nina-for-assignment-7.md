# Using Nina for Assignment 7 (Brand Identity Implementation)

**Verdict:** Nina is the tool for this assignment. Its commands map almost
one-to-one onto all three components. Run them in order; Nina writes the strategy,
the specs, and the rationale — *you* execute the visuals in Figma / Canva from what
she gives you. That division is the point: Nina does the Tier-1 specification work,
you do the visual judgment and the build.

## Command → component map

| A7 component (points) | Nina command | What it gives you |
|---|---|---|
| **1. Creative Brief (20)** | `/n4 brief` | Objective · audience (primary/secondary/tertiary) · UVP · support points · tone & style · competitive positioning · success metrics — the brief's exact structure |
| ↳ sharpen the UVP | `/n5 uvp` | the "thing only you can say," scored and rewritten until distinctive |
| ↳ tone & style ("your archetype") | `/n2 archetype` | the archetype that drives the visual personality (uses `_shared/archetypes.md`) |
| ↳ the audience segments | `/n3 personas` | the 2–3 segments as specific people, not demographics |
| **2. Visual Identity (30)** — color + type | `/n8 palette` | 2–3 primary + 2–3 secondary colors with **hex + rationale + WCAG check**; heading/body/accent **Google Fonts** with rationale — the mood board's color & type, done |
| ↳ the mood board's visual world | `/n7 visual` | photography direction, visual metaphor, the "scenes," visual hard-nos → your inspiration-grid rationale |
| ↳ logo (4–5 concepts + iteration + rationale) | `/n9 logo` | four directions (wordmark/lettermark/icon/combination), the strategic idea + weakness of each, a recommendation, **and four AI-generation prompts for Canva AI / Adobe Firefly** |
| ↳ brand style guide | `/n11 styleguide` | logo usage rules, color application, type, components — the style-guide foundation |
| **3. Website Wireframes (30)** | `/n10 wireframes` | the same five pages (Home/About/Portfolio/Experience/Contact), per-page job · hero · blocks · CTA · exit-risk; the user-flow narrative; **the Vercel v0 / Framer AI / Wix platform comparison** the assignment asks for |
| **Finalize / quality score (20)** | `/n12 critique` → `/jargon` → `/polish` → `/ready` | critic-mode gap-find, jargon audit, clean the PDF prose, then a 0–100 readiness score before you submit |

## The honest caveat (what Nina does *not* do)
Nina produces **specs and rationale**, not pixels. She writes the logo *generation
prompts* — you run them in Canva AI / Figma and pick the winner. She writes the
wireframe *page specs and IA* — you build the low-fi frames in Figma. She describes
the *visual world* — you curate the 8–10 inspiration images. The **Figma board and
the visual artifacts are your work.** This is exactly right: the rubric rewards
strategic clarity, rationale, and IA/UX thinking (Nina's strength), and the visual
execution is the human judgment the course says can't be delegated. Don't expect
Nina to hand you a finished logo; expect her to hand you the brief a designer (you)
builds from.

## Workflow order
1. Feed Nina your **Assignment 6** output (`brand.yml` position + the final name) —
   A7 builds on A6, and Nina's `/n1`–`/n5` already ran there. Start at `/n4`.
2. `/n4` → `/n5` → `/n6` (brief + UVP + voice) = **Component 1**.
3. `/n2` (if not done) → `/n7` → `/n8` → `/n9` → `/n11` = **Component 2**. Run the
   `/n9` AI prompts in Canva; build the palette/type into Figma.
4. `/n10` = **Component 3**. Build the five wireframes + mobile home in Figma from
   the specs; use her platform recommendation.
5. `/n12` → `/ready` before you submit; `/polish` the PDF prose.

## Other tools that touch A7
- **Assignment 6 brand layer** (`brand/`, the A6 name + matrix) is Nina's input — don't
  restate it, reference it.
- **`review` / `to-markdown`** if you keep any spec as JSON/YAML and want it readable.
- The pitch tools (`slides-deck` / `madison-pitch`) are *not* for A7 — no deck here.
