# 05. Verifying Brand Evidence

## Concrete Failure or Work Scenario

A competitor scan is sourced, a survey export is real, and a sentiment digest has timestamps. The team still should not say the market has changed, the audience prefers one message, or the campaign caused a lift without asking what the evidence actually warrants.

The failure is not that AI was used. The failure is that the artifact crossed a professional boundary without evidence, ownership, or a gate. Madison's answer is not less AI. It is better division of labor.

## Capability Statement

After this chapter, you will be able to state what evidence can support, suggest, or not support.

**Assessment artifact:** Warranted-verb list.

## Why This Matters for the Reader's Role

Brand and advertising work is full of partial evidence. The professional move is not to demand perfect certainty. It is to use precise verbs that match the evidence.

This is the Madison posture: use AI for pattern work, structure, drafting, extraction, formatting, and completeness checks; protect the human work of judgment, verification, taste, accountability, and approval. See `MYCROFT.md`, `DATA_CONTRACT.md`, and `docs/phase-gates.md` for the repository rules behind that posture.

## The Recipe Concept

Inputs: one evidence set, source map, known methods, timestamps, and proposed claims. Steps: inspect coverage, recency, source quality, method fit, sample limits, missing alternatives, and model-judgment fields; assign warranted verbs; rewrite conclusions. Outputs: can say, can suggest, cannot claim, and needs review lists. Gate: recommendations cannot use stronger verbs than the evidence permits. Log: capture evidence limits and reviewer overrides.

The recipe should be small enough to run, explicit enough to audit, and useful enough that a teammate can maintain it after the original author leaves.

## Agentic Supervision Lens

The agent can surface weaknesses and propose cautious language. The human must decide whether the evidence is sufficient for action in context.

Supervision has three questions:

- Scope: what exactly is the agent allowed to do?
- Approval: who decides whether the output moves forward?
- Verification: what evidence would make the output defensible?

## Evidence Boundary

Verified: source existence, timestamp, method description, raw field values. Model judgment: sentiment labels, theme clusters, inferred intent. Human judgment: strategic relevance and acceptable uncertainty.

The boundary matters because Madison treats generated text as an artifact, not as evidence by default. A generated artifact can be useful, but it does not become trustworthy until its claims, inputs, and decisions are inspectable.

## Running Project Task

Choose one evidence set and write four lists: can say, can suggest, cannot claim, and needs human review. Then revise one paragraph of analysis using only warranted verbs.

Save the artifact with the running project materials. If the evidence is thin, write that directly in the artifact instead of smoothing it out.

## Verification Checklist

- Coverage and recency are addressed.
- Model judgments are labeled.
- Causal language is avoided unless supported.
- Every strong recommendation has a matching evidence basis.
- Uncertainty is specific rather than vague.

Machine conformance checks whether the files and formats are structurally acceptable. Human adequacy checks whether the work is good enough for the decision it is supposed to support.

## Human-Only Judgment Boundary

AI cannot know whether a weak signal is still enough for a local decision. That is a contextual risk judgment.

That boundary is the phase gate. AI may prepare the ground on one side of it. The accountable practitioner crosses it.

## Bridge to Next Chapter

The next chapter applies warranted verbs to a common brand workflow: competitor signal scanning.

## Sources Used

- `TIKTOC.md`
- `MYCROFT.md`
- `DOMAIN.md`
- `DATA_CONTRACT.md`
- `docs/data-and-provenance.md`
- `docs/workflows.md`
- `docs/phase-gates.md`
- `reports/generated/entry-mid-branding-advertising-recipes-research.md`
- `docs/exercises/HOW-TO-CHECK.md`
- `docs/exercises/exercise-03-gather-validate-defend.md`
- `prompts/_shared/competitive-method.md`
- `scripts/conformance.mjs`
- `pantry/05-verifying-brand-evidence_notes.md`
- `pantry/_lib_math-how-to-lie-with-statistics.md`
