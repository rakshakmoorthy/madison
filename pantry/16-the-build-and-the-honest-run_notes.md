# Chapter Research Notes: The Build and the Honest Run

Generated: 2026-06-14

Corresponding proposed chapter: `chapters/16-the-build-and-the-honest-run.md`

## A. Chapter Summary from TIKTOC

**Capability built:** Integrate the Madison recipe system through a bounded, logged run.

This chapter should require one complete, bounded Madison run: choose a brand or campaign scenario, select relevant recipes, inspect sources, write logs, produce a report, name approval gates, and record unresolved risks.

## B. Conceptual Foundations

- An honest run is bounded, logged, and explicit about what failed, what is unknown, and what needs approval.
- The value of a recipe system appears when individual artifacts connect into a traceable workflow.
- A final run should produce evidence, decision support, and a maintenance trail.

## C. Domain Examples and Cases

- Run or simulate a competitor scan, brief, claim map, content calendar, QA pass, launch pack, and performance readout.
- Write a `logs/RUN_LOG.md` entry that names commands, artifacts, tests, and unresolved risks.
- Create a gate decision record that explains whether the output is approved, blocked, or needs review.

## D. Connections and Dependencies

- Integrates every prior chapter.
- Mirrors the repository's own governance model from `SNICKERDOODLE.md`.
- Provides the capstone artifact for a portfolio or workplace handoff.

## E. Current State and Teaching Considerations

**Current Madison state:** The repo already has the operational scaffolding: run logs, gate decisions, conformance checks, recipes, prompts, reports, and docs. The missing chapter should turn that scaffolding into a capstone workflow.

**Teaching considerations:** Reward candor. A run with clear gaps, failed checks, and named blockers is stronger than a shiny but unverifiable final report.

## Repo Source Map

- TIKTOC.md
- SNICKERDOODLE.md
- DOMAIN.md
- DATA_CONTRACT.md
- docs/data-and-provenance.md
- docs/workflows.md
- docs/phase-gates.md
- reports/generated/entry-mid-branding-advertising-recipes-research.md
- logs/RUN_LOG.md
- logs/gate-decisions
- docs/operations.md
- recipes/marketmind.md
- package.json

## Shared Library Sources Copied to Pantry

- pantry/_lib_ai-gigo.md
- pantry/_lib_ai-nbb-prompt-architecture-the-power-of-the-template-pattern.md
- pantry/_lib_business-data-ism-the-revolution-transforming-decision-making-consumer-behavior-and-al.md
- pantry/_lib_business-groundswell-expanded-and-revised-edition-winning-in-a-world-transformed-by-so.md
- pantry/_lib_math-how-to-measure-anything-finding-the-value-of-intangibles-in-business.md
- pantry/_lib_math-how-to-lie-with-statistics.md
- pantry/_lib_design-statistics-for-hci-making-sense-of-quantitative-data.md
- pantry/_lib_prompts-direct-response-copywriting-and-platform-content-coach.md
