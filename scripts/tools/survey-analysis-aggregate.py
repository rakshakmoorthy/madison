"""Aggregate survey-analysis results.

Purpose: Combine analyzed rows into sentiment distribution, NPS, and segments.
Input: Analyzed survey JSON array.
Output: Aggregate JSON written to data/verified/survey-analysis/aggregate.json.
Side effects: File write to data/verified/; no network calls.
Idempotent: yes, because identical analyzed rows produce identical aggregate metrics.
Recipe: recipes/survey-analysis.md
"""

from __future__ import annotations

import argparse
import json
from collections import Counter
from pathlib import Path
from typing import Any


def aggregate(input_path: str | Path = "data/verified/survey-analysis/analyzed-rows.json", output_path: str | Path = "data/verified/survey-analysis/aggregate.json") -> dict[str, Any]:
    """Combine analyzed rows into sentiment distribution, NPS, and segments."""

    rows = json.loads(Path(input_path).read_text(encoding="utf-8"))
    sentiments = Counter(str(row.get("sentiment", "neutral")) for row in rows)
    segments = Counter(str(row.get("segment_label", "Unknown")) for row in rows)
    promoters = sum(1 for row in rows if row.get("nps_segment") == "promoter")
    detractors = sum(1 for row in rows if row.get("nps_segment") == "detractor")
    total = len(rows)
    nps = round(((promoters / total) - (detractors / total)) * 100) if total else None
    result = {
        "workflow": "survey-analysis",
        "total_responses": total,
        "sentiment_distribution": {"positive": sentiments.get("positive", 0), "neutral": sentiments.get("neutral", 0), "negative": sentiments.get("negative", 0)},
        "nps": nps,
        "segments": [{"label": label, "count": count, "rationale": "Derived from NPS class and sentiment."} for label, count in segments.items()],
    }
    destination = Path(output_path)
    destination.parent.mkdir(parents=True, exist_ok=True)
    destination.write_text(json.dumps(result, indent=2, sort_keys=True) + "\n", encoding="utf-8")
    return result


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Aggregate survey-analysis results.")
    parser.add_argument("--input", default="data/verified/survey-analysis/analyzed-rows.json")
    parser.add_argument("--output", default="data/verified/survey-analysis/aggregate.json")
    args = parser.parse_args()
    result = aggregate(args.input, args.output)
    print(json.dumps(result, indent=2, sort_keys=True))
