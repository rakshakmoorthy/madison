# 03. The Verified Brand Data Contract

## Concrete Failure or Work Scenario

A report says the audience is anxious about pricing, the category is shifting toward trust messaging, and the brand should lead with proof. The meeting stalls on a simple question: where did those statements come from?

The failure is not that AI was used. The failure is that the artifact crossed a professional boundary without evidence, ownership, or a gate. Madison's answer is not less AI. It is better division of labor.

## Capability Statement

After this chapter, you will be able to trace brand evidence from source to log to report to decision.

**Assessment artifact:** Provenance note.

## Why This Matters for the Reader's Role

Brand practitioners often inherit scattered screenshots, analytics exports, client comments, and draft copy. Madison turns that pile into a contract: what the artifact is, where it came from, how it was transformed, and what it can support.

This is the Madison posture: use AI for pattern work, structure, drafting, extraction, formatting, and completeness checks; protect the human work of judgment, verification, taste, accountability, and approval. See `MYCROFT.md`, `DATA_CONTRACT.md`, and `docs/phase-gates.md` for the repository rules behind that posture.

## The Recipe Concept

Inputs: source files, URLs, screenshots, analytics exports, prompts, recipe cards, logs, and report templates. Steps: label each input as raw data, verified data, generated artifact, approval record, or report; connect outputs to sources; record transformations; flag gaps; write a provenance note. Outputs: a source map, a missing-evidence list, and a report-ready provenance paragraph. Gate: no strategic recommendation can cite an artifact unless its source chain is visible. Log: store source paths, run IDs, and unresolved gaps.

The recipe should be small enough to run, explicit enough to audit, and useful enough that a teammate can maintain it after the original author leaves.

## Agentic Supervision Lens

The agent can extract paths, summarize inputs, and detect missing links. The human decides whether the source is legitimate for the claim being made.

Supervision has three questions:

- Scope: what exactly is the agent allowed to do?
- Approval: who decides whether the output moves forward?
- Verification: what evidence would make the output defensible?

## Evidence Boundary

Verified: local files, raw records, cited public pages, approval notes. Model judgment: summaries and suggested source relationships. Human judgment: adequacy of evidence for a business decision. Out of scope: pretending generated text is original evidence.

The boundary matters because Madison treats generated text as an artifact, not as evidence by default. A generated artifact can be useful, but it does not become trustworthy until its claims, inputs, and decisions are inspectable.

## Running Project Task

Trace one brand claim from a report back to a log, recipe, and source. If the chain breaks, write exactly where it breaks and what would repair it.

Save the artifact with the running project materials. If the evidence is thin, write that directly in the artifact instead of smoothing it out.

## Verification Checklist

- Raw inputs and generated artifacts are not confused.
- Every report claim points backward to evidence.
- Missing links are named, not smoothed over.
- Logs and human reports tell the same story.
- The provenance note is short enough to be used in review.

Machine conformance checks whether the files and formats are structurally acceptable. Human adequacy checks whether the work is good enough for the decision it is supposed to support.

## Human-Only Judgment Boundary

AI cannot confer legitimacy on a source by summarizing it. Source adequacy is a human review decision.

That boundary is the phase gate. AI may prepare the ground on one side of it. The accountable practitioner crosses it.

## Bridge to Next Chapter

Once evidence has a contract, the next problem is recipe design: every workflow has to serve both the agent and the human reviewer.

## Sources Used

- `TIKTOC.md`
- `MYCROFT.md`
- `DOMAIN.md`
- `DATA_CONTRACT.md`
- `docs/data-and-provenance.md`
- `docs/workflows.md`
- `docs/phase-gates.md`
- `reports/generated/entry-mid-branding-advertising-recipes-research.md`
- `recipes/marketmind.md`
- `logs/marketmind-run.json`
- `logs/marketmind-response.json`
- `reports/templates/marketmind.md`
- `pantry/03-the-verified-brand-data-contract_notes.md`
