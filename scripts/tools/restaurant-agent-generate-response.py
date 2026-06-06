"""Generate a local restaurant-agent response contract.

Purpose: Draft a customer response and identify required write actions from local data.
Input: Customer query plus local menu, reservation availability, confirmed reservation, and order JSON.
Output: JSON object written to logs/restaurant-agent-response.json unless another path is supplied.
Side effects: File write to logs/; no network calls and no external service calls.
Idempotent: yes, because identical inputs produce the same deterministic response contract.
Recipe: recipes/restaurant-agent.md
"""

from __future__ import annotations

import argparse
import json
from pathlib import Path
from typing import Any


def load_rows(path: str | Path, fallback: list[dict[str, Any]]) -> list[dict[str, Any]]:
    target = Path(path)
    if not target.exists():
        return fallback
    data = json.loads(target.read_text(encoding="utf-8"))
    if not isinstance(data, list):
        raise ValueError(f"{target} must contain a JSON array.")
    return data


def _available_menu_items(menu: list[dict[str, Any]]) -> list[str]:
    return [
        str(row.get("item") or row.get("Item") or row.get("Food Items"))
        for row in menu
        if str(row.get("status") or row.get("Status") or "Available").lower() == "available"
    ]


def _available_slots(availability: list[dict[str, Any]]) -> list[str]:
    slots: list[str] = []
    for row in availability:
        date = row.get("Date") or row.get("date")
        for key, value in row.items():
            if key.lower() == "date":
                continue
            if str(value).lower() == "available":
                slots.append(f"{date} {key}")
    return slots


def generate_response(
    query: str,
    customer_name: str | None = None,
    menu_path: str | Path = "data/raw/restaurant-agent/menu.json",
    availability_path: str | Path = "data/raw/restaurant-agent/reservation-availability.json",
    reservations_path: str | Path = "data/raw/restaurant-agent/confirmed-reservations.json",
    orders_path: str | Path = "data/raw/restaurant-agent/orders.json",
    output_path: str | Path = "logs/restaurant-agent-response.json",
    sample: bool = False,
) -> dict[str, Any]:
    """Draft a customer response and identify required write actions from local data."""

    menu_fallback = [{"item": "Veggie burger", "status": "Available"}, {"item": "Fries", "status": "Available"}]
    availability_fallback = [{"Date": "2026-06-06", "6:00 PM": "Available", "8:00 PM": "Booked"}]
    reservations_fallback = [{"Reservation ID": "R1001", "Customer Name": "Alex Rivera", "Reservation Date": "2026-06-06", "Reservation Time": "8:00 PM"}]
    orders_fallback = [{"Order ID": "O1001", "Customer Name": "Maya Chen", "Status": "Confirmed"}]

    menu = menu_fallback if sample else load_rows(menu_path, menu_fallback)
    availability = availability_fallback if sample else load_rows(availability_path, availability_fallback)
    reservations = reservations_fallback if sample else load_rows(reservations_path, reservations_fallback)
    orders = orders_fallback if sample else load_rows(orders_path, orders_fallback)

    lowered = query.lower()
    name = customer_name or "there"
    flags: list[str] = []
    proposed_writes: list[dict[str, Any]] = []
    menu_items = _available_menu_items(menu)
    slots = _available_slots(availability)
    intent = "general"

    if any(word in lowered for word in ("reserve", "reservation", "table", "booking")):
        intent = "reservation"
        response = f"Hi {name}, I can help with a reservation. Verified available slots include: {', '.join(slots[:5]) if slots else 'no available slots in the local data'}."
        proposed_writes.append({"type": "reservation", "requires_human_clearance": True, "required_sequence": ["check_availability", "block_slot", "write_confirmed_reservation"]})
        if not slots:
            flags.append("no_available_reservation_slot")
    elif any(word in lowered for word in ("order", "burger", "fries", "pickup", "delivery")):
        intent = "order"
        response = f"Hi {name}, I can help with an order. Verified available menu items include: {', '.join(menu_items[:5]) if menu_items else 'no available menu items in the local data'}."
        proposed_writes.append({"type": "order", "requires_human_clearance": True, "required_sequence": ["check_menu", "confirm_customer_details", "write_order"]})
        if not menu_items:
            flags.append("no_available_menu_item")
    elif any(word in lowered for word in ("change", "modify", "status")):
        intent = "lookup_or_modify"
        response = f"Hi {name}, I found {len(orders)} order record(s) and {len(reservations)} reservation record(s). Please verify identity before sharing or changing details."
        flags.append("identity_verification_required")
    else:
        response = f"Hi {name}, I can help with menu orders, pickup or delivery details, and table reservations."
        flags.append("no_specific_intent_detected")

    result = {
        "workflow": "restaurant-agent",
        "input_query": query,
        "intent": intent,
        "customer_name": customer_name,
        "response_text": response,
        "menu_items_checked": menu_items,
        "reservation_slots_checked": slots,
        "order_ids_checked": [row.get("Order ID") or row.get("order_id") for row in orders],
        "proposed_writes": proposed_writes,
        "writes_performed": [],
        "flags": flags,
        "data_files": {
            "menu": str(menu_path),
            "availability": str(availability_path),
            "reservations": str(reservations_path),
            "orders": str(orders_path),
        },
    }

    destination = Path(output_path)
    destination.parent.mkdir(parents=True, exist_ok=True)
    destination.write_text(json.dumps(result, indent=2, sort_keys=True) + "\n", encoding="utf-8")
    return result


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Generate a restaurant-agent response contract.")
    parser.add_argument("--query", default="I would like a table for two at 6 PM.")
    parser.add_argument("--customer-name", default="Sam")
    parser.add_argument("--menu", default="data/raw/restaurant-agent/menu.json")
    parser.add_argument("--availability", default="data/raw/restaurant-agent/reservation-availability.json")
    parser.add_argument("--reservations", default="data/raw/restaurant-agent/confirmed-reservations.json")
    parser.add_argument("--orders", default="data/raw/restaurant-agent/orders.json")
    parser.add_argument("--output", default="logs/restaurant-agent-response.json")
    parser.add_argument("--sample", action="store_true")
    args = parser.parse_args()
    output = generate_response(args.query, args.customer_name, args.menu, args.availability, args.reservations, args.orders, args.output, sample=args.sample)
    print(json.dumps(output, indent=2, sort_keys=True))
