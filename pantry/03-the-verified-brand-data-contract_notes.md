# Chapter Research Notes: The Verified Brand Data Contract

Generated: 2026-06-14

Corresponding proposed chapter: `chapters/03-the-verified-brand-data-contract.md`

## A. Chapter Summary from TIKTOC

**Capability built:** State what counts as evidence in Madison.

This chapter should define Madison's evidence ladder: raw inputs, verified records, generated artifacts, prompts, recipes, logs, reports, screenshots, URLs, and approval records. The reader needs to understand what can be trusted, what can be traced, and what still needs human judgment.

## B. Conceptual Foundations

- A data contract is a social and technical promise about fields, sources, allowed transformations, and uncertainty labels.
- Generated text is an artifact, not evidence by default.
- Provenance should be visible at the point of use, not hidden in a separate archive.

## C. Domain Examples and Cases

- Trace a brand claim from a report back to a log, recipe, and source.
- Compare `logs/marketmind-run.json` with `reports/templates/marketmind.md` to show machine-output and human-report boundaries.
- Use `DATA_CONTRACT.md` as the book's formal vocabulary for raw, verified, generated, and archived materials.

## D. Connections and Dependencies

- Required before Chapters 5, 8, 9, 10, 11, and 14 can work cleanly.
- Sets the evidence standard for Chapter 16's final run.
- Explains why `logs/` and `reports/` both matter.

## E. Current State and Teaching Considerations

**Current Madison state:** Madison already has a strong contract layer in `DATA_CONTRACT.md`, `docs/data-and-provenance.md`, recipes, logs, and report templates. The missing chapter should translate those governance rules into practitioner language.

**Teaching considerations:** Make students physically follow one claim across files. The desired habit is source-first thinking, not passive acceptance of a generated summary.

## Repo Source Map

- TIKTOC.md
- SNICKERDOODLE.md
- DOMAIN.md
- DATA_CONTRACT.md
- docs/data-and-provenance.md
- docs/workflows.md
- docs/phase-gates.md
- reports/generated/entry-mid-branding-advertising-recipes-research.md
- recipes/marketmind.md
- logs/marketmind-run.json
- logs/marketmind-response.json
- reports/templates/marketmind.md
- prompts/review/review.md
- docs/exercises/exercise-03-gather-validate-defend.md

## Shared Library Sources Copied to Pantry

- pantry/_lib_ai-gigo.md
- pantry/_lib_ai-nbb-prompt-architecture-the-power-of-the-template-pattern.md
- pantry/_lib_business-data-ism-the-revolution-transforming-decision-making-consumer-behavior-and-al.md
- pantry/_lib_business-groundswell-expanded-and-revised-edition-winning-in-a-world-transformed-by-so.md
- pantry/_lib_math-how-to-measure-anything-finding-the-value-of-intangibles-in-business.md
- pantry/_lib_math-how-to-lie-with-statistics.md
- pantry/_lib_design-statistics-for-hci-making-sense-of-quantitative-data.md
- pantry/_lib_prompts-direct-response-copywriting-and-platform-content-coach.md
