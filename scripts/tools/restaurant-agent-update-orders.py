"""Write a local restaurant-agent order update contract.

Purpose: Append or update an order row after human clearance.
Input: Local orders JSON plus approved order fields.
Output: Updated JSON array and a write log.
Side effects: File writes to data/verified/ and logs/; no network calls.
Idempotent: yes, matching on Customer Name updates the same local row.
Recipe: recipes/restaurant-agent.md
"""

from __future__ import annotations

import argparse
import json
from datetime import datetime, timezone
from pathlib import Path
from typing import Any


SAMPLE_ORDER = {
    "Order ID": "O1002",
    "Customer Name": "Sam Patel",
    "Food Items": "Veggie burger; Fries",
    "Quantity": "1; 1",
    "Special Instructions": "No tomato",
    "Pickup/Delivery": "Pickup",
    "Time": "6:30 PM",
    "Status": "Confirmed",
}


def _load_rows(path: str | Path) -> list[dict[str, Any]]:
    target = Path(path)
    if not target.exists():
        return []
    data = json.loads(target.read_text(encoding="utf-8"))
    if not isinstance(data, list):
        raise ValueError(f"{target} must contain a JSON array.")
    return data


def update_orders(
    order: dict[str, Any],
    input_path: str | Path = "data/raw/restaurant-agent/orders.json",
    output_path: str | Path = "data/verified/restaurant-agent/orders.json",
    log_path: str | Path = "logs/restaurant-agent-update-orders.json",
) -> dict[str, Any]:
    """Append or update an order row after human clearance."""

    customer_name = str(order.get("Customer Name") or "").strip()
    if not customer_name:
        raise ValueError("Order must include Customer Name for appendOrUpdate matching.")

    rows = _load_rows(input_path)
    replaced = False
    for index, row in enumerate(rows):
        if str(row.get("Customer Name") or "").strip().lower() == customer_name.lower():
            rows[index] = {**row, **order}
            replaced = True
            break
    if not replaced:
        rows.append(order)

    destination = Path(output_path)
    destination.parent.mkdir(parents=True, exist_ok=True)
    destination.write_text(json.dumps(rows, indent=2, sort_keys=True) + "\n", encoding="utf-8")

    log = {
        "workflow": "restaurant-agent",
        "tool": "update_orders",
        "matching_column": "Customer Name",
        "customer_name": customer_name,
        "operation": "updated" if replaced else "appended",
        "output_path": str(output_path),
        "generated_at": datetime.now(timezone.utc).isoformat(),
    }
    log_destination = Path(log_path)
    log_destination.parent.mkdir(parents=True, exist_ok=True)
    log_destination.write_text(json.dumps(log, indent=2, sort_keys=True) + "\n", encoding="utf-8")
    return log


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Write a restaurant-agent order update contract.")
    parser.add_argument("--order-json", default=None, help="JSON object with approved order fields.")
    parser.add_argument("--input", default="data/raw/restaurant-agent/orders.json")
    parser.add_argument("--output", default="data/verified/restaurant-agent/orders.json")
    parser.add_argument("--log", default="logs/restaurant-agent-update-orders.json")
    parser.add_argument("--sample", action="store_true")
    args = parser.parse_args()
    order_payload = SAMPLE_ORDER if args.sample else json.loads(args.order_json or "{}")
    result = update_orders(order_payload, args.input, args.output, args.log)
    print(json.dumps(result, indent=2, sort_keys=True))
