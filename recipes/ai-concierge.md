# ai-concierge

## Purpose

The ai-concierge workflow answers customer questions for a cafe-style service experience: it handles greetings, FAQ lookup, inventory-aware recommendations, order status checks, and booking/order support. For a marketing or experience lead, the workflow is a bounded customer-facing assistant that can use approved operational data while keeping staff escalation clear for cancellations, unavailable items, and uncertain answers.

## Inputs

| Input | Type | Source | Required? |
|---|---|---|---|
| Customer message | Text | Chat trigger | Yes |
| Customer name | Text | Conversation state | No, but required before personalized service |
| Inventory sheet | Tabular rows | Google Sheets export via `scripts/ingest/ai-concierge-get-inventory.py` | Yes |
| FAQ sheet | Tabular rows | Google Sheets export via `scripts/ingest/ai-concierge-get-faq.py` | Yes |
| Orders sheet | Tabular rows | Google Sheets export via `scripts/ingest/ai-concierge-get-orders.py` | Yes for order-status requests |
| Brand/service rules | Text | Original workflow system message | Yes |

## Phase Gates

1. Source gate: the original workflow JSON must exist at `data/madison-main/n8n-workflows/originals/archives/cicerone/ai-concierge.json`; verify with `test -f "data/madison-main/n8n-workflows/originals/archives/cicerone/ai-concierge.json"`. Human capacity: [TO].
2. Credential gate: any live Google Sheets run must provide `MADISON_AI_CONCIERGE_SHEET_ID` or an explicit `--spreadsheet-id`; verify with `test -n "$MADISON_AI_CONCIERGE_SHEET_ID"` before live ingest. Human capacity: [PA].
3. Ingest dry-run gate: each ingest script must run in sample mode before live use; verify with `python3 scripts/ingest/ai-concierge-get-inventory.py --sample`, `python3 scripts/ingest/ai-concierge-get-faq.py --sample`, and `python3 scripts/ingest/ai-concierge-get-orders.py --sample`. Human capacity: [TO].
4. Data-shape gate: raw ingests must produce JSON arrays of objects; verify with `python3 -m json.tool data/raw/ai-concierge/inventory.json`, `python3 -m json.tool data/raw/ai-concierge/faq.json`, and `python3 -m json.tool data/raw/ai-concierge/orders.json` after live ingest. Human capacity: [PA].
5. Response contract gate: the response tool must run from local data only; verify with `python3 scripts/tools/ai-concierge-generate-response.py --sample`. Human capacity: [IJ].
6. Human clearance gate: customer-facing deployment requires a human to review escalation language, cancellation policy, and unavailable-item behavior before any silent run. Human capacity: [EI].

## Steps

1. Step name: Receive customer message. Labor: AI. Script called: none; conductor captures chat trigger. Input: customer message. Output: message envelope with timestamp and session id. Where output goes: `logs/`.
2. Step name: Fetch inventory. Labor: AI. Script called: `scripts/ingest/ai-concierge-get-inventory.py`. Input: Google Sheets inventory tab or sample rows. Output: normalized inventory JSON. Where output goes: `data/raw/ai-concierge/inventory.json`.
3. Step name: Fetch FAQ. Labor: AI. Script called: `scripts/ingest/ai-concierge-get-faq.py`. Input: Google Sheets FAQ tab or sample rows. Output: normalized FAQ JSON. Where output goes: `data/raw/ai-concierge/faq.json`.
4. Step name: Fetch orders. Labor: AI. Script called: `scripts/ingest/ai-concierge-get-orders.py`. Input: Google Sheets order tab or sample rows. Output: normalized order JSON. Where output goes: `data/raw/ai-concierge/orders.json`.
5. Step name: Review data freshness and policy. Labor: Human. Human action required: confirm the source date, stock statuses, and cancellation/escalation policy are appropriate for customer-facing use. Input: raw JSON and original system message. Output: clearance or stop decision. Where output goes: `logs/gate-decisions/`.
6. Step name: Generate concierge response. Labor: AI. Script called: `scripts/tools/ai-concierge-generate-response.py`. Input: customer message plus local inventory, FAQ, and orders JSON. Output: response draft and evidence summary. Where output goes: `logs/`.
7. Step name: Produce human report. Labor: AI. Script called: none; conductor fills `reports/templates/ai-concierge.md`. Input: run log and response contract. Output: concise run report. Where output goes: `reports/generated/`.

## Output Contract

### Agent output

The agent log goes to `logs/ai-concierge-[DATE].json` and contains: `workflow`, `run_id`, `input_message`, `customer_name`, `data_files`, `matched_faq_ids`, `available_items_used`, `order_ids_checked`, `response_text`, `flags`, `stop_conditions`, and `generated_at`.

### Human report

The human report goes to `reports/generated/ai-concierge-[DATE].md`. It surfaces whether the concierge answered from FAQ, inventory, order records, or escalation policy; which customer-facing decision it enables; and which data or policy issue needs human attention before deployment.

## Stop Conditions

- Stop if the original JSON is missing or differs from the provenance path.
- Stop if live ingest is requested without a spreadsheet id or required access.
- Stop if inventory, FAQ, or order data cannot be parsed as JSON arrays of objects.
- Stop if a user asks for cancellation that policy says staff must handle.
- Stop if the requested item is unavailable and no available alternatives are present in inventory.
- Stop if the response would claim a booking/order is confirmed before a human-approved write path exists.
- Stop if a customer-facing message contains unverified policy, price, allergen, availability, or booking information.

## Provenance

Original workflow JSON: `data/madison-main/n8n-workflows/originals/archives/cicerone/ai-concierge.json`
