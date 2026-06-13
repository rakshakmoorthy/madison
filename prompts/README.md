# prompts

CLI-agnostic prompt sets — the **source of truth** for prompt-based
functionality. Plain Markdown any tool or human can read, paste, or compile.

This is the home for prompts; `scripts/` is for executable code, `recipes/` is
for audited data pipelines. A prompt that *authors* or *instructs* belongs here,
not in `scripts/`.

## Two shapes

- **Single prompts** — one `.md` file (e.g. `factcheck-prompt.md`,
  `draft-all-chapters.md`, `scan-books.md`). Paste into any tool.
- **Command suites** — a subdirectory with a `manifest.yml`, a body file, and
  any knowledge files (e.g. `courses/`). Compiled into tool-native adapters by
  `scripts/build-prompts.mjs`.

## Source vs. adapter

The prompt body + knowledge files are the **tested rules**. A `SKILL.md`,
`AGENTS.md` block, or Cursor rule is a **generated adapter** — never edit those
by hand; edit the source and rebuild:

```bash
node scripts/build-prompts.mjs courses
```

The `manifest.yml` carries packaging/triggering metadata as a superset: each
target reads the fields it understands and ignores the rest. Adding metadata
never changes what the rules say — only whether and how a given CLI surfaces
them. If a target needs a field that's missing, the build stops and asks.

Generated output lands in `<suite>/.build/` and is git-ignored.
