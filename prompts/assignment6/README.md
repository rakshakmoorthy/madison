# Using the Assignment 6 Assistant

This skill helps you build Assignment 6 (Personal/Startup Brand Strategy + Madison
Tool Naming). It does the work a machine *should* do — drafting, structuring,
generating, ranking — and **refuses** the work only you can do: searching the
trademark register, checking domains, choosing your final name, and saying what you
actually admire. Those come back to you as `null` fields in a JSON file with an
`[Unverifiable — human …]` note. That's not the tool failing. That's the tool being
honest: **you cannot submit what you did not verify.**

Run the commands in order. Each writes a `.json` file (the facts) that the next step
and the final PDF read from.

```
foundation → competitors → names → trademark-plan → [you search Justia]
→ domain-plan → [you check domains] → decide → portfolios → build-pdf
```

---

## Step 1 — Brand foundation (Part 1A, 15 pts)

Paste:

```
foundation
```

The assistant asks personal vs. startup, then drafts your mission, purpose, vision,
values, and 3–5 UVP iterations into `brand.json`.

**Your gate:** pick the final UVP and write its justification (the `uvp.final` field
is left blank on purpose). The tool drafts; you decide which one is yours.

---

## Step 2 — Competitive positioning (Part 1B, 15 pts)

Paste:

```
competitors
```

You'll get `competitors.json` (3–5 competitors, every fact tagged `[Observed]`,
`[Inferred]`, or `[Unverifiable]`) and `positioning.json` with draft statements.

**Your gate:** confirm the competitor facts (fill `verified_by`) and choose your
positioning statement. If a fact is tagged `[Inferred]` and you can't confirm it,
fix or drop it — don't ship a guess as a fact.

---

## Step 3 — Generate names (Part 2A, 10 pts)

Paste:

```
names
```

Returns `names.json`: 10 names (5 descriptive, 5 creative), each with a rationale and
an AI first-impression score. **That score is a vibe, not a clearance** — it says
nothing about whether the name is legally or commercially available.

---

## Step 4 — Trademark search PLAN (Part 2B, 10 pts)

Paste:

```
trademark-plan
```

Returns `trademark.json` with, for your top 5 names, the Nice classes, search terms,
the Justia query URL, and what a conflict looks like. Every verdict field is left
`[Unverifiable — human searches Justia]`.

**Your gate (this is the assignment):** open each `search_url` at
trademarks.justia.com, run the search, screenshot it, and fill in `conflicts`,
`risk` (high/medium/low), and `verified_by`. The assistant **will not** guess these —
asserting a name is "clear" without searching is how people get sued.

---

## Step 5 — Domain availability PLAN (Part 2C, 10 pts)

Paste:

```
domain-plan
```

Returns `domains.json`: for your top 3 names, the `.com/.ai/.io/.app` domains to
check, plus memorability notes and alternate spellings. Each `available` is `null`.

**Your gate:** check each domain at a registrar, fill `available`, record
`verified_by`.

---

## Step 6 — Decide the final name (Part 2, final)

Paste:

```
decide
```

If your `trademark.json` and `domains.json` still have blank verdict fields, the
assistant **refuses** and tells you exactly what to finish. Once they're filled, it
ranks your finalists against the verified facts and recommends one in
`final-name.json`.

**Your gate:** make the call. You fill `selected`, `selected_by` (your name), and
`selection_rationale`. The tool recommends; you choose and sign.

---

## Step 7 — Portfolio analysis (Part 3, 20 pts)

Paste (then list your 5–8 portfolio URLs when asked):

```
portfolios
```

Returns `portfolios.json` structuring each portfolio's presentation, showcasing,
storytelling, and technical demonstration, plus a best-practices synthesis.

**Your gate:** fill `admire` and `would_change` for each — what *you* find effective
and what *you'd* change. The tool can describe a portfolio; it can't have your taste.

---

## Step 8 — Build the PDF

Paste:

```
build-pdf
```

Under the hood this runs `node scripts/assignment6-build-pdf.mjs <your-json-dir>`.
The script scans every JSON file for blank human-gate fields. **If any remain, it
refuses to build** and lists exactly what's missing (e.g. "`trademark.json` →
`results[].risk`"). When everything is verified, it assembles the submission PDF
from your JSON — in plain language, no jargon. A filled worked example (the "Aligna"
brand) lives in `examples/`, with its rendered `assignment6-aligna.pdf` to show the
target output.

Then: upload the PDF to Canvas, update your Figma board with the final name +
one-line description + the competitive chart, and paste the Figma link in your
submission comment.

---

## Why it's built this way (the point of the exercise)

This is the course thesis as a workflow. Fluency is the first sign of trouble: a
polished brand doc that *claims* a name is available is worse than no doc, because it
looks done. The assistant draws a hard line between what a machine can know
(it generated these names) and what only you can establish (this name survived a
trademark search **you** ran). The JSON files are your `data/verified` layer; the
PDF is the report. The grade rewards exactly what the gates force: real verification,
real decisions, documented.

**80/20:** spend your time on Steps 2, 4, and 6 — competitive positioning and the
verified name decision are where the points and the real-world value concentrate.
