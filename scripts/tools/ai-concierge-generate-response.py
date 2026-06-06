"""Generate a local ai-concierge response contract from verified data.

Purpose: Produce a customer response draft and evidence summary from local concierge data.
Input: Customer message plus local JSON arrays from data/raw/ or data/verified/.
Output: JSON object written to logs/ai-concierge-sample-response.json unless another path is supplied.
Side effects: File write to logs/; no network calls and no external service calls.
Idempotent: yes, because identical inputs produce the same deterministic response contract.
Recipe: recipes/ai-concierge.md
"""

from __future__ import annotations

import argparse
import json
from pathlib import Path
from typing import Any


SAMPLE_INVENTORY = [
    {"item": "Cafe latte", "status": "Available", "tags": "popular"},
    {"item": "Blueberry muffin", "status": "Out of Stock", "tags": "bakery"},
]
SAMPLE_FAQ = [
    {"question": "What are your hours?", "answer": "We are open from 9 AM to 9 PM.", "tags": "hours"},
]
SAMPLE_ORDERS = [
    {"order_id": "A1001", "customer_name": "Sarah", "item": "Cafe latte", "status": "Confirmed"},
]


def load_rows(path: str | Path, fallback: list[dict[str, Any]]) -> list[dict[str, Any]]:
    target = Path(path)
    if not target.exists():
        return fallback
    return json.loads(target.read_text(encoding="utf-8"))


def generate_concierge_response(
    message: str,
    customer_name: str | None = None,
    inventory_path: str | Path = "data/raw/ai-concierge/inventory.json",
    faq_path: str | Path = "data/raw/ai-concierge/faq.json",
    orders_path: str | Path = "data/raw/ai-concierge/orders.json",
    output_path: str | Path = "logs/ai-concierge-sample-response.json",
    sample: bool = False,
) -> dict[str, Any]:
    """Produce a customer response draft and evidence summary from local concierge data.

    Purpose: Produce a customer response draft and evidence summary from local concierge data.
    Input: Customer message plus local JSON arrays from data/raw/ or data/verified/.
    Output: JSON object written to the requested log path.
    Side effects: File write to logs/; no network calls and no external service calls.
    Idempotent: yes, because identical inputs produce the same deterministic response contract.
    Recipe: recipes/ai-concierge.md
    """

    inventory = SAMPLE_INVENTORY if sample else load_rows(inventory_path, SAMPLE_INVENTORY)
    faq = SAMPLE_FAQ if sample else load_rows(faq_path, SAMPLE_FAQ)
    orders = SAMPLE_ORDERS if sample else load_rows(orders_path, SAMPLE_ORDERS)

    lowered = message.lower()
    name = customer_name or "there"
    flags: list[str] = []
    matched_faq: list[dict[str, Any]] = []
    available_items = [row for row in inventory if str(row.get("status", "")).lower() == "available"]
    checked_orders: list[dict[str, Any]] = []

    if "cancel" in lowered:
        response = f"Sorry {name}, cancellations must be handled directly with staff. Please call us at +1 (123) 456-7890."
        flags.append("staff_cancellation_required")
    elif "stock" in lowered or "available" in lowered:
        item_names = [str(row.get("item", "Unnamed item")) for row in available_items]
        response = f"Hi {name}, available options include: {', '.join(item_names) if item_names else 'no verified available items'}."
    elif "order" in lowered:
        checked_orders = orders[:3]
        response = f"Hi {name}, I found {len(checked_orders)} local order record(s). Please verify identity before sharing detailed status."
        flags.append("identity_verification_required")
    else:
        for row in faq:
            question = str(row.get("question", "")).lower()
            if any(token and token in question for token in lowered.split()):
                matched_faq.append(row)
        if matched_faq:
            response = f"Hi {name}, {matched_faq[0].get('answer')}"
        else:
            response = f"Hi {name}, I can help with menu questions, stock checks, order status, and booking basics."
            flags.append("no_direct_faq_match")

    result = {
        "workflow": "ai-concierge",
        "input_message": message,
        "customer_name": customer_name,
        "response_text": response,
        "matched_faq_ids": [row.get("id") or row.get("question") for row in matched_faq],
        "available_items_used": [row.get("item") for row in available_items],
        "order_ids_checked": [row.get("order_id") for row in checked_orders],
        "flags": flags,
        "data_files": {
            "inventory": str(inventory_path),
            "faq": str(faq_path),
            "orders": str(orders_path),
        },
    }

    destination = Path(output_path)
    destination.parent.mkdir(parents=True, exist_ok=True)
    destination.write_text(json.dumps(result, indent=2, sort_keys=True) + "\n", encoding="utf-8")
    return result


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Generate an ai-concierge response contract.")
    parser.add_argument("--message", default="What items are available?")
    parser.add_argument("--customer-name", default="Sarah")
    parser.add_argument("--inventory", default="data/raw/ai-concierge/inventory.json")
    parser.add_argument("--faq", default="data/raw/ai-concierge/faq.json")
    parser.add_argument("--orders", default="data/raw/ai-concierge/orders.json")
    parser.add_argument("--output", default="logs/ai-concierge-sample-response.json")
    parser.add_argument("--sample", action="store_true")
    args = parser.parse_args()
    output = generate_concierge_response(
        args.message,
        args.customer_name,
        args.inventory,
        args.faq,
        args.orders,
        args.output,
        sample=args.sample,
    )
    print(json.dumps(output, indent=2, sort_keys=True))
