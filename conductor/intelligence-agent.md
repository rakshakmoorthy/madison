# intelligence-agent - Conductor Flow

## Mode

Dialogic (default). Silent mode is not available until this flow is in `conductor/verified/`.

## Entry Point

Triggered when a human asks to test or run Madison brand intelligence, competitor monitoring, Reddit monitoring, or Apple regulatory monitoring.

## Flow Steps

### Step 1 - Confirm Scope

- Labor: Human
- Depends on: none
- Human task: Confirm sample/live mode, source families, whether live model use is permitted, and whether any sheet write or alert may go live.
- Handoff condition: Scope states approved sources, approved outputs, and compliance-use boundary.
- On failure: Stop and ask for scope clarification.

### Step 2 - Verify Provenance

- Labor: AI
- Depends on: Step 1
- AI task: Run `test -f "data/madison-main/n8n-workflows/originals/intelligence-agent/workflow.json"`.
- Handoff condition: Original JSON exists at the documented path.
- On failure: Stop and report missing provenance.

### Step 3 - Load Config

- Labor: AI
- Depends on: Step 2
- AI task: Run `python3 scripts/tools/intelligence-agent-config.py`.
- Handoff condition: `data/verified/intelligence-agent/config.json` exists and parses as JSON.
- On failure: Stop and repair config.

### Step 4 - Ingest Sources

- Labor: AI
- Depends on: Step 3
- AI task: Run `python3 scripts/ingest/intelligence-agent-get-news.py --sample`, `python3 scripts/ingest/intelligence-agent-get-reddit.py --sample`, `python3 scripts/ingest/intelligence-agent-get-regulatory.py --sample`, and `python3 scripts/ingest/intelligence-agent-get-prior-state.py --sample`.
- Handoff condition: All files under `data/raw/intelligence-agent/` exist and parse as JSON.
- On failure: Stop and ask for source repair.

### Step 5 - Human Source Clearance

- Labor: Human
- Depends on: Step 4
- Human task: Review source mix, prior-state data, and whether live network/model use remains prohibited or approved.
- Handoff condition: Gate decision logged in `logs/gate-decisions/`.
- On failure: Stop; do not continue to analysis.

### Step 6 - Deduplicate

- Labor: AI
- Depends on: Step 5
- AI task: Run `python3 scripts/tools/intelligence-agent-deduplicate.py`.
- Handoff condition: `data/verified/intelligence-agent/new-items.json` exists and contains only new rows.
- On failure: Stop and repair prior state or source shape.

### Step 7 - Analyze

- Labor: AI
- Depends on: Step 6
- AI task: Run `python3 scripts/tools/intelligence-agent-analyze.py`.
- Handoff condition: `data/verified/intelligence-agent/analyzed-items.json` includes sentiment and risk fields.
- On failure: Stop and report analysis failure.

### Step 8 - Metrics, Graph, And Competitors

- Labor: AI
- Depends on: Step 7
- AI task: Run metrics, knowledge graph, and competitor scripts.
- Handoff condition: metrics, graph, and competitor analysis JSON files exist.
- On failure: Stop and report the failed analysis artifact.

### Step 9 - Format Report Contracts

- Labor: AI
- Depends on: Step 8
- AI task: Run `python3 scripts/tools/intelligence-agent-format-reports.py`.
- Handoff condition: `logs/intelligence-agent-reports.json` exists and states live sheet/webhook writes are false.
- On failure: Stop and report formatting failure.

### Step 10 - Write Human Report

- Labor: AI
- Depends on: Step 9
- AI task: Fill `reports/templates/intelligence-agent.md` and save the completed report under `reports/generated/`.
- Handoff condition: Report links to all verified outputs and names unresolved flags.
- On failure: Stop and report missing report fields.

## Phase Gates

Steps 1, 2, 5, 9, and 10 are hard gates. The conductor stops and waits for explicit human confirmation before proceeding past each hard gate in dialogic mode.

## Silent Mode Requirements

- At least three successful dialogic sample runs covering source ingest, dedupe, analysis, metrics, alerts, and reports.
- At least one successful dialogic run using live sources, if live ingest is desired.
- Separate human sign-off for live model use, live sheet writes, and live alerts.
- Gate decisions logged in `logs/gate-decisions/`.
- Completed flow moved to `conductor/verified/` only after the above evidence exists.
