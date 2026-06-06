# survey-analysis - Conductor Flow

## Mode

Dialogic (default). Silent mode is not available until this flow is in `conductor/verified/`.

## Entry Point

Triggered when a human asks to test or run the Madison survey analysis workflow from webhook data, scheduled CSV ingest, or a local sample.

## Flow Steps

### Step 1 - Confirm Scope

- Labor: Human
- Depends on: none
- Human task: Confirm sample/live mode, source CSV or webhook payload, and whether Slack, MySQL, Grafana, or model calls may go live.
- Handoff condition: Scope states data source, privacy boundary, and approved outputs.
- On failure: Stop and ask for scope clarification.

### Step 2 - Verify Provenance

- Labor: AI
- Depends on: Step 1
- AI task: Run `test -f "data/madison-main/n8n-workflows/originals/survey-analysis/workflow.json"`.
- Handoff condition: Original JSON exists at the documented path.
- On failure: Stop and report missing provenance.

### Step 3 - Ingest Survey Rows

- Labor: AI
- Depends on: Step 2
- AI task: Run `python3 scripts/ingest/survey-analysis-get-survey.py --sample` for dry run, or run with an approved CSV source.
- Handoff condition: `data/raw/survey-analysis/survey-rows.json` exists and parses as JSON.
- On failure: Stop and ask for source repair.

### Step 4 - Validate And Clean

- Labor: AI
- Depends on: Step 3
- AI task: Run `python3 scripts/tools/survey-analysis-validate-clean.py`.
- Handoff condition: Clean and invalid row files exist; invalid rows are reported.
- On failure: Stop and repair survey shape.

### Step 5 - Human Data Clearance

- Labor: Human
- Depends on: Step 4
- Human task: Review invalid rows, PII boundary, and whether local deterministic analysis is sufficient.
- Handoff condition: Gate decision logged in `logs/gate-decisions/`.
- On failure: Stop; do not continue to outputs.

### Step 6 - Analyze And Aggregate

- Labor: AI
- Depends on: Step 5
- AI task: Run `python3 scripts/tools/survey-analysis-analyze.py` and `python3 scripts/tools/survey-analysis-aggregate.py`.
- Handoff condition: Analyzed rows and aggregate JSON exist.
- On failure: Stop and report analysis failure.

### Step 7 - Prepare Output Contracts

- Labor: AI
- Depends on: Step 6
- AI task: Run `python3 scripts/tools/survey-analysis-prepare-outputs.py`.
- Handoff condition: `logs/survey-analysis-outputs.json` exists and states live Slack/MySQL/Grafana outputs are false.
- On failure: Stop and report output-contract failure.

### Step 8 - Write Human Report

- Labor: AI
- Depends on: Step 7
- AI task: Fill `reports/templates/survey-analysis.md` and save the completed report under `reports/generated/`.
- Handoff condition: Report links to source, aggregate, and output contracts.
- On failure: Stop and report missing report fields.

## Phase Gates

Steps 1, 2, 5, 7, and 8 are hard gates. The conductor stops and waits for explicit human confirmation before proceeding past each hard gate in dialogic mode.

## Silent Mode Requirements

- At least three successful dialogic sample runs.
- At least one successful dialogic live-source run, if live ingest is desired.
- Separate human sign-off for live OpenAI, Slack, MySQL, and Grafana actions.
- Gate decisions logged in `logs/gate-decisions/`.
- Completed flow moved to `conductor/verified/` only after the above evidence exists.
