"""Write a local restaurant-agent confirmed reservation contract.

Purpose: Append or update a confirmed reservation after the availability block is logged.
Input: Local confirmed reservations JSON plus approved reservation fields.
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


SAMPLE_RESERVATION = {
    "Reservation ID": "R1002",
    "Customer Name": "Sam Patel",
    "Contact Number": "555-0102",
    "Email": "sam@example.com",
    "Reservation Date": "2026-06-06",
    "Reservation Time": "6:00 PM",
    "Number of Guests": "2",
    "Seating Preference": "Window",
    "Special Requests": "",
    "Confirmed By (Staff Name/AI)": "AI draft after human clearance",
    "Confirmation Timestamp": "2026-06-06T18:00:00-04:00",
}


def _load_rows(path: str | Path) -> list[dict[str, Any]]:
    target = Path(path)
    if not target.exists():
        return []
    data = json.loads(target.read_text(encoding="utf-8"))
    if not isinstance(data, list):
        raise ValueError(f"{target} must contain a JSON array.")
    return data


def update_confirmed_reservations(
    reservation: dict[str, Any],
    input_path: str | Path = "data/raw/restaurant-agent/confirmed-reservations.json",
    output_path: str | Path = "data/verified/restaurant-agent/confirmed-reservations.json",
    availability_log_path: str | Path = "logs/restaurant-agent-update-reservation-availability.json",
    log_path: str | Path = "logs/restaurant-agent-update-confirmed-reservations.json",
) -> dict[str, Any]:
    """Append or update a confirmed reservation after the availability block is logged."""

    customer_name = str(reservation.get("Customer Name") or "").strip()
    if not customer_name:
        raise ValueError("Reservation must include Customer Name for appendOrUpdate matching.")
    if not Path(availability_log_path).exists():
        raise ValueError("Availability update log is required before writing a confirmed reservation.")

    rows = _load_rows(input_path)
    replaced = False
    for index, row in enumerate(rows):
        if str(row.get("Customer Name") or "").strip().lower() == customer_name.lower():
            rows[index] = {**row, **reservation}
            replaced = True
            break
    if not replaced:
        rows.append(reservation)

    destination = Path(output_path)
    destination.parent.mkdir(parents=True, exist_ok=True)
    destination.write_text(json.dumps(rows, indent=2, sort_keys=True) + "\n", encoding="utf-8")

    log = {
        "workflow": "restaurant-agent",
        "tool": "update_confirmed_reservations",
        "matching_column": "Customer Name",
        "customer_name": customer_name,
        "operation": "updated" if replaced else "appended",
        "availability_log_path": str(availability_log_path),
        "output_path": str(output_path),
        "generated_at": datetime.now(timezone.utc).isoformat(),
    }
    log_destination = Path(log_path)
    log_destination.parent.mkdir(parents=True, exist_ok=True)
    log_destination.write_text(json.dumps(log, indent=2, sort_keys=True) + "\n", encoding="utf-8")
    return log


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Write a restaurant-agent confirmed reservation contract.")
    parser.add_argument("--reservation-json", default=None, help="JSON object with approved reservation fields.")
    parser.add_argument("--input", default="data/raw/restaurant-agent/confirmed-reservations.json")
    parser.add_argument("--output", default="data/verified/restaurant-agent/confirmed-reservations.json")
    parser.add_argument("--availability-log", default="logs/restaurant-agent-update-reservation-availability.json")
    parser.add_argument("--log", default="logs/restaurant-agent-update-confirmed-reservations.json")
    parser.add_argument("--sample", action="store_true")
    args = parser.parse_args()
    reservation_payload = SAMPLE_RESERVATION if args.sample else json.loads(args.reservation_json or "{}")
    result = update_confirmed_reservations(reservation_payload, args.input, args.output, args.availability_log, args.log)
    print(json.dumps(result, indent=2, sort_keys=True))
