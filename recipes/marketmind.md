# marketmind

## Purpose

The marketmind workflow accepts a product-analysis request, normalizes market-analysis inputs, runs the stored marketmind implementation, extracts `outputs/final-market-strategy-report.md`, and returns a webhook-style JSON response. This recipe preserves the imported command flow while adding explicit phase gates around command execution, credentials, generated artifacts, and human-readable reporting.

## Inputs

| Input | Type | Source | Required? |
|---|---|---|---|
| Product name | Text | Webhook body field `product_name`; default `EcoWave Smart Bottle` | Yes |
| Industry | Text | Webhook body field `industry`; default `Consumer Goods` | Yes |
| Geography | Text | Webhook body field `geography`; default `Global` | Yes |
| Scale | Text | Webhook body field `scale`; default `SME` | Yes |
| Repository path | Path | Stored marketmind code path | Yes |
| OpenAI API key | Environment variable | `OPENAI_API_KEY` | Only for live run |
| Serper API key | Environment variable | `SERPER_API_KEY` | Only for live run |

## Phase Gates

1. Source gate: the original workflow JSON must exist at `data/madison-main/n8n-workflows/originals/marketmind/marketmind-run-analysis-webhook.json`; verify with `test -f "data/madison-main/n8n-workflows/originals/marketmind/marketmind-run-analysis-webhook.json"`. Human capacity: [TO].
2. Stored-code gate: the implementation must exist at `scripts/madison-main/marketmind/code/main.py`; verify with `test -f "scripts/madison-main/marketmind/code/main.py"`. Human capacity: [TO].
3. Input gate: product, industry, geography, and scale must be normalized before any run. Human capacity: [PF].
4. Credential gate: live runs require `OPENAI_API_KEY` and `SERPER_API_KEY`; sample mode is required before live mode. Human capacity: [EI].
5. Command-execution gate: live execution of `main.py` requires explicit human clearance because it may call external services and write outputs. Human capacity: [EI].
6. Final-report gate: `outputs/final-market-strategy-report.md` or a sample equivalent must exist before a webhook response is prepared. Human capacity: [PA].
7. Report gate: every run must produce both parseable logs and a human-readable report. Human capacity: [TO].

## Steps

1. Step name: Receive webhook payload. Labor: AI. Script called: none; conductor captures request JSON. Input: webhook body. Output: raw request envelope. Where output goes: `logs/`.
2. Step name: Normalize inputs. Labor: AI. Script called: `scripts/tools/marketmind-normalize-inputs.py`. Input: raw request JSON or sample defaults. Output: normalized run input JSON. Where output goes: `data/verified/marketmind/inputs.json`.
3. Step name: Run marketmind analysis. Labor: AI after human clearance for live mode. Script called: `scripts/tools/marketmind-run-analysis.py`. Input: normalized input JSON and mode. Output: final report markdown plus stdout-style log. Where output goes: `data/verified/marketmind/outputs/` and `logs/marketmind-run.json`.
4. Step name: Parse final report. Labor: AI. Script called: `scripts/tools/marketmind-parse-final-report.py`. Input: run log and final report path. Output: webhook-style JSON response contract. Where output goes: `logs/marketmind-response.json`.
5. Step name: Produce human report. Labor: AI. Script called: none; conductor fills `reports/templates/marketmind.md`. Input: normalized inputs, run log, and response contract. Output: concise run report. Where output goes: `reports/generated/`.

## Output Contract

### Agent output

The agent log goes to `logs/marketmind-[DATE].json` and contains: `workflow`, `run_id`, `mode`, `product_name`, `industry`, `geography`, `scale`, `repo_path`, `final_report_path`, `response_contract_path`, `success`, `flags`, `stop_conditions`, and `generated_at`.

### Human report

The human report goes to `reports/generated/marketmind-[DATE].md`. It states the requested market analysis, whether the run was sample or live, where the final report was written, what external services were required or avoided, and what human decision is needed before using the output.

## Stop Conditions

- Stop if the original workflow JSON is missing.
- Stop if stored marketmind code is missing.
- Stop if live mode is requested without explicit human clearance.
- Stop if live mode is requested without required environment variables.
- Stop if `main.py` exits nonzero or no final report is produced.
- Stop if the response contract would expose API keys, raw credentials, or full unreviewed stdout.
- Stop if the final report contains unverified claims that need human review before publication.

## Provenance

Original workflow JSON: `data/madison-main/n8n-workflows/originals/marketmind/marketmind-run-analysis-webhook.json`
