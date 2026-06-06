"""Analyze survey-analysis clean rows locally.

Purpose: Add deterministic sentiment, NPS class, and segment labels to survey rows.
Input: Clean survey JSON array.
Output: Analyzed rows written to data/verified/survey-analysis/analyzed-rows.json.
Side effects: File write to data/verified/; no network calls.
Idempotent: yes, because identical clean rows produce identical analysis.
Recipe: recipes/survey-analysis.md
"""

from __future__ import annotations

import argparse
import json
from pathlib import Path
from typing import Any


def _sentiment(row: dict[str, Any]) -> str:
    avg = (float(row["q1_satisfaction"]) + float(row["q2_easeofuse"]) + float(row["q3_recommend"]) / 2) / 3
    if avg >= 4:
        return "positive"
    if avg <= 2.5:
        return "negative"
    return "neutral"


def _nps_class(score: float) -> str:
    if score >= 9:
        return "promoter"
    if score >= 7:
        return "passive"
    return "detractor"


def analyze(input_path: str | Path = "data/verified/survey-analysis/clean-rows.json", output_path: str | Path = "data/verified/survey-analysis/analyzed-rows.json") -> list[dict[str, Any]]:
    """Add deterministic sentiment, NPS class, and segment labels to survey rows."""

    rows = json.loads(Path(input_path).read_text(encoding="utf-8"))
    analyzed = []
    for row in rows:
        nps_score = float(row["q3_recommend"])
        sentiment = _sentiment(row)
        segment = _nps_class(nps_score)
        analyzed.append({**row, "sentiment": sentiment, "nps_response": nps_score, "nps_segment": segment, "segment_label": f"{segment.title()} - {sentiment.title()}", "segment_rationale": "Derived from recommendation score and satisfaction/ease ratings."})
    destination = Path(output_path)
    destination.parent.mkdir(parents=True, exist_ok=True)
    destination.write_text(json.dumps(analyzed, indent=2, sort_keys=True) + "\n", encoding="utf-8")
    return analyzed


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Analyze survey-analysis rows.")
    parser.add_argument("--input", default="data/verified/survey-analysis/clean-rows.json")
    parser.add_argument("--output", default="data/verified/survey-analysis/analyzed-rows.json")
    args = parser.parse_args()
    result = analyze(args.input, args.output)
    print(json.dumps(result, indent=2, sort_keys=True))
