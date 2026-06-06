# restaurant-agent

## Purpose

The restaurant-agent workflow handles TasteBuds Cafe customer requests for food orders and table reservations. It translates the imported webhook-and-agent flow into a recipe with explicit ingest boundaries, local tool contracts, human phase gates, and auditable outputs so order and reservation writes do not happen silently.

## Inputs

| Input | Type | Source | Required? |
|---|---|---|---|
| Customer query | Text | Webhook body field `query` | Yes |
| Menu rows | Tabular rows | Restaurant Menu workflow export via `scripts/ingest/restaurant-agent-get-menu.py` | Yes for order requests |
| Reservation availability rows | Tabular rows | Google Sheets export via `scripts/ingest/restaurant-agent-get-reservation-availability.py` | Yes for reservation requests |
| Confirmed reservation rows | Tabular rows | Google Sheets export via `scripts/ingest/restaurant-agent-get-confirmed-reservations.py` | Yes for reservation changes |
| Order rows | Tabular rows | Google Sheets export via `scripts/ingest/restaurant-agent-get-orders.py` | Yes for order creation or modification |
| Proposed write action | JSON object | Human-cleared agent draft | Yes before any order or reservation update |

## Phase Gates

1. Source gate: the original workflow JSON must exist at `data/madison-main/n8n-workflows/originals/archives/cicerone/restaurant-agent.json`; verify with `test -f "data/madison-main/n8n-workflows/originals/archives/cicerone/restaurant-agent.json"`. Human capacity: [TO].
2. Credential gate: live Google Sheets ingest must provide the requested spreadsheet id explicitly or by environment variable; sample mode is required before live mode. Human capacity: [PA].
3. Menu gate: menu rows must be current enough to support availability claims; verify with `python3 scripts/ingest/restaurant-agent-get-menu.py --sample`. Human capacity: [PA].
4. Reservation availability gate: before confirming or modifying a reservation, the requested date row must be read and the target slot must be available; verify with `python3 scripts/tools/restaurant-agent-update-reservation-availability.py --sample --action block`. Human capacity: [IJ].
5. Double-booking gate: when blocking a reservation slot, preserve all other time slots exactly as found in the source row and write only the requested slot change. Human capacity: [IJ].
6. Confirmed reservation gate: write confirmed reservation details only after availability has been checked and the requested slot has been blocked in the local write contract. Human capacity: [EI].
7. Order gate: write an order only after menu availability and customer confirmation are logged. Human capacity: [EI].
8. Report gate: every run that produces an order, reservation, or customer-facing answer must produce both a parseable log and a human-readable report. Human capacity: [TO].

## Steps

1. Step name: Receive customer query. Labor: AI. Script called: none; conductor captures webhook body. Input: `query`. Output: run envelope with timestamp and session id. Where output goes: `logs/`.
2. Step name: Ingest menu. Labor: AI. Script called: `scripts/ingest/restaurant-agent-get-menu.py`. Input: menu workflow export or sample rows. Output: normalized menu JSON. Where output goes: `data/raw/restaurant-agent/menu.json`.
3. Step name: Ingest reservation availability. Labor: AI. Script called: `scripts/ingest/restaurant-agent-get-reservation-availability.py`. Input: reservation availability sheet or sample rows. Output: normalized availability JSON. Where output goes: `data/raw/restaurant-agent/reservation-availability.json`.
4. Step name: Ingest confirmed reservations. Labor: AI. Script called: `scripts/ingest/restaurant-agent-get-confirmed-reservations.py`. Input: confirmed reservations sheet or sample rows. Output: normalized reservation JSON. Where output goes: `data/raw/restaurant-agent/confirmed-reservations.json`.
5. Step name: Ingest orders. Labor: AI. Script called: `scripts/ingest/restaurant-agent-get-orders.py`. Input: orders sheet or sample rows. Output: normalized order JSON. Where output goes: `data/raw/restaurant-agent/orders.json`.
6. Step name: Draft customer response. Labor: AI. Script called: `scripts/tools/restaurant-agent-generate-response.py`. Input: customer query plus local menu, reservation, and order data. Output: response contract with intent, required writes, flags, and customer-facing text. Where output goes: `logs/restaurant-agent-response.json`.
7. Step name: Human clearance. Labor: Human. Human action required: confirm requested action, privacy boundary, menu availability, reservation slot status, and customer details before any write. Input: response contract and source rows. Output: approved or rejected gate decision. Where output goes: `logs/gate-decisions/`.
8. Step name: Write order contract. Labor: AI. Script called: `scripts/tools/restaurant-agent-update-orders.py`. Input: approved order JSON and local orders JSON. Output: updated local orders JSON plus write log. Where output goes: `data/verified/restaurant-agent/orders.json` and `logs/`.
9. Step name: Write reservation availability contract. Labor: AI. Script called: `scripts/tools/restaurant-agent-update-reservation-availability.py`. Input: approved date, slot, and action. Output: updated local availability JSON plus write log. Where output goes: `data/verified/restaurant-agent/reservation-availability.json` and `logs/`.
10. Step name: Write confirmed reservation contract. Labor: AI. Script called: `scripts/tools/restaurant-agent-update-confirmed-reservations.py`. Input: approved reservation details. Output: updated local reservation JSON plus write log. Where output goes: `data/verified/restaurant-agent/confirmed-reservations.json` and `logs/`.
11. Step name: Produce human report. Labor: AI. Script called: none; conductor fills `reports/templates/restaurant-agent.md`. Input: response contract and write logs. Output: concise run report. Where output goes: `reports/generated/`.

## Output Contract

### Agent output

The agent log goes to `logs/restaurant-agent-[DATE].json` and contains: `workflow`, `run_id`, `input_query`, `intent`, `customer_name`, `data_files`, `menu_items_checked`, `reservation_slots_checked`, `order_ids_checked`, `proposed_writes`, `writes_performed`, `response_text`, `flags`, `stop_conditions`, and `generated_at`.

### Human report

The human report goes to `reports/generated/restaurant-agent-[DATE].md`. It names the customer request, states whether it was an order or reservation flow, lists the evidence used, identifies the human decision needed or taken, and links to the log entries behind any write.

## Stop Conditions

- Stop if the original JSON is missing or no longer matches the documented provenance path.
- Stop if live ingest is requested without explicit human clearance and source identifiers.
- Stop if menu, order, reservation availability, or confirmed reservation data cannot be parsed as JSON arrays of objects.
- Stop if an order references an unavailable or unknown menu item.
- Stop if a reservation slot is unavailable, missing, malformed, or ambiguous.
- Stop if a reservation update would overwrite unrelated time slots.
- Stop if a confirmed reservation write is requested before the availability block is logged.
- Stop if customer identity is needed before sharing or modifying an existing order or reservation.
- Stop if customer-facing output contains unverified prices, allergens, delivery terms, reservation capacity, or staff promises.

## Provenance

Original workflow JSON: `data/madison-main/n8n-workflows/originals/archives/cicerone/restaurant-agent.json`
