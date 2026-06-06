# restaurant-agent - Conductor Flow

## Mode

Dialogic (default). Silent mode is not available until this flow is in `conductor/verified/`.

## Entry Point

Triggered when a human asks to test or run the Madison restaurant-agent workflow against TasteBuds Cafe order or reservation data.

## Flow Steps

### Step 1 - Confirm Scope

- Labor: Human
- Depends on: none
- Human task: Confirm sample/live mode, whether the request is customer-facing, and whether order or reservation writes are in scope.
- Handoff condition: Scope names sample/live data, permitted write actions, and the deployment boundary.
- On failure: Stop and ask for scope clarification.

### Step 2 - Verify Provenance

- Labor: AI
- Depends on: Step 1
- AI task: Run `test -f "data/madison-main/n8n-workflows/originals/archives/cicerone/restaurant-agent.json"` and report the result.
- Handoff condition: Original JSON exists at the documented path.
- On failure: Stop and report missing provenance.

### Step 3 - Ingest Menu

- Labor: AI
- Depends on: Step 2
- AI task: Run `python3 scripts/ingest/restaurant-agent-get-menu.py --sample` for dry run, or live with an approved source.
- Handoff condition: `data/raw/restaurant-agent/menu.json` exists and parses as JSON.
- On failure: Stop and ask for source repair.

### Step 4 - Ingest Reservation Availability

- Labor: AI
- Depends on: Step 2
- AI task: Run `python3 scripts/ingest/restaurant-agent-get-reservation-availability.py --sample` for dry run, or live with an approved source.
- Handoff condition: `data/raw/restaurant-agent/reservation-availability.json` exists and parses as JSON.
- On failure: Stop and ask for source repair.

### Step 5 - Ingest Confirmed Reservations

- Labor: AI
- Depends on: Step 2
- AI task: Run `python3 scripts/ingest/restaurant-agent-get-confirmed-reservations.py --sample` for dry run, or live with an approved source.
- Handoff condition: `data/raw/restaurant-agent/confirmed-reservations.json` exists and parses as JSON.
- On failure: Stop and ask for source repair.

### Step 6 - Ingest Orders

- Labor: AI
- Depends on: Step 2
- AI task: Run `python3 scripts/ingest/restaurant-agent-get-orders.py --sample` for dry run, or live with an approved source.
- Handoff condition: `data/raw/restaurant-agent/orders.json` exists and parses as JSON.
- On failure: Stop and ask for source repair.

### Step 7 - Generate Response Contract

- Labor: AI
- Depends on: Steps 3, 4, 5, 6
- AI task: Run `python3 scripts/tools/restaurant-agent-generate-response.py --sample` or run with an approved customer query.
- Handoff condition: `logs/restaurant-agent-response.json` exists, parses as JSON, and includes `intent`, `response_text`, `flags`, and `proposed_writes`.
- On failure: Stop and ask for data or policy repair.

### Step 8 - Human Clearance

- Labor: Human
- Depends on: Step 7
- Human task: Review the proposed order or reservation action, verify customer identity where needed, confirm menu availability or reservation slot state, and approve or reject the write.
- Handoff condition: A gate decision is logged in `logs/gate-decisions/`.
- On failure: Stop; do not write order or reservation updates.

### Step 9 - Write Order Contract

- Labor: AI
- Depends on: Step 8
- AI task: If an order is approved, run `python3 scripts/tools/restaurant-agent-update-orders.py --sample` or pass approved order JSON.
- Handoff condition: Local verified orders JSON and a write log exist.
- On failure: Stop and report the failed write contract.

### Step 10 - Write Reservation Availability Contract

- Labor: AI
- Depends on: Step 8
- AI task: If a reservation is approved, run `python3 scripts/tools/restaurant-agent-update-reservation-availability.py --sample --action block` or pass the approved date, slot, and action.
- Handoff condition: Local verified availability JSON and a write log exist; `changed_keys` contains only the requested slot.
- On failure: Stop and report the failed availability contract.

### Step 11 - Write Confirmed Reservation Contract

- Labor: AI
- Depends on: Step 10
- AI task: Run `python3 scripts/tools/restaurant-agent-update-confirmed-reservations.py --sample` or pass approved reservation JSON.
- Handoff condition: Local verified confirmed reservations JSON exists and links to the availability write log.
- On failure: Stop and report the failed reservation contract.

### Step 12 - Write Human Report

- Labor: AI
- Depends on: Steps 7 through 11 as applicable
- AI task: Fill `reports/templates/restaurant-agent.md` and save the completed report under `reports/generated/`.
- Handoff condition: Report links to the corresponding logs and states any unresolved flags.
- On failure: Stop and report missing report fields.

## Phase Gates

Steps 1, 2, 8, 10, 11, and 12 are hard gates. The conductor stops and waits for explicit human confirmation before proceeding past each hard gate in dialogic mode.

## Silent Mode Requirements

- At least three successful dialogic sample runs covering order creation, reservation creation, and reservation modification.
- At least one successful dialogic run using live data, if live use is desired.
- Gate decisions logged in `logs/gate-decisions/`.
- Human sign-off documented for privacy, double-booking prevention, menu availability, and customer-facing tone.
- Completed flow moved to `conductor/verified/` only after the above evidence exists.
