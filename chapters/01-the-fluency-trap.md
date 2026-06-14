# 01. The Fluency Trap

## Concrete Failure or Work Scenario

A junior strategist pastes an AI-generated campaign brief into the team channel. It has the right headings, a confident audience description, sharp message pillars, and three campaign ideas that sound ready for a client deck. Nobody can point to the survey, interview, competitor page, sales note, or approval record behind the claims. The artifact looks finished precisely because it is fluent.

The failure is not that AI was used. The failure is that the artifact crossed a professional boundary without evidence, ownership, or a gate. Madison's answer is not less AI. It is better division of labor.

## Capability Statement

After this chapter, you will be able to audit fluent brand output before it becomes trusted brand work.

**Assessment artifact:** Claim and assumption table.

## Why This Matters for the Reader's Role

Entry and mid-level brand practitioners are often the first people asked to turn vague inputs into polished materials. That makes them the first line of defense against the mistake Madison is built to prevent: confusing finished language with finished work.

This is the Madison posture: use AI for pattern work, structure, drafting, extraction, formatting, and completeness checks; protect the human work of judgment, verification, taste, accountability, and approval. See `MYCROFT.md`, `DATA_CONTRACT.md`, and `docs/phase-gates.md` for the repository rules behind that posture.

## The Recipe Concept

Inputs: one AI-generated brief, persona, content plan, or pitch section; known brand sources; any available audience, competitor, and approval records. Steps: split the artifact into individual claims; classify each claim as verified, inferred, unsupported, taste judgment, or approval-needed; trace each verified claim to a source; rewrite unsupported claims as questions or hypotheses; route approval-needed claims to a named owner. Outputs: a claim and assumption table, a short risk memo, and a cleaned draft that no longer hides uncertainty. Gate: no artifact moves downstream until unsupported claims are either removed, sourced, or labeled as assumptions. Log: record source paths, missing evidence, and reviewer decisions.

The recipe should be small enough to run, explicit enough to audit, and useful enough that a teammate can maintain it after the original author leaves.

## Agentic Supervision Lens

The agent can segment language, suggest claim categories, and propose rewrites. The human must decide whether the claim matters, whether the source is good enough, and whether the brand should say it at all.

Supervision has three questions:

- Scope: what exactly is the agent allowed to do?
- Approval: who decides whether the output moves forward?
- Verification: what evidence would make the output defensible?

## Evidence Boundary

Verified: source-backed facts, quoted brand rules, documented approvals. Model judgment: claim classification, risk suggestions, rewrite options. Human judgment: what level of proof is enough for the situation. Out of scope: legal clearance, unless the organization explicitly routes legal review through this workflow.

The boundary matters because Madison treats generated text as an artifact, not as evidence by default. A generated artifact can be useful, but it does not become trustworthy until its claims, inputs, and decisions are inspectable.

## Running Project Task

Choose one fluent artifact and create a table with columns for claim, claim type, source, evidence status, risk, rewrite, and owner. End with a three-sentence note: what can ship, what needs evidence, and what needs approval.

Save the artifact with the running project materials. If the evidence is thin, write that directly in the artifact instead of smoothing it out.

## Verification Checklist

- Every factual claim has a source path or source URL.
- Every inference is labeled as inference.
- Every approval-needed statement has an owner.
- The revised artifact is less overconfident than the original.
- The reviewer can see what changed and why.

Machine conformance checks whether the files and formats are structurally acceptable. Human adequacy checks whether the work is good enough for the decision it is supposed to support.

## Human-Only Judgment Boundary

AI cannot decide that a claim is worth making. It can help expose unsupported language; it cannot accept reputational responsibility for the brand.

That boundary is the phase gate. AI may prepare the ground on one side of it. The accountable practitioner crosses it.

## Bridge to Next Chapter

Once fluent artifacts have been exposed as mixtures of evidence, inference, and judgment, the next chapter asks where the human's scarce time should move.

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
- `prompts/ogilvy/ogilvy.md`
- `prompts/brandy/brandy.md`
- `prompts/nina/nina.md`
- `pantry/01-the-fluency-trap_notes.md`
- `pantry/_lib_ai-gigo.md`
