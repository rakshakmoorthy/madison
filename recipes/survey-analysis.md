# survey-analysis

## Purpose

The survey-analysis workflow ingests survey responses, validates and cleans rows, prepares analysis and segmentation prompts, derives sentiment distribution and NPS, and prepares Slack, MySQL, and Grafana output contracts. This recipe preserves the imported workflow while replacing live OpenAI, Slack, MySQL, and Grafana side effects with local, auditable artifacts unless a human explicitly clears live execution.

## Inputs

| Input | Type | Source | Required? |
|---|---|---|---|
| Survey CSV | CSV rows | Published Google Sheet export, local CSV, or sample rows | Yes |
| Survey row | JSON object | Webhook payload or CSV extraction | Yes |
| Respondent fields | Text/number | `respondent_id`, `age`, `gender`, `q1_satisfaction`, `q2_easeofuse`, `q3_recommend` | Yes |
| Grafana datasource UID | Text | Grafana API or approved env var | Only for live dashboard update |
| Slack destination | Text | `#survey-analysis` in original workflow | Only for live Slack send |

## Phase Gates

1. Source gate: the original workflow JSON must exist at `data/madison-main/n8n-workflows/originals/survey-analysis/workflow.json`; verify with `test -f "data/madison-main/n8n-workflows/originals/survey-analysis/workflow.json"`. Human capacity: [TO].
2. Ingest gate: survey data must run in sample mode before live CSV or webhook use. Human capacity: [PA].
3. Data-shape gate: each row must have numeric age and survey scores before analysis. Human capacity: [IJ].
4. Model gate: live OpenAI analysis is disabled until a human approves provider, privacy, and cost boundaries; deterministic local scoring is default. Human capacity: [EI].
5. Storage gate: MySQL writes are represented as local insert rows unless live database credentials and schema are approved. Human capacity: [EI].
6. Dashboard gate: Grafana update payloads are local contracts unless a human approves live API posting and token handling. Human capacity: [EI].
7. Notification gate: Slack messages are local contracts unless a human approves live Slack send. Human capacity: [EI].
8. Report gate: every run must produce parseable logs plus a human-readable report. Human capacity: [TO].

## Steps

1. Step name: Trigger run. Labor: AI. Script called: none; conductor captures webhook or scheduled run. Input: run mode and optional payload. Output: run envelope. Where output goes: `logs/`.
2. Step name: Ingest survey CSV. Labor: AI. Script called: `scripts/ingest/survey-analysis-get-survey.py`. Input: sample rows, local CSV, or live CSV URL. Output: raw survey JSON. Where output goes: `data/raw/survey-analysis/survey-rows.json`.
3. Step name: Validate and clean rows. Labor: AI. Script called: `scripts/tools/survey-analysis-validate-clean.py`. Input: raw survey JSON. Output: clean rows and invalid rows. Where output goes: `data/verified/survey-analysis/clean-rows.json`.
4. Step name: Analyze rows. Labor: AI. Script called: `scripts/tools/survey-analysis-analyze.py`. Input: clean rows. Output: per-row sentiment, NPS, and segments. Where output goes: `data/verified/survey-analysis/analyzed-rows.json`.
5. Step name: Aggregate results. Labor: AI. Script called: `scripts/tools/survey-analysis-aggregate.py`. Input: analyzed rows. Output: sentiment distribution and average NPS. Where output goes: `data/verified/survey-analysis/aggregate.json`.
6. Step name: Prepare output contracts. Labor: AI. Script called: `scripts/tools/survey-analysis-prepare-outputs.py`. Input: aggregate and analyzed rows. Output: Slack payload, MySQL insert rows, Grafana dashboard payload, and response JSON. Where output goes: `logs/survey-analysis-outputs.json`.
7. Step name: Produce human report. Labor: AI. Script called: none; conductor fills `reports/templates/survey-analysis.md`. Input: aggregate and output contracts. Output: concise run report. Where output goes: `reports/generated/`.

## Output Contract

### Agent output

The agent log goes to `logs/survey-analysis-[DATE].json` and contains: `workflow`, `run_id`, `mode`, `rows_ingested`, `valid_rows`, `invalid-rows`, `sentiment_distribution`, `nps`, `segments`, `output_contract_path`, `flags`, `stop_conditions`, and `generated_at`.

### Human report

The human report goes to `reports/generated/survey-analysis-[DATE].md`. It states source data used, validation failures, sentiment distribution, NPS, segments, output contracts prepared, live writes avoided or approved, and human decisions needed.

## Stop Conditions

- Stop if the original JSON is missing.
- Stop if live ingest is requested before sample ingest passes.
- Stop if required survey columns are missing or cannot be normalized.
- Stop if live model calls, Slack sends, MySQL inserts, or Grafana updates are requested without explicit clearance.
- Stop if output contracts would expose credentials, bearer tokens, webhook IDs, or raw PII beyond the approved fields.
- Stop if the NPS or sentiment summary cannot be reproduced from clean rows.

## Provenance

Original workflow JSON: `data/madison-main/n8n-workflows/originals/survey-analysis/workflow.json`
