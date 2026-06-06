# marketmind - Conductor Flow

## Mode

Dialogic (default). Silent mode is not available until this flow is in `conductor/verified/`.

## Entry Point

Triggered when a human asks to test or run the marketmind product, market, and strategy analysis workflow.

## Flow Steps

### Step 1 - Confirm Scope

- Labor: Human
- Depends on: none
- Human task: Confirm sample/live mode, product name, industry, geography, scale, and whether external service calls are approved.
- Handoff condition: Scope names the market-analysis request and live-service boundary.
- On failure: Stop and ask for scope clarification.

### Step 2 - Verify Provenance

- Labor: AI
- Depends on: Step 1
- AI task: Run `test -f "data/madison-main/n8n-workflows/originals/marketmind/marketmind-run-analysis-webhook.json"` and `test -f "scripts/madison-main/marketmind/code/main.py"`.
- Handoff condition: Original workflow JSON and stored implementation both exist.
- On failure: Stop and report missing provenance or implementation.

### Step 3 - Normalize Inputs

- Labor: AI
- Depends on: Step 2
- AI task: Run `python3 scripts/tools/marketmind-normalize-inputs.py`.
- Handoff condition: `data/verified/marketmind/inputs.json` exists and parses as JSON.
- On failure: Stop and repair input payload.

### Step 4 - Human Execution Clearance

- Labor: Human
- Depends on: Step 3
- Human task: Approve sample mode or explicitly approve live execution with `OPENAI_API_KEY` and `SERPER_API_KEY` available.
- Handoff condition: A gate decision is logged in `logs/gate-decisions/`.
- On failure: Stop; do not execute live analysis.

### Step 5 - Run Analysis

- Labor: AI
- Depends on: Step 4
- AI task: Run `python3 scripts/tools/marketmind-run-analysis.py` for sample mode, or add `--live` only after explicit clearance.
- Handoff condition: `logs/marketmind-run.json` and `data/verified/marketmind/outputs/final-market-strategy-report.md` exist.
- On failure: Stop and report command output tail.

### Step 6 - Parse Final Report

- Labor: AI
- Depends on: Step 5
- AI task: Run `python3 scripts/tools/marketmind-parse-final-report.py`.
- Handoff condition: `logs/marketmind-response.json` exists and includes `final_report`.
- On failure: Stop and report missing final report.

### Step 7 - Write Human Report

- Labor: AI
- Depends on: Step 6
- AI task: Fill `reports/templates/marketmind.md` and save the completed report under `reports/generated/`.
- Handoff condition: Report links to the final report and response contract.
- On failure: Stop and report missing report fields.

## Phase Gates

Steps 1, 2, 4, 5, and 7 are hard gates. The conductor stops and waits for explicit human confirmation before proceeding past each hard gate in dialogic mode.

## Silent Mode Requirements

- At least three successful dialogic sample runs.
- At least one successful dialogic live run, if live use is desired.
- Separate human sign-off for command execution, OpenAI use, Serper use, and publication of market recommendations.
- Gate decisions logged in `logs/gate-decisions/`.
- Completed flow moved to `conductor/verified/` only after the above evidence exists.
