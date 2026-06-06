# content-agent

## Purpose

The content-agent workflow turns a marketing brief into three brand-aligned content variants, scores those variants for production readiness, produces visual concepts for approved variants, and runs a weekly Reddit engagement scan for content intelligence. This recipe preserves the imported workflow behavior while replacing live webhooks, OpenAI calls, Discord posts, and binary responses with explicit local contracts and human phase gates.

## Inputs

| Input | Type | Source | Required? |
|---|---|---|---|
| Brief payload | JSON object | Webhook body or local sample | Yes for generation |
| Brand voice | JSON object | `scripts/tools/content-agent-brand-voice.py` | Yes |
| Generation output | JSON object or text | Approved model response or sample fixture | Yes for quality check |
| Reddit search rows | JSON array | Reddit API export via `scripts/ingest/content-agent-get-reddit-posts.py` | Yes for weekly engagement scan |
| Quality threshold | Number | Local argument, default `130` | Yes |
| Alert destination | Local JSON/Markdown contract | Report tool | Yes |

## Phase Gates

1. Source gate: the original workflow JSON must exist at `data/madison-main/n8n-workflows/originals/content-agent-full-workflow.json`; verify with `test -f "data/madison-main/n8n-workflows/originals/content-agent-full-workflow.json"`. Human capacity: [TO].
2. Brief gate: a human must confirm the brief, audience, offer, reading level, taboos, and brand boundary before generation. Human capacity: [PF].
3. Model gate: live generation must not run until a human approves the prompt and model/provider boundary; sample mode is required before live mode. Human capacity: [EI].
4. Quality gate: generated output must parse as JSON and contain exactly three variants with non-empty `headline`, `body`, `cta`, and `image_prompt` fields. Human capacity: [PA].
5. Production gate: variants that fail scoring or validation go to human review; variants that pass can move to visual concepting but still require human clearance before publication. Human capacity: [IJ].
6. Reddit ingest gate: Reddit data must be captured through ingest and normalized before engagement scoring; no downstream tool should fetch external data. Human capacity: [TO].
7. Alert gate: Discord-style alerts are written as local report contracts unless a human explicitly approves live posting. Human capacity: [EI].
8. Report gate: every run must produce both a parseable log and a human-readable report. Human capacity: [TO].

## Steps

1. Step name: Receive brief. Labor: AI. Script called: none; conductor captures webhook or local payload. Input: brief JSON. Output: run envelope. Where output goes: `logs/`.
2. Step name: Apply brand voice. Labor: AI. Script called: `scripts/tools/content-agent-brand-voice.py`. Input: optional brand overrides. Output: normalized brand voice JSON. Where output goes: `data/verified/content-agent/brand-voice.json`.
3. Step name: Build generation prompt. Labor: AI. Script called: `scripts/tools/content-agent-build-prompt.py`. Input: brief plus brand voice. Output: prompt contract. Where output goes: `logs/content-agent-prompt.json`.
4. Step name: Generate variants. Labor: AI/Human-cleared model. Script called: none for live generation; sample fixture in `scripts/tools/content-agent-quality-check.py`. Input: prompt contract. Output: model response. Where output goes: `logs/`.
5. Step name: Normalize variants. Labor: AI. Script called: `scripts/tools/content-agent-quality-check.py`. Input: model response. Output: one JSON row per variant. Where output goes: `data/verified/content-agent/variants.json`.
6. Step name: Score variants. Labor: AI. Script called: `scripts/tools/content-agent-score-variants.py`. Input: normalized variants. Output: scored variants with `popper_pass` and `quality_score`. Where output goes: `data/verified/content-agent/scored-variants.json`.
7. Step name: Split review lanes. Labor: AI. Script called: `scripts/tools/content-agent-split-variants.py`. Input: scored variants. Output: approved and needs-review JSON/CSV files. Where output goes: `data/verified/content-agent/`.
8. Step name: Create visual concepts. Labor: AI. Script called: `scripts/tools/content-agent-visual-concepts.py`. Input: approved variants plus brand voice. Output: visual concept prompts. Where output goes: `data/verified/content-agent/visual-concepts.json`.
9. Step name: Ingest Reddit posts. Labor: AI. Script called: `scripts/ingest/content-agent-get-reddit-posts.py`. Input: Reddit search API, local export, or sample rows. Output: normalized post JSON. Where output goes: `data/raw/content-agent/reddit-posts.json`.
10. Step name: Compute engagement. Labor: AI. Script called: `scripts/tools/content-agent-compute-engagement.py`. Input: normalized Reddit posts. Output: scored and flagged post rows. Where output goes: `data/verified/content-agent/reddit-engagement.json`.
11. Step name: Produce alert contracts. Labor: AI. Script called: `scripts/tools/content-agent-prepare-alerts.py`. Input: scored variants and scored posts. Output: Discord-style local alert payloads. Where output goes: `logs/content-agent-alerts.json`.
12. Step name: Produce human report. Labor: AI. Script called: none; conductor fills `reports/templates/content-agent.md`. Input: prompt, variant, engagement, and alert logs. Output: concise run report. Where output goes: `reports/generated/`.

## Output Contract

### Agent output

The agent log goes to `logs/content-agent-[DATE].json` and contains: `workflow`, `run-id`, `brief-id`, `mode`, `prompt-path`, `variants-path`, `approved-count`, `needs-review-count`, `visual-concepts-path`, `reddit-posts-checked`, `flagged-posts-count`, `alert-contract-path`, `flags`, `stop-conditions`, and `generated-at`.

### Human report

The human report goes to `reports/generated/content-agent-[DATE].md`. It states what brief was processed, which variants passed or failed, what visual concepts were proposed, which Reddit posts were flagged, what human decision is needed, and where the supporting logs live.

## Stop Conditions

- Stop if the original JSON is missing or no longer matches the documented provenance path.
- Stop if a live OpenAI or Discord action is requested without human clearance.
- Stop if the generated response is not valid JSON after normalization.
- Stop if the generation output does not contain exactly three variants.
- Stop if any required variant field is empty.
- Stop if the prompt includes forbidden brand claims, taboos, or unverifiable superlatives.
- Stop if Reddit ingest fails or returns data that cannot be normalized.
- Stop if an alert would publish live without an approved destination and explicit human clearance.

## Provenance

Original workflow JSON: `data/madison-main/n8n-workflows/originals/content-agent-full-workflow.json`
