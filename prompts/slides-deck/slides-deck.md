# Slides-Deck — write a slide spec that renders to a brutalist HTML/D3 deck

Turn pitch/lecture content into a **slide spec** (`*.md`) that `scripts/build-deck.mjs`
renders into a self-contained, keyboard-navigable HTML/D3 deck — print-to-PDF for
submission. You write the spec (the judgment); the script renders it (the execution).
Apply the slide-design rules from *AI for Slides*; for pitches also apply the
`madison-pitch` provenance + `destination-language.md` disciplines.

## The spec format (exact)
Slides separated by a line that is **only** `---`. Per slide:
```
# Assertion headline — a CLAIM, not a topic label, ≤ ~12 words
body: one visual or a few short points (NOT a wall of text)
NOTES:
the spoken explanation — everything the speaker says that is NOT on the slide
```
- The `# headline` is a full sentence that asserts the slide's point ("MBS leverage
  was the load-bearing cause"), never a label ("Results", "Business Model"). If you
  can't write the claim, the slide doesn't yet know what it's saying — fix that first.
- Keep on-slide text under ~40 words. The headline is the claim; the body is the
  **evidence** (a diagram, chart, table, image, or 2–4 short lines) — not bullets by default.
- Everything the speaker will *say out loud* goes under `NOTES:`, never on the slide
  body (verbal-channel collision). An empty NOTES is half a slide.
- Use `**bold**` only on the one thing the slide points to (the renderer makes bold = accent).
- Embed a D3 figure by writing raw HTML/SVG + a `<script>` using `d3` (loaded from CDN).

## Rules (apply silently)
- **Destination, not engine** (`destination-language.md`): no "LLM / n8n / API /
  embeddings / pipeline" on a slide for a non-technical audience. Say the outcome.
- **Provenance gate** (pitch): every statistic is sourced or labeled
  `[Unverified — cite or cut]`. Never drop an unsourced number in as fact.
- **One idea per slide.** If a slide has two claims, it's two slides.
- **30pt-minimum** is enforced by the renderer; still, write short.

## For a Madison / Guy Kawasaki pitch — 10 slides
1 Title (name + one-line "X is the Y for Z who W") · 2 Problem (quantified, a loss) ·
3 Solution (before → after → the bridge; the aha) · 4 The magic + why-now ·
5 Business model (tiered table + ARR soundbite) · 6 Go-to-market (3 micro-segments +
first-10 channel) · 7 Competition (table + one "we win because…") · 8 Status/roadmap
(honest stage + milestones) · 9 Proof of concept (5-step user journey / demo) ·
10 The ask (specific + 48-hour CTA + echo the slide-2 hook).

Pull the content from the student's Conductor Brief / `brand.yml` if available; the
`madison-pitch` skill produces the per-slide scripts this spec compresses.

## Then render
```bash
node scripts/build-deck.mjs your-deck.md --out your-deck.html
# open in a browser · ← → to move · n = notes · f = fullscreen · p = print to PDF (submission)
```
Worked example: `prompts/slides-deck/examples/madison-pitch-deck.md` →
`madison-pitch-deck.html`.
