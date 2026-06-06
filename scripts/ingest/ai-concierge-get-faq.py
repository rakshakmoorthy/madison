"""Fetch or sample ai-concierge FAQ rows.

Purpose: Fetch FAQ rows for the ai-concierge workflow.
Input: Google Sheets spreadsheet id and FAQ gid, or built-in sample rows for verification.
Output: JSON array written to data/raw/ai-concierge/faq.json.
Side effects: Optional network call to Google Sheets CSV export; file write to data/raw/.
Idempotent: yes, because the same source snapshot overwrites the same JSON output path.
Recipe: recipes/ai-concierge.md
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
    {"question": "What are your hours?", "answer": "We are open from 9 AM to 9 PM.", "tags": "hours"},
    {"question": "Do you have vegan options?", "answer": "Yes, ask for oat milk drinks and vegan-marked items.", "tags": "vegan"},
]


def fetch_faq(
    spreadsheet_id: str | None = None,
    gid: str = "38271191",
    output_path: str | Path = "data/raw/ai-concierge/faq.json",
    sample: bool = False,
) -> list[dict[str, Any]]:
    """Fetch FAQ rows for the ai-concierge workflow.

    Purpose: Fetch FAQ rows for the ai-concierge workflow.
    Input: Google Sheets spreadsheet id and FAQ gid, or built-in sample rows for verification.
    Output: JSON array written to the requested output path.
    Side effects: Optional network call to Google Sheets CSV export; file write to data/raw/.
    Idempotent: yes, because the same source snapshot overwrites the same JSON output path.
    Recipe: recipes/ai-concierge.md
    """

    rows: list[dict[str, Any]]
    if sample:
        rows = SAMPLE_ROWS
    else:
        sheet_id = spreadsheet_id or os.environ.get("MADISON_AI_CONCIERGE_SHEET_ID")
        if not sheet_id:
            raise ValueError("Set MADISON_AI_CONCIERGE_SHEET_ID or pass --spreadsheet-id for live ingest.")
        url = f"https://docs.google.com/spreadsheets/d/{sheet_id}/export?format=csv&gid={gid}"
        with urlopen(url, timeout=30) as response:
            text = response.read().decode("utf-8")
        rows = list(csv.DictReader(text.splitlines()))

    destination = Path(output_path)
    destination.parent.mkdir(parents=True, exist_ok=True)
    destination.write_text(json.dumps(rows, indent=2, sort_keys=True) + "\n", encoding="utf-8")
    return rows


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Fetch ai-concierge FAQ rows.")
    parser.add_argument("--spreadsheet-id", default=None)
    parser.add_argument("--gid", default="38271191")
    parser.add_argument("--output", default="data/raw/ai-concierge/faq.json")
    parser.add_argument("--sample", action="store_true", help="Use built-in sample rows instead of live Google Sheets.")
    args = parser.parse_args()
    result = fetch_faq(args.spreadsheet_id, args.gid, args.output, sample=args.sample or not args.spreadsheet_id)
    print(json.dumps(result, indent=2, sort_keys=True))
