# CLI-Agnostic AI Tooling — Repo Grade

**Repository:** `madison` (a Snickerdoodle branding/marketing domain)
**Graded against:** *CLI-Agnostic AI Tooling for Local Project Workflows* — v1.0 (June 2026)
**Grade date:** 2026-06-15
**Basis:** repo inspection + the local `conformance` / `manifest-check` / `eval` gates.

## Overall: **A (≈ 94 / 100)**

Madison now matches its siblings (Mycroft, the-reallocation-engine). It implements
the guide's strongest recommendations: compile-level instruction generation (§6
level 3), the PreToolUse no-delete hook (§11), the manifest + machine-readable twin
(§4), and an enforced, drift-proof adapter set. `SNICKERDOODLE.md` is a full constitution,
stronger than the generic `PROJECT_RULES.md` the guide assumes. Of the three
siblings, Madison has the richest real surface (48 recipes, two-layer raw→verified
data that actually exists, a separate `prompts/` build system, `brand/`, student
projects).

## Section scorecard

| § | Area | Grade | Evidence / gap |
|---|------|-------|----------------|
| 3 | Directory architecture | A− | Clean canonical/transient split; `data/raw`→`data/verified`, `pantry/`, `prompts/`, `brand/`, quarantined `*/madison-main/`. `output/` singular — documented in `_MANIFEST.md`. |
| 4 | Manifest pattern | A | `_MANIFEST.md` (tiered) + `.ai/manifest.yaml` twin with `invariants`, `private`, `quarantine`, `permissions`. |
| 5 | Project rules & precedence | **A+** | `SNICKERDOODLE.md` constitution + `PROJECT_RULES.md` shim + explicit precedence. |
| 6 | One folder, many surfaces | **A+** | Compile level: `instructions/` → `AGENTS.md`, `CLAUDE.md`, `.gemini/settings.json`, `.aider.conf.yml`, `.github/copilot-instructions.md`, `.cursor/rules/madison.mdc`, all generated, with a CI drift check. (Plus a second compile system: `prompts/` → tool adapters via `build-prompts.mjs`.) |
| 7 | Ignore files / Tier-3 | A− | `.gitignore` covers generated, private (`people/`, `brand/private-reflection.md`, `logs/student-recipe-evidence/`, `.env`), and quarantined `*/madison-main/`. No per-tool ignore files (low priority). |
| 8 | Token optimization | A | Tiny `CLAUDE.md` (`@import`); concise generated files; modular instructions. |
| 9 | Session hygiene & state | A | `status.md` (frontmatter+prose) and `session-handoff.md` present and accurate. |
| 10 | Agent patterns | A | Gates, `subagent-scoping.md`, conformance/adequacy split. |
| 11 | File safety | **A+** | `no-delete.md` + `.claude/hooks/archive-guard.sh` PreToolUse deny; git checkpoints. |
| 12 | Governance & security | B+ | `permissions` block, private + quarantine policy, `.env` now gitignored, `logs/RUN_LOG.md` + `gate-decisions/` audit. Network allowlist documented not enforced; no dedicated pre-commit secret scan. |
| 13 | Templates & skills | A | Shared instruction modules + `templates/` + `prompts/` suites + recipes; size discipline. |
| 14 | Tool comparison / portability | A | Portable filesystem layer + generated adapters for the matrix tools. |
| 15 | Claude-specific mechanisms | A | Hooks, `@import`. |
| 16 | Building CLI tools | A− | Scripts use flags/exit codes/stdout-stderr (`--promote`, `--strict`, `--validate`). |
| 17 | Anti-patterns | A | Avoids all listed; quarantine keeps the vendored app from misleading agents. |
| 18 | Failure-mode catalog | A | `manifest-check.mjs` enforces drift / missing canonical / contradictions. |
| 19 | Does it help? / measurement | **B** | `eval/` harness built: 5-task suite, config matrix, deterministic scorer + aggregator. Proven on example runs (`full` beats `baseline`). Remaining for A: real cross-tool runs (agent execution is manual). |
| 20 | Build order | A | Followed. |
| 21 | Data / large files | B+ | `DATA_CONTRACT.md` + two-layer raw→verified + quarantine; `.gitignore` covers heavy/private. No dedicated size-guard hook yet (portable from the-reallocation-engine). |

## What's excellent

- **Two compile systems, both drift-guarded.** Instructions *and* prompt suites are
  generated from source; `manifest-check` + CI fail on instruction-adapter drift.
- **Real two-layer data + gate decisions.** `data/raw`→`data/verified` and
  `logs/gate-decisions/` make the constitution's claims concrete here, not roadmap.
- **Privacy taken seriously.** `people/`, `brand/private-reflection.md`, and student
  evidence are gitignored and declared private in every layer.

## To reach A+ (ranked)

1. **Run the `eval/` suite for real** (`full` vs `baseline` on your primary tool), then prune rules that don't earn their tokens (§19).
2. **Enforce governance** — a pre-commit secret scan + a real network allowlist guard (§12).
3. **Add a size-guard** `.githooks/pre-commit` (port from the-reallocation-engine) for §21 parity.

## Bottom line

`npm run verify` is green (conformance + manifest-check, zero warnings). All three
siblings — Mycroft, the-reallocation-engine, Madison — on the Snickerdoodle framework, now share the
same governance **and** the same enforced CLI-agnostic adapter discipline and §19
harness. The only remaining headroom across the set is executing the benchmark for
real.
