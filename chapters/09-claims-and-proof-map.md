# 09. Claims and Proof Map

## Concrete Failure or Work Scenario

A landing page says the product is trusted, faster, more intuitive, and built for modern teams. The copy is not obviously bad. The problem is that four different kinds of claim are hiding inside one smooth paragraph.

The failure is not that AI was used. The failure is that the artifact crossed a professional boundary without evidence, ownership, or a gate. Madison's answer is not less AI. It is better division of labor.

## Capability Statement

After this chapter, you will be able to map brand claims to proof, risk, rewrites, and approval owners.

**Assessment artifact:** Claims/proof table.

## Why This Matters for the Reader's Role

Copy review is not just polish. It is a risk and evidence practice. Junior brand and advertising people can create enormous value by making claims auditable before they reach a client, customer, or public channel.

This is the Madison posture: use AI for pattern work, structure, drafting, extraction, formatting, and completeness checks; protect the human work of judgment, verification, taste, accountability, and approval. See `MYCROFT.md`, `DATA_CONTRACT.md`, and `docs/phase-gates.md` for the repository rules behind that posture.

## The Recipe Concept

Inputs: draft copy, deck, landing page, email, or ad; available proof; brand rules; approval standards. Steps: extract claims line by line; classify factual claim, comparative claim, credential claim, performance claim, audience claim, puffery, or opinion; attach proof; assess risk; rewrite; assign owner. Outputs: claims/proof table and a cleaned draft. Gate: high-risk or unsupported claims cannot move forward without source, rewrite, or approval. Log: original claim, source, change, and reviewer decision.

The recipe should be small enough to run, explicit enough to audit, and useful enough that a teammate can maintain it after the original author leaves.

## Agentic Supervision Lens

The agent can extract claims and suggest cautious rewrites. The human must decide whether the brand should make the claim and who must approve it.

Supervision has three questions:

- Scope: what exactly is the agent allowed to do?
- Approval: who decides whether the output moves forward?
- Verification: what evidence would make the output defensible?

## Evidence Boundary

Verified: source documents, metrics, testimonials, screenshots, approved boilerplate. Model judgment: claim classification and rewrite suggestions. Human judgment: risk tolerance, brand fit, and final copy approval.

The boundary matters because Madison treats generated text as an artifact, not as evidence by default. A generated artifact can be useful, but it does not become trustworthy until its claims, inputs, and decisions are inspectable.

## Running Project Task

Audit one page or deck section. Produce a claims/proof table with columns for original claim, type, proof, risk, rewrite, approval owner, and status.

Save the artifact with the running project materials. If the evidence is thin, write that directly in the artifact instead of smoothing it out.

## Verification Checklist

- Every claim is isolated.
- Comparative and performance claims receive extra scrutiny.
- Unsupported claims are rewritten or removed.
- Approval owners are named.
- The cleaned copy is still useful, not merely timid.

Machine conformance checks whether the files and formats are structurally acceptable. Human adequacy checks whether the work is good enough for the decision it is supposed to support.

## Human-Only Judgment Boundary

AI cannot take responsibility for the consequences of a public claim. It can help make the proof burden visible.

That boundary is the phase gate. AI may prepare the ground on one side of it. The accountable practitioner crosses it.

## Bridge to Next Chapter

Claims need audiences. Chapter 10 builds audience personas from evidence rather than imagination.

## Sources Used

- `TIKTOC.md`
- `MYCROFT.md`
- `DOMAIN.md`
- `DATA_CONTRACT.md`
- `docs/data-and-provenance.md`
- `docs/workflows.md`
- `docs/phase-gates.md`
- `reports/generated/entry-mid-branding-advertising-recipes-research.md`
- `prompts/ogilvy/PROVENANCE-CHECK.md`
- `prompts/_shared/cleanup-standard.md`
- `prompts/_shared/destination-language.md`
- `prompts/_shared/jargon-audit.md`
- `prompts/madison-pitch/madison-pitch.md`
- `pantry/09-claims-and-proof-map_notes.md`
- `pantry/_lib_prompts-direct-response-copywriting-and-platform-content-coach.md`
