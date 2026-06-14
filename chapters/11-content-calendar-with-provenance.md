# 11. Content Calendar With Provenance

## Concrete Failure or Work Scenario

The calendar has thirty posts, cheerful captions, and channel labels. What it does not have is the reason each post exists, the claim it depends on, the audience it serves, the proof it uses, or the person who can approve it.

The failure is not that AI was used. The failure is that the artifact crossed a professional boundary without evidence, ownership, or a gate. Madison's answer is not less AI. It is better division of labor.

## Capability Statement

After this chapter, you will be able to build a content calendar that preserves source, purpose, owner, approval, and risk.

**Assessment artifact:** Content calendar.

## Why This Matters for the Reader's Role

Content calendars are everyday operational artifacts. Madison turns them from volume trackers into evidence-aware coordination tools.

This is the Madison posture: use AI for pattern work, structure, drafting, extraction, formatting, and completeness checks; protect the human work of judgment, verification, taste, accountability, and approval. See `MYCROFT.md`, `DATA_CONTRACT.md`, and `docs/phase-gates.md` for the repository rules behind that posture.

## The Recipe Concept

Inputs: creative brief, audience evidence, claims/proof map, campaign priorities, channels, assets, owners, and approval rules. Steps: generate candidate rows; attach each row to audience, message pillar, proof, CTA, asset, owner, and approval status; flag risk; remove rows with no strategic purpose. Outputs: two-week or one-month calendar with provenance. Gate: no row is publish-ready without owner, proof, and approval status. Log: row ID, source, approval state, and changes.

The recipe should be small enough to run, explicit enough to audit, and useful enough that a teammate can maintain it after the original author leaves.

## Agentic Supervision Lens

The agent can propose posts and populate calendar fields. The human must decide whether the calendar expresses the strategy and whether the risk is acceptable.

Supervision has three questions:

- Scope: what exactly is the agent allowed to do?
- Approval: who decides whether the output moves forward?
- Verification: what evidence would make the output defensible?

## Evidence Boundary

Verified: brief fields, proof map entries, approved assets, channel specs. Model judgment: topic suggestions, caption drafts, channel fit. Human judgment: priority, taste, timing, and approval.

The boundary matters because Madison treats generated text as an artifact, not as evidence by default. A generated artifact can be useful, but it does not become trustworthy until its claims, inputs, and decisions are inspectable.

## Running Project Task

Build a two-week calendar for your running project. Required columns: date, channel, audience, message pillar, source/proof, asset, owner, CTA, risk, approval status.

Save the artifact with the running project materials. If the evidence is thin, write that directly in the artifact instead of smoothing it out.

## Verification Checklist

- Every row has a purpose.
- Every claim points to proof or is rewritten.
- Owners and approval status are visible.
- Risk flags are not hidden.
- The calendar can be revised when evidence changes.

Machine conformance checks whether the files and formats are structurally acceptable. Human adequacy checks whether the work is good enough for the decision it is supposed to support.

## Human-Only Judgment Boundary

AI cannot decide what a brand should choose to say in public at a particular moment. It can help organize options.

That boundary is the phase gate. AI may prepare the ground on one side of it. The accountable practitioner crosses it.

## Bridge to Next Chapter

Planned content still needs quality control. Chapter 12 audits voice and consistency across touchpoints.

## Sources Used

- `TIKTOC.md`
- `MYCROFT.md`
- `DOMAIN.md`
- `DATA_CONTRACT.md`
- `docs/data-and-provenance.md`
- `docs/workflows.md`
- `docs/phase-gates.md`
- `reports/generated/entry-mid-branding-advertising-recipes-research.md`
- `recipes/content-agent.md`
- `logs/content-agent-prompt.json`
- `logs/content-agent-alerts.json`
- `reports/templates/content-agent.md`
- `docs/exercises/exercise-10-substack-platform.md`
- `chapters/principles-marketing/19-direct-online-social-media-and-mobile-marketing.md`
- `pantry/11-content-calendar-with-provenance_notes.md`
