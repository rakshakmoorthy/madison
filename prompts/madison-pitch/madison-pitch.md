# Madison Pitch Framework

Turn a project into an 8-minute, 10-slide venture pitch for a non-technical audience.
**You are a writing tool — write to the artifact/document.** Each prompt is self-contained;
run in sequence for a full build or individually to sharpen a weak slide.

Shared disciplines (apply, don't restate): `destination-language.md` and `jargon-audit.md`
(translate engine→destination everywhere; no tech jargon on investor slides),
`cleanup-standard.md` (for the final clean-up), `readiness-score.md` (for the VC test),
`archetypes.md` (for Slide 1's archetype).

## PROVENANCE GATE (read first — the Madison way)
Any statistic in a pitch must be **sourced or labeled**, never dropped in as fact. The
example figures below ("inconsistent brands spend 1.75x more on media", "forfeit 23–33% of
revenue") are **[Unverified — cite or cut]** placeholders: the student must find the real,
cited number for THEIR claim or remove it. A pitch that asserts an unsourced stat is exactly
the fluent-but-untrustworthy artifact this course warns against. Mark every number
`[Observed: source]`, `[Estimate: basis]`, or `[Unverified — cite or cut]`.

## PROMPT 0 — Intake (run first)
Ask exactly five questions, in order, then stop: 1) what the tool does in one sentence;
2) the specific customer who suffers most without it; 3) the single biggest technical feature
that makes it work; 4) stage (concept/mockup/prototype/MVP); 5) the ask (funding/partnership/
mentorship/grade). Confirm back a bulleted "Project Brief". Generate no slide content yet.

## Slide 1 — Title & Identity (15s)
PROJECT NAME (2–3 words, memorable, domain-appropriate); ONE-LINER (<12 words: "[Tool] is the
[analogy] for [customer] who [pain]"); BRAND ARCHETYPE (apply `archetypes.md` — which of the
12 fits and why, in 2 sentences); VISUAL SIGNAL (one color + one motif consistent with the
archetype). Output as a Component | Content table.

## Slide 2 — The Quantified Problem (75s)
HOOK (1 sentence, ≤15 words: a surprising cost framed as a loss — $, %, or time; every number
runs the provenance gate); PAIN NARRATIVE (3 sentences, specific and emotional, name a real
business type, describe the frustration not the technology, no jargon); FINANCIAL STAKES (1
sentence quantifying the cost of inaction — sourced or labeled). Add a SLIDE DESIGN NOTE: the
single image/chart for this slide.

## Slide 3 — Solution & Aha (75s)
Zero jargon (apply `destination-language.md`). Describe the DESTINATION not the engine.
Structure Before → After → the Bridge. End on the Aha: "Instead of [old painful way],
[customer] can now [new simple outcome]." Under 100 spoken words. Then a JARGON AUDIT (apply
`jargon-audit.md`): terms to never say + investor-friendly replacements.

## Slide 4 — The Magic / Secret Sauce (45s)
Translate the technical approach for a non-technical investor (apply `destination-language.md`).
Then WHY NOW in 1–2 sentences: what exists in 2026 that made this impossible 5 years ago. Use
the Orchestra analogy (agents = musicians, framework = conductor) or Hockey analogy (agents =
power-play players, each a role) for multi-agent systems. Output: spoken script (<75 words) +
"Why Now" + analogy choice with justification.

## Slide 5 — Business Model (50s)
Recommend ONE pricing model with justification (evaluate: monthly subscription tiered by
volume; performance-based % of gains; managed-service). REVENUE PROJECTION TABLE (Tier | Price/
Month | Target Customer | Key Feature). INVESTOR SOUND BITE: "For every [X] companies paying
[Y]/month, the platform generates [Z] ARR." Conservative, round numbers; any market-size or
adoption figure runs the provenance gate.

## Slide 6 — Go-To-Market (50s)
MICRO-SEGMENTS: turn the broad target into 3 specifics ("[business type] experiencing [trigger/
pain signal]"). FIRST 10 CUSTOMERS: the exact channel + action. AI LIVE INTELLIGENCE: one way
AI scans signals (news, postings, social) to spot prospects at the moment of distress. SPOKEN
SCRIPT <75 words, no jargon.

## Slide 7 — Competitive Landscape & Unfair Advantage (45s)
Apply `competitive-method.md`. COMPARISON TABLE (Competitor | What They Do | What They Miss |
My Advantage). UNFAIR ADVANTAGE statement (proprietary training / archetype logic / data
sovereignty / human-in-the-loop / unique workflow). SPOKEN SCRIPT <60 words, ending on one
declarative "We win because…".

## Slide 8 — Development Plan & Milestones (40s)
STATUS SIGNAL (one honest sentence about where it stands — honesty about stage builds
credibility). MILESTONE TABLE (Milestone | Target Date | Success Indicator): Now, near-term
(30–60d), mid-term (60–120d), Launch/First Revenue. SPOKEN SCRIPT <50 words, no hedging.

## Slide 9 — Proof of Concept (75s)
DEMO FORMAT recommendation by stage (live code = high credibility/high risk; Figma walkthrough
= safe/visual; n8n diagram = technical credibility; architecture diagram). USER JOURNEY (5
steps: Step N → what the user does → what the AI does invisibly → outcome the user sees).
SPOKEN SCRIPT <90 words, every technical element framed as a customer outcome.

## Slide 10 — The Ask & CTA (30s)
THE ASK (1 sentence: "We are seeking [X] to [milestone] by [date]"). USE OF FUNDS table
(Resource | Purpose | Expected Outcome). CALL TO ACTION (what the investor should do in 48
hours). CLOSING LINE that echoes the Slide 2 hook — completes the arc. Full spoken script <40
words, no filler, no "thank you" at the end.

## Bonus A — Jargon Audit (any slide)
Apply `jargon-audit.md` to a pasted slide script: rate each term RED/YELLOW/GREEN, replace
RED/YELLOW, and output the full rewritten script.

## Bonus B — 8-Minute Timer Check
Estimate each slide's speaking time at 130 wpm. TIMING TABLE (Slide | Word Count | Est. Time |
Target | Status ✅/⚠️/❌). Targets: S1 15s · S2 75 · S3 75 · S4 45 · S5 50 · S6 50 · S7 45 · S8
40 · S9 75 · S10 30. Flag any slide >10s over; suggest exact sentences to cut (preserve the
core); confirm total ≤8 min, leaving 3 for Q&A.

## Bonus C — The "Shut Up and Take My Money" Test
A skeptical Series-A VC scores the full pitch narrative. Apply `readiness-score.md` (0–100,
five dimensions × 20). Map the five dimensions to: 1) Pain Clarity (quantified in $/time/
frustration, specific to a named customer); 2) Solution Simplicity (could a non-expert grasp
it in 30 seconds); 3) Distinctiveness / Unfair Advantage; 4) Evidence / Internal Consistency
(every claim traces to something real — runs the provenance gate); 5) Execution Readiness (the
ask, milestones, and CTA are specific and time-bound). Return the per-dimension score with
justification, the total, the one priority fix, and the 80+ = investor-ready threshold.

## Clean-Up (before any external delivery)
Apply `cleanup-standard.md`: strip all slide/step/framework labels, convert headers to
standalone sentences, apply New Yorker pacing and destination language, and deliver a clean
version + an internal change log + a readiness signal (flag any `[Unverified]` stat still
present — it must be cited or cut before delivery).
