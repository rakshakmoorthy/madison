# 14. Campaign Performance Report

## Concrete Failure or Work Scenario

The report has charts, percentages, and a confident recommendation. It does not say where the data came from, how the metrics were defined, what baseline matters, which changes are noise, or what decision the reader should make.

The failure is not that AI was used. The failure is that the artifact crossed a professional boundary without evidence, ownership, or a gate. Madison's answer is not less AI. It is better division of labor.

## Capability Statement

After this chapter, you will be able to produce campaign reporting that supports decisions rather than metric theater.

**Assessment artifact:** Performance readout.

## Why This Matters for the Reader's Role

Performance reporting is one of the places where a practitioner can move from production support to decision support. Madison makes the chain from raw export to recommendation visible.

This is the Madison posture: use AI for pattern work, structure, drafting, extraction, formatting, and completeness checks; protect the human work of judgment, verification, taste, accountability, and approval. See `MYCROFT.md`, `DATA_CONTRACT.md`, and `docs/phase-gates.md` for the repository rules behind that posture.

## The Recipe Concept

Inputs: KPI map, raw exports, source definitions, campaign dates, baseline, target, caveats, and decision question. Steps: verify metrics; compare against baseline and target; label description, interpretation, and recommendation; identify limitations; propose next test. Outputs: performance readout, machine-readable metric log, and human-review field. Gate: no causal claim unless the evidence design supports it. Log: source files, transformations, caveats, and reviewer decisions.

The recipe should be small enough to run, explicit enough to audit, and useful enough that a teammate can maintain it after the original author leaves.

## Agentic Supervision Lens

The agent can assemble tables, find anomalies, and draft summaries. The human must decide what the numbers mean for the brand and what action follows.

Supervision has three questions:

- Scope: what exactly is the agent allowed to do?
- Approval: who decides whether the output moves forward?
- Verification: what evidence would make the output defensible?

## Evidence Boundary

Verified: raw exports, metric definitions, timestamps, source systems. Model judgment: anomaly detection, summary language, suggested next tests. Human judgment: causality, business relevance, and recommendation priority.

The boundary matters because Madison treats generated text as an artifact, not as evidence by default. A generated artifact can be useful, but it does not become trustworthy until its claims, inputs, and decisions are inspectable.

## Running Project Task

Build a performance readout from one metrics export or sample log. Include objective, metric, result, baseline, interpretation label, caveat, and next-test recommendation.

Save the artifact with the running project materials. If the evidence is thin, write that directly in the artifact instead of smoothing it out.

## Verification Checklist

- Metrics match the KPI map.
- Sources and dates are visible.
- Causal language is avoided unless warranted.
- Caveats are included near conclusions.
- The report ends with a decision or next test.

Machine conformance checks whether the files and formats are structurally acceptable. Human adequacy checks whether the work is good enough for the decision it is supposed to support.

## Human-Only Judgment Boundary

AI cannot decide whether a metric is strategically meaningful. It can calculate and summarize; it cannot own the business interpretation.

That boundary is the phase gate. AI may prepare the ground on one side of it. The accountable practitioner crosses it.

## Bridge to Next Chapter

Performance is one public signal. Chapter 15 widens the lens to media coverage, reputation, and issue routing.

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
- `recipes/intelligence-agent.md`
- `logs/intelligence-agent-reports.json`
- `logs/survey-analysis-outputs.json`
- `reports/templates/intelligence-agent.md`
- `pantry/14-campaign-performance-report_notes.md`
