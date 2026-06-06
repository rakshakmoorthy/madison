# ai-concierge - Conductor Flow

## Mode

Dialogic (default). Silent mode not available until this flow is in `conductor/verified/`.

## Entry Point

Triggered when a human asks to test or run the Madison ai-concierge workflow against cafe/customer-service data.

## Flow Steps

### Step 1 - Confirm Scope

- Labor: Human
- Depends on: none
- Human task: Confirm whether this is a sample run or a live Google Sheets run; provide [PF] problem formulation and [EI] deployment boundary.
- Handoff condition: A written scope states sample/live mode, customer-facing status, and whether live Sheets access is approved.
- On failure: Stop and ask for scope clarification.

### Step 2 - Verify Provenance

- Labor: AI
- Depends on: Step 1
- AI task: Run `test -f "data/madison-main/n8n-workflows/originals/archives/cicerone/ai-concierge.json"` and report the result.
- Handoff condition: Original JSON exists at the documented path.
- On failure: Stop and report missing provenance.

### Step 3 - Ingest Inventory

- Labor: AI
- Depends on: Step 2
- AI task: Run `python3 scripts/ingest/ai-concierge-get-inventory.py --sample` for dry run, or live with `--spreadsheet-id` after human clearance.
- Handoff condition: `data/raw/ai-concierge/inventory.json` exists and parses with `python3 -m json.tool`.
- On failure: Stop, preserve error output in `logs/`, and ask for source repair.

### Step 4 - Ingest FAQ

- Labor: AI
- Depends on: Step 2
- AI task: Run `python3 scripts/ingest/ai-concierge-get-faq.py --sample` for dry run, or live with `--spreadsheet-id` after human clearance.
- Handoff condition: `data/raw/ai-concierge/faq.json` exists and parses with `python3 -m json.tool`.
- On failure: Stop, preserve error output in `logs/`, and ask for source repair.

### Step 5 - Ingest Orders

- Labor: AI
- Depends on: Step 2
- AI task: Run `python3 scripts/ingest/ai-concierge-get-orders.py --sample` for dry run, or live with `--spreadsheet-id` after human clearance.
- Handoff condition: `data/raw/ai-concierge/orders.json` exists and parses with `python3 -m json.tool`.
- On failure: Stop, preserve error output in `logs/`, and ask for source repair.

### Step 6 - Human Policy Review

- Labor: Human
- Depends on: Steps 3, 4, 5
- Human task: Review [PA] data plausibility and [IJ] escalation language for bookings, cancellations, unavailable items, and order-status privacy.
- Handoff condition: A gate decision is logged in `logs/gate-decisions/` approving response generation.
- On failure: Stop; do not generate customer-facing copy.

### Step 7 - Generate Response Contract

- Labor: AI
- Depends on: Step 6
- AI task: Run `python3 scripts/tools/ai-concierge-generate-response.py --sample` or run with an approved customer message.
- Handoff condition: `logs/ai-concierge-sample-response.json` exists, parses as JSON, and includes `response_text` plus `flags`.
- On failure: Stop and ask for data or policy repair.

### Step 8 - Write Human Report

- Labor: AI
- Depends on: Step 7
- AI task: Fill `reports/templates/ai-concierge.md` and save the completed report under `reports/generated/`.
- Handoff condition: Report links to the corresponding log entry and names any flags.
- On failure: Stop and report missing report fields.

## Phase Gates

Steps 1, 2, 6, and 8 are hard gates. The conductor stops and waits for explicit human confirmation before proceeding past each hard gate in dialogic mode.

## Silent Mode Requirements

- At least three successful dialogic runs using sample data.
- At least one successful dialogic run using live data, if live use is desired.
- Gate decisions logged in `logs/gate-decisions/`.
- Human sign-off documented for escalation policy, privacy boundary, and customer-facing tone.
- Completed flow moved to `conductor/verified/` only after the above evidence exists.
