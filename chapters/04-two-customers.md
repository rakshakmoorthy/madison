# 04. Two Customers

## Concrete Failure or Work Scenario

A workflow produces a perfect JSON file that nobody on the brand team knows how to interpret. Another workflow produces a persuasive memo that cannot be rerun or audited. Both fail, but for opposite reasons.

The failure is not that AI was used. The failure is that the artifact crossed a professional boundary without evidence, ownership, or a gate. Madison's answer is not less AI. It is better division of labor.

## Capability Statement

After this chapter, you will be able to read and design recipes for both the executing agent and the human maintainer.

**Assessment artifact:** Two-customer recipe note.

## Why This Matters for the Reader's Role

Practitioners who build AI-assisted brand workflows must serve two audiences at once. The agent needs structure. The human needs meaning, risk, caveats, and decisions.

This is the Madison posture: use AI for pattern work, structure, drafting, extraction, formatting, and completeness checks; protect the human work of judgment, verification, taste, accountability, and approval. See `MYCROFT.md`, `DATA_CONTRACT.md`, and `docs/phase-gates.md` for the repository rules behind that posture.

## The Recipe Concept

Inputs: one Madison recipe, its logs, and any human report template. Steps: mark agent instructions, inputs, transformations, output schema, logs, human review fields, decision gates, and maintenance notes; identify which customer is underserved; revise the workflow contract. Outputs: a two-customer note and a repair list. Gate: a recipe is incomplete if either the agent cannot run it or the human cannot judge it. Log: record recipe version, expected outputs, and review owner.

The recipe should be small enough to run, explicit enough to audit, and useful enough that a teammate can maintain it after the original author leaves.

## Agentic Supervision Lens

The agent can execute the operational path. The human must be able to understand the artifact's purpose, limits, and decision implications.

Supervision has three questions:

- Scope: what exactly is the agent allowed to do?
- Approval: who decides whether the output moves forward?
- Verification: what evidence would make the output defensible?

## Evidence Boundary

Verified: recipe text, schemas, logs, report templates, documented gates. Model judgment: suggestions about missing fields. Human judgment: whether the workflow is maintainable under real team conditions.

The boundary matters because Madison treats generated text as an artifact, not as evidence by default. A generated artifact can be useful, but it does not become trustworthy until its claims, inputs, and decisions are inspectable.

## Running Project Task

Annotate one Madison recipe in two colors or two columns: agent customer and human customer. Then write the smallest change that would improve the weaker side.

Save the artifact with the running project materials. If the evidence is thin, write that directly in the artifact instead of smoothing it out.

## Verification Checklist

- Inputs and outputs are explicit.
- The human review point is visible.
- The machine-readable output can be tied to the human report.
- A future maintainer could rerun the recipe.
- The recipe names what it refuses to decide.

Machine conformance checks whether the files and formats are structurally acceptable. Human adequacy checks whether the work is good enough for the decision it is supposed to support.

## Human-Only Judgment Boundary

AI cannot decide what counts as a useful maintenance surface for a team. That depends on the people, cadence, risk, and institutional memory around the workflow.

That boundary is the phase gate. AI may prepare the ground on one side of it. The accountable practitioner crosses it.

## Bridge to Next Chapter

A recipe can serve both customers and still overclaim. Chapter 5 turns to evidence limits.

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
- `recipes/content-agent.md`
- `reports/templates/content-agent.md`
- `logs/content-agent-alerts.json`
- `docs/operations.md`
- `pantry/04-two-customers_notes.md`
