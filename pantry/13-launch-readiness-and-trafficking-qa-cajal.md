# CAJAL Figure Report — Launch Readiness and Trafficking QA
_Density: recommend 3 figures, Mechanistic._

## Figure 1 — The Six Launch Check Categories
Priority: Critical · Type: systems diagram

**BLOCK 1 — ILLUSTRAE PASTE BLOCK**
Render a systems diagram of the six distinct check categories that must clear before a campaign launches, each with its own owner and failure mode. Arrange six category nodes — asset completeness and specification conformance, URL integrity and tracking, claims and proof alignment, approvals and disclosures, accessibility, and blocker identification and severity classification — as a converging set. The first five feed into the sixth, which sits downstream as the synthesis step that collects gaps from the preceding checks and sorts them by severity. Draw the first five as a column or arc of parallel nodes, each connected by a single-headed arrow into the sixth blocker-classification node. Mark the claims-and-proof-alignment node with a heavier border to signal it is the most consequential check — the one failure mode that cannot be corrected quietly after launch. Color the blocker-classification synthesis node in the dominant color since it governs the go decision inputs. Keep the six nodes uniform except for the weighted claims node. No baked text; node arrangement and the weighted claims check carry the meaning.

**BLOCK 2 — FULL SCOPE**
`[S - SPECIFICATION]` Default textbook: single-column 89mm, ≥300 DPI, vector, Okabe-Ito.
`[C - CONTENT]` Six confirmed categories: (1) asset completeness/spec conformance, (2) URL integrity and tracking, (3) claims and proof alignment, (4) approvals and disclosures, (5) accessibility, (6) blocker identification and severity classification. Confirmed: 1–5 feed into 6; claims alignment is most consequential (cannot be fixed quietly post-launch).
`[O - ORGANIZATION]` Five parallel check nodes converging via single-headed arrows into a sixth downstream blocker-classification node; weighted claims-alignment node.
`[P - PRESENTATION]` Flat vector, Okabe-Ito hex, 1pt strokes (claims node 1.5pt), white background. Blocker-classification node #0072B2 (dominant), claims-alignment node #D55E00 emphasis (highest stakes), other checks #56B4E9 (primary). NO baked text, NO style suggestions.
`[E - EXCLUSIONS]` Omit example items, omit owner names, omit a seventh category, omit platform logos, omit numeric counts.

**BLOCK 3 — NEGATIVE PROMPT**
example items, owner names, seventh category, platform logos, numeric counts, text labels, words, gibberish letters, titles, captions, decorative borders, realistic textures, drop shadows, gradient backgrounds, photographic elements, dual-headed arrows, hand-drawn styles, human figures, visual clutter, watermarks, red-green color combinations, rainbow color scales, 3D perspective distortion

## Figure 2 — Launch Readiness Pack Row Anatomy
Priority: Critical · Type: structural schematic

**BLOCK 1 — ILLUSTRAE PASTE BLOCK**
Render a structural schematic of one launch-readiness-pack row as a horizontal band of eight adjacent labeled cells: check category, item, required state, current state, evidence/source, blocker severity, owner, and resolved status. Read the band left to right with thin dividers. Pair the required-state and current-state cells visually — bracket them together or tie them with a thin connector — to signal that the row's purpose is to expose any gap between what the item should look like and what it actually looks like right now. Give the evidence/source cell a small date-stamp glyph to encode the chapter's insistence that evidence has dates: a three-week-old screenshot is not current evidence. Give the blocker-severity cell a four-state indicator standing for critical, significant, minor, and clear. Color the severity states distinctly. The schematic should communicate that the row collapses a distributed campaign state into a single inspectable record. Keep the eight cells uniform. No baked text; the required-vs-current pairing, the date glyph, and the severity indicator carry the meaning.

**BLOCK 2 — FULL SCOPE**
`[S - SPECIFICATION]` Default textbook: single-column 89mm, ≥300 DPI, vector, Okabe-Ito.
`[C - CONTENT]` Eight confirmed columns: check category, item, required state, current state, evidence/source, blocker severity, owner, resolved? Four confirmed severity states: critical, significant, minor, clear. Confirmed: required vs. current exposes the gap; evidence has dates.
`[O - ORGANIZATION]` Single horizontal band of eight cells; required-state and current-state cells visually paired; date glyph on evidence cell; four-state severity indicator.
`[P - PRESENTATION]` Flat vector, Okabe-Ito hex, 1pt strokes, white background. Severity states: critical #D55E00, significant #E69F00, minor #56B4E9, clear #009E73. NO baked text, NO style suggestions.
`[E - EXCLUSIONS]` Omit example items, omit owner names, omit actual dates, omit a second row, omit platform-spec numbers.

**BLOCK 3 — NEGATIVE PROMPT**
example items, owner names, actual dates, second row, spec numbers, text labels, words, gibberish letters, titles, captions, decorative borders, realistic textures, drop shadows, gradient backgrounds, photographic elements, dual-headed arrows, hand-drawn styles, human figures, visual clutter, watermarks, red-green color combinations, rainbow color scales, 3D perspective distortion

## Figure 3 — The Go/No-Go Decision Gate
Priority: Important · Type: process flowchart

**BLOCK 1 — ILLUSTRAE PASTE BLOCK**
Render a process flowchart of the go/no-go launch decision as a flow that does not reduce to a checkbox count. Begin with an input node representing the classified blocker list (critical, significant, minor). Flow into a decision node held by a single named approver, posed not as "are all boxes checked?" but as "is the remaining risk acceptable for launch?" Show two structurally different gates feeding this decision: one path where all items are clear yet the launch may still not be ready (a late, pressured approval), and one path where a minor item is unresolved yet the launch may proceed. From the approver decision, draw three outcomes: go (with a recorded name, timestamp, and blocker status), hold, and a special blocking terminus for a misaligned claim or an unidentified approver, both of which are critical blockers that cannot be accepted. Color the critical-blocker terminus in the blocking color and the recorded-go outcome in the active color. Place a vertical gate line at the approver decision labeled as the point where human accountability lives. Keep to seven nodes. No baked text; the single-approver decision and the non-acceptable critical terminus carry the meaning.

**BLOCK 2 — FULL SCOPE**
`[S - SPECIFICATION]` Default textbook: single-column 89mm, ≥300 DPI, vector, Okabe-Ito.
`[C - CONTENT]` Confirmed: classified blocker list → single named approver decision ("is remaining risk acceptable?", not "all boxes checked?"). Confirmed paradox paths: all-clear-but-not-ready (pressured late approval) and minor-unresolved-but-ready. Confirmed outcomes: go (name + timestamp + blocker status recorded), hold. Confirmed non-acceptable critical blockers: misaligned proof claim, unidentified approver.
`[O - ORGANIZATION]` Blocker-list input → approver decision (vertical gate line) → go / hold / critical-blocker terminus; two paradox feed-paths into the decision.
`[P - PRESENTATION]` Flat vector, Okabe-Ito hex, 1pt strokes (gate line 1.5pt), white background. Recorded-go #009E73 (active), critical-blocker terminus #D55E00 (blocking), hold #E69F00 (transitional), approver node #0072B2 (dominant). NO baked text, NO style suggestions.
`[E - EXCLUSIONS]` Omit the caption, omit example blockers, omit approver names, omit timestamps, omit a checkbox-count tally.

**BLOCK 3 — NEGATIVE PROMPT**
caption, example blockers, approver names, timestamps, checkbox tally, text labels, words, gibberish letters, titles, captions, decorative borders, realistic textures, drop shadows, gradient backgrounds, photographic elements, dual-headed arrows, hand-drawn styles, human figures, visual clutter, watermarks, red-green color combinations, rainbow color scales, 3D perspective distortion

## Video Candidate Pass
Figure 1 — WEAK — convergence diagram; some flow but mostly static structure.
Figure 2 — REJECT — single-row schematic; reads in one frame.
Figure 3 — CANDIDATE — decision flow with multiple feed-paths and three branching outcomes including a non-acceptable terminus — animating a campaign arriving at the approver gate and resolving to go, hold, or blocked has clear sequential payoff.

Video candidates: 1. Recommended for production: Figure 3 — the go/no-go gate is the chapter's most consequential human-judgment moment and animation can dramatize that the decision weighs acceptable risk rather than counting checkboxes, and that some critical blockers cannot be accepted at all.
