"""Fetch or sample restaurant-agent confirmed reservation rows.

Purpose: Fetch confirmed reservation rows for the restaurant-agent workflow.
Input: CSV export path, Google Sheets spreadsheet id and gid, or built-in sample rows.
Output: JSON array written to data/raw/restaurant-agent/confirmed-reservations.json.
Side effects: Optional network call to Google Sheets CSV export; file write to data/raw/.
Idempotent: yes, because the same source snapshot overwrites the same JSON output path.
Recipe: recipes/restaurant-agent.md
"""

from __future__ import annotations

import argparse
import csv
import json
import os
from pathlib import Path
from typing import Any
from urllib.request import urlopen


SAMPLE_ROWS: list[dict[str, str]] = [
    {
        "Reservation ID": "R1001",
        "Customer Name": "Alex Rivera",
        "Contact Number": "555-0101",
        "Email": "alex@example.com",
        "Reservation Date": "2026-06-06",
        "Reservation Time": "12:00 PM",
        "Number of Guests": "2",
        "Seating Preference": "Window",
        "Special Requests": "Birthday dessert",
        "Confirmed By (Staff Name/AI)": "AI",
        "Confirmation Timestamp": "2026-06-06T12:00:00-04:00",
    }
]


def _rows_from_csv_text(text: str) -> list[dict[str, Any]]:
    return [dict(row) for row in csv.DictReader(text.splitlines())]


def fetch_confirmed_reservations(
    spreadsheet_id: str | None = None,
    gid: str = "0",
    csv_path: str | Path | None = None,
    output_path: str | Path = "data/raw/restaurant-agent/confirmed-reservations.json",
    sample: bool = False,
) -> list[dict[str, Any]]:
    """Fetch confirmed reservation rows for the restaurant-agent workflow."""

    if sample:
        rows = SAMPLE_ROWS
    elif csv_path:
        rows = _rows_from_csv_text(Path(csv_path).read_text(encoding="utf-8"))
    else:
        sheet_id = spreadsheet_id or os.environ.get("MADISON_RESTAURANT_CONFIRMED_RESERVATIONS_SHEET_ID")
        if not sheet_id:
            raise ValueError("Set MADISON_RESTAURANT_CONFIRMED_RESERVATIONS_SHEET_ID, pass --spreadsheet-id, or use --sample.")
        url = f"https://docs.google.com/spreadsheets/d/{sheet_id}/export?format=csv&gid={gid}"
        with urlopen(url, timeout=30) as response:
            rows = _rows_from_csv_text(response.read().decode("utf-8"))

    destination = Path(output_path)
    destination.parent.mkdir(parents=True, exist_ok=True)
    destination.write_text(json.dumps(rows, indent=2, sort_keys=True) + "\n", encoding="utf-8")
    return rows


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Fetch restaurant-agent confirmed reservation rows.")
    parser.add_argument("--spreadsheet-id", default=None)
    parser.add_argument("--gid", default="0")
    parser.add_argument("--csv", default=None)
    parser.add_argument("--output", default="data/raw/restaurant-agent/confirmed-reservations.json")
    parser.add_argument("--sample", action="store_true")
    args = parser.parse_args()
    result = fetch_confirmed_reservations(args.spreadsheet_id, args.gid, args.csv, args.output, sample=args.sample or not (args.spreadsheet_id or args.csv))
    print(json.dumps(result, indent=2, sort_keys=True))
