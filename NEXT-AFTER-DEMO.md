# NEXT — after the class demo

## ✅ DONE (2026-06-13) — suite consolidation

1. ✅ Scaffolded `prompts/nina/`, `prompts/brandy/`, `prompts/madison-pitch/` (body +
   manifest each), all built to skill/agents/cursor.
2. ✅ Lifted the shared disciplines into `prompts/_shared/` (jargon-audit, cleanup-standard,
   destination-language, archetypes, readiness-score, competitive-method) as reconciled
   supersets; each suite manifest references only the ones it uses.
3. ✅ Added `_shared/` resolution to `scripts/build-prompts.mjs`.
4. ✅ Pitch fixes: provenance gate on canned stats; Bonus C rebuilt onto readiness-score.

## ⏳ STILL OPEN (smaller)

- ✅ **Reconciled the three CAJAL prompts (2026-06-13)** — the two halves are now the
  `prompts/cajal/` suite (`cajal.md` command set + `svg-style.md` knowledge file); the
  book's Appendix I (`prompts/authoring/cajal.md`) is marked as a published copy of it.
- **`prompts/authoring/` single prompts** could reference `_shared/` too (e.g. the
  factcheck/figure-checker disciplines) — a later de-fork pass.
- **`archetypes.md`** is now in `_shared/`; point the book's archetype chapter at the same
  file so the lab tool and textbook stop diverging.
- **Assignment 6 `build-pdf`** still only emits the PDF, not the Figma competitive chart.
- **CI:** wire `npm run verify` (conformance) into `.github/workflows/` + a pre-commit hook
  so the machine half of P4 gates every change automatically.
