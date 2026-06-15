# CAJAL Figure Report — Two Customers
_Density: recommend 3 figures, Mixed._

Three figurable concepts. First, the two-customers idea itself — the executing agent and the human maintainer, each with different needs, partially in tension — is the chapter's organizing structure and a comparison-panel candidate. Second, the two opposite failure modes (workflow one fails quietly serving only the agent; workflow two fails loudly serving only the human) form a clean comparison that dramatizes why serving one customer is not enough. Third, the decision gate distinction — a gate that just says "review required" (a latch-less gate) versus a specified gate (criteria, named decision, owner, logged record) — is a structural schematic that carries the chapter's most actionable point. The serviceability test pair (human-layer test, agent-layer anomaly test) is real but procedural and is adequately covered by the two-customers and failure-mode figures, so it is folded in.

## Figure 1 — The Two Customers of a Recipe
Priority: Critical · Type: comparison panels

BLOCK 1 — ILLUSTRAE PASTE BLOCK:
Create a flat vector two-column comparison for a single-column textbook page showing the two customers every recipe must serve. Build two equal columns. The left column represents the executing agent and what it needs: explicit inputs, a clear transformation, an output schema, and graceful failure on anomalies. The right column represents the human maintainer and what they need: the purpose of the workflow, the decision it supports, the location and meaning of the review point, enough context to judge the output, and the ability to modify the recipe when the world changes. Give each column four reserved row slots and a header label slot. Use a primary tone for the agent column and a contrasting secondary tone for the human column. Between the two columns, draw a thin connector or shared spine to signal that a single recipe must satisfy both simultaneously and that the two sets of needs are partially in tension. Keep rows as empty rounded bars, strokes thin, fills flat, background white, with no baked-in words.

BLOCK 2 — FULL SCOPE:
[S - SPECIFICATION] Single-column 89mm, ≥300 DPI, vector, Okabe-Ito, white background.
[C - CONTENT] Left column (executing agent): explicit inputs, clear transformation, output schema, graceful anomaly handling. Right column (human maintainer): purpose, decision supported, review point and meaning, context to judge, modifiability.
[O - ORGANIZATION] Two equal columns with a shared central spine; reserved header and four row slots per column.
[P - PRESENTATION] Flat vector, Okabe-Ito hex (agent column #56B4E9, human column #E69F00, spine Black #000000), 1pt strokes, white background, no baked text, no style suggestions.
[E - EXCLUSIONS] No robot or human-figure icons, no rendered need text, no arrows implying one feeds the other, no ranking.

BLOCK 3 — NEGATIVE PROMPT:
robot icons, person icons, rendered text, ranking, directional arrows, text labels, words, gibberish letters, titles, captions, decorative borders, realistic textures, drop shadows, gradient backgrounds, photographic elements, dual-headed arrows, hand-drawn styles, human figures, visual clutter, watermarks, red-green color combinations, rainbow color scales, 3D perspective distortion

## Figure 2 — Two Failure Modes
Priority: Important · Type: comparison panels

BLOCK 1 — ILLUSTRAE PASTE BLOCK:
Create a flat vector two-panel comparison for a single-column textbook page showing the two opposite ways a workflow fails. Build two side-by-side panels. The left panel represents the quiet failure: a perfect machine-readable artifact — a clean schema with populated fields and green logs — that the human team cannot interpret or act on, so it sits unused. The right panel represents the loud failure: a persuasive, beautifully written memo that a human acts on, but which has no inputs, no parameters, and no logs, so it cannot be rerun or reproduced. Visually, give the left panel a complete, tidy structured-data block but a missing or hollow human-output area; give the right panel a complete narrative block but a missing or hollow reproducibility/log area. Use a primary tone for the structured artifact and a secondary tone for the narrative artifact, and mark each panel's missing half with a clearly empty, outlined-only region. Reserve a header label slot atop each panel. Thin strokes, flat fills, white background, generous spacing, and no baked-in words.

BLOCK 2 — FULL SCOPE:
[S - SPECIFICATION] Single-column 89mm, ≥300 DPI, vector, Okabe-Ito, white background.
[C - CONTENT] Left panel (quiet failure): complete structured artifact (schema, fields, green logs) with hollow human-interpretation area. Right panel (loud failure): complete persuasive memo with hollow reproducibility/log area.
[O - ORGANIZATION] Two equal panels; each shows one full half and one outlined-empty half; header slot per panel.
[P - PRESENTATION] Flat vector, Okabe-Ito hex (structured artifact #56B4E9, narrative artifact #E69F00, empty regions Black #000000 outline only, green-log accent #009E73), 1pt strokes, white background, no baked text, no style suggestions.
[E - EXCLUSIONS] No rendered JSON or memo text, no icons, no checkmarks, no scoring, no gradient to indicate emptiness.

BLOCK 3 — NEGATIVE PROMPT:
rendered JSON, rendered memo text, icons, checkmarks, scores, gradient fills, text labels, words, gibberish letters, titles, captions, decorative borders, realistic textures, drop shadows, gradient backgrounds, photographic elements, dual-headed arrows, hand-drawn styles, human figures, visual clutter, watermarks, red-green color combinations, rainbow color scales, 3D perspective distortion

## Figure 3 — The Latch-less Gate vs the Real Gate
Priority: Important · Type: structural schematic

BLOCK 1 — ILLUSTRAE PASTE BLOCK:
Create a flat vector comparison schematic for a single-column textbook page contrasting a gate with no latch against a real decision gate. Build two stacked or side-by-side gate representations. The upper or left one represents the weak gate: a single node carrying only an undifferentiated instruction to review, with an open pass-through that anything can cross without resistance. The lower or right one represents the real gate: a node containing four reserved component slots — review criteria (what makes the output acceptable or unacceptable), the named decision (proceed yes or no), the named owner (whose judgment counts), and a logged record that can be inspected later. Visually convey that the weak gate has no controlling mechanism while the real gate has explicit structure that an output must satisfy before crossing. Use a cautionary tone for the weak gate and a dominant, structured tone for the real gate. Reserve label slots for each component. Keep nodes as clean rounded forms, single-headed pass-through arrows, thin strokes, flat fills, white background, and no baked-in words.

BLOCK 2 — FULL SCOPE:
[S - SPECIFICATION] Single-column 89mm, ≥300 DPI, vector, Okabe-Ito, white background.
[C - CONTENT] Weak gate: single undifferentiated "review" instruction, open pass-through. Real gate: four components — review criteria, named decision (yes/no), named owner, logged record.
[O - ORGANIZATION] Two gate representations contrasted; weak gate with unobstructed → pass-through; real gate with four reserved component slots and a controlled → crossing; reserved label slots.
[P - PRESENTATION] Flat vector, Okabe-Ito hex (weak gate #E69F00, real gate #0072B2, pass-through arrows Black #000000, log accent #009E73), 1pt strokes, white background, no baked text, no style suggestions.
[E - EXCLUSIONS] No literal door or lock imagery, no rendered criteria text, no icons, no scoring, no person figures.

BLOCK 3 — NEGATIVE PROMPT:
door imagery, lock imagery, rendered criteria text, icons, scores, person figures, text labels, words, gibberish letters, titles, captions, decorative borders, realistic textures, drop shadows, gradient backgrounds, photographic elements, dual-headed arrows, hand-drawn styles, human figures, visual clutter, watermarks, red-green color combinations, rainbow color scales, 3D perspective distortion

## Video Candidate Pass
Figure 1 — NOT A CANDIDATE — static two-column needs comparison.
Figure 2 — WEAK CANDIDATE — two failure narratives — could animate each artifact "completing" then revealing its hollow half, but the contrast lands as a still.
Figure 3 — WEAK CANDIDATE — could animate an output sliding through the latch-less gate unchecked versus being stopped and evaluated at the real gate, which has mild temporal appeal but is not strictly a multi-step process.
Video candidates: 1. Recommended for production: Figure 3 — The Latch-less Gate vs the Real Gate, because a short before/after of an output passing freely versus being held and checked is the single most behavior-changing idea in the chapter and benefits from showing the "stop" beat in motion. (At most one recommended; kept to one.)
