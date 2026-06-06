"""Fetch or sample survey-analysis survey rows.

Purpose: Fetch survey CSV rows for the survey-analysis workflow.
Input: Local CSV, live CSV URL, or built-in sample rows.
Output: JSON array written to data/raw/survey-analysis/survey-rows.json.
Side effects: Optional network call to CSV URL; file write to data/raw/.
Idempotent: yes, because the same source snapshot overwrites the same JSON output path.
Recipe: recipes/survey-analysis.md
"""

from __future__ import annotations

import argparse
import csv
import json
from pathlib import Path
from typing import Any
from urllib.request import urlopen


SAMPLE_ROWS = [
    {"RespondentID": "1001", "Age": "34", "Gender": "F", "Q1_Satisfaction": "5", "Q2_EaseOfUse": "4", "Q3_Recommend": "9"},
    {"RespondentID": "1002", "Age": "45", "Gender": "M", "Q1_Satisfaction": "2", "Q2_EaseOfUse": "3", "Q3_Recommend": "5"},
    {"RespondentID": "1003", "Age": "29", "Gender": "F", "Q1_Satisfaction": "4", "Q2_EaseOfUse": "5", "Q3_Recommend": "10"},
]


def _rows_from_csv_text(text: str) -> list[dict[str, Any]]:
    return [dict(row) for row in csv.DictReader(text.splitlines())]


def fetch_survey(csv_path: str | Path | None = None, url: str | None = None, output_path: str | Path = "data/raw/survey-analysis/survey-rows.json", sample: bool = False) -> list[dict[str, Any]]:
    """Fetch survey CSV rows for the survey-analysis workflow."""

    if sample:
        rows = SAMPLE_ROWS
    elif csv_path:
        rows = _rows_from_csv_text(Path(csv_path).read_text(encoding="utf-8"))
    elif url:
        with urlopen(url, timeout=30) as response:
            rows = _rows_from_csv_text(response.read().decode("utf-8"))
    else:
        rows = SAMPLE_ROWS

    destination = Path(output_path)
    destination.parent.mkdir(parents=True, exist_ok=True)
    destination.write_text(json.dumps(rows, indent=2, sort_keys=True) + "\n", encoding="utf-8")
    return rows


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Fetch survey-analysis survey rows.")
    parser.add_argument("--csv", default=None)
    parser.add_argument("--url", default=None)
    parser.add_argument("--output", default="data/raw/survey-analysis/survey-rows.json")
    parser.add_argument("--sample", action="store_true")
    args = parser.parse_args()
    result = fetch_survey(args.csv, args.url, args.output, sample=args.sample or not (args.csv or args.url))
    print(json.dumps(result, indent=2, sort_keys=True))
