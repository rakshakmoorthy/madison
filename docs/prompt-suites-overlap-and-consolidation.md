# Four prompt suites — overlap, and how to consolidate

You now have four command-based prompt suites for INFO 7375:

- **courses** — instructional design (slides / showtell / lecture / doodle …)
- **BRANDY** — brand communications audit (brandy / data / xls / memo / onepage)
- **Madison Pitch** — venture pitch builder (10 slides + jargon / timing / scoring / cleanup)
- **Nina** — brand identity (24 commands: intake → strategy → identity → build → finalize)

Three of them (BRANDY, Pitch, Nina) overlap heavily. Nina even labels the borrowed
parts: `/jargon` "adapted from Madison Pitch," `/polish` "adapted from Madison
Clean-Up Standard," `/ready` "adapted from SUTAMI." Adapted = forked = drift.

## The duplication map

| Shared discipline | courses | BRANDY | Pitch | Nina | Copies |
|---|:--:|:--:|:--:|:--:|:--:|
| Jargon audit (RED/YELLOW/GREEN, engine→destination) | — | partial | Bonus A + Prompts 3/4 | `/jargon` | **3** |
| Cleanup / polish (strip scaffolding, SAS titles, New Yorker pacing) | — | — | Clean-Up Standard | `/polish` | **2** |
| 0–100 readiness score (5 dimensions) | — | integrity tests | Bonus C (SUTAMI) | `/ready` | **3** |
| One-pager (Pyramid Principle exec summary) | — | `onepage` | `onepage` | `/onepager` | **3** |
| Competitive analysis | — | whole tool | Slide 7 | `/competitor` + `/positioning` | **3** |
| 12 Jungian archetypes | — | — | Slide 1 | `/n2` | **2** (+ book ch. 03) |
| Intake-first gate (ask N, then stop) | — | — | Prompt 0 | `/n1` | **2** |
| Strategic memo / spoken defense | — | `memo` | whole deck | `/present` | **3** |

Each cell is a *separately written* version of the same idea. They will diverge:
fix the jargon list in one, the other three rot. This is exactly the duplication
debt the `prompts/` refactor exists to kill — it just showed up at the suite level
instead of the file level.

## The fix uses what we already built

The `manifest.yml` + `knowledge_files` mechanism is the answer. Extract each shared
discipline into one file under `prompts/_shared/`, and have every suite's manifest
*reference* it instead of re-implementing it. The converter already inlines
knowledge files for single-file targets (cursor/agents) and bundles them for skills.

```
prompts/
  _shared/
    destination-language.md   # engine→destination table + forbidden phrases
    jargon-audit.md           # RED/YELLOW/GREEN method
    cleanup-standard.md       # SAS titles + New Yorker pacing + strip scaffolding
    archetypes.md             # the 12 Jungian archetypes + how to apply (= book ch.03)
    readiness-score.md        # the 0–100 five-dimension rubric
    competitive-method.md     # observe → label → interpret (BRANDY's spine)
  courses/      manifest.yml → []  (no shared deps)
  brandy/       manifest.yml → [competitive-method, readiness-score, onepager?]
  madison-pitch/manifest.yml → [destination-language, jargon-audit, cleanup-standard, archetypes, readiness-score]
  nina/         manifest.yml → [destination-language, jargon-audit, cleanup-standard, archetypes, readiness-score, competitive-method]
```

One source per discipline. Edit `archetypes.md` once → every suite that lists it
rebuilds correctly. `archetypes.md` can be the *same file* the book's Chapter 3
draws from — the lab tool and the textbook stop disagreeing.

## Suite relationships (they're a pipeline, not four islands)

- **Nina** builds the brand identity (foundation, voice, visual, style guide).
- **BRANDY** audits the competitors that Nina's `/competitor` names.
- **Assignment 6** consumes Nina's Part 1 (foundation + positioning) and adds the
  naming/validation block (which none of the suites do — still a gap).
- **Madison Pitch** pitches the tool, consuming Nina's archetype/UVP and BRANDY's
  competitive findings.

So the dependency runs: **Nina + BRANDY → Assignment 6 → Madison Pitch.**

## What's still missing across all four

Naming + trademark + URL validation (Assignment 6 Part 2) and portfolio analysis
(Part 3). No suite covers these. A small fifth suite — `prompts/naming/` (descriptive
+ creative generation, then a Justia/domain-check checklist) — would close the
Assignment 6 gap cleanly.

## Recommendation

1. Stand up `brandy/`, `madison-pitch/`, and `nina/` as suites in `prompts/`
   alongside `courses/`.
2. Extract the eight shared disciplines into `prompts/_shared/` and point each
   manifest at the ones it needs (de-fork the adapted copies).
3. Add `knowledge_files` resolution from `_shared/` to `build-prompts.mjs` (it
   currently reads knowledge files from the suite's own dir only).
4. Optionally add `prompts/naming/` to close the Assignment 6 Part 2 gap.
