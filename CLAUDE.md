@MYCROFT.md

# Claude Instructions

`MYCROFT.md` is the source of truth for this repository; `DOMAIN.md` describes this repository's domain (branding and marketing intelligence) and what is runnable today. Read both before doing anything. If any file here conflicts with MYCROFT.md, MYCROFT.md governs and the conflict is a bug — log it in `logs/RUN_LOG.md`.

Claude-specific notes:

- Use lowercase `scripts/`; never create `SCRIPTS/`.
- Keep manuscript content in `chapters/`; no scripts or data there.
- **Default to Markdown for humans.** AI-native formats (JSON, YAML) are the source of truth for the machine, but when showing an artifact to a person, render the Markdown view (`scripts/to-markdown.mjs` / the `review` skill) by default. Show raw JSON/YAML only when asked.
- Before reporting completion, state: files changed; scripts or data checked; tests, builds, or searches run; unverified assumptions and remaining risks.

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
