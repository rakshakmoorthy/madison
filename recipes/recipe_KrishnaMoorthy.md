# Threadline

> Standardized from `recipes/recipe_KrishnaMoorthy.md` on 2026-06-18. Origin: spec-first
> (Conductor Brief). This file is a non-destructive rewrite — the original is unchanged.
> Inline `[TODO]` items mark every place the recipe cannot yet support script generation
> or a developer build without guessing. Path note: the human report is standardized to
> `reports/generated/` per `DATA_CONTRACT.md`; data paths are namespaced under
> `data/{raw,verified}/threadline/`. Both are changes from the original `logs/reports/...`
> layout and are flagged where they occur.

Version: 1.0 | Last run: 2026-06-18 | Run frequency: On demand (per research cycle)

## Purpose

Threadline identifies the specific functional garment needs of patients with conditions
like post-mastectomy breast cancer recovery, arthritis, ostomy, and diabetes that no
adaptive clothing product currently serves — and finds where separate conditions share a
single functional requirement that one product could address. It collects real consumer
language from condition-specific Reddit communities and verified Amazon adaptive-garment
reviews, validates that data against strict quality gates, and uses Claude to generate four
condition-specific functional personas (post-mastectomy survivor, older woman with
arthritis, working adult with diabetes using an insulin pump or CGM, and a person with an
ostomy). It then runs a cross-condition overlap analysis to find shared functional
requirements across conditions. A successful run produces two outputs grounded in cited
source language with no fabricated clinical detail: a human-readable market intelligence
report and a structured JSON file. The reader is the adaptive clothing product strategist,
product lead, or founder accountable for choosing the next adaptive garment to develop.

## Inputs

| Input | Type | Source | Required? |
|---|---|---|---|
| Reddit community posts | CSV | Public posts/comments from r/breastcancer, r/ostomy, r/Thritis, r/rheumatoid, and diabetes community subreddit(s) `[TODO: DATA SOURCE]` (see Step 1.1) | Yes |
| Amazon adaptive-garment reviews | CSV | Reviews from target ASINs B078HMR63H, B0CWYYLZMN, B0BTP8XR7S, B0DC4X5Y28 (Amazon product review pages) | Yes |

Fields per Reddit record: `post_id, subreddit, post_date, body_text, word_count`.
Fields per Amazon record: `asin, rating, verified_purchase, date, product_category, review_title, review_text, word_count`.

## Phase Gates

1. **Source reality gate.** What must be true: the raw pull contains genuine community and
   commerce text — each Reddit record carries subreddit/post_id/date/body_text, each Amazon
   record carries rating/verified_purchase/product_category/review_text — and a human
   spot-check of 10 random records recognizes each as a real person discussing a garment or
   a real product review (not a bot, ad, or navigation fragment). Raw volume is high enough
   that filtering to clothing-relevant records still leaves a usable set.
   Test: `snickerdoodle gate threadline --gate 1 --decision approve --note "..."` after
   `wc -l data/raw/threadline/reddit-raw/*.csv data/raw/threadline/amazon-raw/*.csv`
   returns non-zero counts for both sources AND the human reads 10 random records per source.
   Human capacity: **[IJ]**.
   Response if bad: hard stop — a near-empty or junk pull means collection failed; no
   amount of cleaning fixes a broken source.

2. **Validation quality gate.** What must be true: every record in `data/verified/`
   meets its source quality standard (Reddit 20+ words, dated 2023+, references
   clothing/dressing; Amazon verified purchase, 15+ words, mapped product category); no
   duplicate IDs survive; the reject log shows in/passed/rejected counts with a reason per
   rejected record.
   Test: `snickerdoodle gate threadline --gate 2 ...` after verifying
   `(rows_in - rows_out) == reject_log_rows` for each source and that the verified set is
   large enough to represent each condition (conductor judgment on representativeness).
   Human capacity: **[IJ]**.
   Response if bad: flag for review — some rejection is healthy; the conductor decides
   whether the surviving set is representative or the filter logic is broken.

3. **Technical-completion + volume gate.** What must be true: all collection and validation
   scripts complete without error; both sources clear the minimum thresholds; pipeline
   advances to Layer 3 with both sources intact.
   Test: `snickerdoodle gate threadline --gate 3 ...` after confirming the run log shows no
   unhandled errors / auth failures / rate-limit blocks AND record counts clear the
   thresholds below.
   - Total per-source threshold: **25+ records per source** (defined).
   - `[TODO: DEFINE]` Minimum **per-condition** record threshold — only the total-per-source
     floor of 25 exists; the gate cannot enforce per-condition representativeness without a
     per-condition value. Recommended standard from the original draft, pending conductor
     confirmation: **5 records per condition = absolute floor** (below this, Claude will
     hallucinate to fill gaps), **10 records per condition = target** for a credible
     persona. Reference counts from the current cycle: r/breastcancer 18 (✓),
     r/ostomy 5 (at floor), r/rheumatoid 2 (✗ below floor — rheumatoid persona must be
     flagged thin). Conductor must confirm the floor/target before this gate can be scripted.
   Human capacity: **[PF]**.
   Response if bad: hard stop — diagnose and fix the technical failure; log error type,
   source affected, and time of failure.

4. **Persona integrity gate.** What must be true: output is exactly four personas; each
   carries all required functional fields (condition + treatment stage, surgical site if
   relevant, mobility level, sensory profile, dexterity, current workaround, price paid,
   specific garment requirement); each states a population size with a cited figure; every
   key functional claim traces to real source language; no invented clinical detail.
   Test: `snickerdoodle gate threadline --gate 4 ...` after confirming the persona JSON
   contains exactly 4 records, each with all required fields populated, and a human has
   traced each functional claim back to a source record.
   Human capacity: **[TO]**.
   Response if bad: hard stop — reject and regenerate; log what was fabricated. A persona
   that invents clinical detail is unsafe near medical content.

5. **Overlap grounding gate.** What must be true: each overlap cluster names ≥2 conditions
   that *each independently* show the shared functional requirement in their own source
   language; each cluster names the conditions covered and the combined population.
   Test: `snickerdoodle gate threadline --gate 5 ...` after confirming every cluster cites
   source language from each condition it names (no condition appears in a cluster without
   its own evidence).
   Human capacity: **[EI]**.
   Response if bad: flag for review — a forced overlap is the most seductive error because
   it produces an attractive market opportunity that isn't real.

6. **Output-agreement gate.** What must be true: the human report and the JSON agree; the
   report names the opportunity, the personas, how many people share the need, what they
   currently pay, where products fail, and the shared-requirement clusters; the JSON is
   machine-parseable with one record per persona plus clusters; neither output makes a
   medical claim or treatment recommendation.
   Test: `snickerdoodle gate threadline --gate 6 ...` after a field-level diff confirms
   every population figure / persona claim in the report exists in the JSON and vice versa,
   and a scan confirms no medical/treatment claim.
   Human capacity: **[TO]**.
   Response if bad: hard stop — the report does not ship until the contradiction, claim, or
   vagueness is fixed.

## Steps

### Layer 1 — External sources → `data/raw/threadline/`

1. **Reddit community data collection.** Labor: AI (currently Human — manual collection
   this cycle).
   Script called: `scripts/ingest/threadline-reddit-collect.py`
   Input: subreddits r/breastcancer, r/ostomy, r/Thritis, r/rheumatoid, and diabetes
   community subreddit(s); search terms: clothing, bra, dressing, shirt, getting dressed,
   drain, front closure, zipper, buttons, adaptive, port access.
   Output fields: `post_id, subreddit, post_date, body_text, word_count`.
   Where output goes: `data/raw/threadline/reddit-raw/reddit_raw_[DATE].csv`.
   - `[TODO: DATA SOURCE]` Collection is **manual** this cycle. Automation needs Reddit API
     access or an approved third-party data source. Until closed, the ingest script runs in
     `--sample` against a fixture CSV only; live collection is repeatable manually (same
     subreddits, terms, fields).
   - `[TODO: DATA SOURCE]` **Diabetes data is thin** and the specific diabetes subreddit(s)
     are unnamed (the recipe says "diabetes communities" without naming them, e.g. r/diabetes,
     r/diabetes_t1, r/Type1Diabetes). Name the exact communities and run a collection cycle
     focused on diabetes garment language (insulin-pump wearability, CGM patch interference)
     before the diabetes persona can be validated. Flag the diabetes persona as **thin**
     until closed.

2. **Amazon adaptive-clothing review collection.** Labor: AI (currently Human — manual
   collection this cycle).
   Script called: `scripts/ingest/threadline-amazon-collect.py`
   Input: target ASINs B078HMR63H (zip-front post-surgery bra), B0CWYYLZMN (mastectomy drain
   pocket shirt), B0BTP8XR7S (post-surgical front-closure bra), B0DC4X5Y28 (ostomy belt
   cover); categories: front-closure bras, post-surgery bras, post-mastectomy drain-pocket
   shirts, ostomy management garments.
   Output fields: `asin, rating, verified_purchase, date, product_category, review_title, review_text, word_count`.
   Where output goes: `data/raw/threadline/amazon-raw/amazon_raw_[DATE].csv`.
   - `[TODO: APPROVE]` **Live collection sign-off.** A live run fetching Reddit and Amazon
     content is an external action against third-party sites. The conductor must approve
     automated live collection (rate-safety, terms-of-service, source-allowed check) before
     `--no-sample`. Sample mode uses fixtures and needs no approval. (Covers Steps 1–2.)

### Layer 2 — `data/raw/threadline/` → `data/verified/threadline/`

3. **Reddit GIGO validation.** Labor: AI.
   Script called: `scripts/gigo/threadline-reddit-gigo.py`
   Input: `data/raw/threadline/reddit-raw/`. PASS (all true): subreddit in the allowed list;
   `post_date` 2023+; `post_id` stable and non-duplicate; `word_count >= 20`; `body_text`
   references clothing/dressing/garment struggle.
   Output: `data/verified/threadline/reddit-community-posts/reddit_verified.csv`.
   Rejects: `data/raw/threadline/rejected/reddit_rejected_[DATE].csv` (reason per record).
   Where output goes: `data/verified/threadline/`.
   - `[TODO: DEFINE]` The PASS subreddit allowlist names only r/breastcancer, r/ostomy,
     r/Thritis, r/rheumatoid — **diabetes subreddit(s) are absent**, so every diabetes
     record would be rejected here, silently dropping a condition the pipeline promises four
     personas for. Add the confirmed diabetes community subreddit(s) (see Step 1's DATA
     SOURCE) to the allowlist before this script can be generated correctly.

4. **Amazon GIGO validation.** Labor: AI.
   Script called: `scripts/gigo/threadline-amazon-gigo.py`
   Input: `data/raw/threadline/amazon-raw/`. PASS (all true): `rating` present (1–5);
   `verified_purchase` is True; `product_category` present and maps to an adaptive garment
   type; `date` 2023+; `word_count >= 15`.
   Output: `data/verified/threadline/amazon-adaptive-reviews/amazon_verified.csv`.
   Rejects: `data/raw/threadline/rejected/amazon_rejected_[DATE].csv` (reason per record).
   Where output goes: `data/verified/threadline/`.

### Layer 3 — Tool / AI processing

5. **Per-condition record aggregation.** Labor: AI.
   Script called: `scripts/tools/threadline-aggregate.py`
   Input: verified Reddit + Amazon CSVs. Group by condition: post-mastectomy
   (r/breastcancer + bra/shirt reviews); arthritis (r/Thritis + r/rheumatoid + relevant
   reviews); diabetes (diabetes communities + relevant reviews); ostomy (r/ostomy + ostomy
   garment reviews). Produce one aggregated text block per condition.
   Output: `data/verified/threadline/aggregated/[condition]_input_[DATE].txt` (one per condition).
   Where output goes: `data/verified/threadline/`.
   - `[TODO: DEV]` The aggregation script **does not exist** — aggregation is manual only.
     Specify before a script can be generated: (a) the condition-tag mapping from
     `subreddit`/`product_category` to one of {post-mastectomy, arthritis, diabetes, ostomy};
     (b) the input schema it reads (verified CSV columns); (c) the output format (concatenated
     `body_text`/`review_text` per condition into one `.txt`, with what record delimiter and
     whether source IDs are retained for traceability); (d) behavior when a condition is
     below the per-condition floor (skip, or emit with a thin-flag). Blocking: this step gates
     the entire Layer 3 → Layer 4 chain — no aggregation means no persona input.

6. **Claude persona generation (four conditions).** Labor: AI with Human gate.
   Script called: `scripts/tools/threadline-persona-generate.py`
   Model: `claude-sonnet-4-6` (chosen for instruction-following precision and grounding
   output in provided source text without inventing clinical detail).
   Input: per-condition aggregated `.txt` files. Prompt (per condition): "Based solely on
   the following real posts and reviews from people with [condition], generate one functional
   persona. Include: condition and treatment stage, surgical site if relevant, mobility
   level, sensory profile, dexterity level, current workaround, price paid for workaround,
   and the specific garment requirement. State the population size this persona represents
   with a cited source. Do not invent any clinical detail. Do not include any diagnosis or
   demographic not supported by the source text."
   Output: `data/verified/threadline/personas/[condition]_persona_[DATE].json` (one per condition).
   Where output goes: `data/verified/threadline/`.
   - `[TODO: APPROVE]` **Persona output review.** After the four personas generate, the
     conductor must explicitly sign off on each before it advances to Step 7. Approval means:
     every functional claim traces to a real source record, no clinical detail was invented,
     and the garment requirement is specific enough to drive a product decision. The pipeline
     does not advance to overlap analysis without written sign-off on all four.

7. **Cross-condition overlap analysis.** Labor: AI.
   Script called: `scripts/tools/threadline-overlap.py`
   Model: `claude-sonnet-4-6`.
   Input: all four persona JSON files. Prompt: "Given these four personas, identify where two
   or more conditions share the same specific functional garment requirement. For each overlap
   cluster, name: the conditions it covers, the shared requirement, the combined population it
   represents, and cite the source language from each condition that independently supports
   the grouping. Do not group conditions unless each has its own source evidence for the
   shared need."
   Output: `data/verified/threadline/overlap/overlap_clusters_[DATE].json`.
   Where output goes: `data/verified/threadline/`.

### Layer 4 — Verified data → user

8. **Human-readable market intelligence report.** Labor: AI with Human gate.
   Script called: `scripts/tools/threadline-report.py`
   Input: four validated personas + verified overlap clusters. Sections: (1) executive
   summary — the product opportunity, who it serves, how many people; (2) four persona
   summaries with functional fields; (3) cross-condition overlap clusters with combined
   population figures; (4) current workarounds and prices paid; (5) where existing products
   fail.
   Output: `reports/generated/threadline-[DATE].md` (standardized from the original
   `logs/reports/threadline_report_[DATE].md` per `DATA_CONTRACT.md`).
   Where output goes: `reports/generated/`.
   - `[TODO: REPORT FIELD]` Every population figure in the report must carry its source
     citation before the report is user-facing — sourced from published epidemiological data
     (breast-cancer survivor counts, arthritis prevalence, ostomy and diabetes population
     estimates). A figure without a traceable source is not acceptable in a product brief.
     Citations must be verified and inserted before the report ships.

9. **Structured JSON output.** Labor: AI.
   Script called: `scripts/tools/threadline-export-json.py`
   Input: persona JSON + overlap JSON. Export: `threadline-personas-[DATE].json` (one record
   per persona, all functional fields as typed data) and `threadline-overlap-[DATE].json`
   (one record per cluster: conditions array, combined population, source citations). Both
   must agree with the human report — any discrepancy is a hard stop (Gate 6).
   Output: `reports/generated/threadline-personas-[DATE].json`, `reports/generated/threadline-overlap-[DATE].json`.
   Where output goes: `reports/generated/`.

## Output Contract

### Agent output
File: `logs/threadline-[DATE].json`
Fields: `workflow, run_id, mode, steps_completed, records_seen, rejects, duplicates, flags,
stop_conditions, generated_at` — plus pipeline-specific: `records_per_condition` (object
keyed by condition), `personas_generated` (int, expected 4), `overlap_clusters` (int).

### Human report
File: `reports/generated/threadline-[DATE].md`
Reader: adaptive clothing product strategist / product lead / founder.
Decision enabled: which adaptive garment to develop next — specifically, whether to build a
single product against a cross-condition shared requirement versus a single-condition product.
Sections: (1) executive summary / opportunity; (2) four persona summaries; (3) cross-condition
overlap clusters with combined population; (4) current workarounds and prices paid; (5) where
existing products fail.

## Stop Conditions

- Stop if a source returns near-empty or junk (bot/ad/navigation) records when it should
  return hundreds — collection failed and cleaning cannot repair a broken source (Gate 1).
- Stop if a collection or validation script throws an unhandled error, or a source returns
  zero records from auth failure / rate-limit / expiry, leaving an incomplete data set
  (Gate 3).
- Stop if any condition falls below the per-condition record floor — the resulting persona
  will be unrepresentative and the model will hallucinate to fill gaps (Gate 3;
  blocked by the `[TODO: DEFINE]` threshold).
- Stop if persona output is not exactly four personas, or any persona contains a functional
  claim (surgical detail, price, garment need) that no source record supports — fabrication
  near medical content is unsafe (Gate 4).
- Stop if an overlap cluster groups conditions without independent source evidence from each
  — a commercially attractive but ungrounded grouping (Gate 5).
- Stop if the report and JSON disagree on any figure or claim, or if the report makes a
  medical/treatment claim, or states a population figure with no traceable source (Gate 6).

## Snickerdoodle

### Run Commands
Full dialogic run: `snickerdoodle run threadline --mode dialogic`
Sample mode (no live network calls, no writes): `snickerdoodle run threadline --mode dialogic --sample`

### Step Commands

| Step | CLI Command | Flags |
|---|---|---|
| 1 Reddit collection | `snickerdoodle run threadline --step reddit-collect` | `--sample` `--no-write` |
| 2 Amazon collection | `snickerdoodle run threadline --step amazon-collect` | `--sample` `--no-write` |
| 3 Reddit GIGO | `snickerdoodle run threadline --step reddit-gigo` | `--no-write` |
| 4 Amazon GIGO | `snickerdoodle run threadline --step amazon-gigo` | `--no-write` |
| 5 Aggregation | `snickerdoodle run threadline --step aggregate` | `--no-write` |
| 6 Persona generation | `snickerdoodle run threadline --step persona-generate` | `--no-write` |
| 7 Overlap analysis | `snickerdoodle run threadline --step overlap` | `--no-write` |
| 8 Report generation | `snickerdoodle run threadline --step report` | `--no-write` |
| 9 JSON export | `snickerdoodle run threadline --step export-json` | `--no-write` |

### Gate Commands

| Gate | CLI Command |
|---|---|
| Gate 1 — Source reality | `snickerdoodle gate threadline --gate 1 --decision approve --note "..."` |
| Gate 2 — Validation quality | `snickerdoodle gate threadline --gate 2 --decision approve --note "..."` |
| Gate 3 — Technical + volume | `snickerdoodle gate threadline --gate 3 --decision approve --note "..."` |
| Gate 4 — Persona integrity | `snickerdoodle gate threadline --gate 4 --decision approve --note "..."` |
| Gate 5 — Overlap grounding | `snickerdoodle gate threadline --gate 5 --decision approve --note "..."` |
| Gate 6 — Output agreement | `snickerdoodle gate threadline --gate 6 --decision approve --note "..."` |

### Script Locations

| Step | Script Path | Layer |
|---|---|---|
| Reddit collection | `scripts/ingest/threadline-reddit-collect.py` | ingest |
| Amazon collection | `scripts/ingest/threadline-amazon-collect.py` | ingest |
| Reddit GIGO | `scripts/gigo/threadline-reddit-gigo.py` | gigo |
| Amazon GIGO | `scripts/gigo/threadline-amazon-gigo.py` | gigo |
| Aggregation | `scripts/tools/threadline-aggregate.py` | tool |
| Persona generation | `scripts/tools/threadline-persona-generate.py` | tool |
| Overlap analysis | `scripts/tools/threadline-overlap.py` | tool |
| Report generation | `scripts/tools/threadline-report.py` | tool |
| JSON export | `scripts/tools/threadline-export-json.py` | tool |

### Output Locations

| Output | Path | Format |
|---|---|---|
| Raw ingest | `data/raw/threadline/` | CSV |
| Rejected records | `data/raw/threadline/rejected/` | CSV |
| Verified data | `data/verified/threadline/` | CSV |
| Aggregated per-condition input | `data/verified/threadline/aggregated/` | TXT |
| Persona / overlap intermediates | `data/verified/threadline/{personas,overlap}/` | JSON |
| Agent log | `logs/threadline-[DATE].json` | JSON |
| Human report | `reports/generated/threadline-[DATE].md` | Markdown |
| Structured export | `reports/generated/threadline-{personas,overlap}-[DATE].json` | JSON |
| Gate decisions | `logs/gate-decisions/` | JSON |

## Conductor Note

This pipeline surfaces real functional garment needs from patient communities, but persona
quality is directly proportional to the specificity of the source records — a cycle with
mostly emotional-support posts and few garment-specific discussions produces vague personas
regardless of model quality. If persona output looks thin or generic after Layer 3, the fix
is upstream: return to Layer 1 and collect more garment-specific records before regenerating.
Do not try to fix vague personas by re-prompting Claude; fix the data first. Reddit volume
varies sharply by condition — breast-cancer communities produce far more garment-specific
posts than ostomy or rheumatoid communities — so always check per-condition record counts
before approving Gate 2, not just the total.
