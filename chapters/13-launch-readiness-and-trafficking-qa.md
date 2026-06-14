# 13. Launch Readiness and Trafficking QA

## Concrete Failure or Work Scenario

The campaign is 'basically ready.' The assets are in three folders, one UTM is missing, the landing page screenshot is stale, the proof claim changed yesterday, and nobody knows who can give final approval.

The failure is not that AI was used. The failure is that the artifact crossed a professional boundary without evidence, ownership, or a gate. Madison's answer is not less AI. It is better division of labor.

## Capability Statement

After this chapter, you will be able to build a launch readiness pack with blockers, owners, specs, approvals, and go/no-go status.

**Assessment artifact:** Trafficking QA pack.

## Why This Matters for the Reader's Role

Launch and trafficking work is operational, but it is not low-status. It is where brand promises become public artifacts, and where small errors become visible.

This is the Madison posture: use AI for pattern work, structure, drafting, extraction, formatting, and completeness checks; protect the human work of judgment, verification, taste, accountability, and approval. See `MYCROFT.md`, `DATA_CONTRACT.md`, and `docs/phase-gates.md` for the repository rules behind that posture.

## The Recipe Concept

Inputs: asset list, specs, URLs, UTM plan, landing pages, claims/proof map, approvals, disclosures, screenshots, owners, and deadline. Steps: verify each asset; check specs and links; confirm tracking; compare claims to proof; capture approvals; name blockers; assign owners; record go/no-go. Outputs: launch readiness pack and blocker list. Gate: public release requires named approver and no unresolved critical blockers. Log: checklist state, owner, evidence path, and decision.

The recipe should be small enough to run, explicit enough to audit, and useful enough that a teammate can maintain it after the original author leaves.

## Agentic Supervision Lens

The agent can check completeness and produce a preflight table. The human must decide whether remaining risk is acceptable for launch.

Supervision has three questions:

- Scope: what exactly is the agent allowed to do?
- Approval: who decides whether the output moves forward?
- Verification: what evidence would make the output defensible?

## Evidence Boundary

Verified: asset files, URLs, screenshots, specs, approval records, UTM strings. Model judgment: likely blocker severity and checklist suggestions. Human judgment: go/no-go decision.

The boundary matters because Madison treats generated text as an artifact, not as evidence by default. A generated artifact can be useful, but it does not become trustworthy until its claims, inputs, and decisions are inspectable.

## Running Project Task

Create a launch readiness pack for one campaign or touchpoint. Include asset inventory, URL/tracking check, claim check, accessibility check, approval record, blockers, owners, and final status.

Save the artifact with the running project materials. If the evidence is thin, write that directly in the artifact instead of smoothing it out.

## Verification Checklist

- Assets and specs are complete.
- Links and tracking are checked.
- Claims still match proof.
- Approvals are named.
- Blockers have owners and severity.

Machine conformance checks whether the files and formats are structurally acceptable. Human adequacy checks whether the work is good enough for the decision it is supposed to support.

## Human-Only Judgment Boundary

AI cannot press launch for the organization. Release is an accountable decision.

That boundary is the phase gate. AI may prepare the ground on one side of it. The accountable practitioner crosses it.

## Bridge to Next Chapter

A launch with measurement in place creates the conditions for useful reporting. Chapter 14 turns live data into a performance readout.

## Sources Used

- `TIKTOC.md`
- `MYCROFT.md`
- `DOMAIN.md`
- `DATA_CONTRACT.md`
- `docs/data-and-provenance.md`
- `docs/workflows.md`
- `docs/phase-gates.md`
- `reports/generated/entry-mid-branding-advertising-recipes-research.md`
- `recipes/madison-launch-handoff.md`
- `recipes/madison-pre-launch-simulation.md`
- `recipes/madison-qa-accessibility-audit.md`
- `docs/exercises/exercise-05a-wrap-your-tool.md`
- `templates/wrap-your-tool/CLAUDE.md`
- `pantry/13-launch-readiness-and-trafficking-qa_notes.md`
