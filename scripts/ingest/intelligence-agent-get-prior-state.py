"""Fetch or sample intelligence-agent prior-state rows.

Purpose: Provide processed links and articles for deduplication.
Input: Local JSON export or sample rows.
Output: JSON object written to data/raw/intelligence-agent/prior-state.json.
Side effects: File write to data/raw/; no network calls.
Idempotent: yes, because the same source snapshot overwrites the same JSON output path.
Recipe: recipes/intelligence-agent.md
"""

from __future__ import annotations

import argparse
import json
from pathlib import Path
from typing import Any


SAMPLE_STATE = {
    "processed_links": [{"title": "Already processed Apple story", "link": "https://example.com/old-apple"}],
    "processed_articles": [{"title": "Old compliance article", "link": "https://example.com/old-reg"}],
    "previous_metrics": {"apple": 0.55, "samsung": 0.5, "google": 0.5, "microsoft": 0.5},
}


def fetch_prior_state(json_path: str | Path | None = None, output_path: str | Path = "data/raw/intelligence-agent/prior-state.json", sample: bool = False) -> dict[str, Any]:
    state = SAMPLE_STATE if sample or not json_path else json.loads(Path(json_path).read_text(encoding="utf-8"))
    destination = Path(output_path)
    destination.parent.mkdir(parents=True, exist_ok=True)
    destination.write_text(json.dumps(state, indent=2, sort_keys=True) + "\n", encoding="utf-8")
    return state


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Fetch intelligence-agent prior state.")
    parser.add_argument("--json", default=None)
    parser.add_argument("--output", default="data/raw/intelligence-agent/prior-state.json")
    parser.add_argument("--sample", action="store_true")
    args = parser.parse_args()
    result = fetch_prior_state(args.json, args.output, sample=args.sample or not args.json)
    print(json.dumps(result, indent=2, sort_keys=True))
