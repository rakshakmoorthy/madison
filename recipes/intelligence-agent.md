# intelligence-agent

## Purpose

The intelligence-agent monitors brand, competitor, Reddit, and regulatory signals for Apple and adjacent technology brands. It normalizes source items, deduplicates them against prior state, applies local sentiment and compliance-risk analysis, computes drift and anomaly metrics, builds knowledge graph and competitor summaries, and emits local report contracts in place of live Google Sheets writes or webhook responses.

## Inputs

| Input | Type | Source | Required? |
|---|---|---|---|
| Brand config | JSON array | `scripts/tools/intelligence-agent-config.py` | Yes |
| Apple press items | RSS/JSON rows | `scripts/ingest/intelligence-agent-get-news.py` | Yes |
| Google News items | RSS/JSON rows | `scripts/ingest/intelligence-agent-get-news.py` | Yes |
| Reddit posts | JSON rows | `scripts/ingest/intelligence-agent-get-reddit.py` | Yes |
| Regulatory items | RSS/JSON rows | `scripts/ingest/intelligence-agent-get-regulatory.py` | Yes |
| Prior processed links/articles | JSON rows | `scripts/ingest/intelligence-agent-get-prior-state.py` | Yes for dedupe |
| Human-cleared analysis scope | Text/JSON | Conductor gate | Yes before live ingest or model use |

## Phase Gates

1. Source gate: the original workflow JSON must exist at `data/madison-main/n8n-workflows/originals/intelligence-agent/workflow.json`; verify with `test -f "data/madison-main/n8n-workflows/originals/intelligence-agent/workflow.json"`. Human capacity: [TO].
2. Live ingest gate: Apple, Google News, Reddit, and regulatory fetches must run in sample mode before any live network fetch. Human capacity: [PA].
3. Prior-state gate: dedupe must compare current items against prior processed links/articles before analysis. Human capacity: [IJ].
4. Model gate: live OpenAI sentiment is not available until a human approves provider, prompt, privacy, and cost boundary; local heuristic sentiment is the default. Human capacity: [EI].
5. Compliance gate: regulatory risk outputs are decision support only and require human review before compliance action. Human capacity: [IJ].
6. Alert gate: critical-alert payloads are local report contracts unless a human explicitly approves live alerting. Human capacity: [EI].
7. Report gate: every run must produce parseable logs plus a human-readable report. Human capacity: [TO].

## Steps

1. Step name: Load monitoring config. Labor: AI. Script called: `scripts/tools/intelligence-agent-config.py`. Input: optional brand overrides. Output: brand and regulatory config. Where output goes: `data/verified/intelligence-agent/config.json`.
2. Step name: Ingest brand news. Labor: AI. Script called: `scripts/ingest/intelligence-agent-get-news.py`. Input: sample rows, RSS export, or live source. Output: normalized brand news rows. Where output goes: `data/raw/intelligence-agent/news.json`.
3. Step name: Ingest Reddit posts. Labor: AI. Script called: `scripts/ingest/intelligence-agent-get-reddit.py`. Input: sample rows, Reddit export, or live source. Output: normalized Reddit rows. Where output goes: `data/raw/intelligence-agent/reddit.json`.
4. Step name: Ingest regulatory news. Labor: AI. Script called: `scripts/ingest/intelligence-agent-get-regulatory.py`. Input: sample rows, RSS export, or live source. Output: normalized regulatory rows. Where output goes: `data/raw/intelligence-agent/regulatory.json`.
5. Step name: Ingest prior state. Labor: AI. Script called: `scripts/ingest/intelligence-agent-get-prior-state.py`. Input: sample rows or sheet export. Output: normalized prior links and articles. Where output goes: `data/raw/intelligence-agent/prior-state.json`.
6. Step name: Deduplicate source items. Labor: AI. Script called: `scripts/tools/intelligence-agent-deduplicate.py`. Input: news, Reddit, regulatory, and prior-state JSON. Output: new item rows. Where output goes: `data/verified/intelligence-agent/new-items.json`.
7. Step name: Analyze sentiment and compliance risk. Labor: AI. Script called: `scripts/tools/intelligence-agent-analyze.py`. Input: new item rows. Output: analyzed article rows. Where output goes: `data/verified/intelligence-agent/analyzed-items.json`.
8. Step name: Compute metrics and anomalies. Labor: AI. Script called: `scripts/tools/intelligence-agent-metrics.py`. Input: analyzed item rows and optional prior metrics. Output: drift metrics and anomaly payload. Where output goes: `data/verified/intelligence-agent/metrics.json`.
9. Step name: Build knowledge graph. Labor: AI. Script called: `scripts/tools/intelligence-agent-knowledge-graph.py`. Input: analyzed item rows. Output: entity and relationship graph. Where output goes: `data/verified/intelligence-agent/knowledge-graph.json`.
10. Step name: Build competitor analysis. Labor: AI. Script called: `scripts/tools/intelligence-agent-competitor-analysis.py`. Input: analyzed item rows. Output: share-of-voice and sentiment ranking. Where output goes: `data/verified/intelligence-agent/competitor-analysis.json`.
11. Step name: Format report contracts. Labor: AI. Script called: `scripts/tools/intelligence-agent-format-reports.py`. Input: analyzed rows, metrics, knowledge graph, and competitor analysis. Output: sheet-style rows, alert payload, and webhook response JSON. Where output goes: `logs/intelligence-agent-reports.json`.
12. Step name: Produce human report. Labor: AI. Script called: none; conductor fills `reports/templates/intelligence-agent.md`. Input: all logs and verified outputs. Output: concise run report. Where output goes: `reports/generated/`.

## Output Contract

### Agent output

The agent log goes to `logs/intelligence-agent-[DATE].json` and contains: `workflow`, `run_id`, `mode`, `source_counts`, `new_item_count`, `analyzed_item_count`, `metrics_path`, `knowledge-graph_path`, `competitor-analysis_path`, `alert_contract_path`, `flags`, `stop_conditions`, and `generated_at`.

### Human report

The human report goes to `reports/generated/intelligence-agent-[DATE].md`. It names sources checked, new items detected, sentiment and compliance risks, drift/anomaly alerts, competitor ranking, graph highlights, human decisions needed, and links to machine-readable outputs.

## Stop Conditions

- Stop if the original JSON is missing.
- Stop if live ingest is requested before sample ingest passes.
- Stop if source items cannot be normalized to title/link/source/fullText rows.
- Stop if dedupe cannot access prior-state data or a human-approved fallback.
- Stop if live OpenAI sentiment is requested without human clearance.
- Stop if regulatory risk is used as final compliance advice without human review.
- Stop if alert payloads would post live without explicit clearance.

## Provenance

Original workflow JSON: `data/madison-main/n8n-workflows/originals/intelligence-agent/workflow.json`
