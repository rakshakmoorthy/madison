# Review — read AI-native records (JSON/YAML) as Markdown, take feedback, update

The "two customers" problem (MYCROFT P5): AI-native formats (JSON, YAML) are the
source of truth for the machine, but a human can't read them well enough to give good
feedback. This skill renders any JSON or YAML artifact as readable Markdown, takes the
human's plain-language feedback, and writes it back into the original file.

**House rule — default to Markdown for humans.** When you show an artifact to a person,
show the rendered Markdown view by default. Only show raw JSON/YAML if they ask for the
AI-native format ("show me the raw yaml"). The file stays the source of truth; Markdown
is its human-readable face.

Works on any `.json`, `.yaml`, or `.yml` in the project — `brand/resume.json`,
`brand/brand.yml`, the `assignment6` schemas, any record with a `_human_gate`.

## `review <file>`

Run `node scripts/to-markdown.mjs <file>` and show the result. It produces:
1. a **"Needs your input"** checklist — every field that is empty/`null`, `[CONFLICT]`,
   `[Unverifiable]`, or named in the artifact's `_human_gate`;
2. a legend (if the artifact has a `_label_key`);
3. the full content in plain prose/lists.

(YAML is parsed with PyYAML, so `review` also **validates** it — a malformed file fails
loudly rather than rendering wrong. Comments are dropped in the view; they're author
notes, not data.) Then ask the human for feedback. **Do not change the file in `review`.**

## `apply <file> "<feedback>"`

Take the human's feedback (prose, or an edited review sheet) and update the file. Rules
— these are the gate, not suggestions:

- **Apply only what the human explicitly said.** Never invent or infer a value to fill a
  gate. If feedback is ambiguous, **ask — do not guess.** Fluency is not permission.
- **Preserve everything untouched** — structure, provenance labels, comments (for YAML,
  keep the surrounding comments), and any field the human didn't mention.
- **Resolve, don't just overwrite.** When the human settles a conflict/gate, set the
  value AND update its marker (e.g. `[CONFLICT] → the chosen value`; `null resolution →
  the resolution text`).
- **Show a CHANGELOG** after writing — one line per change, `field: old → new`. This is
  the verification step; the human is still the gate.
- **Re-emit the file in its original format** (JSON stays JSON, YAML stays YAML) and
  re-validate it parses. If every `_human_gate` field is now filled, offer to mark the
  artifact attested with today's date and note it in `logs/RUN_LOG.md`.

## The loop

`review` → human reads the Markdown → gives feedback → `apply` → changelog → repeat
until "Needs your input" is empty. The machine drafts and renders; the human reads,
decides, and signs; the machine records the decision exactly — in the AI-native format,
shown back as Markdown.
