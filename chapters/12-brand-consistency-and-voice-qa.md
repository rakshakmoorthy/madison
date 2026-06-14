# 12. Brand Consistency and Voice QA

## Concrete Failure or Work Scenario

A website, email, ad, and deck all sound like they came from different companies. A quick AI pass makes them more similar, but also removes the texture that made the strongest touchpoint work. Consistency improved; brand judgment got worse.

The failure is not that AI was used. The failure is that the artifact crossed a professional boundary without evidence, ownership, or a gate. Madison's answer is not less AI. It is better division of labor.

## Capability Statement

After this chapter, you will be able to audit brand consistency and voice without reducing the brand to sameness.

**Assessment artifact:** Touchpoint QA matrix.

## Why This Matters for the Reader's Role

Brand practitioners need to catch contradictions, off-brand claims, accessibility problems, and voice drift while preserving intentional variation across channels.

This is the Madison posture: use AI for pattern work, structure, drafting, extraction, formatting, and completeness checks; protect the human work of judgment, verification, taste, accountability, and approval. See `MYCROFT.md`, `DATA_CONTRACT.md`, and `docs/phase-gates.md` for the repository rules behind that posture.

## The Recipe Concept

Inputs: brand rules, voice guide, sample touchpoints, claims/proof map, accessibility requirements, and review criteria. Steps: inspect each touchpoint for rule alignment, claim support, tone, jargon, accessibility, contradictions, and channel fit; assign severity; recommend action; capture human decision. Outputs: touchpoint QA matrix and revised guidance. Gate: severe issues block launch until owner decision. Log: touchpoint, issue, severity, recommendation, decision.

The recipe should be small enough to run, explicit enough to audit, and useful enough that a teammate can maintain it after the original author leaves.

## Agentic Supervision Lens

The agent can compare language to rules and surface likely inconsistencies. The human must decide whether difference is a defect or an intentional adaptation.

Supervision has three questions:

- Scope: what exactly is the agent allowed to do?
- Approval: who decides whether the output moves forward?
- Verification: what evidence would make the output defensible?

## Evidence Boundary

Verified: brand rules, source copy, contrast checks, documented claims. Model judgment: voice labels and consistency suggestions. Human judgment: taste, context, acceptable variation, and final decision.

The boundary matters because Madison treats generated text as an artifact, not as evidence by default. A generated artifact can be useful, but it does not become trustworthy until its claims, inputs, and decisions are inspectable.

## Running Project Task

Audit three touchpoints. Create a matrix with columns for touchpoint, rule reference, issue, evidence, severity, recommendation, owner, and decision.

Save the artifact with the running project materials. If the evidence is thin, write that directly in the artifact instead of smoothing it out.

## Verification Checklist

- Brand rules are cited.
- Voice comments point to specific lines.
- Accessibility issues are included.
- The matrix distinguishes contradiction from useful variation.
- Human decisions are recorded.

Machine conformance checks whether the files and formats are structurally acceptable. Human adequacy checks whether the work is good enough for the decision it is supposed to support.

## Human-Only Judgment Boundary

AI cannot own taste. It can identify patterns, but brand voice requires accountable aesthetic and strategic judgment.

That boundary is the phase gate. AI may prepare the ground on one side of it. The accountable practitioner crosses it.

## Bridge to Next Chapter

QA prepares artifacts for release. Chapter 13 asks whether the campaign is actually ready to launch.

## Sources Used

- `TIKTOC.md`
- `MYCROFT.md`
- `DOMAIN.md`
- `DATA_CONTRACT.md`
- `docs/data-and-provenance.md`
- `docs/workflows.md`
- `docs/phase-gates.md`
- `reports/generated/entry-mid-branding-advertising-recipes-research.md`
- `prompts/brandy/brandy.md`
- `docs/brandy-vs-assignment6-fit.md`
- `recipes/madison-brand-consistency-contradiction-checker.md`
- `recipes/madison-qa-accessibility-audit.md`
- `scripts/contrast-check.mjs`
- `pantry/12-brand-consistency-and-voice-qa_notes.md`
