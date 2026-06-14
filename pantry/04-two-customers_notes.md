# Chapter Research Notes: Two Customers

Generated: 2026-06-14

Corresponding proposed chapter: `chapters/04-two-customers.md`

## A. Chapter Summary from TIKTOC

**Capability built:** Understand recipes as both agent contracts and human maintenance cards.

This chapter should teach the reader to design every Madison recipe for two customers: the executing agent and the human reviewer. The machine needs precise inputs, steps, outputs, schemas, and logs; the human needs purpose, evidence, caveats, decisions, and maintenance cues.

## B. Conceptual Foundations

- Machine-readable output without human judgment support becomes opaque automation.
- Human-readable prose without machine-readable structure becomes hard to rerun, compare, or audit.
- Good recipe design makes both customers legible in the same workflow.

## C. Domain Examples and Cases

- Annotate `recipes/marketmind.md` by marking agent instructions, expected outputs, evidence requirements, and human review points.
- Compare `reports/templates/content-agent.md` with `logs/content-agent-alerts.json` as two views of the same workflow.
- Use `prompts/review/review.md` to show how reviewer-facing expectations can be embedded in a prompt system.

## D. Connections and Dependencies

- Explains why later chapters ask for both tables/logs and memos/reports.
- Supports Chapter 13's launch readiness pack and Chapter 16's honest run.
- Connects to `MYCROFT.md` rules about runnable, reviewable recipes.

## E. Current State and Teaching Considerations

**Current Madison state:** The repo already carries this pattern in recipes, logs, templates, and docs. The chapter should name it as an explicit design principle so readers can apply it to their own workflows.

**Teaching considerations:** Give readers a bad recipe with only prose or only JSON and ask them to repair it for both customers.

## Repo Source Map

- TIKTOC.md
- MYCROFT.md
- DOMAIN.md
- DATA_CONTRACT.md
- docs/data-and-provenance.md
- docs/workflows.md
- docs/phase-gates.md
- reports/generated/entry-mid-branding-advertising-recipes-research.md
- recipes/marketmind.md
- recipes/content-agent.md
- reports/templates/content-agent.md
- logs/content-agent-alerts.json
- docs/operations.md

## Shared Library Sources Copied to Pantry

- pantry/_lib_ai-gigo.md
- pantry/_lib_ai-nbb-prompt-architecture-the-power-of-the-template-pattern.md
- pantry/_lib_business-data-ism-the-revolution-transforming-decision-making-consumer-behavior-and-al.md
- pantry/_lib_business-groundswell-expanded-and-revised-edition-winning-in-a-world-transformed-by-so.md
- pantry/_lib_math-how-to-measure-anything-finding-the-value-of-intangibles-in-business.md
- pantry/_lib_math-how-to-lie-with-statistics.md
- pantry/_lib_design-statistics-for-hci-making-sense-of-quantitative-data.md
- pantry/_lib_prompts-direct-response-copywriting-and-platform-content-coach.md
