# 08. Measurement Plan and KPI Map

## Concrete Failure or Work Scenario

The campaign is live and the report is due tomorrow. The team has impressions, clicks, comments, survey snippets, and a few screenshots. Nobody agreed in advance which metric would indicate success, what baseline mattered, or what decision the report should support.

The failure is not that AI was used. The failure is that the artifact crossed a professional boundary without evidence, ownership, or a gate. Madison's answer is not less AI. It is better division of labor.

## Capability Statement

After this chapter, you will be able to define metrics, sources, baselines, cadence, and decision use before reporting.

**Assessment artifact:** KPI map.

## Why This Matters for the Reader's Role

Entry and mid-level practitioners often prepare reports. The work becomes more valuable when they help define measurement before the report exists.

This is the Madison posture: use AI for pattern work, structure, drafting, extraction, formatting, and completeness checks; protect the human work of judgment, verification, taste, accountability, and approval. See `MYCROFT.md`, `DATA_CONTRACT.md`, and `docs/phase-gates.md` for the repository rules behind that posture.

## The Recipe Concept

Inputs: campaign objective, funnel or journey stage, available data sources, metric definitions, baseline records, target, cadence, and decision owner. Steps: map each objective to a metric; define numerator and denominator where needed; identify source and freshness; record baseline status; state the decision the metric will inform. Outputs: KPI map, missing-data list, and sign-off field. Gate: performance reporting cannot begin until metric definitions are explicit. Log: source, extraction cadence, and baseline assumptions.

The recipe should be small enough to run, explicit enough to audit, and useful enough that a teammate can maintain it after the original author leaves.

## Agentic Supervision Lens

The agent can suggest metrics and format the map. The human must decide which measures are meaningful for the business question.

Supervision has three questions:

- Scope: what exactly is the agent allowed to do?
- Approval: who decides whether the output moves forward?
- Verification: what evidence would make the output defensible?

## Evidence Boundary

Verified: exported metrics, source systems, documented baselines, approved objectives. Model judgment: metric suggestions and interpretation prompts. Human judgment: decision relevance and acceptable proxy measures.

The boundary matters because Madison treats generated text as an artifact, not as evidence by default. A generated artifact can be useful, but it does not become trustworthy until its claims, inputs, and decisions are inspectable.

## Running Project Task

Create a KPI map with columns for objective, metric, definition, source, baseline, target, cadence, decision use, owner, and sign-off.

Save the artifact with the running project materials. If the evidence is thin, write that directly in the artifact instead of smoothing it out.

## Verification Checklist

- Each metric has a definition.
- Every source is named.
- Baselines are present or flagged as missing.
- The map distinguishes outcome, leading, and diagnostic metrics where useful.
- Every metric has a decision use.

Machine conformance checks whether the files and formats are structurally acceptable. Human adequacy checks whether the work is good enough for the decision it is supposed to support.

## Human-Only Judgment Boundary

AI cannot decide what the organization should optimize for. Metrics encode priorities, and priorities are human decisions.

That boundary is the phase gate. AI may prepare the ground on one side of it. The accountable practitioner crosses it.

## Bridge to Next Chapter

Metrics are one proof source among many. Chapter 9 turns to claims and the proof burden behind brand language.

## Sources Used

- `TIKTOC.md`
- `MYCROFT.md`
- `DOMAIN.md`
- `DATA_CONTRACT.md`
- `docs/data-and-provenance.md`
- `docs/workflows.md`
- `docs/phase-gates.md`
- `reports/generated/entry-mid-branding-advertising-recipes-research.md`
- `recipes/madison-performance-reporting.md`
- `recipes/survey-analysis.md`
- `logs/survey-analysis-outputs.json`
- `reports/templates/survey-analysis.md`
- `chapters/principles-marketing/03-strategic-planning-in-marketing.md`
- `pantry/08-measurement-plan-and-kpi-map_notes.md`
- `pantry/_lib_math-how-to-measure-anything-finding-the-value-of-intangibles-in-business.md`
