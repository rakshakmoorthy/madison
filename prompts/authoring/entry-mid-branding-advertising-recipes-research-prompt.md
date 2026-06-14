# Deep Research Prompt: Entry- and Mid-Level Branding/Advertising Recipe Opportunities

## Purpose

Research the kinds of repeatable, auditable "recipes" that an entry-level or mid-level branding, advertising, marketing communications, or account strategy person would realistically create in a Mycroft/Madison system.

The goal is not to list generic AI use cases. The goal is to identify repeatable work patterns that can become Madison recipes: human-readable, agent-executable workflows with sources, gates, logs, reports, and clear human judgment points.

## Research Question

What practical recipe types should Madison support for early-career and mid-career branding/advertising practitioners, and which of those are most useful for teaching, portfolio development, and real workplace execution?

## Scope

Cover roles such as:

- Brand assistant / assistant brand manager
- Brand marketing associate
- Marketing coordinator / marketing specialist
- Advertising account coordinator / account executive
- Junior strategist / planner
- Social/content strategist
- Communications or PR associate
- Creative operations / production coordinator
- Media or campaign analyst

Include agency, in-house, nonprofit, higher-ed, startup, and small-business contexts.

## Source Requirements

Use primary or high-authority sources first:

- BLS Occupational Outlook Handbook
- O*NET task and work-activity data
- Professional associations or standards bodies where available
- Credible agency, brand, marketing, PR, and campaign-planning guides
- Representative job descriptions only as secondary evidence

Do not invent counts, rates, or market-size claims. If a claim is judgment-based, label it as a judgment.

## Analysis Tasks

1. Extract the recurring work activities for the target roles.
2. Cluster those activities into recipe families.
3. For each recipe family, identify:
   - the human user
   - the business decision supported
   - the input sources
   - the verified output
   - the human judgment gate
   - common failure modes
   - whether it is entry-level, mid-level, or both
4. Distinguish recipes that are:
   - good for classroom learning
   - good for portfolio evidence
   - good for real workplace operations
   - too risky or too senior for early-career automation
5. Map the recommendations to Madison's existing recipe surface where relevant.

## Madison Lens

Use these constraints:

- Every useful recipe must separate AI execution from human judgment.
- Every recipe must have a human-readable report and a machine-readable log.
- Evidence must trace report -> log -> recipe -> source.
- External data must be ingested, validated, and only then used.
- Model judgments must be labeled as judgments.
- Anything involving brand claims, legal risk, publication, media spend, customer data, or reputation should have a human approval gate.

## Output Format

Produce a practitioner-level Markdown report with:

1. Executive summary
2. Evidence base and source notes
3. Role/task model
4. Recipe opportunity taxonomy
5. Prioritized recipe backlog
6. Entry-level vs. mid-level split
7. Recommended Madison implementation sequence
8. Risks and anti-patterns
9. Source list

For each recommended recipe, use this compact schema:

```markdown
### Recipe: <name>

- User:
- Decision enabled:
- Inputs:
- Verified output:
- Human gate:
- Good for:
- Failure modes:
- Madison fit:
```

End with a top-10 list of recipes Madison should build or teach first.

