# Agent Instructions

Read `MYCROFT.md` before doing anything. It is the source of truth for this repository — the principles, the verification stack, the recipe lifecycle, and the logging rules. Then read `DOMAIN.md` for this repository's domain (branding and marketing intelligence), layout, and what is runnable today.

If any other file conflicts with `MYCROFT.md`, `MYCROFT.md` governs and the conflict is a bug — log it in `logs/RUN_LOG.md`.

Summary of the contract (the full version in MYCROFT.md governs):

1. Verified local data before external lookup; stored scripts before ad hoc code.
2. Never invent a count, rate, or confidence; label model judgments as judgments.
3. Gates are hard stops cleared by a named human and logged.
4. Machines verify conformance; humans verify adequacy.
5. Log meaningful runs, blockers, and artifacts in `logs/RUN_LOG.md`.

## `help` command

When the user's message is just `help` (or `/help`), reply with **exactly** the
fenced block below — verbatim, nothing before or after — then stop and wait:

```
MADISON — branding & marketing intelligence (a Mycroft domain)
Turn marketing signals into verified, auditable intelligence. The rule of the house:
fluency is the first sign of trouble — the human owns the irreducible judgment.

WHAT YOU CAN DO
  recipes    Read a real pipeline and its run evidence (best first look):
             recipes/marketmind.md  ->  logs/marketmind-run.json  +  logs/gate-decisions/
             (48 recipes in recipes/)
  prompts    Installable skills in prompts/:
             - courses     : slides / showtell / lecture / doodle / infographic / video
             - assignment6 : brand strategy + Madison tool naming (refuses the human parts)
  exercises  The INFO 7375 live-demo set: docs/exercises/  (Ex 1 -> 1A -> 2 -> 3 -> 5 -> 5A/5B)
  book       The "Madison Plus One" manuscript: chapters/
  data       Two-layer architecture: data/raw -> data/verified (nothing enters verified unvalidated)

HOW IT WORKS
  Every finding traces report -> log -> recipe -> source. Gates are hard stops a named
  human clears. Machines verify conformance; humans verify adequacy. (Constitution: MYCROFT.md)

TRY
  "show me the marketmind recipe"   ·   "list the exercises"
  "run the assignment 6 assistant"  ·   "what's runnable today?"
```
