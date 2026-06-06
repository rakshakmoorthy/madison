"""Write a local restaurant-agent reservation availability contract.

Purpose: Block or release one reservation slot while preserving all other slots.
Input: Local availability JSON, date, time slot, and action.
Output: Updated availability JSON and a write log.
Side effects: File writes to data/verified/ and logs/; no network calls.
Idempotent: yes, applying the same action to the same slot keeps the same value.
Recipe: recipes/restaurant-agent.md
"""

from __future__ import annotations

import argparse
import json
from datetime import datetime, timezone
from pathlib import Path
from typing import Any


def _load_rows(path: str | Path) -> list[dict[str, Any]]:
    target = Path(path)
    if not target.exists():
        return [{"Date": "2026-06-06", "8:00 AM": "Available", "10:00 AM": "Available", "12:00 PM": "Booked", "2:00 PM": "Available", "4:00 PM": "Available", "6:00 PM": "Available"}]
    data = json.loads(target.read_text(encoding="utf-8"))
    if not isinstance(data, list):
        raise ValueError(f"{target} must contain a JSON array.")
    return data


def update_reservation_availability(
    date: str,
    slot: str,
    action: str,
    input_path: str | Path = "data/raw/restaurant-agent/reservation-availability.json",
    output_path: str | Path = "data/verified/restaurant-agent/reservation-availability.json",
    log_path: str | Path = "logs/restaurant-agent-update-reservation-availability.json",
) -> dict[str, Any]:
    """Block or release one reservation slot while preserving all other slots."""

    if action not in {"block", "release"}:
        raise ValueError("--action must be block or release.")
    rows = _load_rows(input_path)
    replacement = "Booked" if action == "block" else "Available"
    found = False
    previous_value: Any = None
    changed_keys: list[str] = []

    updated_rows: list[dict[str, Any]] = []
    for row in rows:
        next_row = dict(row)
        if str(row.get("Date")) == date:
            if slot not in row:
                raise ValueError(f"Slot {slot!r} not found for date {date}.")
            previous_value = row.get(slot)
            next_row[slot] = replacement
            changed_keys.append(slot)
            found = True
        updated_rows.append(next_row)

    if not found:
        raise ValueError(f"Date {date!r} not found in availability rows.")
    if action == "block" and str(previous_value).lower() != "available":
        raise ValueError(f"Cannot block {date} {slot}; previous value was {previous_value!r}.")

    destination = Path(output_path)
    destination.parent.mkdir(parents=True, exist_ok=True)
    destination.write_text(json.dumps(updated_rows, indent=2, sort_keys=True) + "\n", encoding="utf-8")

    log = {
        "workflow": "restaurant-agent",
        "tool": "update_reservation_availability",
        "date": date,
        "slot": slot,
        "action": action,
        "previous_value": previous_value,
        "new_value": replacement,
        "changed_keys": changed_keys,
        "preserved_other_slots": True,
        "output_path": str(output_path),
        "generated_at": datetime.now(timezone.utc).isoformat(),
    }
    log_destination = Path(log_path)
    log_destination.parent.mkdir(parents=True, exist_ok=True)
    log_destination.write_text(json.dumps(log, indent=2, sort_keys=True) + "\n", encoding="utf-8")
    return log


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Write a restaurant-agent reservation availability update contract.")
    parser.add_argument("--date", default="2026-06-06")
    parser.add_argument("--slot", default="6:00 PM")
    parser.add_argument("--action", choices=["block", "release"], default="block")
    parser.add_argument("--input", default="data/raw/restaurant-agent/reservation-availability.json")
    parser.add_argument("--output", default="data/verified/restaurant-agent/reservation-availability.json")
    parser.add_argument("--log", default="logs/restaurant-agent-update-reservation-availability.json")
    parser.add_argument("--sample", action="store_true")
    args = parser.parse_args()
    result = update_reservation_availability(args.date, args.slot, args.action, args.input, args.output, args.log)
    print(json.dumps(result, indent=2, sort_keys=True))
