# CAJAL Figure Report — Brand Consistency and Voice QA
_Density: recommend 4 figures, Mechanistic._

## Figure 1 — The QA Matrix Structure
Priority: Critical · Type: structural schematic

**BLOCK 1 — ILLUSTRAE PASTE BLOCK**
Render a structural schematic of one QA matrix row as a horizontal band of eight adjacent labeled cells: touchpoint, rule reference, issue description, evidence (specific line or element), severity, recommendation, owner, and decision. Read the band left to right with thin dividers. Give the rule-reference cell a heavier border weight to mark it as the load-bearing cell — the schematic's argument is that an issue without a rule citation is an opinion, not a finding. Give the severity cell a small four-state indicator standing for critical, major, minor, and note. Color the severity indicator states distinctly so the four levels are visually separable. The schematic should communicate that every finding travels from a cited rule through specific evidence to a severity rating and ends in a recorded human decision. Keep the eight cells uniform in height and modular. No baked text inside cells; the weighted rule-reference cell and the four-state severity indicator carry the meaning.

**BLOCK 2 — FULL SCOPE**
`[S - SPECIFICATION]` Default textbook: single-column 89mm, ≥300 DPI, vector, Okabe-Ito.
`[C - CONTENT]` Eight confirmed columns: touchpoint, rule reference, issue description, evidence, severity, recommendation, owner, decision. Four confirmed severity states: critical, major, minor, note. Confirmed: rule reference is not optional; an issue without a rule is an opinion.
`[O - ORGANIZATION]` Single horizontal band of eight cells; weighted rule-reference cell; four-state severity indicator inside the severity cell.
`[P - PRESENTATION]` Flat vector, Okabe-Ito hex, 1pt strokes (rule cell 1.5pt), white background. Severity states: critical #D55E00 (blocking), major #E69F00 (secondary), minor #56B4E9 (primary), note #CC79A7 (transitional). NO baked text, NO style suggestions.
`[E - EXCLUSIONS]` Omit example findings, omit section-number citations, omit owner names, omit a second example row, omit prose definitions.

**BLOCK 3 — NEGATIVE PROMPT**
example findings, section numbers, owner names, second row, definition prose, text labels, words, gibberish letters, titles, captions, decorative borders, realistic textures, drop shadows, gradient backgrounds, photographic elements, dual-headed arrows, hand-drawn styles, human figures, visual clutter, watermarks, red-green color combinations, rainbow color scales, 3D perspective distortion

## Figure 2 — The Recipe Input Chain
Priority: Important · Type: systems diagram

**BLOCK 1 — ILLUSTRAE PASTE BLOCK**
Render a systems diagram of how QA inputs flow into findings. On the left, place two source nodes — brand rules and voice guide — that feed into a central review-criteria node. The review-criteria node is applied by the agent to a set of touchpoint nodes. Draw an accessibility-requirements node running as a parallel check alongside the main flow, joining the findings stream from the side. Draw a claims/proof-map node feeding the evidentiary layer for claim-related findings. All these streams converge into a single QA-matrix node. From the matrix, draw a final step where human decisions close each row. Use single-headed arrows for all flows and a distinct line treatment for the parallel accessibility check so it reads as concurrent rather than sequential. Color the human-decision closing step in the dominant decision color to mark the phase gate. The diagram should communicate that missing inputs do not stop the process — they change the epistemic status of the findings. Keep to seven or eight nodes. No baked text; node roles and convergence carry the meaning.

**BLOCK 2 — FULL SCOPE**
`[S - SPECIFICATION]` Default textbook: single-column 89mm, ≥300 DPI, vector, Okabe-Ito.
`[C - CONTENT]` Confirmed inputs: brand rules + voice guide → review criteria → applied by agent to touchpoints; accessibility requirements as parallel check; claims/proof map as evidentiary layer; all → QA matrix; human decisions close each row. Confirmed: missing inputs change finding epistemic status, not the process.
`[O - ORGANIZATION]` Left source nodes → central review-criteria → touchpoints → QA matrix → human-decision close; accessibility node as parallel side stream; claims/proof node feeding the evidentiary layer.
`[P - PRESENTATION]` Flat vector, Okabe-Ito hex, 1pt strokes, white background. Human-decision close #0072B2 (dominant), parallel accessibility stream #E69F00 (secondary), main flow #56B4E9 (primary). NO baked text, NO style suggestions.
`[E - EXCLUSIONS]` Omit the caption, omit example documents, omit version dates, omit a legend, omit any ninth node.

**BLOCK 3 — NEGATIVE PROMPT**
caption, example documents, version dates, legend, ninth node, text labels, words, gibberish letters, titles, captions, decorative borders, realistic textures, drop shadows, gradient backgrounds, photographic elements, dual-headed arrows, hand-drawn styles, human figures, visual clutter, watermarks, red-green color combinations, rainbow color scales, 3D perspective distortion

## Figure 3 — Severity Levels
Priority: Important · Type: comparison panels

**BLOCK 1 — ILLUSTRAE PASTE BLOCK**
Render a four-tier comparison panel for the severity levels of a QA finding, ordered from most to least consequential: critical, major, minor, note. Stack four horizontal rows, each pairing a level marker with a representation of the action it requires: critical blocks launch and demands resolution before anything ships; major should be addressed before launch or documented by a named owner if shipped anyway; minor is noted for the next revision cycle and does not block; note is an observation that is not a finding. Use a graduated color treatment moving from the blocking color at critical down through secondary and primary toward the transitional color at note, so the descending consequence reads at a glance. Show, with a small gating glyph, that only critical and major carry a launch-decision weight while minor and note carry a revision-cycle weight. The panel should communicate that severity exists to prioritize, not to alarm — a matrix full of critical findings has lost the ability to communicate. Keep the four rows uniform. No baked text; the ordering and graduated color carry the meaning.

**BLOCK 2 — FULL SCOPE**
`[S - SPECIFICATION]` Default textbook: single-column 89mm, ≥300 DPI, vector, Okabe-Ito.
`[C - CONTENT]` Four confirmed levels and actions — critical: blocks launch, resolve before ship; major: address before launch or document decision to ship anyway (named owner); minor: note for next revision cycle, does not block; note: observation, not a finding. Confirmed: severity prioritizes, does not alarm.
`[O - ORGANIZATION]` Four stacked rows ordered critical → note (high → low consequence); per-row action representation; gating glyph distinguishing launch-decision (critical/major) from revision-cycle (minor/note) weight.
`[P - PRESENTATION]` Flat vector, Okabe-Ito hex, 1pt strokes, white background. Critical #D55E00, major #E69F00, minor #56B4E9, note #CC79A7 (graduated descending consequence). NO baked text, NO style suggestions.
`[E - EXCLUSIONS]` Omit example findings, omit the caption, omit numeric thresholds, omit a fifth level, omit alarm/warning iconography.

**BLOCK 3 — NEGATIVE PROMPT**
example findings, caption, numeric thresholds, fifth level, alarm icons, text labels, words, gibberish letters, titles, captions, decorative borders, realistic textures, drop shadows, gradient backgrounds, photographic elements, dual-headed arrows, hand-drawn styles, human figures, visual clutter, watermarks, red-green color combinations, rainbow color scales, 3D perspective distortion

## Figure 4 — Voice Finding Anatomy
Priority: Important · Type: annotated example

**BLOCK 1 — ILLUSTRAE PASTE BLOCK**
Render a side-by-side annotated comparison contrasting a weak, opinion-based voice finding against a strong, rule-cited one. On the left, show a single sparse node representing an opinion-based finding — a lone unsupported assertion with no connecting components, drawn faint and isolated. On the right, show the same finding unpacked into its five required components arranged as a connected stack or chain: rule reference (with a section-marker glyph), specific evidence (a quoted-line placeholder block), finding statement, severity marker, recommendation, and owner. Connect the right-side components with single-headed arrows showing how a defensible finding builds from a cited rule through quoted evidence to a recommendation and a named owner. Color the weak left version in a muted transitional tone and the strong right version in the primary and active colors to signal that only the right one is falsifiable. The comparison should communicate the test: can someone disagree by pointing to the rule? If not, it is an opinion. Keep components to six on the strong side. No baked text; the sparse-vs-built contrast carries the meaning.

**BLOCK 2 — FULL SCOPE**
`[S - SPECIFICATION]` Default textbook: single-column 89mm, ≥300 DPI, vector, Okabe-Ito.
`[C - CONTENT]` Confirmed weak version: opinion-based finding (no rule, not falsifiable). Confirmed strong version components: rule reference (with section number), specific evidence (quoted lines), finding statement, severity, recommendation, owner. Confirmed test: can someone disagree by pointing to the rule?
`[O - ORGANIZATION]` Two panels side by side; left = single isolated faint node; right = connected six-component chain with single-headed arrows.
`[P - PRESENTATION]` Flat vector, Okabe-Ito hex, 1pt strokes, white background. Weak left version #CC79A7 muted (transitional/weak), strong right components #56B4E9 (primary) with rule-reference node #009E73 (active/anchor). NO baked text, NO style suggestions.
`[E - EXCLUSIONS]` Omit the actual quoted sentences, omit real section numbers, omit the caption, omit owner names, omit a third version.

**BLOCK 3 — NEGATIVE PROMPT**
quoted sentences, real section numbers, caption, owner names, third version, text labels, words, gibberish letters, titles, captions, decorative borders, realistic textures, drop shadows, gradient backgrounds, photographic elements, dual-headed arrows, hand-drawn styles, human figures, visual clutter, watermarks, red-green color combinations, rainbow color scales, 3D perspective distortion

## Video Candidate Pass
Figure 1 — WEAK — single-row schematic; resolves in one frame.
Figure 2 — CANDIDATE — multi-stream systems diagram with a parallel accessibility check converging on the matrix — sequential reveal of the inputs flowing into findings and closing at the human gate has motion payoff.
Figure 3 — REJECT — static graduated comparison; reads at a glance.
Figure 4 — WEAK — building the strong finding component-by-component could animate but is a small chain.

Video candidates: 1. Recommended for production: Figure 2 — the recipe input chain is the chapter's systems view and benefits from animated convergence, especially showing the accessibility check running in parallel and every stream resolving at the human-decision gate.
