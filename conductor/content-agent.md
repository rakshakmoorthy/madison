# content-agent - Conductor Flow

## Mode

Dialogic (default). Silent mode is not available until this flow is in `conductor/verified/`.

## Entry Point

Triggered when a human asks to test or run the Madison content-agent workflow for brief generation, visual concepting, or weekly Reddit content intelligence.

## Flow Steps

### Step 1 - Confirm Scope

- Labor: Human
- Depends on: none
- Human task: Confirm sample/live mode, generation scope, Reddit ingest scope, and whether any external publication or alerting is permitted.
- Handoff condition: Scope states sample/live data, approved services, and customer-facing or internal-only status.
- On failure: Stop and ask for scope clarification.

### Step 2 - Verify Provenance

- Labor: AI
- Depends on: Step 1
- AI task: Run `test -f "data/madison-main/n8n-workflows/originals/content-agent-full-workflow.json"` and report the result.
- Handoff condition: Original JSON exists at the documented path.
- On failure: Stop and report missing provenance.

### Step 3 - Write Brand Voice

- Labor: AI
- Depends on: Step 2
- AI task: Run `python3 scripts/tools/content-agent-brand-voice.py`.
- Handoff condition: `data/verified/content-agent/brand-voice.json` exists and parses as JSON.
- On failure: Stop and ask for brand boundary repair.

### Step 4 - Build Prompt

- Labor: AI
- Depends on: Step 3
- AI task: Run `python3 scripts/tools/content-agent-build-prompt.py --sample`.
- Handoff condition: `logs/content-agent-prompt.json` exists and includes the JSON-only generation contract.
- On failure: Stop and repair prompt inputs.

### Step 5 - Human Prompt Clearance

- Labor: Human
- Depends on: Step 4
- Human task: Review the prompt, taboos, audience, offer, and model/provider boundary.
- Handoff condition: Human approves sample generation or live model generation.
- On failure: Stop; do not generate variants.

### Step 6 - Normalize Variants

- Labor: AI
- Depends on: Step 5
- AI task: Run `python3 scripts/tools/content-agent-quality-check.py --sample` or pass approved model output.
- Handoff condition: `data/verified/content-agent/variants.json` contains exactly three valid variant rows.
- On failure: Stop and ask for generation repair.

### Step 7 - Score Variants

- Labor: AI
- Depends on: Step 6
- AI task: Run `python3 scripts/tools/content-agent-score-variants.py`.
- Handoff condition: `data/verified/content-agent/scored-variants.json` exists with `quality_score` and `popper_pass`.
- On failure: Stop and report scoring failure.

### Step 8 - Split Review Lanes

- Labor: AI
- Depends on: Step 7
- AI task: Run `python3 scripts/tools/content-agent-split-variants.py`.
- Handoff condition: Approved and needs-review JSON/CSV files exist.
- On failure: Stop and report split failure.

### Step 9 - Create Visual Concepts

- Labor: AI
- Depends on: Step 8
- AI task: Run `python3 scripts/tools/content-agent-visual-concepts.py`.
- Handoff condition: `data/verified/content-agent/visual-concepts.json` exists for approved variants.
- On failure: Stop and ask for concept repair.

### Step 10 - Ingest Reddit Posts

- Labor: AI
- Depends on: Step 2
- AI task: Run `python3 scripts/ingest/content-agent-get-reddit-posts.py --sample` for dry run, or live after human clearance.
- Handoff condition: `data/raw/content-agent/reddit-posts.json` exists and parses as JSON.
- On failure: Stop and ask for source repair.

### Step 11 - Compute Engagement

- Labor: AI
- Depends on: Step 10
- AI task: Run `python3 scripts/tools/content-agent-compute-engagement.py`.
- Handoff condition: `data/verified/content-agent/reddit-engagement.json` exists with `engagement_score` and `best_content`.
- On failure: Stop and report engagement scoring failure.

### Step 12 - Prepare Alert Contracts

- Labor: AI
- Depends on: Steps 8 and 11
- AI task: Run `python3 scripts/tools/content-agent-prepare-alerts.py`.
- Handoff condition: `logs/content-agent-alerts.json` exists and states `live_posting: false`.
- On failure: Stop and report alert contract failure.

### Step 13 - Write Human Report

- Labor: AI
- Depends on: Steps 4 through 12
- AI task: Fill `reports/templates/content-agent.md` and save the completed report under `reports/generated/`.
- Handoff condition: Report links to prompt, variant, engagement, and alert artifacts.
- On failure: Stop and report missing report fields.

## Phase Gates

Steps 1, 2, 5, 10, 12, and 13 are hard gates. The conductor stops and waits for explicit human confirmation before proceeding past each hard gate in dialogic mode.

## Silent Mode Requirements

- At least three successful dialogic sample runs covering generation, quality split, visual concepts, and Reddit engagement scoring.
- At least one successful dialogic run using live Reddit data, if live Reddit ingest is desired.
- At least one human-approved model generation run, if live model use is desired.
- Gate decisions logged in `logs/gate-decisions/`.
- Human sign-off documented for brand voice, quality threshold, live posting prohibition or approval, and customer-facing tone.
- Completed flow moved to `conductor/verified/` only after the above evidence exists.
