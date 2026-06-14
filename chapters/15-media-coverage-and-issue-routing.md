# 15. Media Coverage and Issue Routing

## Concrete Failure or Work Scenario

A monitoring workflow finds a negative mention, a confusing product review, a press item, and a social post with rising engagement. The tempting move is to generate a response. The safer move is to route the issue.

The failure is not that AI was used. The failure is that the artifact crossed a professional boundary without evidence, ownership, or a gate. Madison's answer is not less AI. It is better division of labor.

## Capability Statement

After this chapter, you will be able to route public signals without turning monitoring into an auto-response bot.

**Assessment artifact:** Issue-routing digest.

## Why This Matters for the Reader's Role

Brand teams need speed, but public response carries reputational risk. Entry and mid-level practitioners can help by turning noisy signals into clear escalation choices.

This is the Madison posture: use AI for pattern work, structure, drafting, extraction, formatting, and completeness checks; protect the human work of judgment, verification, taste, accountability, and approval. See `MYCROFT.md`, `DATA_CONTRACT.md`, and `docs/phase-gates.md` for the repository rules behind that posture.

## The Recipe Concept

Inputs: mentions, clips, reviews, social posts, timestamps, source links, issue taxonomy, severity rules, owners, and response policy. Steps: capture sources; classify issue type; label sentiment as model judgment; assign severity; recommend route; identify response gate; draft optional holding language. Outputs: issue-routing digest and escalation list. Gate: no public response ships without human approval. Log: source, class, severity, owner, and decision.

The recipe should be small enough to run, explicit enough to audit, and useful enough that a teammate can maintain it after the original author leaves.

## Agentic Supervision Lens

The agent can monitor, cluster, classify, and summarize. The human must decide whether, how, and when the brand responds.

Supervision has three questions:

- Scope: what exactly is the agent allowed to do?
- Approval: who decides whether the output moves forward?
- Verification: what evidence would make the output defensible?

## Evidence Boundary

Verified: captured public mentions, source URLs, timestamps. Model judgment: sentiment, issue class, urgency suggestions. Human judgment: severity, stakeholder sensitivity, and response approval.

The boundary matters because Madison treats generated text as an artifact, not as evidence by default. A generated artifact can be useful, but it does not become trustworthy until its claims, inputs, and decisions are inspectable.

## Running Project Task

Create an issue-routing digest from five to ten public signals. Include source, date, issue class, sentiment label, severity, owner, recommended action, and response gate.

Save the artifact with the running project materials. If the evidence is thin, write that directly in the artifact instead of smoothing it out.

## Verification Checklist

- Every signal has a source and timestamp.
- Sentiment is labeled as model judgment.
- Severity rules are explicit.
- Owners and escalation paths are named.
- No response is treated as automatic.

Machine conformance checks whether the files and formats are structurally acceptable. Human adequacy checks whether the work is good enough for the decision it is supposed to support.

## Human-Only Judgment Boundary

AI cannot speak for the brand in a live public situation. It can prepare options for accountable people.

That boundary is the phase gate. AI may prepare the ground on one side of it. The accountable practitioner crosses it.

## Bridge to Next Chapter

The final chapter integrates the pieces into one bounded Madison run.

## Sources Used

- `TIKTOC.md`
- `MYCROFT.md`
- `DOMAIN.md`
- `DATA_CONTRACT.md`
- `docs/data-and-provenance.md`
- `docs/workflows.md`
- `docs/phase-gates.md`
- `reports/generated/entry-mid-branding-advertising-recipes-research.md`
- `recipes/brand-reputation-news-intelligence-pipeline.md`
- `recipes/madison-brand-news-reputation-monitor.md`
- `recipes/madison-brand-sentiment-monitor.md`
- `recipes/social-media-marketing-rss-monitor.md`
- `recipes/madison-category-sentiment-dashboard.md`
- `pantry/15-media-coverage-and-issue-routing_notes.md`
